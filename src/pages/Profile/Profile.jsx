// CSS
import { Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import styles from "./Profile.module.css";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const Profile = () => {
  const { user } = useAuthValue();
  const { document: userDataa, loading } = useFetchDocument(
    "profiles",
    user.uid
  );

  console.log(userDataa);

  const userData = {
    uid: user.uid,
    name: user.displayName,
    picture:
      "https://tse2.mm.bing.net/th/id/OIG3.IuCIcldSA9avs23DqIc5?pid=ImgGn",
    coverPic:
      "https://www.xtrafondos.com/en/descargar.php?id=3977&resolucion=2338x1406",
    memberSince: user.metadata.creationTime,
    bio: "Eu sou o Kevinho Plays!",
  };

  return (
    <div className={styles.my_profile}>
      <div className={styles.pictures}>
        <img
          src={userData.coverPic}
          alt="coverPic"
          className={styles.cover_pic}
        />
        <img
          src={userData.picture}
          alt="profilePic"
          className={styles.profile_pic}
        />
      </div>
      <div className={styles.header}>
        <h1>
          <span>@</span>
          {userData.name}
        </h1>
        <h5>
          <span>{userData.memberSince}</span>
        </h5>
      </div>
      <p>{userData.bio}</p>
      <div className={styles.profile_buttons}>
        <Link to={"/buddy_blog_reactjs/dashboard"} className="btn">
          Editar Perfil
        </Link>
        <Link to={"/buddy_blog_reactjs/dashboard"} className="btn">
          Meus Posts
        </Link>
      </div>
    </div>
  );
};

export default Profile;
