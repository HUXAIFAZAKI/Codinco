"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleEnroll = () => {
    window.open("https://forms.gle/ruawZbLV62XApGsG8", "_blank");
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>CODINCO</span>
        </Link>

        <button
          className={`${styles.menuButton} ${isMenuOpen ? styles.active : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ""}`}>
          <Link href="/" className={styles.navLink}>
            <span className={styles.navLinkText}>Home</span>
            <span className={styles.navLinkGlow}></span>
          </Link>
          <button onClick={handleEnroll} className={styles.enrollButton}>
            <span className={styles.enrollText}>Enroll Now</span>
            <span className={styles.enrollGlow}></span>
            <span className={styles.enrollParticle}></span>
          </button>
          <Link href="/testimonials" className={styles.navLink}>
            <span className={styles.navLinkText}>Testimonials</span>
            <span className={styles.navLinkGlow}></span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
