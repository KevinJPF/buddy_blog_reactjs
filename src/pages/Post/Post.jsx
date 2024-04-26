// css
import styles from "./Post.module.css";

// hooks
import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { Link } from "react-router-dom";
import Comments from "../../components/Comments";

const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id);

  function dateFormat(date) {
    const day = (date.getDate() < 10 ? "0" : "") + date.getDate();
    const month = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
    const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    // const segundos = (data.getSeconds() < 10 ? "0" : "") + data.getSeconds();

    return day + "/" + month + "/" + year + " - " + hours + ":" + minutes;
  }

  return (
    <div className={styles.post_container}>
      {loading && <p>Carregando post...</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.body}</p>
          <Comments post={post} />
          <h3>Tags do post:</h3>
          <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
              <Link
                to={`/buddy_blog_reactjs/search?q=${tag}`}
                className={styles.tags}
                key={tag}
              >
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
