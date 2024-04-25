// CSS
import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

// hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

// context
import { AuthProvider } from "./context/AuthContext";

// Pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreatePost from "./pages/CreatePost/CreatePost";
import Dashboard from "./pages/Dashboard/Dashboard";
import Search from "./pages/Search/Search";
import Post from "./pages/Post/Post";
import EditPost from "./pages/EditPost/EditPost";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/buddy_blog_reactjs/home/" element={<Home />} />
              <Route path="/buddy_blog_reactjs/about" element={<About />} />
              <Route path="/buddy_blog_reactjs/search" element={<Search />} />
              <Route path="/buddy_blog_reactjs/posts/:id" element={<Post />} />
              <Route
                path="/buddy_blog_reactjs/profile/:id"
                element={<Post />}
              />
              <Route
                path="/buddy_blog_reactjs/register"
                element={
                  !user ? (
                    <Register />
                  ) : (
                    <Navigate to="/buddy_blog_reactjs/home" />
                  )
                }
              />
              <Route
                path="/buddy_blog_reactjs/login"
                element={
                  !user ? <Login /> : <Navigate to="/buddy_blog_reactjs/home" />
                }
              />
              <Route
                path="/buddy_blog_reactjs/posts/create"
                element={
                  user ? (
                    <CreatePost />
                  ) : (
                    <Navigate to="/buddy_blog_reactjs/login" />
                  )
                }
              />
              <Route
                path="/buddy_blog_reactjs/posts/edit/:id"
                element={
                  user ? (
                    <EditPost />
                  ) : (
                    <Navigate to="/buddy_blog_reactjs/login" />
                  )
                }
              />
              <Route
                path="/buddy_blog_reactjs/dashboard"
                element={
                  user ? (
                    <Dashboard />
                  ) : (
                    <Navigate to="/buddy_blog_reactjs/login" />
                  )
                }
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
