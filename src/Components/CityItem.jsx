import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCitiesContext } from "../ContextProvider/ContextProvider";

// FUNCTION TO FORMAT DATE
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const { CurrentCity,deleteCity } = useCitiesContext();
  const { cityName, emoji, date, id, position } = city;

  function handledelete(e) {
    e.preventDefault();
    deleteCity(id)
  }
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          id === CurrentCity.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <span className={styles.date}>{formatDate(date)}</span>
        <button onClick={handledelete} className={styles.deleteBtn}>
          &times;
        </button>
      </Link>
    </li>
  );
}
