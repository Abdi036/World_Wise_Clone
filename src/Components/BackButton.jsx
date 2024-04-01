import Buttons from "./Buttons";
import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <div className={styles.buttons}>
      <Buttons
        type="back"
        onclick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        &larr; Back
      </Buttons>
    </div>
  );
}
