// css
import styles from "./Post.module.css";

// hooks
import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { Link } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const { document: post, loading, dateFormat } = useFetchDocument("posts", id);

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
              <Link to={`/search?q=${tag}`} className={styles.tags} key={tag}>
                <p>
                  <span>#</span>
                  {tag}
                </p>
              </Link>
            ))}
          </div>
          <div className={styles.createdBy}>
            <p>{dateFormat(post.createdAt.toDate())} por</p>
            <p className={styles.user}>
              <span>@</span>
              {post.createdBy}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
