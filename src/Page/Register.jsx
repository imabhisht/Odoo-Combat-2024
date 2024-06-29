import React, { useState } from "react";
import { account, ID } from "../lib/appwrite";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const navigate = useNavigate();

	async function register() {
		try {
			await account.create(
				ID.unique(),
				email,
				password,
				name
			);
			setTimeout(() => {
				navigate("/login");
			}, 100); // Simulate delay
		} catch (error) {
			console.error("Registration failed", error);
		}
	}

	return (
		<div className='app-container'>
			<img
				src='cid.jpeg'
				alt='Logo'
				className='logo'
				height='200px'
				width='200px'
			/>
			<h2 className='title'>Crime Reporting System</h2>
			<p className='status'>Register to report crimes</p>
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
					onClick={register}
					className='button register'
				>
					Register
				</button>
			</div>
		</div>
	);
};

export default Register;
