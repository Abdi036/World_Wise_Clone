import { useAuth } from "../ContextProvider/FakeUserContext";
import styles from "./User.module.css";

const FAKE_USER = {
  name: "Abdi",
  email: "abdikumela@example.com",
  password: "123123",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function User() {
  const { logout } = useAuth();

  const user = FAKE_USER;

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default User;

 