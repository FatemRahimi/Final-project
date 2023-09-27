import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import RegisterForm from "./pages/RegisterForm";
import SingleStarView from "./pages/SingleStarView";

const App = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/dashboard" element={<Dashboard />} />
		<Route path="/register" element={<RegisterForm />} />
		<Route path="/star/:id" element={<SingleStarView />} />
	</Routes>
);

export default App;