"use client";
import styles from "./Socials.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import "../fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ALLOWED_PLATFORMS = [
  "x",
  "facebook",
  "youtube",
  "instagram",
  "linkedin",
  "pinterest",
  "tiktok",
  "google",
  "blog",
];

export default function Socials() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/data/socials.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data
          .filter(
            (post) =>
              post.Company === "Datopia" &&
              ["Ready", "Completed"].includes(post.Status) &&
              ALLOWED_PLATFORMS.includes(post.Platform?.toLowerCase())
          )
          .sort((a, b) => {
            const isPinnedA = a.UseType?.toLowerCase().includes("pinned")
              ? 1
              : 0;
            const isPinnedB = b.UseType?.toLowerCase().includes("pinned")
              ? 1
              : 0;
            if (isPinnedA !== isPinnedB) return isPinnedB - isPinnedA;
            return new Date(b.Posted) - new Date(a.Posted);
          });
        setPosts(filtered);
      })
      .catch((err) => console.error("Could not load socials:", err));
  }, []);

  const transformImageURL = (url) => {
    if (!url) return null;
    if (url.includes("drive.google.com")) {
      const match = url.match(/\/d\/([^/]+)\//);
      if (match && match[1]) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
      }
    }
    return url;
  };

  const getPlatformIcon = (platform) => {
    const name = platform?.toLowerCase();
    const iconMap = {
      facebook: ["fab", "facebook"],
      x: ["fab", "x-twitter"],
      twitter: ["fab", "twitter"],
      instagram: ["fab", "instagram"],
      youtube: ["fab", "youtube"],
      pinterest: ["fab", "pinterest"],
      tiktok: ["fab", "tiktok"],
      linkedin: ["fab", "linkedin"],
      google: ["fab", "google"],
    };

    const brandClass = `social-${name}`;

    if (name === "blog") {
      return (
        <Image
          src="/images/datopia_logo_only_small_no_bkg.png"
          alt="Blog"
          width={26}
          height={26}
          className="rounded-circle shadow"
        />
      );
    }

    const icon = iconMap[name];
    return icon ? (
      <FontAwesomeIcon
        icon={icon}
        className={`fa-4x ${brandClass} ${styles.socialIcon}`}
      />
    ) : null;
  };

  return (
    <section id="socials" className="py-5 bg-light">
      <div className="container">
        <h2 className="mb-4 text-center">Latest Socials</h2>

        <div className="scroll-container-wrapper overflow-hidden">
          <div className={styles.scrollArea}>
            {posts.map((post, index) => {
              const isFeatured =
                post.UseType?.toLowerCase().includes("featured");
              const link = post.QRLink?.trim() || post.PostLink;
              const imageURL = transformImageURL(post.ImageURL);

              return (
                <div key={index} className={`${styles.cardWidth} mx-auto`}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none text-dark"
                  >
                    <div
                      className={`card h-100 position-relative overflow-hidden ${
                        styles.cardHover
                      } ${isFeatured ? styles.featuredSocialCard : ""}`}
                    >
                      {isFeatured && (
                        <div
                          className={`${styles.featuredLabel} position-absolute top-0 end-0`}
                        >
                          Featured
                        </div>
                      )}
                      {imageURL && (
                        <div
                          className="position-relative w-100 overflow-hidden"
                          style={{
                            height: "250px",
                            borderTopLeftRadius: "0.375rem",
                            borderTopRightRadius: "0.375rem",
                          }}
                        >
                          <Image
                            src={imageURL}
                            alt={post.Title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{
                              objectFit: "cover",
                              borderTopLeftRadius: "0.375rem",
                              borderTopRightRadius: "0.375rem",
                            }}
                          />
                        </div>
                      )}
                      <div className="card-body d-flex flex-column text-on-light">
                        <h5 className={styles.cardTitle}>{post.Title}</h5>
                        <p className={styles.cardText}>{post.TLDR}</p>
                        <div className="mt-auto d-flex justify-content-end align-items-center">
                          {getPlatformIcon(post.Platform)}
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
