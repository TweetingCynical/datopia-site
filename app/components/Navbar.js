"use client";
import styles from "./Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const handleScroll = () => {
      const scrollY = window.scrollY;
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 80;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          setActiveSection(section.getAttribute("id"));
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg bg-white fixed-top ${styles.navbarBorder} ${styles.navFixedTop}`}
    >
      <div className="container-fluid">
        {/* Logo */}
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <span className="d-none d-md-block">
            <Image
              src="/images/datopia_logo_small.png"
              alt="Datopia"
              width={150}
              height={32}
              priority
            />
          </span>
          <span className="d-block d-md-none">
            <Image
              src="/images/datopia_logo_only_small.png"
              alt="Datopia"
              width={40}
              height={32}
              priority
            />
          </span>
        </Link>

        {/* Burger Menu Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className={`${styles.navbarNav} me-auto mb-2 mb-lg-0 ms-4`}>
            <li className="nav-item">
              <a
                className={`${styles.navLink} ${
                  activeSection === "products" ? styles.navActive : ""
                }`}
                href="#products"
              >
                Products
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`${styles.navLink} ${
                  activeSection === "services" ? styles.navActive : ""
                }`}
                href="#services"
              >
                Services
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`${styles.navLink} ${
                  activeSection === "socials" ? styles.navActive : ""
                }`}
                href="#socials"
              >
                Socials
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`${styles.navLink} ${
                  activeSection === "blog" ? styles.navActive : ""
                }`}
                href="#blog"
              >
                Blog
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`${styles.navLink} ${
                  activeSection === "reviews" ? styles.navActive : ""
                }`}
                href="#reviews"
              >
                Reviews
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`${styles.navLink} ${
                  activeSection === "contact" ? styles.navActive : ""
                }`}
                href="#contact"
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Login Button (desktop & mobile) */}
          <div className="d-flex align-items-center">
            <a href="#login" className={`btn me-2 btnBrandOutline`}>
              Log In
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
