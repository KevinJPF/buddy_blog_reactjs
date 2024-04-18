// CSS
import styles from "./Home.module.css";

// hooks
import { Link } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

// components
import PostDetail from "../../components/PostDetail";
import SearchForm from "../../components/SearchForm";

const Home = () => {
  const { documents: posts, loading } = useFetchDocuments("posts");

  return (
    <div className={styles.main_content}>
      <h1>Veja os nossos posts mais recentes.</h1>
      <SearchForm />
      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
