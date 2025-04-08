"use client";
import styles from "./SiteBanner.module.css";
import "../fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SiteBanner() {
  const socialLinks = [
    {
      href: "#contact",
      label: "Email",
      icon: ["fas", "envelope"], // solid
    },
    {
      href: "https://www.facebook.com/DatopiaUK",
      label: "Facebook",
      icon: ["fab", "facebook"],
    },
    {
      href: "https://www.x.com/DatopiaUK",
      label: "X",
      icon: ["fab", "x-twitter"],
    },
    {
      href: "https://www.instagram.com/DatopiaUK",
      label: "Instagram",
      icon: ["fab", "instagram"],
    },
    {
      href: "https://www.youtube.com/channel/@DatopiaUK",
      label: "YouTube",
      icon: ["fab", "youtube"],
    },
    {
      href: "https://www.pinterest.com/DatopiaUK",
      label: "Pinterest",
      icon: ["fab", "pinterest"],
    },
    {
      href: "https://www.tiktok.com/@datopiauk",
      label: "TikTok",
      icon: ["fab", "tiktok"],
    },
    {
      href: "https://www.linkedin.com/company/DatopiaUK",
      label: "LinkedIn",
      icon: ["fab", "linkedin"],
    },
  ];

  return (
    <div
      className={`${styles.siteBanner} fixed-top d-flex justify-content-between align-items-center px-3 px-md-2`}
    >
      <div className="d-flex align-items-center text-white fw-bold gap-2">
        <FontAwesomeIcon icon={["fas", "location-dot"]} />
        <span className="location-text">
          <span className={styles.locationFull}>
            Plymouth, and Devon & Cornwall
          </span>
          <span className={styles.locationShort}>SW</span>
        </span>
      </div>

      <div className="d-flex align-items-center gap-3">
        {socialLinks.map(({ href, label, icon }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            <FontAwesomeIcon icon={icon} className={styles.socialIcon} />
          </a>
        ))}
      </div>
    </div>
  );
}
