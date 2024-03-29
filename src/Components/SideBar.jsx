import { Outlet } from "react-router-dom";
import styles from "./SideBar.module.css";
import Logo from "./Logo";
import Footer from "./Footer";
import AppNav from "./AppNav";
export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}
