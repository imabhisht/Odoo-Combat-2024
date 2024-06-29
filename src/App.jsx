import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MarkersPage from "./Page/MarkersPage";
import { Routes, Route } from "react-router-dom";
import CrimeReportPage from "./Page/CrimeReportPage";
import Login from "./Page/Login";
import Register from "./Page/Register";
import ProtectedRoute from "./components/ProtectedRoute";

import HeatMap from "./components/HeatMap";
import HomePage from "./Page/HomePage";
import Form from "./components/Form";
import Navbar from "./components/Navbar";

function App() {
	const heatmapData = [
		[51.505, -0.09, 0.5], // Latitude, Longitude, Intensity
		[51.515, -0.1, 0.3],
		[51.52, -0.12, 0.8],
	];

	const user = {
		// id: 123,
		// name: 'John Doe',
		// email: 'shrey@gmil.com'
	};

	return (
		<>
			{/* <Navbar /> */}
			<Routes>
				<Route
					path='/Location'
					element={<MarkersPage />}
				/>
				<Route
					path='/Reports'
					element={<CrimeReportPage />}
				/>
				<Route path='/HeatMap' element={<HeatMap />} />
				<Route path='/' element={<HomePage />} />
				<Route
					path='/Form'
					element={<Form user={user} />}
				/>
				<Route path='/login' element={<Login />} />
				<Route
					path='/register'
					element={<Register />}
				/>
			</Routes>
		</>
	);
}

export default App;
