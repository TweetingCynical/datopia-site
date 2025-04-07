"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

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
      .catch((err) => console.error("Failed to load socials:", err));
  }, []);

  const getPlatformIcon = (platform) => {
    const name = platform?.toLowerCase();
    const iconClass = {
      facebook: "fab fa-facebook social-facebook",
      x: "fab fa-x-twitter social-x",
      instagram: "fab fa-instagram social-instagram",
      youtube: "fab fa-youtube social-youtube",
      linkedin: "fab fa-linkedin social-linkedin",
      pinterest: "fab fa-pinterest social-pinterest",
      tiktok: "fab fa-tiktok social-tiktok",
      google: "fab fa-google social-google",
    };

    if (name === "blog") {
      return (
        <Image
          src="/images/datopia_logo_only_small_no_bkg.png"
          alt="Blog"
          width={24}
          height={24}
          className="rounded-circle shadow"
        />
      );
    }

    return iconClass[name] ? (
      <i className={`${iconClass[name]} fa-lg shadow-sm`} />
    ) : null;
  };

  return (
    <section id="socials" className="py-5 bg-light">
      <div className="container">
        <h2 className="mb-4 text-center">Latest Socials</h2>
        <div className="row">
          {posts.map((post, index) => {
            const isFeatured = post.UseType?.toLowerCase().includes("featured");
            const link = post.QRLink?.trim() || post.PostLink;
            return (
              <div key={index} className="col-md-4 mb-4">
                <div
                  className={`card h-100 shadow-sm position-relative ${
                    isFeatured ? "featured-social-card" : ""
                  }`}
                >
                  <img
                    src={post.ImageURL}
                    className="card-img-top"
                    alt={post.Title}
                    style={{ objectFit: "cover", height: "250px" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{post.Title}</h5>
                    <p className="card-text">{post.TLDR}</p>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary btn-sm"
                      >
                        View Post
                      </a>
                      {getPlatformIcon(post.Platform)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {posts.length === 0 && (
            <div className="col-12 text-center text-muted">
              No social posts available just yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
