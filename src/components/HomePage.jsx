import React, { useRef } from "react";
import { MapContainer, TileLayer, useMapEvent } from "react-leaflet";

function SetViewOnClick({ animateRef }) {
	const map = useMapEvent("click", (e) => {
		// console the lat lng
		console.log(e.latlng);
		map.setView(e.latlng, map.getZoom(), {
			animate: animateRef.current || false,
		});
	});

	return null;
}

const Home = () => {
	const animateRef = useRef(false);

	return (
		<>
			{/* <Navbar /> */}
			<p>
				<label>
					<input
						type='checkbox'
						onChange={() => {
							animateRef.current =
								!animateRef.current;
						}}
					/>
					Animate panning
				</label>
			</p>
			<MapContainer
				center={[23.15959273946674, 72.66349523517697]}
				zoom={13}
				scrollWheelZoom={false}
				style={{ height: "100vh", width: "100%" }}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				<SetViewOnClick animateRef={animateRef} />
			</MapContainer>
		</>
	);
};

export default Home;
