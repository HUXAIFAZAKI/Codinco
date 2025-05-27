"use client";

import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faDiscord,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faCode,
  faLaptopCode,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Footer.module.css";

export default function Footer() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(`.${styles.column}`).forEach((column) => {
      observer.observe(column);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h2 className={styles.logoText}>CODINCO</h2>
            <p className={styles.description}>
              Transform your career with our immersive Python bootcamp. Learn
              from industry experts and build real-world projects.
            </p>
            <div className={styles.socialLinks}>
              <a
                href="https://wa.me/923486824381"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
              <a
                href="https://discord.com"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faDiscord} />
              </a>
              <a
                href="https://github.com"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                href="https://linkedin.com"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>

          <div className={styles.column}>
            <h4>Quick Links</h4>
            <a href="/" className={styles.navLink}>
              Home
            </a>
            <a href="#syllabus" className={styles.navLink}>
              Syllabus
            </a>
            <a href="#payment" className={styles.navLink}>
              Payment
            </a>
          </div>

          <div className={styles.column}>
            <h4>Contact Us</h4>
            <div className={styles.contactItem}>
              <FontAwesomeIcon icon={faEnvelope} />
              <span>codinco.help@gmail.com</span>
            </div>
            <div className={styles.contactItem}>
              <FontAwesomeIcon icon={faPhone} />
              <span>+92 348 6824381</span>
            </div>
          </div>

          <div className={styles.column}>
            <h4>Our Courses</h4>
            <div className={styles.courseItem}>
              <FontAwesomeIcon icon={faCode} />
              <span>Python Bootcamp</span>
            </div>
            <div className={styles.courseItem}>
              <FontAwesomeIcon icon={faLaptopCode} />
              <span>Web Development</span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} CODINCO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
