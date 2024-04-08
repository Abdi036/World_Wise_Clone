import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ContextProvider } from "./ContextProvider/ContextProvider";
import { FakeAuthProvider } from "./ContextProvider/FakeUserContext";
import ProtectedAuth from "./ProtectedAuth";

import CityList from "./Components/CityList";
import CountryList from "./Components/CountryList";
import City from "./Components/City";
import Form from "./Components/Form";
import SpinnerFullPage from "./Components/SpinnerFullPage";

const Product = lazy(() => import("./Pages/Product"));
const Pricing = lazy(() => import("./Pages/Pricing"));
const HomePage = lazy(() => import("./Pages/HomePage"));
const AppLayout = lazy(() => import("./Pages/AppLayout"));
const Login = lazy(() => import("./Pages/Login"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));

// import Product from "./Pages/Product";
// import Pricing from "./Pages/Pricing";
// import HomePage from "./Pages/HomePage";
// import PageNotFound from "./Pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

export default function App() {
  return (
    <FakeAuthProvider>
      <ContextProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedAuth>
                    <AppLayout />
                  </ProtectedAuth>
                }
              >
                <Route index element={<Navigate replace to="city" />} />
                <Route path="city" element={<CityList />} />
                <Route path="city/:id" element={<City />} />
                <Route path="country" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ContextProvider>
    </FakeAuthProvider>
  );
}
