import styles from "./Button.module.css";
export default function Buttons({ children, onclick, type }) {
  return (
    <button className={`${styles[type]} ${styles.btn}`} onClick={onclick}>
      {children}
    </button>
  );
}
