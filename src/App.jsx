import { Route, Routes } from "react-router-dom";
import "./App.css";
import CrimeReportPage from "./Page/CrimeReportPage";
import MarkersPage from "./Page/MarkersPage";
import Register from "./Page/Register";
import Login from "./Page/Login";

import HeatMap from "./components/HeatMap";

function App() {
	const heatmapData = [
		[51.505, -0.09, 0.5], // Latitude, Longitude, Intensity
		[51.515, -0.1, 0.3],
		[51.52, -0.12, 0.8],
	];

	return (
		<>
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
				<Route
					path='/register'
					element={<Register />}
				/>
				<Route path='/login' element={<Login />} />
			</Routes>
		</>
	);
}

export default App;
