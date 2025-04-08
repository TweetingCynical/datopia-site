"use client";
import styles from "./Hero.module.css";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const parallaxRef = useRef([]);

  const slides = [
    {
      heading: "Jewellery Repair Tracker",
      text: "Our custom-built repair tracker app made specifically for the jewellery industry.",
      cta: "See Repair Tracker",
      bg: "/images/jumbotron1.jpg",
    },
    {
      heading: "QR Code Generator",
      text: "Trackable, brand-matched QR codes for smart marketing.",
      cta: "Try Our QR Tool",
      bg: "/images/jumbotron2.jpg",
    },
    {
      heading: "Automate Your Workflow",
      text: "Custom web apps that simplify your operations.",
      cta: "Explore Services",
      bg: "/images/jumbotron1.jpg",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      parallaxRef.current.forEach((el, index) => {
        if (el) {
          el.style.transform = `translateY(${scrollY * 0.5}px)`; // Adjust intensity
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const current = slides[activeSlide];

  return (
    <section
      className={`${styles.heroSection} d-flex align-items-center justify-content-center text-end text-white`}
      style={{ minHeight: "100vh", overflow: "hidden" }}
    >
      {/* Animated Background Layers with Parallax */}
      {slides.map((slide, index) => (
        <div
          key={index}
          ref={(el) => (parallaxRef.current[index] = el)}
          className={`${styles.heroBgLayer} ${
            index === activeSlide ? styles.bgActive : ""
          }`}
        >
          <Image
            src={slide.bg}
            alt={slide.heading}
            fill
            className={`objectFitCover`}
            priority
          />
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              background:
                "linear-gradient(to right, rgba(34, 59, 104, 0.8), rgba(47, 87, 115, 0.6))",
            }}
          />
        </div>
      ))}

      {/* Foreground Content */}
      <div className="container position-relative z-2 px-3">
        <div className={`hero-content ${styles.animateFadeIn}`}>
          <h1 className="display-5 fw-bold">{current.heading}</h1>
          <p className="lead">{current.text}</p>
          <a href="#services" className="btn btnBrand btn-lg mt-3">
            {current.cta}
          </a>

          <div className="d-flex justify-content-center gap-2 mt-4">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${
                  index === activeSlide ? styles.dotActive : ""
                }`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
