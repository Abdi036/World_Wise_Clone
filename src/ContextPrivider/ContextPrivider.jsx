import { createContext, useContext, useEffect, useState } from "react";

const URL = `http://localhost:8000`;

// 1) CREATING CONTEXT
const Context = createContext();

function ContextPrivider({ children }) {
  const [cities, setCity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        setCity(data);
      } catch {
        throw new Error("There is a problem fetching data.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <Context.Provider value={{ cities, isLoading }}>
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
export { ContextPrivider, useCitiesContext };
