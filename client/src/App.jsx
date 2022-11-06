import { BrowserRouter, Routes, Route } from "react-router-dom";

// Routes
import Layout from "./components/layouts/Layout";
import UnauthLayout from "./components/layouts/UnauthLayout";

import LoginPage from "./routes/login";
import RegisterPage from "./routes/register";
import HomePage from "./routes";
import PetPage from "./routes/pet/[petId]";
import AddPetPage from "./routes/add/pet";
import ErrorPage from "./routes/ErrorPage";

//
import AxiosPrivate from "./components/AxiosPrivate";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import Unauthenticated from "./components/Unauthenticated";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Provides AxiosPrivate instance to all children */}
        <Route element={<AxiosPrivate />}>
          <Route element={<PersistLogin />}>
            {/* public routes */}
            <Route element={<Unauthenticated />}>
              <Route element={<UnauthLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
              </Route>
            </Route>

            {/* protected routes */}
            <Route element={<RequireAuth />}>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/pet/:petId" element={<PetPage />} />
                <Route path="/add/pet" element={<AddPetPage />} />
              </Route>
            </Route>

            {/* fallback routes */}
            <Route element={<UnauthLayout />}>
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
