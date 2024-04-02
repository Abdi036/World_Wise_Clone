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
import { ContextProvider } from "./ContextProvider/ContextProvider";

export default function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            {/* index is used for displaying initial page  */}
            <Route index element={<Navigate replace to="city" />} />
            <Route path="city" element={<CityList />} />
            <Route path="city/:id" element={<City />} />
            <Route path="country" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}
