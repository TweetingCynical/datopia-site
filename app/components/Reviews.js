"use client";
import styles from "./Reviews.module.css";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Reviews() {
  const [allReviews, setAllReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState([]);
  const [average, setAverage] = useState(null);
  const [total, setTotal] = useState(null);
  const loaderRef = useRef(null);
  const CHUNK_SIZE = 6;

  useEffect(() => {
    fetch("/data/reviews.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.reviews?.filter((r) => r.rating >= 4) || [];
        const sorted = [...filtered].sort((a, b) => {
          if (b.rating === a.rating) {
            return (b.time || 0) - (a.time || 0);
          }
          return b.rating - a.rating;
        });

        setAllReviews(sorted);
        setVisibleReviews(sorted.slice(0, CHUNK_SIZE));
        setAverage(parseFloat(data.average_rating || "0"));
        setTotal(sorted.length);
      });
  }, []);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleReviews((prev) => {
            const nextChunk = allReviews.slice(
              prev.length,
              prev.length + CHUNK_SIZE
            );
            return [...prev, ...nextChunk];
          });
        }
      },
      { threshold: 1.0 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [allReviews]);

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const formatDateAgo = (unixTime) => {
    if (!unixTime) return "";
    const diff = Math.floor((Date.now() - unixTime * 1000) / 1000);
    if (diff < 60) return "Just now";
    const mins = Math.floor(diff / 60);
    if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
    const years = Math.floor(months / 12);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  };

  const isNewReview = (unixTime) => {
    if (!unixTime) return false;
    const oneMonth = 30 * 24 * 60 * 60 * 1000;
    return Date.now() - unixTime * 1000 < oneMonth;
  };

  return (
    <motion.section
      id="reviews"
      className="py-5 bg-white"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="container">
        <h2 className="text-center mb-5">What People Are Saying</h2>
        <div className={styles.scrollWrapper}>
          <div className={styles.gridWrap}>
            {/* Badge block */}
            <a
              href="https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.gridItem} ${styles.badgeCard} btn btn-brand-outline text-center text-decoration-none text-dark d-flex flex-column justify-content-center align-items-center`}
            >
              <div
                className={`d-flex justify-content-center align-items-center gap-2 mb-3`}
              >
                <Image
                  src="/images/datopia_logo_only_small.png"
                  alt="Datopia"
                  width={50}
                  height={40}
                />
                <Image
                  src="/images/google_g_logo.png"
                  alt="Google"
                  width={50}
                  height={50}
                />
              </div>
              <h4 className="mb-1 text-on-light">⭐ {average} / 5</h4>
              <p className="mb-2 text-on-light">from {total} reviews</p>
              <small className="fw-bold text-accent text-on-light">
                Leave a Review
              </small>
            </a>

            {/* Review cards */}
            {visibleReviews.map((r, i) => (
              <div
                key={i}
                className={`${styles.gridItem} ${styles.reviewCard}`}
              >
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div className="d-flex align-items-center gap-3">
                    <div className={styles.initialsCircle}>
                      {getInitials(r.author_name)}
                    </div>
                    <div>
                      <strong>{r.author_name}</strong>
                      <div
                        className="text-muted"
                        style={{ fontSize: "0.85rem" }}
                      >
                        {formatDateAgo(r.time)}
                        {isNewReview(r.time) && (
                          <span className={`ms-2 badge ${styles.newBadge}`}>
                            New
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <p className="mb-0">{"⭐".repeat(r.rating)}</p>
                  </div>
                </div>
                <p className="mb-0">{r.text}</p>
                {r.original_author_response && (
                  <div className={styles.responseBox}>
                    <strong>Response:</strong> {r.original_author_response}
                  </div>
                )}
              </div>
            ))}

            {/* Trigger for infinite scroll */}
            {visibleReviews.length < allReviews.length && (
              <div ref={loaderRef} className="text-center py-4 text-muted">
                Loading more reviews...
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
