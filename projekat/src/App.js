import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavBar from './components/NavBar/NavBar';
import Container from './components/Container/Container';
import FeatureSection from './components/FeatureSection/FeatureSection';
import FAQSection from './components/FAQSection/FAQSection';
import SkillsDirectory from './components/SkillsDirectory/SkillsDirectory';
import Testimonials from './components/Testimonials/Testimonials';
import Footer from './components/Footer/Footer';
import ScrollToTopArrow from './components/ScrollToTopArrow/ScrollToTopArrow';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse/TermsOfUse'; 
import Contact from './components/Contact/Contact';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Discover from './components/Discover/Discover';
import Legal from './components/Legal/Legal';

function App() {
  return (
    <Router>
      <ScrollToTop /> {/*vraće nas na početak svaki put kada pređemo na drugu stranicu*/}
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
                <Container/>
                <FeatureSection />
                <SkillsDirectory/>
                <ScrollToTopArrow />
                <Testimonials/>
                <FAQSection />
                <Discover/>
              </>
            }/>
          <Route 
            path="/legal" 
            element={
              <>
                <Helmet>
                  <title>Pravni uslovi - SkillSwap</title>
                </Helmet>
                <Legal />
              </>
            }/>
            <Route 
            path="/privacy-policy" 
            element={
              <>
                <Helmet>
                  <title>Politika Privatnosti - SkillSwap</title>
                </Helmet>
                <PrivacyPolicy />
              </>
            }/>
            <Route 
            path="/terms-of-use" 
            element={
              <>
                <Helmet>
                  <title>Uslovi Korišćenja - SkillSwap</title>
                </Helmet>
                <TermsOfUse />
              </>
            }/>
            <Route 
            path="/contact" 
            element={
              <>
                <Helmet>
                  <title>Kontakt - SkillSwap</title>
                </Helmet>
                <Contact />
              </>
            }/>
        </Routes>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
