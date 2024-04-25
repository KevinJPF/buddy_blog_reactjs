// CSS
import styles from "./Navbar.module.css";

import { NavLink } from "react-router-dom";

import { useAuthentication } from "../hooks/useAuthentication";

import { useAuthValue } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  return (
    <nav className={styles.navbar}>
      <NavLink to={"/buddy_blog_reactjs/home"} className={styles.brand}>
        <img src="logo.png" alt="logo" />
        Buddy <span>Blog</span>
      </NavLink>
      <ul className={styles.links_list}>
        <li>
          <NavLink
            to={"/buddy_blog_reactjs/home"}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Início
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink
                to={"/buddy_blog_reactjs/login"}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/buddy_blog_reactjs/register"}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Cadastrar
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink
                to={"/buddy_blog_reactjs/posts/create"}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Novo Post
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/buddy_blog_reactjs/dashboard"}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Dashboard
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            to={"/buddy_blog_reactjs/about"}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>
        {user && (
          <li>
            <a className={styles.logout} onClick={logout}>
              Sair
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
