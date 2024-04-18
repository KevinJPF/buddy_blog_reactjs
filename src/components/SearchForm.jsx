import styles from "./SearchForm.module.css";

// hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const SearchForm = () => {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if (query) {
      return navigate(`/search?q=${query}`);
    } else {
      e.preventDefault();
    }
  };

  return (
    <>
      <form className={styles.search_form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ou busque por tags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-outline">Pesquisar</button>
      </form>
    </>
  );
};

export default SearchForm;
