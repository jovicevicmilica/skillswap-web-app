import './App.css';
import React from 'react';
import NavBar from './components/NavBar/NavBar';
import Container from './components/Container/Container';
import FeatureSection from './components/FeatureSection/FeatureSection';
import AboutSection from './components/AboutSection/AboutSection';
import FAQSection from './components/FAQSection/FAQSection';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Container/>
      <FeatureSection/>
      <AboutSection/>
      <FAQSection/>
  </div>
  );
}

export default App;
