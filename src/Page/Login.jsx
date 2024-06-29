import React, { useState } from "react";
import { account } from "../lib/appwrite";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	async function login() {
		try {
			setTimeout(() => {
				navigate("/location");
			}, 100);
			// await account.createEmailPasswordSession(
			// 	email,
			// 	password
			// );
		} catch (error) {
			console.error("Login failed", error);
		}
	}

	return (
		<div className='app-container'>
			<img
				src='../public/cid.jpeg'
				alt='Logo'
				className='logo'
				height='200px'
				width='200px'
			/>
			<h2 className='title'>Crime Reporting System</h2>
			<p className='status'>Login to your account</p>
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
				<button
					type='button'
					onClick={login}
					className='button login'
				>
					Login
				</button>
			</div>
		</div>
	);
};

export default Login;
