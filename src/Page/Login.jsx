import React from "react";
import "./LoginPage.css";
import { account } from "../appwrite";

const LoginPage = () => {
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			username: data.get("username"),
			password: data.get("password"),
		});

		account.createEmailPasswordSession(
			data.get("username"),
			data.get("password")
		)
			.then(() => {
				console.log("Logged in");
				localStorage.setItem(
					"email",
					data.get("username")
				);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	return (
		<div className='container'>
			<div className='login-box'>
				<div className='avatar'>
					<img
						src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Odoo_logo_rgb.svg/2560px-Odoo_logo_rgb.svg.png'
						alt='Avatar'
					/>
				</div>
				<h1>Login</h1>
				<form onSubmit={handleSubmit}>
					<div className='textbox'>
						<input
							type='email'
							name='username'
							placeholder='Email'
							required
						/>
					</div>
					<div className='textbox'>
						<input
							type='password'
							name='password'
							placeholder='Password'
							required
						/>
					</div>
					<button type='submit' className='btn'>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
