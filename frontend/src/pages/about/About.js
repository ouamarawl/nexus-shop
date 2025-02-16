import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './About.css';

function About() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="about-container">
      <div className="about-header" data-aos="fade-down">
        <h1>About Nexus Shope</h1>
        <p>Your one-stop shop for quality products at unbeatable prices.</p>
      </div>
      <div className="about-content">
        <section className="about-section" data-aos="fade-up">
          <h2>Our Mission</h2>
          <p>At Nexus Shope, we strive to provide our customers with top-notch products from a variety of categories, including electronics, fashion, and home essentials. We believe in offering high-quality items at affordable prices with exceptional customer service.</p>
        </section>
        <section className="about-section" data-aos="fade-up" data-aos-delay="200">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>Wide range of products</li>
            <li>Fast and reliable shipping</li>
            <li>Secure payment methods</li>
            <li>Excellent customer support</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default About;
