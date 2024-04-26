// css
import styles from "./Comments.module.css";
import { useState } from "react";
import { useAuthValue } from "../context/AuthContext";
import { useUpdateDocument } from "../hooks/useUpdateDocument";

const Comments = ({ post }) => {
  const [comment, setComment] = useState("");

  const { updateDocument, response } = useUpdateDocument("posts");

  const { user } = useAuthValue();
  const uid = user ? user.uid : "";

  const [commentList, setCommentList] = useState(post.comments ?? []);

  function sendComment() {
    const agora = new Date();
    const novoComentario = {
      uid: user.uid,
      author: user.displayName,
      postedAt: agora.toLocaleString(),
      content: comment,
    };

    if (!post.comments) {
      post.comments = [];
    }

    post.comments.push({
      uid: user.uid,
      author: user.displayName,
      postedAt: agora.toLocaleString(),
      content: comment,
    });

    updateDocument(post.id, post);

    setComment("");

    setCommentList(post.comments);
  }

  return (
    <div className={styles.comments_container} key={post.id}>
      <h2>Comentários</h2>
      <div className={styles.comments_content}>
        <div className={styles.comments_list}>
          {commentList && commentList.length > 0 ? (
            commentList.map((comment) => {
              return (
                <div className={styles.comment} key={comment.id}>
                  <div className={styles.comment_picture}>
                    <img
                      src="https://tse2.mm.bing.net/th/id/OIG1.XxcB54dpWdJDPJOlrpvE?pid=ImgGn"
                      alt="profile_picture"
                    />
                  </div>
                  <div className={styles.comment_content}>
                    <h5>
                      <span>@</span>
                      {comment.author} • <span>{comment.postedAt}</span>
                    </h5>
                    <p>{comment.content}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <h3>Ainda não há comentários.</h3>
          )}
        </div>
        {user ? (
          <>
            <textarea
              className={styles.comment_input}
              type="text"
              placeholder="Digite o seu comentário aqui..."
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <button
              className="btn"
              onClick={comment != "" ? sendComment : null}
            >
              Comentar
            </button>
          </>
        ) : (
          <p>Você precisa se conectar para comentar.</p>
        )}
      </div>
      <hr />
    </div>
  );
};

export default Comments;
