import { BrowserRouter, Routes, Route } from "react-router-dom";

// // Context Providers
// import { AuthProvider } from "./context/AuthProvider";
// import { PetsProvider } from "./context/PetsProvider";

// Routes
import Layout from "./components/Layout";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Pet from "./routes/Pet";
import Pets from "./routes/Pets";
import AddPet from "./routes/AddPet";
import AddReminder from "./routes/AddReminder";
import SearchPet from "./routes/SearchPet";
import ErrorPage from "./routes/ErrorPage";

//
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import Unauthenticated from "./components/Unauthenticated";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route element={<Unauthenticated />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            {/* protected routes */}
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Home />} />
              <Route path="pet" element={<Pet />} />
              <Route path="pet/:id" element={<Pet />} />
              <Route path="pets" element={<Pets />} />
              <Route path="add/pet" element={<AddPet />} />
              <Route path="add/reminder" element={<AddReminder />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
