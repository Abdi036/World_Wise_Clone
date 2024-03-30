import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import HomePage from "./Pages/HomePage";
import PageNotFound from "./Pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./Components/CityList";
import CountryList from "./Components/CountryList";
import City from "./Components/City";
import Form from "./Components/Form";

const URL = `http://localhost:8000`;
export default function App() {
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
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          {/* index is used for displaying initial page  */}
          <Route index element={<Navigate replace to="city" />} />
          <Route
            path="city"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="city/:id" element={<City />} />
          <Route
            path="country"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
