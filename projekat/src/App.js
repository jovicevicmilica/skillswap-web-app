import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Container from './components/Container/Container';
import FeatureSection from './components/FeatureSection/FeatureSection';
import AboutSection from './components/AboutSection/AboutSection';
import FAQSection from './components/FAQSection/FAQSection';
import SkillsDirectory from './components/SkillsDirectory/SkillsDirectory';
import Testimonials from './components/Testimonials/Testimonials';
import Footer from './components/Footer/Footer';
import ScrollToTopArrow from './components/ScrollToTopArrow/ScrollToTopArrow';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy'; // Vaša komponenta za politiku privatnosti
import TermsOfUse from './components/TermsOfUse/TermsOfUse'; // Vaša komponenta za uslove korišćenja

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <ScrollToTopArrow />
        <Routes> {/*ruter za sve elemente koji su na početnoj*/}
          <Route path="/" element={
            <>
              <Container />
              <FeatureSection />
              <AboutSection />
              <FAQSection />
              <SkillsDirectory />
              <Testimonials />
            </>
          } />
          <Route path="/privacy-policy" element={<PrivacyPolicy/>}/> {/*naknadni elementi iz footera*/}
          <Route path="/terms-of-use" element={<TermsOfUse/>}/>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
