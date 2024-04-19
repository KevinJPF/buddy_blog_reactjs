import styles from "./Reactions.module.css";

const Reactions = ({ post }) => {
  const likes = post.like_qt ?? 0;
  const hahas = post.haha_qt ?? 0;
  const wows = post.wow_qt ?? 0;
  const sads = post.sad_qt ?? 0;
  const angrys = post.angry_qt ?? 0;

  const totalReactions = likes + hahas + wows + sads + angrys;

  return (
    <div className={styles.reactions_container}>
      <div className={styles.reactions}>
        <div className={styles.tooltip_container}>
          <img src="like_icon.png" alt="likepost" className={styles.like} />
          <span class={styles.tooltip}>Gostei</span>
        </div>
        <div className={styles.tooltip_container}>
          <img src="haha_icon.png" alt="hahapost" className={styles.haha} />
          <span class={styles.tooltip}>Haha</span>
        </div>
        <div className={styles.tooltip_container}>
          <img src="wow_icon.png" alt="wowpost" className={styles.wow} />
          <span class={styles.tooltip}>UAU</span>
        </div>
        <div className={styles.tooltip_container}>
          <img src="sad_icon.png" alt="sadpost" className={styles.sad} />
          <span class={styles.tooltip}>Triste</span>
        </div>
        <div className={styles.tooltip_container}>
          <img src="angry_icon.png" alt="angrypost" className={styles.angry} />
          <span class={styles.tooltip}>Grr</span>
        </div>
      </div>
      <div className={styles.reactions_quantity}>
        <div className={styles.tooltip_container}>
          <div className={styles.most_reacted}>
            <div className={styles.react_mini}>
              <img
                src="sad_icon.png"
                alt="sadpost"
                className={styles.sad_mini}
              />
            </div>
            <div className={styles.react_mini}>
              <img
                src="like_icon.png"
                alt="likepost"
                className={styles.like_mini}
              />
            </div>
            <div className={styles.react_mini}>
              <img
                src="haha_icon.png"
                alt="hahapost"
                className={styles.haha_mini}
              />
            </div>
            <p>
              <span>{totalReactions}</span> reações
            </p>
          </div>
          <div class={styles.tooltip}>
            <div>
              <img
                src="like_icon.png"
                alt="likepost"
                className={styles.like_mini}
              />
              <span>{likes}</span>
            </div>
            <div>
              <img
                src="haha_icon.png"
                alt="hahapost"
                className={styles.haha_mini}
              />
              <span>{hahas}</span>
            </div>
            <div>
              <img
                src="wow_icon.png"
                alt="wowpost"
                className={styles.wow_mini}
              />
              <span>{wows}</span>
            </div>
            <div>
              <img
                src="sad_icon.png"
                alt="sadpost"
                className={styles.sad_mini}
              />
              <span>{sads}</span>
            </div>
            <div>
              <img
                src="angry_icon.png"
                alt="angrypost"
                className={styles.angry_mini}
              />
              <span>{angrys}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reactions;
