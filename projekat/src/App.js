import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavBar from './components/NavBar/NavBar';
import Container from './components/Container/Container';
import FeatureSection from './components/FeatureSection/FeatureSection';
import AboutSection from './components/AboutSection/AboutSection';
import FAQSection from './components/FAQSection/FAQSection';
import SkillsDirectory from './components/SkillsDirectory/SkillsDirectory';
import Testimonials from './components/Testimonials/Testimonials';
import Footer from './components/Footer/Footer';
import ScrollToTopArrow from './components/ScrollToTopArrow/ScrollToTopArrow';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse/TermsOfUse'; 
import Contact from './components/Contact/Contact';
import linija1 from './images/linija1.png';
import linija2 from './images/linija2.png';
import linija3 from './images/linija3.png';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <ScrollToTopArrow />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Helmet>
                  <title>Početna - SkillSwap</title>
                </Helmet>
                <Container />
                <FeatureSection />
                <img src={linija1} className="linija1" alt="Decorative line" />
                <AboutSection />
                <FAQSection />
                <SkillsDirectory />
                <img src={linija2} className="linija2" alt="Decorative line" />
                <div className="testimonials-and-footer">
                  <Testimonials />
                  <img src={linija3} className="linija3" alt="Decorative line" />
                </div>
              </>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <>
                <Helmet>
                  <title>Politika privatnosti - SkillSwap</title>
                </Helmet>
                <PrivacyPolicy />
              </>
            }
          />
          <Route
            path="/terms-of-use"
            element={
              <>
                <Helmet>
                  <title>Uslovi korišćenja - SkillSwap</title>
                </Helmet>
                <TermsOfUse />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Helmet>
                  <title>Kontakt - SkillSwap</title>
                </Helmet>
                <Contact />
              </>
            }
          />
        </Routes>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
