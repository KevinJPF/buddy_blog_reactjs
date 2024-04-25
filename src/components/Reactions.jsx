import { useState, useEffect } from "react";
import styles from "./Reactions.module.css";
import { useAuthValue } from "../context/AuthContext";
import { useUpdateDocument } from "../hooks/useUpdateDocument";

const Reactions = ({ post }) => {
  const { updateDocument, response } = useUpdateDocument("posts");

  const { user } = useAuthValue();
  const uid = user ? user.uid : "";

  const [likes, setLikes] = useState(0);
  const [hahas, setHahas] = useState(0);
  const [wows, setWows] = useState(0);
  const [sads, setSads] = useState(0);
  const [angrys, setAngrys] = useState(0);
  const [pedros, setPedros] = useState(0);

  const [selectedReaction, setSelectedReaction] = useState("");

  const [totalReactions, setTotalReactions] = useState(0);

  // Cria um array de objetos com as keys e valuees dos dados
  const [reactionsValues, setReactionsValues] = useState([
    { key: "like", value: likes, style: styles.like_mini },
    { key: "haha", value: hahas, style: styles.haha_mini },
    { key: "wow", value: wows, style: styles.wow_mini },
    { key: "sad", value: sads, style: styles.sad_mini },
    { key: "angry", value: angrys, style: styles.angry_mini },
    { key: "pedro", value: pedros, style: styles.pedro_mini },
  ]);

  // Ordena o array com base nos valuees (do mais alto para o mais baixo)
  // Extrai as keys ordenadas
  const orderedReactions = reactionsValues.sort((a, b) => b.value - a.value);

  useEffect(() => {
    if (post.user_reactions) {
      if (post.title === "Banda Djavu, é show") {
        console.log("Djavu");
      }
      setLikes(0);
      setHahas(0);
      setWows(0);
      setSads(0);
      setAngrys(0);
      setPedros(0);

      post.user_reactions.forEach((post_reaction) => {
        if (post_reaction.user_id === uid) {
          setSelectedReaction(post_reaction.reaction);
        }

        switch (post_reaction.reaction) {
          case "like":
            setLikes((prevLikes) => prevLikes + 1);
            break;
          case "haha":
            setHahas((prevHahas) => prevHahas + 1);
            break;
          case "wow":
            setWows((prevWows) => prevWows + 1);
            break;
          case "sad":
            setSads((prevSads) => prevSads + 1);
            break;
          case "angry":
            setAngrys((prevAngrys) => prevAngrys + 1);
            break;
          case "pedro":
            setPedros((prevPedros) => prevPedros + 1);
            break;
        }
      });
    }
  }, [post.user_reactions, uid]);

  useEffect(() => {
    setTotalReactions(likes + hahas + wows + sads + angrys + pedros);
    setReactionsValues([
      { key: "like", value: likes, style: styles.like_mini },
      { key: "haha", value: hahas, style: styles.haha_mini },
      { key: "wow", value: wows, style: styles.wow_mini },
      { key: "sad", value: sads, style: styles.sad_mini },
      { key: "angry", value: angrys, style: styles.angry_mini },
      { key: "pedro", value: pedros, style: styles.pedro_mini },
    ]);
  }, [likes, hahas, wows, sads, angrys, pedros]);

  function newSelectedReaction(reaction) {
    let queryType = "insert";
    // console.log(`${reaction} - ${likes}`);
    if (selectedReaction === reaction) {
      return;
    }

    if (selectedReaction != "") {
      switch (selectedReaction) {
        case "like":
          setLikes((prevLikes) => prevLikes - 1);
          break;
        case "haha":
          setHahas((prevHahas) => prevHahas - 1);
          break;
        case "wow":
          setWows((prevWows) => prevWows - 1);
          break;
        case "sad":
          setSads((prevSads) => prevSads - 1);
          break;
        case "angry":
          setAngrys((prevAngrys) => prevAngrys - 1);
          break;
        case "pedro":
          setPedros((prevPedros) => prevPedros - 1);
          break;
      }
    }
    setSelectedReaction(reaction);
    switch (reaction) {
      case "like":
        setLikes((prevLikes) => prevLikes + 1);
        break;
      case "haha":
        setHahas((prevHahas) => prevHahas + 1);
        break;
      case "wow":
        setWows((prevWows) => prevWows + 1);
        break;
      case "sad":
        setSads((prevSads) => prevSads + 1);
        break;
      case "angry":
        setAngrys((prevAngrys) => prevAngrys + 1);
        break;
      case "pedro":
        setPedros((prevPedros) => prevPedros + 1);
        break;
    }

    post.user_reactions.forEach((post_reaction) => {
      if (post_reaction.user_id === uid) {
        queryType = "update";
        post_reaction.reaction = reaction;
      }
    });

    console.log(post.user_reactions);

    if (queryType === "insert") {
      post.user_reactions.push({
        user_id: uid,
        reaction: reaction,
      });
    }

    console.log(post.user_reactions);

    updateDocument(post.id, post);
  }

  return (
    <div className={styles.reactions_container}>
      <div className={styles.reactions}>
        {user && (
          <>
            <div
              className={styles.tooltip_container}
              onClick={() => newSelectedReaction("like")}
            >
              <img
                src="like_icon.png"
                alt="likepost"
                className={
                  selectedReaction == "like"
                    ? `${styles.selected} ${styles.like}`
                    : styles.like
                }
              />
              <span className={styles.tooltip}>Gostei</span>
            </div>
            <div
              className={styles.tooltip_container}
              onClick={() => newSelectedReaction("haha")}
            >
              <img
                src="haha_icon.png"
                alt="hahapost"
                className={
                  selectedReaction === "haha"
                    ? `${styles.selected} ${styles.haha}`
                    : styles.haha
                }
              />
              <span className={styles.tooltip}>Haha</span>
            </div>
            <div
              className={styles.tooltip_container}
              onClick={() => newSelectedReaction("wow")}
            >
              <img
                src="wow_icon.png"
                alt="wowpost"
                className={
                  selectedReaction == "wow"
                    ? `${styles.selected} ${styles.wow}`
                    : styles.wow
                }
              />
              <span className={styles.tooltip}>UAU</span>
            </div>
            <div
              className={styles.tooltip_container}
              onClick={() => newSelectedReaction("sad")}
            >
              <img
                src="sad_icon.png"
                alt="sadpost"
                className={
                  selectedReaction == "sad"
                    ? `${styles.selected} ${styles.sad}`
                    : styles.sad
                }
              />
              <span className={styles.tooltip}>Triste</span>
            </div>
            <div
              className={styles.tooltip_container}
              onClick={() => newSelectedReaction("angry")}
            >
              <img
                src="angry_icon.png"
                alt="angrypost"
                className={
                  selectedReaction == "angry"
                    ? `${styles.selected} ${styles.angry}`
                    : styles.angry
                }
              />
              <span className={styles.tooltip}>Grr</span>
            </div>
            <div
              className={styles.tooltip_container}
              onClick={() => newSelectedReaction("pedro")}
            >
              <img
                src="pedro_icon.png"
                alt="pedropost"
                className={
                  selectedReaction == "pedro"
                    ? `${styles.selected} ${styles.pedro}`
                    : styles.pedro
                }
              />
              <span className={styles.tooltip}>Pedro</span>
            </div>
          </>
        )}
      </div>
      <div className={styles.reactions_quantity}>
        <div className={styles.tooltip_container}>
          <div className={styles.most_reacted}>
            {orderedReactions[2].value > 0 && (
              <div className={styles.react_mini}>
                <img
                  src={orderedReactions[2].key + "_icon.png"}
                  alt={orderedReactions[2].key + "post"}
                  className={orderedReactions[2].style}
                />
              </div>
            )}
            {orderedReactions[1].value > 0 && (
              <div className={styles.react_mini}>
                <img
                  src={orderedReactions[1].key + "_icon.png"}
                  alt={orderedReactions[1].key + "post"}
                  className={orderedReactions[1].style}
                />
              </div>
            )}
            {orderedReactions[0].value > 0 && (
              <div className={styles.react_mini}>
                <img
                  src={orderedReactions[0].key + "_icon.png"}
                  alt={orderedReactions[0].key + "post"}
                  className={orderedReactions[0].style}
                />
              </div>
            )}
            <p>
              <span>{totalReactions > 0 ? totalReactions : ""}</span>
              {totalReactions == 0
                ? " nenhuma reação"
                : totalReactions > 1
                ? " reações"
                : " reação"}
            </p>
          </div>
          <div className={styles.tooltip}>
            {likes > 0 && (
              <div>
                <img
                  src="like_icon.png"
                  alt="likepost"
                  className={styles.like_mini}
                />
                <span>{likes}</span>
              </div>
            )}
            {hahas > 0 && (
              <div>
                <img
                  src="haha_icon.png"
                  alt="hahapost"
                  className={styles.haha_mini}
                />
                <span>{hahas}</span>
              </div>
            )}
            {wows > 0 && (
              <div>
                <img
                  src="wow_icon.png"
                  alt="wowpost"
                  className={styles.wow_mini}
                />
                <span>{wows}</span>
              </div>
            )}
            {sads > 0 && (
              <div>
                <img
                  src="sad_icon.png"
                  alt="sadpost"
                  className={styles.sad_mini}
                />
                <span>{sads}</span>
              </div>
            )}
            {angrys > 0 && (
              <div>
                <img
                  src="angry_icon.png"
                  alt="angrypost"
                  className={styles.angry_mini}
                />
                <span>{angrys}</span>
              </div>
            )}
            {pedros > 0 && (
              <div>
                <img
                  src="pedro_icon.png"
                  alt="pedropost"
                  className={styles.pedro_mini}
                />
                <span>{pedros}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reactions;
