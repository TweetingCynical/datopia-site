"use client";
import { useEffect, useState, useRef } from "react";
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
  const [scrollIndex, setScrollIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const scrollRef = useRef(null);
  const cardWidth = 320;

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
        className={`fa-4x ${brandClass} social-icon`}
      />
    ) : null;
  };

  const scrollLeft = () => {
    setScrollIndex((prev) => Math.max(prev - 1, 0));
  };

  const scrollRight = () => {
    const maxIndex = Math.max(posts.length - 1, 0);
    setScrollIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    checkScrollability();
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollIndex * cardWidth,
        behavior: "smooth",
      });
    }
  }, [scrollIndex]);

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, []);

  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    if (!touchStartX) return;
    const diff = touchStartX - endX;
    if (diff > 50) scrollRight();
    else if (diff < -50) scrollLeft();
    setTouchStartX(null);
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.round(scrollRef.current.scrollLeft / cardWidth);
      setScrollIndex(index);
      checkScrollability();
    }
  };

  return (
    <section id="socials" className="py-5 bg-light">
      <div className="container">
        <h2 className="mb-4 text-center">Latest Socials</h2>

        <div className="scroll-container-wrapper position-relative">
          {/* Navigation Arrows */}
          {canScrollLeft && (
            <button
              className="scroll-btn scroll-left"
              onClick={scrollLeft}
              aria-label="Scroll left"
            >
              <FontAwesomeIcon
                icon={["fas", "arrow-left"]}
                className="fa-4x text-brand5"
              />
            </button>
          )}
          {canScrollRight && (
            <button
              className="scroll-btn scroll-right"
              onClick={scrollRight}
              aria-label="Scroll right"
            >
              <FontAwesomeIcon
                icon={["fas", "arrow-right"]}
                className="fa-2x text-brand5"
              />
            </button>
          )}

          {/* Scrollable Row */}
          <div
            className="scroll-container d-flex overflow-auto gap-3 justify-content-center"
            ref={scrollRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onScroll={handleScroll}
          >
            {posts.map((post, index) => {
              const isFeatured =
                post.UseType?.toLowerCase().includes("featured");
              const link = post.QRLink?.trim() || post.PostLink;
              const imageURL = transformImageURL(post.ImageURL);

              return (
                <div
                  key={index}
                  className="flex-shrink-0 scroll-snap card-width mx-auto"
                >
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none text-dark"
                  >
                    <div
                      className={`card h-100 position-relative overflow-hidden ${
                        isFeatured ? "featured-social-card" : ""
                      }`}
                    >
                      {isFeatured && (
                        <div className="featured-label position-absolute top-0 end-0">
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
                            style={{
                              objectFit: "cover",
                              borderTopLeftRadius: "0.375rem",
                              borderTopRightRadius: "0.375rem",
                            }}
                          />
                        </div>
                      )}
                      <div className="card-body d-flex flex-column text-on-light">
                        <h5 className="card-title">{post.Title}</h5>
                        <p className="card-text">{post.TLDR}</p>
                        <div
                          className="mt-auto d-flex justify-content-end align-items-center"
                          style={{ minHeight: "30px" }}
                        >
                          <div className="px-2 py-1">
                            {getPlatformIcon(post.Platform)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>

          {/* Dots */}
          <div className="d-flex justify-content-center gap-2 mt-4">
            {posts.map((_, i) => (
              <div
                key={i}
                className={`dot ${i === scrollIndex ? "active" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
