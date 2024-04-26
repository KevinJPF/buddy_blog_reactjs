// CSS
import { Link } from "react-router-dom";
import styles from "./About.module.css";
import { useAuthValue } from "../../context/AuthContext";

const About = () => {
  const { user } = useAuthValue();
  return (
    <div className={styles.about}>
      <h1>
        Sobre o Mini <span>Blog</span>
      </h1>
      <p>
        Esse projeto consiste em um blog feito com React no front-end e Firebase
        no back-end.
      </p>
      {user ? (
        <Link to={"/buddy_blog_reactjs/posts/create"} className="btn">
          Criar Post
        </Link>
      ) : (
        <Link to={"/buddy_blog_reactjs/login"} className="btn">
          Entrar
        </Link>
      )}
    </div>
  );
};

export default About;
