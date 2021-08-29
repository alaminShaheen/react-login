import Button from "Components/Button/Button";
import TextInput from "Components/TextInput/TextInput";
import { User } from "Models/user.model";
import "Pages/Register/Register.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useDatabaseContext } from "Store";

type RegisterFormType = {
	FirstName: string;
	LastName: string;
	Email: string;
	Password: string;
	ConfirmPassword: string;
};

const Register = () => {
	const { databaseState, updateDatabase } = useDatabaseContext();
	const history = useHistory();
	console.log(databaseState);
	const {
		register,
		handleSubmit,
		watch,
		setError,
		formState: { errors }
	} = useForm<RegisterFormType>();
	const handleFormSubmit: SubmitHandler<RegisterFormType> = (formData) => {
		if (databaseState.find((user) => user.Email === formData.Email)) {
			setError("Email", { message: "Email already exists." });
			return;
		}
		const user = new User(formData);
		updateDatabase([...databaseState, user]);
		history.push("/login");
	};

	return (
		<div className="container">
			<h1 className="header">Sign Up</h1>
			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<TextInput
					{...register("FirstName", {
						required: "First name is required."
					})}
					hasError={!!errors.FirstName}
					errorText={errors.FirstName?.message}
					type="text"
					placeholder="First Name"
				/>
				<TextInput
					{...register("LastName", {
						required: "Last name is required."
					})}
					hasError={!!errors.LastName}
					errorText={errors.LastName?.message}
					type="text"
					placeholder="Last Name"
				/>
				<TextInput
					{...register("Email", {
						required: "Email is required.",
						pattern: {
							value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
							message: "Please enter a valid email"
						}
					})}
					hasError={!!errors.Email}
					errorText={errors.Email?.message}
					type="email"
					placeholder="Email"
				/>
				<TextInput
					{...register("Password", {
						required: "Password is required."
					})}
					hasError={!!errors.Password}
					errorText={errors.Password?.message}
					type="password"
					placeholder="Password"
				/>
				<TextInput
					{...register("ConfirmPassword", {
						required: "Confirm password is required",
						validate: (value) =>
							watch("Password") === value ||
							"Passwords don't match."
					})}
					hasError={!!errors.ConfirmPassword}
					errorText={errors.ConfirmPassword?.message}
					type="password"
					placeholder="Confirm Password"
				/>
				<Button
					buttonText="Sign Up"
					onClick={handleSubmit(handleFormSubmit)}
				>
					<i className="fas fa-user-plus"></i>
				</Button>
				<p>
					Already have an account?{" "}
					<span className="bottom-link">
						<Link to="/login">
							<a>Login</a>
						</Link>
					</span>
				</p>
			</form>
		</div>
	);
};

export default Register;
