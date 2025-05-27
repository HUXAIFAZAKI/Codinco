"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./Testimonials.module.css";
import { initialTestimonials } from "./data";

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    review: "",
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const gridRef = useRef();

  useEffect(() => {
    fetchReviews();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            entry.target.style.transitionDelay = `${index * 0.1}s`;
          }
        });
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(
        `.${styles.testimonialCard}`
      );
      cards.forEach((card) => observer.observe(card));
    }

    return () => observer.disconnect();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/reviews");
      const data = await response.json();
      setReviews(data.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          date: new Date().toISOString(),
          avatar: `/assets/Avatar${Math.floor(Math.random() * 10) + 1}.png`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      setSubmitSuccess(true);
      setFormData({ name: "", rating: 5, review: "" });
      fetchReviews();
    } catch (error) {
      setSubmitError("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className={styles.testimonialsContainer}>
      <div className={styles.header}>
        <span className={styles.sectionNumber}>04</span>
        <h1>Student Testimonials</h1>
        <p>
          Hear from our graduates about their transformative learning journey.
        </p>
      </div>

      <div className={styles.testimonialsGrid} ref={gridRef}>
        {initialTestimonials.map((testimonial) => (
          <div key={testimonial.id} className={styles.testimonialCard}>
            <div className={styles.testimonialImage}>
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={80}
                height={80}
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
            </div>
            <div className={styles.testimonialContent}>
              <p className={styles.testimonialText}>"{testimonial.text}"</p>
              <div className={styles.testimonialAuthor}>
                <h3>{testimonial.name}</h3>
                <span className={styles.role}>{testimonial.role}</span>
                <div className={styles.rating}>
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < testimonial.rating
                          ? styles.starFilled
                          : styles.starEmpty
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.feedbackForm}>
        <h2>Share Your Feedback</h2>
        {submitSuccess && (
          <div className={styles.successMessage}>
            Thank you for your review! It will appear after moderation.
          </div>
        )}
        {submitError && (
          <div className={styles.errorMessage}>{submitError}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="rating">Your Rating</label>
            <div className={styles.ratingInput}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`${styles.starButton} ${
                    star <= formData.rating
                      ? styles.starFilled
                      : styles.starEmpty
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, rating: star }))
                  }
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="review">Your Review</label>
            <textarea
              id="review"
              name="review"
              value={formData.review}
              onChange={handleChange}
              required
              placeholder="Share your experience with us"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>

      <Link href="/" className={styles.backLink}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Home
      </Link>
    </main>
  );
}
