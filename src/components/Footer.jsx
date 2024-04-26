import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h3>
        Desenvolvido por{" "}
        <a href="https://github.com/KevinJPF">Kevin Juliano Pires Francisco</a>!
      </h3>
      <p>Buddy Blog &copy; 2024</p>
    </footer>
  );
};

export default Footer;
