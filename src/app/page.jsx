"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const syllabus = [
  {
    week: "Week 1",
    title: "Python Fundamentals",
    description: "Learn the basics of Python programming.",
    topics: ["Variables", "Data Types", "Control Flow"],
    project: "Simple Calculator",
  },
  {
    week: "Week 2",
    title: "Data Structures",
    description: "Explore lists, dictionaries, and sets.",
    topics: ["Lists", "Dictionaries", "Sets"],
    project: "To-Do List App",
  },
  {
    week: "Week 3",
    title: "Functions & Modules",
    description: "Master functions and modular code.",
    topics: ["Functions", "Modules", "Packages"],
    project: "Password Generator",
  },
  {
    week: "Week 4",
    title: "Object-Oriented Programming",
    description: "Understand classes and objects.",
    topics: ["Classes", "Inheritance", "Polymorphism"],
    project: "Bank Account System",
  },
  {
    week: "Week 5",
    title: "File Handling & APIs",
    description: "Work with files and external APIs.",
    topics: ["File I/O", "JSON", "REST APIs"],
    project: "Weather App",
  },
  {
    week: "Week 6",
    title: "Data Analysis",
    description: "Analyze data with pandas and numpy.",
    topics: ["Pandas", "Numpy", "Data Visualization"],
    project: "Sales Dashboard",
  },
  {
    week: "Week 7",
    title: "Web Development Basics",
    description: "Build web apps with Flask.",
    topics: ["Flask", "HTML/CSS", "Routing"],
    project: "Blog Website",
  },
  {
    week: "Week 8",
    title: "Advanced Web Development",
    description: "Enhance apps with databases.",
    topics: ["SQL", "ORM", "Authentication"],
    project: "E-Commerce Platform",
  },
  {
    week: "Week 9",
    title: "Capstone Project",
    description: "Apply all skills in a final project.",
    topics: ["Project Planning", "Development", "Presentation"],
    project: "Custom Web App",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalSlides = syllabus.length;
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleEnroll = () => {
    window.open("https://forms.gle/ruawZbLV62XApGsG8", "_blank");
  };
  const handleSlideChange = (direction) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => {
      if (direction === "next") {
        return prev + 1;
      } else {
        return prev - 1;
      }
    });
  };
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        if (currentSlide >= totalSlides) {
          setCurrentSlide(0);
        } else if (currentSlide < 0) {
          setCurrentSlide(totalSlides - 1);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, isTransitioning, totalSlides]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  const getCardsPerView = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 992) return 2;
    return 3;
  };

  const cardsPerView = getCardsPerView();

  return (
    <main>
      <section className={`${styles.heroSection}`}>
        <div className={styles.heroBackground}></div>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              CODINCO <span className={styles.highlight}>Python Bootcamp</span>
            </h1>
            <p className={styles.subheading}>
              Transform your career with our immersive Python bootcamp. Learn
              from industry experts, build real-world projects, and join a
              thriving tech community.
            </p>
            <div className={styles.heroCta}>
              <button className={styles.enrollButton} onClick={handleEnroll}>
                Enroll Now
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
              <a href="#syllabus" className={styles.detailsButton}>
                Explore Syllabus
              </a>
            </div>
            <div className={styles.priceTag}>
              <div className={styles.priceBadge}>
                <h3>Rs. 2,500</h3>
                <p>Monthly Fee</p>
              </div>
              <p className={styles.duration}>
                Complete Course Duration: 3 Months
              </p>
            </div>
            <div className={styles.countdown}>
              <p>
                Next Cohort Starts: <span>June 7, 2025</span>
              </p>
            </div>
          </div>
          <div className={styles.heroImageContainer}>
            <div className={styles.codeMockup}>
              <div className={styles.mockupHeader}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
              <pre className={styles.codeSnippet}>
                <code>
                  def welcome_to_codinco():
                  <br />
                    print("Master Python with CODINCO!")
                  <br />
                    return "Start Coding Now!"
                  <br />
                  <br />
                  welcome_to_codinco()
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.scheduleSection}>
        <div className={styles.container}>
          <h3 className={styles.sectionNumber}>01</h3>
          <h2>Course Schedule</h2>
          <div className={styles.scheduleGrid}>
            <div className={styles.scheduleItem}>
              <i className="fa-regular fa-calendar"></i>
              <h4>Duration</h4>
              <p>3 Months</p>
            </div>
            <div className={styles.scheduleItem}>
              <i className="fa-regular fa-clock"></i>
              <h4>Schedule</h4>
              <p>Saturday & Sunday</p>
            </div>
            <div className={styles.scheduleItem}>
              <i className="fa-regular fa-hourglass-half"></i>
              <h4>Time</h4>
              <p>9:00 PM – 10:30 PM</p>
            </div>
            <div className={styles.scheduleItem}>
              <i className="fa-solid fa-laptop"></i>
              <h4>Mode</h4>
              <p>Online + GitHub + Google Colab</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.toolsSection}>
        <div className={styles.container}>
          <h3 className={styles.sectionNumber}>02</h3>
          <h2>Tools Required</h2>
          <div className={styles.toolsGrid}>
            <div className={styles.tool}>
              <i className="fa-brands fa-google"></i>
              <h4>Google Colab</h4>
              <p>Cloud-based coding platform</p>
            </div>
            <div className={styles.tool}>
              <i className="fa-solid fa-code"></i>
              <h4>VS Code</h4>
              <p>Local development environment</p>
            </div>
            <div className={styles.tool}>
              <i className="fa-brands fa-github"></i>
              <h4>GitHub</h4>
              <p>Code storage & collaboration</p>
            </div>
            <div className={styles.tool}>
              <i className="fa-brands fa-discord"></i>
              <h4>Discord/WhatsApp</h4>
              <p>Community support & updates</p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="syllabus"
        className={`${styles.syllabusSection} ${
          isVisible ? styles.visible : ""
        }`}
        ref={sectionRef}
      >
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>03</span>
            <h2>Course Syllabus</h2>
          </div>
          <div className={styles.sliderContainer}>
            <button
              className={styles.sliderButton}
              onClick={() => handleSlideChange("prev")}
              aria-label="Previous Slide"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div className={styles.slider}>
              <div
                className={styles.sliderTrack}
                style={{
                  transform: `translateX(-${
                    (currentSlide % totalSlides) * (100 / cardsPerView)
                  }%)`,
                  transition: isTransitioning ? "transform 0.5s ease" : "none",
                }}
              >
                {syllabus.slice(-cardsPerView).map((item, index) => (
                  <div key={`prev-${index}`} className={styles.week}>
                    <h4>{item.week}</h4>
                    <h5>{item.title}</h5>
                    <p className={styles.weekDescription}>{item.description}</p>
                    <ul>
                      {item.topics.map((topic, i) => (
                        <li key={i}>{topic}</li>
                      ))}
                    </ul>
                    <p className={styles.project}>
                      <strong>Project:</strong> {item.project}
                    </p>
                  </div>
                ))}
                {/* Main cards */}
                {syllabus.map((item, index) => (
                  <div key={index} className={styles.week}>
                    <h4>{item.week}</h4>
                    <h5>{item.title}</h5>
                    <p className={styles.weekDescription}>{item.description}</p>
                    <ul>
                      {item.topics.map((topic, i) => (
                        <li key={i}>{topic}</li>
                      ))}
                    </ul>
                    <p className={styles.project}>
                      <strong>Project:</strong> {item.project}
                    </p>
                  </div>
                ))}
                {syllabus.slice(0, cardsPerView).map((item, index) => (
                  <div key={`next-${index}`} className={styles.week}>
                    <h4>{item.week}</h4>
                    <h5>{item.title}</h5>
                    <p className={styles.weekDescription}>{item.description}</p>
                    <ul>
                      {item.topics.map((topic, i) => (
                        <li key={i}>{topic}</li>
                      ))}
                    </ul>
                    <p className={styles.project}>
                      <strong>Project:</strong> {item.project}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <button
              className={styles.sliderButton}
              onClick={() => handleSlideChange("next")}
              aria-label="Next Slide"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </section>

      <section className={styles.paymentSection}>
        <div className={styles.container}>
          <h3 className={styles.sectionNumber}>05</h3>
          <h2>Payment Details</h2>
          <div className={styles.paymentInfo}>
            <div className={styles.paymentMethod}>
              <i className="fa-solid fa-mobile-alt"></i>
              <h4>EasyPaisa</h4>
              <p>Send payment to:</p>
              <h3>+92 348 6824381</h3>
              <p className={styles.note}>
                After payment, please fill the enrollment form
              </p>
              <p className={styles.feeNote}>Course Fee: Rs. 2,500 per month</p>
              <p className={styles.feeNote}>Total Duration: 3 Months</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
