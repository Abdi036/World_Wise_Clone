// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import BackButton from "./BackButton";
import Buttons from "./Buttons";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "../Components/Message";
import Spinner from "../Components/Spinner";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export default function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeoCode, setIsLoadingGeoCode] = useState(false);
  const [geoCodeError, setGeoCodeError] = useState(false);
  const [emoji, setEmoji] = useState("");

  const URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`;
  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsLoadingGeoCode(true);
        setGeoCodeError("");
        const res = await fetch(`${URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode)
          throw new Error("It seems that is not a city click on other place ");

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setGeoCodeError(error.message);
      } finally {
        setIsLoadingGeoCode(false);
      }
    }
    fetchCityData();
  }, [lat, lng, URL]);

  if (isLoadingGeoCode) return <Spinner />;
  if (geoCodeError) return <Message message={geoCodeError} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Buttons
          type="primary"
          onclick={(e) => {
            e.preventDefault();
          }}
        >
          Add
        </Buttons>
        <BackButton />
      </div>
    </form>
  );
}
