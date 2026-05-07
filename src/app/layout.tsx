import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: {
    default: "Кубики-Самоучки — Игры-тренажеры русского языка",
    template: "%s | Кубики-Самоучки",
  },
  description:
    "Настольные игры с кубиками для детей 7–12 лет: части речи, падежи, безударные гласные. Разработано логопедом-дефектологом.",
  keywords: [
    "кубики-самоучки",
    "тренажер русский язык",
    "образовательные игры",
    "логопедический тренажер",
    "обучение детей",
    "русский язык для детей",
    "части речи игра",
    "падежи игра",
    "настольные игры для школьников",
    "развивающие игры",
    "безударные гласные",
    "обучение грамотности",
  ],
  authors: [{ name: "Кубики-Самоучки" }],
  creator: "Кубики-Самоучки",
  publisher: "cubichi.ru",
  formatDetection: {
    telephone: true,
    email: true,
  },
  openGraph: {
    title: "Кубики-Самоучки — Тренажер по русскому языку для детей",
    description:
      "Настольные обучающие игры с кубиками для детей 7–12 лет. Тренируем части речи, падежи и безударные гласные в игровой форме. Разработано логопедом-дефектологом.",
    url: "https://cubichi.ru",
    siteName: "Кубики-Самоучки",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/images/og-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Кубики-Самоучки — настольные обучающие игры с кубиками для детей",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Кубики-Самоучки — Тренажер по русскому языку",
    description:
      "Настольные обучающие игры с кубиками для детей 7–12 лет. Разработано логопедом-дефектологом.",
    images: ["/images/og-preview.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/images/happy-learning.jpg", sizes: "180x180" }],
  },
  metadataBase: new URL("https://cubichi.ru"),
  alternates: {
    canonical: "https://cubichi.ru",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {},
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0284c7",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={inter.className}>
      <head>
        {/* Yandex Metrika */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r)return;}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
ym(99999999,"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});
`,
          }}
        />
        <noscript>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://mc.yandex.ru/watch/99999999"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </head>
      <body className="min-h-screen bg-white antialiased flex flex-col">
        <Navigation />
        <main className="pt-16 flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
