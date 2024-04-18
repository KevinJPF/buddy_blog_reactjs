import styles from "./PostDetail.module.css";

import { Link } from "react-router-dom";

const PostDetail = ({ post }) => {
  return (
    <div className={styles.post_detail}>
      <img src={post.image} alt={post.title} />
      <Link to={`/posts/${post.id}`}>
        <h2>{post.title}</h2>
      </Link>
      <p className={styles.createdBy}>
        <span>@</span>
        {post.createdBy}
      </p>
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
      <Link to={`/posts/${post.id}`} className="btn btn-outline btn_read">
        Ler
      </Link>
    </div>
  );
};

export default PostDetail;
