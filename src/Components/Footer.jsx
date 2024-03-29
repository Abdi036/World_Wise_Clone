import styles from "./SideBar.module.css";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; copywrite {new Date().getFullYear()}
      </p>
    </footer>
  );
}
