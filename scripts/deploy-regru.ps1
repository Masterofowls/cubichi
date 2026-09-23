# Deploy Next.js static export (out/) to reg.ru ISPmanager via FTP.
# Requires: .env.local with FTP_HOST, FTP_USER, FTP_PASS, FTP_REMOTE_DIR

$ErrorActionPreference = "Stop"

function Read-DotEnv([string]$Path) {
  if (-not (Test-Path $Path)) { return }
  Get-Content $Path | ForEach-Object {
    $line = $_.Trim()
    if (-not $line -or $line.StartsWith("#")) { return }
    $i = $line.IndexOf("=")
    if ($i -lt 1) { return }
    $name = $line.Substring(0, $i).Trim()
    $value = $line.Substring($i + 1).Trim().Trim('"').Trim("'")
    Set-Item -Path "Env:$name" -Value $value
  }
}

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
Read-DotEnv (Join-Path $root ".env.local")

$hostName = $env:FTP_HOST
$user = $env:FTP_USER
$pass = $env:FTP_PASS
$remoteDir = if ($env:FTP_REMOTE_DIR) { $env:FTP_REMOTE_DIR.TrimEnd("/") } else { "/www/cubichi.ru" }
$localDir = Join-Path $root "out"

if (-not $hostName -or -not $user -or -not $pass) {
  Write-Error "Set FTP_HOST, FTP_USER, FTP_PASS in .env.local (see .env.example)."
}

if (-not (Test-Path (Join-Path $localDir "index.html"))) {
  Write-Error "Missing out/index.html. Run: npm run build"
}

Write-Host "Deploying $localDir -> ftp://${hostName}${remoteDir}/"

$ftpScript = @"
open ftp://$user`:$pass@$hostName
option batch continue
option confirm off
option transfer binary
cd $remoteDir
lcd $localDir
synchronize remote -delete -criteria=time
exit
"@

$winscp = @(
  "${env:ProgramFiles}\WinSCP\WinSCP.com",
  "${env:ProgramFiles(x86)}\WinSCP\WinSCP.com",
  "$env:LOCALAPPDATA\Programs\WinSCP\WinSCP.com"
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if ($winscp) {
  $tmp = Join-Path $env:TEMP "cubichi-winscp.txt"
  Set-Content -Path $tmp -Value $ftpScript -Encoding ASCII
  & $winscp /ini=nul /script=$tmp
  if ($LASTEXITCODE -ne 0) { Write-Error "WinSCP failed with code $LASTEXITCODE" }
  Remove-Item $tmp -Force -ErrorAction SilentlyContinue
  Write-Host "Deploy finished (WinSCP)."
  exit 0
}

# Fallback: curl --ftp-create-dirs recursive upload (no delete of remote orphans)
Write-Host "WinSCP not found; using curl recursive upload (no remote delete)."
Get-ChildItem -Path $localDir -Recurse -File | ForEach-Object {
  $rel = $_.FullName.Substring($localDir.Length).Replace("\", "/")
  $remoteUrl = "ftp://${hostName}${remoteDir}${rel}"
  Write-Host "  PUT $rel"
  curl.exe -sS --ftp-create-dirs -u "${user}:${pass}" -T $_.FullName $remoteUrl
  if ($LASTEXITCODE -ne 0) { Write-Error "curl failed for $rel" }
}

Write-Host "Deploy finished (curl)."
