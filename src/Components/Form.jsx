// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Form.module.css";
import BackButton from "./BackButton";
import Buttons from "./Buttons";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "../Components/Message";
import Spinner from "../Components/Spinner";
import { useCitiesContext } from "../ContextPrivider/ContextPrivider";
const URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`;

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export default function Form() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition(); //CONTEXT
  const { createCity, isLoading } = useCitiesContext(); //CONTEXT
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeoCode, setIsLoadingGeoCode] = useState(false);
  const [geoCodeError, setGeoCodeError] = useState(false);
  const [emoji, setEmoji] = useState("");

  useEffect(
    function () {
      if (!lat && !lng) return;

      async function fetchCityData() {
        try {
          setIsLoadingGeoCode(true);
          setGeoCodeError("");

          const res = await fetch(`${URL}?latitude=${lat}&longitude=${lng}`);
          const data = await res.json();

          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else 😉"
            );

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeoCodeError(err.message);
        } finally {
          setIsLoadingGeoCode(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat: 40.46635901755316,
        lng: -3.7133789062500004,
      },
    };
    await createCity(newCity);
    navigate("/app/city");
  }

  if (!lat && !lng)
    return <Message message={"Start by clicking somewhere on the map."} />;
  if (isLoadingGeoCode) return <Spinner />;
  if (geoCodeError) return <Message message={geoCodeError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
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
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
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
        <Buttons type="primary">Add</Buttons>
        <BackButton />
      </div>
    </form>
  );
}
