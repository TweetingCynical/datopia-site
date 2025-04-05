import { Montserrat, Bruno_Ace } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Add any weights you plan to use
  variable: "--font-montserrat",
});

const brunoAce = Bruno_Ace({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bruno-ace",
});

export const metadata = {
  title: "Datopia | App Development, Web Solutions, and Digital Growth",
  description:
    "Datopia provides innovative app development, web solutions, automation, and digital growth services.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${brunoAce.variable}`}>
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-6N95F9SH3F"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6N95F9SH3F');
            `,
          }}
        />

        {/* Open Graph / SEO Tags */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Datopia | App Development, Web Solutions, and Digital Growth"
        />
        <meta
          property="og:description"
          content="Datopia provides innovative app development, web solutions, automation, and digital growth services."
        />
        <meta property="og:url" content="https://www.datopia.co.uk" />
        <meta
          property="og:image"
          content="https://www.datopia.co.uk/assets/images/sharing-card.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Datopia | App Development, Web Solutions, and Digital Growth"
        />
        <meta
          name="twitter:description"
          content="Datopia provides innovative app development, web solutions, automation, and digital growth services."
        />
        <meta
          name="twitter:image"
          content="https://www.datopia.co.uk/assets/images/sharing-card-x.png"
        />

        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Datopia",
              url: "https://www.datopia.co.uk",
              description:
                "Datopia provides app development, web solutions, automation, and digital growth services.",
              logo: "https://www.datopia.co.uk/assets/images/datopia_logo_small.png",
              sameAs: [
                "https://www.facebook.com/DatopiaUK",
                "https://www.x.com/DatopiaUK",
                "https://www.instagram.com/DatopiaUK",
                "https://www.youtube.com/channel/@DatopiaUK",
                "https://www.pinterest.com/DatopiaUK",
                "https://www.tiktok.com/@datopiauk",
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
