import { InputHTMLAttributes, useState } from "react";
import "Components/TextInput/TextInput.css";
import IF from "Components/IF";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	errorText?: string;
	hasError?: boolean;
}

const TextInput = ({ className, errorText, hasError, ...rest }: IInput) => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<div>
			<div className="input-container">
				<IF predicate={rest.type === "password"}>
					<input
						{...rest}
						type={showPassword ? "text" : rest.type}
						className="text-field"
					/>
					<IF predicate={!showPassword}>
						<i
							className="far fa-eye-slash"
							onClick={() => setShowPassword(!showPassword)}
						/>
					</IF>
					<IF predicate={showPassword}>
						<i
							className="far fa-eye"
							onClick={() => setShowPassword(!showPassword)}
						/>
					</IF>
				</IF>
				<IF predicate={rest.type !== "password"}>
					<input {...rest} className="text-field" />
				</IF>
			</div>
			<IF predicate={!!hasError}>
				<p className="error-text">{errorText}</p>
			</IF>
		</div>
	);
};

export default TextInput;
