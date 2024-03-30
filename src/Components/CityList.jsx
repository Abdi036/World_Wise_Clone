import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";
import styles from "./CityList.module.css";
export default function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (cities.length === 0)
    return <Message message={"Click on the map to add a city or country"} />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
