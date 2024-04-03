import { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
  name: "Abdi",
  email: "abdikumela@example.com",
  password: "123123",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialValue = {
  user: null,
  isAuthenticated: false,
};

const FakeContextAuth = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true, user: action.payload };

    case "logout":
      return { ...initialValue };
    default:
      throw new Error("something went wrong.");
  }
}

function FakeAuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialValue
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <FakeContextAuth.Provider value={{ login, logout, user, isAuthenticated }}>
      {children}
    </FakeContextAuth.Provider>
  );
}

function useAuth() {
  const context = useContext(FakeContextAuth);
  if (context === undefined)
    throw new Error("Context is  used outside of context provider.");
  return context;
}

export { FakeAuthProvider, useAuth };
