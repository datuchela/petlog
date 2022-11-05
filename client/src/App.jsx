import { BrowserRouter, Routes, Route } from "react-router-dom";

// Routes
import Layout from "./components/layouts/Layout";
import UnauthLayout from "./components/layouts/UnauthLayout";

import Login from "./routes/Login";
import Register from "./routes/Register";
import Home from "./routes/Home";
import Pet from "./routes/Pet";
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
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>
            </Route>

            {/* protected routes */}
            <Route element={<RequireAuth />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/pet/:petId" element={<Pet />} />
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
