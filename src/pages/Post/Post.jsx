// css
import styles from "./Post.module.css";

// hooks
import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { Link } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id);

  return (
    <div className={styles.post_container}>
      {loading && <p>Carregando post...</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.body}</p>
          <h3>Tags do post:</h3>
          <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
              <Link to={`/search?q=${tag}`} className={styles.tags}>
                <p key={tag}>
                  <span>#</span>
                  {tag}
                </p>
              </Link>
            ))}
          </div>
          <p className={styles.createdBy}>
            <span className="author">Autor: </span>
            <>
              <span>@</span>
              {post.createdBy}
            </>
          </p>
        </>
      )}
    </div>
  );
};

export default Post;
