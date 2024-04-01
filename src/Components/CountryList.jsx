import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";
import styles from "./CountryList.module.css";
import { useCitiesContext } from "../ContextPrivider/ContextPrivider";

export default function CountryList() {
  const { cities, isLoading } = useCitiesContext();
  if (isLoading) return <Spinner />;
  if (cities.length === 0)
    return <Message message={"Click on the map to add a city or country"} />;

  let counties = cities.reduce((arr, city) => {
    if (!arr.map((ele) => ele.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else return arr;
  }, []);
  return (
    <ul className={styles.countryList}>
      {counties.map((country, index) => (
        <CountryItem country={country} key={index} />
      ))}
    </ul>
  );
}
