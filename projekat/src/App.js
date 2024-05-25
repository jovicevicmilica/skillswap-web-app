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
import FriendsList from './components/FriendsList/FriendsList';
import { AuthContext } from './context/authContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminPage from './components/AdminPage/AdminPage';
import AdminNav from "./components/AdminNav/AdminNav";
import AdminUsers from './components/AdminUsers/AdminUsers';
import AdminPosts from './components/AdminPosts/AdminPosts';
import 'react-toastify/dist/ReactToastify.css';
import ExchangeList from './components/ExchangeList/ExchangeList';
import Gallery from './components/Gallery/Gallery';
import Requests from './components/Requests/Requests';
import Messages from './components/Messages/Messages';

function App() {
  const {currentUser} = useContext(AuthContext);

  const queryClient = new QueryClient();

  const Layout = () => {
    return(
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    );
  };

  const AdminLayout = () => {
    return(
      <QueryClientProvider client={queryClient}>
        <div>
          <Helmet>
            <title>Admin stranica - SkillSwap</title>
          </Helmet>
          <AdminNav />
          <div className="full-adminpage">
            <Outlet />
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({children}) => {
    if(!currentUser || currentUser.email === "skillswap24@gmail.com"){ //ako nismo ulogovani, vracemo se na početnu, ne vidimo sakrivene stvari u layout - u, ili ako smo admin! jer adminu to ne treba, ali može se maći
      return <Navigate to="/login" />;
    }

    return children;
  }

  const AdminRoute = ({children}) => {
    if (!currentUser || currentUser.email !== "skillswap24@gmail.com") {
      return <Navigate to="/home-page" />;
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
          <FeatureSection />
          <SkillsDirectory/>
          <Testimonials/>
          <FAQSection />
          <Discover/>
          <Footer />
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
      path: "/admin-page",
      element: (
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      ),
      children: [
        {
          path: "/admin-page",
          element: <AdminPage />
        },
        {
          path: "users",
          element: <AdminUsers />
        },
        {
          path: "posts",  
          element: <AdminPosts />
        }
      ]
    },

    {
      path: "/home-page",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/home-page",
          element: <Home />
        },
        {
          path: "/home-page/profile/:id",
          element: <Profile />
        },
        {
          path: "/home-page/friends",
          element: <FriendsList />
        },
        {
          path: "/home-page/exchange",
          element: <ExchangeList />
        },
        {
          path: "/home-page/gallery",
          element: <Gallery />
        },
        {
          path: "/home-page/requests",
          element: <Requests />
        },
        {
          path: "/home-page/messages",
          element: <Messages />
        },
      ]
    }

  ]);

  return (
    <RouterProvider router={router} /> 
  );
}

export default App;
