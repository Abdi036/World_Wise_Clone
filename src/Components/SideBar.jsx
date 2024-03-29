import styles from "./SideBar.module.css";
import Logo from "./Logo";
import Footer from "./Footer";
import AppNav from "./AppNav";
export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <p>List of countries</p>
      <Footer />
    </div>
  );
}
