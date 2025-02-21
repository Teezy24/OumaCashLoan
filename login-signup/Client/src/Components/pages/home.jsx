import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./styles/home.css";
import "./styles/aboutus.css";
import "./styles/explore.css";
import "./styles/footer.css";
import "./styles/security.css";
import "./styles/services.css";
import "./styles/testimonials.css";
import "./styles/whyus.css";
import { FaWallet, FaCreditCard, FaChartLine, FaFileArchive,
         FaCheckCircle, FaBriefcase, FaGlobe, FaHandHoldingUsd, FaClipboardList, 
         FaCloudsmith,FaStar,FaQuoteRight,
         FaVideo,FaFacebook,FaInstagram,FaTwitter,FaLinkedin} from 'react-icons/fa';
import { MdArrowOutward } from "react-icons/md";
import man from '../Assets/person.avif';
import woman from '../Assets/woman.png';
import Bank from '../Assets/Bank.png';
import IGIG from '../Assets/IGIG.png';

function Home() {
    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
    };
    return (
        <div className="app">
            <header className="header">
                <div className="header-content">
                    <div className="logo">
                        <img src="../assets/1.png" alt="Ouma Cash Loans" /> 
                    </div>
                    <nav className="nav">
                        <a href="#">Home</a>
                        <a href="#our-section">Blog</a>
                        <a href="#our-services">Services</a>
                        <a href="#about-us">About Us</a>
                        <a href="#contact-us">Contact Us</a>
                    </nav>
                    <div className="button-container">
                    <button
                        className="get-started-btn"
                        onClick={() => navigate("/signup")}
                    >
                        SIGN UP
                    </button>

                    <button
                        className="login-started-btn"
                        onClick={() => navigate("/login")}
                    >
                        LOGIN
                    </button>
                    </div>
                </div>
            </header>

            <main className="main">
                <div className="main-content">
                    <div className="welcome-text">
                        <div className="display-horizontal">
                        <img src="../assets/2.png" alt="Ouma Cash Loans" /> 
                        <p>Welcome to Ouma Cash Loans</p>
                        </div>
                        <h1>Seamless</h1>
                        <h1>Loans, Brighter</h1>
                        <h1>Futures</h1>
                        <button
                        className="get-started-btn-main"
                        
                    >
                        GET STARTED
                    </button>
                    </div>
                    <div className="building-icon">
                    <img src={Bank} alt="Bank" />
                    </div>
                </div>
            </main>

            <App />
            <OurServices />
            <AboutUs />
            <WhyUs />
            <SecurityAndPrivacy />
            <Testimonials />
            <Footer />
        </div>
    );
}

function App() {
    const navigate = useNavigate();
    return (
        <section id="our-section" className="our-section">
        <div className="explore-section">
            <div className="explore-content">
                  <div className="outside-container">
                    <div className="horizontal-layout">
                        <div className="image-side">
                            <img src={man} alt="Person" />
                        </div>
                        <div className="text-side">
                        <button
                        className="explore-button"
                        onClick={() => navigate("/signup")}
                    >
                        Explore 
                    </button>
                            <div className="explore-main-text">
                                <h2>A New Way to Fund Your</h2>
                                <h2>Dreams-Join Thousands</h2>
                                <h2>Discovering Ouma Cash</h2>
                                <h2>Loans Today!</h2>
                            </div>
                            <div className="active-users">
                                <p>Over 100+ active users</p>
                            </div>
                        </div>
                     </div>
                    </div>
                <div className="loan-container">
                    <div className="loan-options">
                        <div className="loan-option">
                            <FaWallet size={26} />
                            <h3 className="headings">Personal Loans</h3>
                            <p>Flexible funding for life's big moments.</p>
                        </div>
                        <div className="loan-option">
                            <FaCreditCard size={26} />
                            <h3 className="headings">Credit Card</h3>
                            <p>Smart spending with rewards and benefits.</p>
                        </div>
                        <div className="loan-option">
                            <FaChartLine size={26} />
                            <h3 className="headings">Home Equity</h3>
                            <p>Unlock the value in your home for extra cash.</p>
                        </div>
                        <div className="loan-option">
                            <FaFileArchive size={26} />
                            <h3 className="headings">Investments & IRAS</h3>
                            <p>Secure your future with tailored investment options.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
    );
}

function OurServices() {
    const navigate = useNavigate();
    return (
        <section id="our-services" className="our-services">
        <div className="our-services-section">
            <div className="our-services-content">
                <div className="our-services-header">
                    <div className="display-horizontal">
                    <img className="image-logo" src="../assets/2.png" alt="Ouma Cash Loans" /> 
                    <p>OUR SERVICES</p>
                    </div>
                    <h1>Discover How Ouma<br />Cash Loans Supports<br />Your Financial Goals</h1>
                    <div className="right-side">
                    <p className="sub-header">Simpler loans, smarter<br />solutions—tailored for you.</p>
                    <button
                        className="see-all-services"
                        onClick={() => navigate("/signup")}
                    >
                        SEE ALL SERVICES
                    </button>
                    </div>
                </div>
                <div className="service-cards">
                    <div className="service-card">
                    <div className="card-icon">
                      <FaBriefcase size={38}  />
                      </div>
                        <h3>Business Loan</h3>
                        <p>Empower your business with financial support designed to meet its unique challenges and opportunities.
                          Whether you're expanding, upgrading equipment, or managing cash flow, we've got you covered.
                        </p>
                    </div>
                    <div className="service-card">
                    <div className="card-icon">
                    <FaWallet size={26} />
                    </div>
                        <h3>Personal Loan</h3>
                        <p>Achieve your personal dreams with ease. From unexpected expenses to life's special moments, our personal loans offer flexbility and convenience.</p>
                    </div>
                    <div className="service-card">
                    <div className="card-icon">
                    <FaGlobe size={28}  />
                    </div>
                        <h3>Online Loan</h3>
                        <p>Enjoy fast, secure, and hassle-free access to funds. Apply online from the comfort of your home with, quick approvals and seemless processing.</p>
                    </div>
                    <div className="service-card">
                      <div className="card-icon">
                    <FaCloudsmith size={26}/>
                    </div>
                        <h3>Customized Loan</h3>
                        <p>Get a loan tailored to your specific needs and preferences. From flexible repayments terms to personalized amounts, we ensure the sollution fits your financial status.</p>
                    </div>
                    <div className="service-card">
                    <div className="card-icon">
                    <FaHandHoldingUsd size={28}  />
                    </div>
                        <h3>Financial Planning</h3>
                        <p>Secure your future with expert financial advice. From budgeting to long-term investments, we need help you create a plan that aligns with your goals and aspirations .</p>
                    </div>
                    <div className="service-card">
                    <div className="card-icon">
                    <FaClipboardList size={28}  />
                    </div>
                        <h3>Consultation</h3>
                        <p>Our experts are here to guide you through your finacial journey. Get personaliz advice and insights to make informed decisions about loans, investments, and more.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
}

function AboutUs() {
    const navigate = useNavigate();
    return (
        <section id="about-us" className="about-us">
            <div className="about-content">
                <div className="left-container"> 
                    <div className="about-text">

                        <div className="display-horizontal">
                    <img className="image-logo" src="../assets/2.png" alt="Ouma Cash Loans" /> 
                        <h4>ABOUT US</h4>
                        </div>
                        <div className="text-blocks">
                          <h1>
                            <p>Fresh Perspectives,<br />Real Opportunities</p>
                            </h1>
                            <p>At Ouma Cash Loans, we make borrowing<br />simple, accessible, and empowering,<br />redefining dreams with innovation and<br />support.</p>
                        </div>
                        <div className="powered-by">
                            <p>Powered by IGIG Technologies:</p>
                            <div className="igig-logo">
                                <img src={IGIG} alt="IGIG Technologies Logo" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-container"> 
                    <div className="features-container">
                    <img src={woman} alt="Person" />
                        <div className="features-heading">
                            <h2>Simple Loans, Big Possibilities</h2>
                        </div>
                        <div className="about-features">
                          <div className="feature">
                              <div className="feature-icon"> <FaCheckCircle /> </div>
                              <h6>Fast Access Anywhere</h6>
                          </div>
                          <div className="feature">
                              <div className="feature-icon"> <FaCheckCircle /> </div>
                              <h6>Save Time, Stress-Free</h6>
                          </div>
                      </div>
                    </div>
                    <div className="bottom-section">
                        <div className="bottom-text">
                            <p>Start your journey with ease today and take the first<br />step toward achieving your financial goals!</p>
                        </div>
                        <button
                        className="check-rate-button"
                        onClick={() => navigate("/signup")}
                    >
                        CHECK YOUR RATE
                    </button>
                    </div>
                </div>
            </div>
        </section>
    );
}


function WhyUs() {
    const navigate = useNavigate();
  return (
      <section className="why-us-section">
          <div className="why-us-content">
              <div className="top-content">
                  <div className="left-side">
                  <div className="display-horizontal">
                  <img className="image-logo" src="../assets/2.png" alt="Ouma Cash Loans" /> 
                      <p className="why-us-title">WHY US</p>
                      </div>
                      <h1 className="heading">The Ouma Cash Loans<br />Advantage</h1>
                      <p className="sub-heading">Empowering you with innovative financial<br />solutions and unmatched service.</p>
                  </div>
                  <button
                        className="learn-more-button"
                        onClick={() => navigate("/signup")}
                    >
                        LEARN MORE
                    </button>
              </div>

              <div className="bottom-content">
                  <div className="rating-card">
                      <div className="rating">
                          <h1>4.7<span className="out-of">/5</span></h1>
                          <div className="stars">
                              <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                          </div>
                      </div>
                      <div className="user-info">
                          <p>Mr. Immanuel Kandjabanga</p>
                          <p className="sub-header">Project Coordinator</p>
                      </div>
                  </div>

                  <div className="features-list">
                      <div className="feature-item">
                          <span className="feature-number">1</span>
                          <p>Flexible Loan Options</p>
                          <MdArrowOutward className="arrow-icon" />
                      </div>
                      <div className="feature-item">
                          <span className="feature-number">2</span>
                          <p>Transparent, Competitive Rates</p>
                          <MdArrowOutward className="arrow-icon" />
                      </div>
                      <div className="feature-item"> 
                          <span className="feature-number">3</span>
                          <p>Seamless Online Process</p>
                          <MdArrowOutward className="arrow-icon" />
                      </div>
                      <div className="feature-item">
                          <span className="feature-number">4</span>
                          <p>Dedicated to Financial Growth</p>
                          <MdArrowOutward className="arrow-icon" />
                      </div>
                  </div>
              </div>
          </div>
      </section>
  );
}
function SecurityAndPrivacy() {
    return (
        <section className="security-privacy">
            <div className="security-content">
                <div className="top-section">
                <div className="display-horizontal">
                <img className="image-logo" src="../assets/2.png" alt="Ouma Cash Loans" /> 
                    <p className="section-title-1">Security and Privacy</p>
                    </div>
                </div>
                <div className="main-content">
                    <div className="left-side">
                        <h1 className="heading">Your Safety,<br />Our Priority</h1>
                    </div>
                        <p>We prioritize your security with<br />robust systems to protect your data<br />and ensure safe transactions at every<br />step.</p>
                        <MdArrowOutward className="arrow-icon" />
                </div>
                <div className="video-placeholder">
                    <div className="video-icon">
                      <FaVideo />
                        
                    </div>
                </div>
            </div>
        </section>
    );
}


function Testimonials() {
    const navigate = useNavigate();
    const [hoveredIndex, setHoveredIndex] = useState(null);
  const testimonials = [
      {
          rating: '4.8/5',
          text: 'Ouma Cash Loans made the loan process so smooth and easy. Highly recommend!',
          author: 'Amina Mwale',
          title: 'Marketing Specialist',
          bgColor: '#e9ecef'
      },
      {
          rating: '4.6/5',
          text: 'I found the perfect loan for my business. Thanks, Ouma Cash Loans!',
          author: 'Ernest Somseb',
          title: 'Entrepreneur',
          bgColor: '#e9ecef'
      },
      {
          rating: '4.8/5',
          text: 'Quick approval, great support. Ouma Cash Loans exceeded my expectations.',
          author: 'Jullius Pepe Onzima',
          title: 'IT Consultant',
          bgColor: '#e9ecef'
      },
      {
          rating: '4.6/5',
          text: 'Quick approval, great support. Ouma Cash Loans exceeded my expectations.',
          author: 'Kerel Van Streep',
          title: 'Financial Analyst',
          bgColor: '#e9ecef'
      },
  ];

  return (
    
    <section className="testimonials-section">
        <div className="testimonials-content">
            <div className="left-content"> 
                <div className="testimonials-header">
                <div className="display-horizontal">
                <img className="image-logo" src="../assets/2.png" alt="Ouma Cash Loans" /> 
                    <p className="section-title">Reviews</p>
                    </div>
                    <h1>What People Are<br />Saying</h1>
                    <p>Hear from our clients about their<br />experiences and how Loantema has<br />helped them achieve their financial<br />goals.</p>
                    <button
                        className="see-all-button"
                        onClick={() => navigate("/")}
                    >
                        SEE ALL
                    </button>
                </div>
            </div>
            <div className="right-content"> 
                <div className="testimonials-grid">
                {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="testimonial-card"
                                style={{
                                    backgroundColor:
                                        hoveredIndex === index ? "#28348a" : testimonial.bgColor,
                                    color: hoveredIndex === index ? "white" : "black",
                                    transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                            <div className="rating-quote">
                                <span className="rating">{testimonial.rating}</span>
                                <FaQuoteRight className="quote-icon" />
                            </div>
                            <p className="testimonial-text">{testimonial.text}</p>
                            <div className="testimonial-author">
                                <p className="author-name">{testimonial.author}</p>
                                <p className="author-title">{testimonial.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);
}

function Footer() {
    const navigate = useNavigate();
  return (
    <section id="contact-us" className="contact-us">
      <footer className="footer">
          <div className="footer-content">
              <div className="footer-section">
                  <h3 className="headings-1">Ouma Cash Loans</h3>
                  <p>Empowering financial dreams, one loan at a time. At Ouma Cash Loans, we are committed to providing secure, reliable, and accessible financial solutions to help you achieve your goals with confidence and ease.</p>
                  <hr className="under-border-1"/>
                  <p className="copyright">Copyright © 2024 Ouma Cash Loans</p>
              </div>
              <div className="footer-section">
                  <h3 className="headings-1">Our Links</h3>
                  <ul>
                      <li><a href="#">Home</a></li>
                      <li><a href="#">About Us</a></li>
                      <li><a href="#">Courses</a></li>
                      <li><a href="#">Programs</a></li>
                      <li><a href="#">Blog</a></li>
                  </ul>
                  <hr className="under-border-2"/>
              </div>
              <div className="footer-section contact">
                  <h3 className="headings-1">Contact Us</h3>
                  <p>Our Support and Sales team is here for you 24/7 to answer your queries.</p>
                  <p>13 Jackson Kaujeua St, Windhoek, Namibia</p>
                  <p>+204 (01) 123-4567</p>
                  <hr className="under-border-3"/>
              </div>
              <div className="footer-section newsletter">
                  <h3 className="headings-1">Subscribe To Our Newsletter</h3>
                  <p>Subscribe for tips, updates, and exclusive offers</p>
                  <div className="newsletter-form">
                      <input type="email" placeholder="Enter Email" />
                      <button
                        onClick={() => navigate("/signup")}
                    >
                        SUBSCRIBE
                    </button>
                  </div>
                  <hr className="under-border-4"/>
                  <div className="social-icons">
                      <a href="#"><FaFacebook /></a>
                      <a href="#"><FaInstagram /></a>
                      <a href="#"><FaLinkedin /></a>
                      <a href="#"><FaTwitter /></a>
                  </div>
              </div>
          </div>
      </footer>
      </section>
  );
}
export default Home;
