import styles from "./PostDetail.module.css";

import { Link } from "react-router-dom";
import Reactions from "./Reactions";
import { useFetchDocuments } from "../hooks/useFetchDocuments";

const PostDetail = ({ post }) => {
  const dataFormatada = dateFormat(post.createdAt.toDate());

  function dateFormat(date) {
    const day = (date.getDate() < 10 ? "0" : "") + date.getDate();
    const month = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
    const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    // const segundos = (data.getSeconds() < 10 ? "0" : "") + data.getSeconds();

    return day + "/" + month + "/" + year + " - " + hours + ":" + minutes;
  }

  if (post.title === "Banda Djavu, é show") {
    console.log('postdetail');
  }

  return (
    <div className={styles.post_detail}>
      <img src={post.image} alt={post.title} />
      <Reactions post={post} />
      <Link to={`/posts/${post.id}`}>
        <h2>{post.title}</h2>
      </Link>
      <div className={styles.createdBy}>
        <p className={styles.user}>
          <span>@</span>
          {post.createdBy}
        </p>
        {dataFormatada}
      </div>
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
      <Link to={`/posts/${post.id}`} className="btn btn-outline btn_read">
        Ler
      </Link>
    </div>
  );
};

export default PostDetail;
