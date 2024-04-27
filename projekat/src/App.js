import './App.css';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet, createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
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
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import HomeNav from './components/HomeNav/HomeNav';
import Home from './components/Home/Home';
import LeftPart from './components/LeftPart/LeftPart';
import RightPart from './components/RightPart/RightPart';
import Profile from './components/Profile/Profile';
import { AuthContext } from './context/authContext';

function App() {
  const {currentUser} = useContext(AuthContext);

  const Layout = () => {
    return(
      <div>
        <Helmet>
          <title>Početna stranica - SkillSwap</title>
        </Helmet>
        <HomeNav />
        <div className="full-homepage">
          <LeftPart />
          <div style={{flex: 6}}> {/*on nek zauzima najvise, u odnosu na lijevu i desnu stranu*/}
            <Outlet /> {/*za renderovanje child ruta*/}
          </div>
          <RightPart />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({children}) =>{
    if(!currentUser){ //ako nismo ulogovani, vracemo se na pocetnu, ne vidimo sakrivene stvari u layout - u
      return <Navigate to="/login" />;
    }

    return children;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element:(
        <>
          <Helmet>
            <title>Početna - SkillSwap</title>
          </Helmet>
          <ScrollToTop /> {/*vraće nas na početak svaki put kada pređemo na drugu stranicu*/}
          <NavBar />
          <ScrollToTopArrow />
          <Container/>
          {/*<FeatureSection />
          <SkillsDirectory/>
          <ScrollToTopArrow />
          <Testimonials/>
          <FAQSection />
          <Discover/>
          <Footer />*/}
        </>
      )
    },

    {
      path: "/legal",
      element:(
        <>
          <Helmet>
            <title>Pravni uslovi - SkillSwap</title>
          </Helmet>
          <ScrollToTop /> {/*vraće nas na početak svaki put kada pređemo na drugu stranicu*/}
          <NavBar />
          <ScrollToTopArrow />
          <Legal />
          <Footer />
        </>
      )
    },

    {
      path: "/privacy-policy",
      element:(
        <>
          <Helmet>
            <title>Politika Privatnosti - SkillSwap</title>
          </Helmet>
          <ScrollToTop /> {/*vraće nas na početak svaki put kada pređemo na drugu stranicu*/}
          <NavBar />
          <ScrollToTopArrow />
          <PrivacyPolicy />
          <Footer />
        </>
      )
    },

    {
      path: "/terms-of-use",
      element:(
        <>
          <Helmet>
            <title>Uslovi Korišćenja - SkillSwap</title>
          </Helmet>
          <ScrollToTop /> {/*vraće nas na početak svaki put kada pređemo na drugu stranicu*/}
          <NavBar />
          <ScrollToTopArrow />
          <TermsOfUse />
          <Footer />
        </>
      )
    },

    {
      path: "/contact",
      element:(
        <>
          <Helmet>
            <title>Kontakt - SkillSwap</title>
          </Helmet>
          <ScrollToTop /> {/*vraće nas na početak svaki put kada pređemo na drugu stranicu*/}
          <NavBar />
          <ScrollToTopArrow />
          <Contact />
          <Footer />
        </>
      )
    },

    {
      path: "/login",
      element:(
        <>
          <Helmet>
            <title>Prijavi se - SkillSwap</title>
          </Helmet>
          <ScrollToTop /> {/*vraće nas na početak svaki put kada pređemo na drugu stranicu*/}
          <NavBar />
          <ScrollToTopArrow />
          <Login />
          <Footer />
        </>
      )
    },

    {
      path: "/register",
      element:(
        <>
          <Helmet>
            <title>Registruj se - SkillSwap</title>
          </Helmet>
          <ScrollToTop /> {/*vraće nas na početak svaki put kada pređemo na drugu stranicu*/}
          <NavBar />
          <ScrollToTopArrow />
          <Register />
          <Footer />
        </>
      )
    },

    {
      path: "/home-page",
      element: (
        <ProtectedRoute><Layout /></ProtectedRoute> //ubacimo layout u protected route, jer mu se pristupa samo ako smo uspješno ulogovani
      ),
      children:[
        {
          path: "/home-page",
          element: <Home />
        },
        {
          path: "/home-page/profile/:id",
          element: <Profile />
        },
      ]
    }

  ]);

  return (
    <RouterProvider router={router} /> 
  );
}

export default App;
