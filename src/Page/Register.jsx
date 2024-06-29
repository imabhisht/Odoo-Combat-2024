import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { account, ID } from "../lib/appwrite";

const App = () => {
	const [loggedInUser, setLoggedInUser] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const history = useNavigate();

	async function login(email, password) {
		try {
			await account.createEmailPasswordSession(
				email,
				password
			);
			setLoggedInUser(await account.get());
			history.push("/dashboard"); // Redirect to the login page or dashboard
		} catch (error) {
			console.error("Login failed", error);
		}
	}

	return (
		<div className='app-container'>
			<img src='cid.jpeg' alt='Logo' className='logo' />
			<h2 className='title'>Crime Reporting System</h2>
			<p className='status'>
				{loggedInUser
					? `Logged in as ${loggedInUser.name}`
					: "Not logged in"}
			</p>
			<div className='form-container'>
				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={(e) =>
						setEmail(e.target.value)
					}
					className='input-field'
				/>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={(e) =>
						setPassword(e.target.value)
					}
					className='input-field'
				/>
				<input
					type='text'
					placeholder='Name'
					value={name}
					onChange={(e) =>
						setName(e.target.value)
					}
					className='input-field'
				/>
				<button
					type='button'
					onClick={async () => {
						try {
							await account.create(
								ID.unique(),
								email,
								password,
								name
							);
							login(email, password);
						} catch (error) {
							console.error(
								"Registration failed",
								error
							);
						}
					}}
					className='button register'
				>
					Register
				</button>
				<button
					type='button'
					onClick={() => login(email, password)}
					className='button login'
				>
					Login
				</button>
			</div>
		</div>
	);
};

export default App;
