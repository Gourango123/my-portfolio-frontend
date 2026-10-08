import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRegister from "./pages/AdminRegister";
import AdminProjects from "./pages/AdminProjects";
import AdminSkills from "./pages/AdminSkills";
import AdminExperience from "./pages/AdminExperience";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/admin/register"
        element={<AdminRegister />}
      />

      <Route
        path="/admin/login"
        element={<Login />}
      />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/projects"
            element={<AdminProjects />}
          />

          <Route
            path="/admin/skills"
            element={<AdminSkills />}
          />

          <Route
            path="/admin/experience"
            element={<AdminExperience />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;