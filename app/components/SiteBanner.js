"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faXTwitter,
  faInstagram,
  faYoutube,
  faPinterest,
  faTiktok,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function SiteBanner() {
  return (
    <div className="site-banner fixed-top d-flex justify-content-between align-items-center px-3 px-md-2">
      <div className="d-flex align-items-center text-white fw-bold gap-2">
        <FontAwesomeIcon icon={faLocationDot} />
        <span className="location-text">
          <span className="location-full">Plymouth, Devon and Cornwall</span>
          <span className="location-short">SW</span>
        </span>
      </div>
      <div className="d-flex align-items-center gap-3">
        <a href="#contact" aria-label="Email">
          <FontAwesomeIcon icon={faEnvelope} className="social-icon" />{" "}
        </a>
        <a
          href="https://www.facebook.com/DatopiaUK"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FontAwesomeIcon icon={faFacebook} className="social-icon" />
        </a>
        <a
          href="https://www.x.com/DatopiaUK"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <FontAwesomeIcon icon={faXTwitter} className="social-icon" />
        </a>
        <a
          href="https://www.instagram.com/DatopiaUK"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FontAwesomeIcon icon={faInstagram} className="social-icon" />
        </a>
        <a
          href="https://www.youtube.com/channel/@DatopiaUK"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
        >
          <FontAwesomeIcon icon={faYoutube} className="social-icon" />
        </a>
        <a
          href="https://www.pinterest.com/DatopiaUK"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pinterest"
        >
          <FontAwesomeIcon icon={faPinterest} className="social-icon" />
        </a>
        <a
          href="https://www.tiktok.com/@datopiauk"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
        >
          <FontAwesomeIcon icon={faTiktok} className="social-icon" />
        </a>
        <a
          href="https://www.linkedin.com/company/DatopiaUK"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
        </a>
      </div>
    </div>
  );
}
