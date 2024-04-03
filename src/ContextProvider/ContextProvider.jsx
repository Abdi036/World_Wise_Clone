import { createContext, useContext, useEffect, useReducer } from "react";

const URL = `http://localhost:8000`;

// 1) CREATING CONTEXT
const Context = createContext();

const initialValues = {
  cities: [],
  isLoading: false,
  CurrentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true };

    case "CITIESLOADED":
      return { ...state, isLoading: false, cities: action.payload };

    case "CITYLOADED":
      return { ...state, isLoading: false, CurrentCity: action.payload };

    case "CITYCREATED":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        CurrentCity: action.payload,
      };

    case "CITYDELETED":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((c) => c.id !== action.payload),
        CurrentCity: {},
      };

    case "ERROR":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("somthing went wrong");
  }
}

function ContextProvider({ children }) {
  const [{ cities, isLoading, CurrentCity }, dispatch] = useReducer(
    reducer,
    initialValues
  );

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: "LOADING" });
      try {
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        dispatch({ type: "CITIESLOADED", payload: data });
      } catch {
        dispatch({
          type: "ERROR",
          payload: "There is a problem loading data.",
        });
      }
    }
    fetchData();
  }, []);

  async function getCity(id) {
    try {
      dispatch({ type: "LOADING" });

      const res = await fetch(`${URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "CITYLOADED", payload: data });
    } catch {
      dispatch({
        type: "ERROR",
        payload: "There is a problem loading data.",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "LOADING" });
    try {
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      dispatch({ type: "CITYCREATED", payload: data });
    } catch {
      dispatch({
        type: "ERROR",
        payload: "There is a problem creating city from data.",
      });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "LOADING" });

    try {
      await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "CITYDELETED", payload: id });
    } catch {
      dispatch({
        type: "ERROR",
        payload: "There is a problem deleting city.",
      });
    }
  }
  return (
    <Context.Provider
      value={{
        cities,
        isLoading,
        CurrentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </Context.Provider>
  );
}

function useCitiesContext() {
  const CitiesContext = useContext(Context);
  if (CitiesContext === undefined)
    throw new Error("The Context is used out of the Provider Zone!");
  return CitiesContext;
}
export { ContextProvider, useCitiesContext };
