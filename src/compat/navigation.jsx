import { useLocation, useNavigate, useParams } from "react-router-dom";

export function usePathname() {
  return useLocation().pathname;
}

export function notFound() {
  return null;
}

export function redirect(path) {
  const navigate = useNavigate();
  navigate(path, { replace: true });
}

export { useParams, useNavigate };
