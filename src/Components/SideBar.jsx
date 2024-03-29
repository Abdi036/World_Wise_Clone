import styles from "./SideBar.module.css";
import Logo from "./Logo";
import Footer from "./Footer";
export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <p>List of countries</p>
      <Footer />
    </div>
  );
}
