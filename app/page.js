import SiteBanner from "./components/SiteBanner";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import ServiceDetails from "./components/ServiceDetails";

import Image from "next/image";
// import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <SiteBanner />
      <Navbar />
      <Hero />
      <Services />
      <ServiceDetails />
      <main className={"container pt-5 mt-5 text-center"}>
        <Image
          src="/images/datopia_logo_small.png"
          alt="Datopia Logo"
          width={470}
          height={100}
          priority
        />
        <h1 className="mt-4">Welcome to Datopia</h1>
        <p>App development, web solutions, and automation made simple.</p>
      </main>
      <footer>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </>
  );
}
