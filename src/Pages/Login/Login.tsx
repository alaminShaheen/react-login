import Button from "Components/Button/Button";
import TextInput from "Components/TextInput/TextInput";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useDatabaseContext, useUserContext } from "Store";
import { updateUser } from "Store/User/userAction";
import "Pages/Login/Login.css";

type LoginFormType = {
	Email: string;
	Password: string;
};

const Login = () => {
	const history = useHistory();
	const { databaseState } = useDatabaseContext();
	const { userDispatch } = useUserContext();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError
	} = useForm<LoginFormType>();
	console.log(databaseState);

	const handleFormSubmit = (formData: LoginFormType) => {
		const dbUser = databaseState.find(
			(user) => user.Email === formData.Email
		);
		if (!dbUser) {
			console.log("yooo");
			setError("Email", { message: "Email is not registered." });
			return;
		} else if (dbUser && dbUser.Password !== formData.Password) {
			setError("Password", { message: "Please enter correct password." });
			return;
		}
		userDispatch(updateUser(dbUser));
		history.push("/");
	};

	return (
		<div className="container">
			<h1 className="header">Login</h1>
			<form className="login" onSubmit={handleSubmit(handleFormSubmit)}>
				<TextInput
					{...register("Email", {
						required: "Email is required.",
						pattern: {
							value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
							message: "Please enter a valid email."
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
				<Button
					buttonText="Sign Up"
					onClick={handleSubmit(handleFormSubmit)}
				>
					<i className="fas fa-sign-in-alt"></i>
				</Button>
				<p>
					Don't have an account?{" "}
					<span className="bottom-link">
						<Link to="/register">
							<a>Sign Up</a>
						</Link>
					</span>
				</p>
			</form>
		</div>
	);
};

export default Login;
