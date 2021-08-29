import "Components/Button/Button.css";
import IF from "Components/IF";
import { ReactNode } from "react";

export interface IButton {
	onClick: Function;
	buttonText: string;
	children?: ReactNode;
}

const Button = ({ onClick, buttonText, children }: IButton) => {
	return (
		<button className="button" onClick={() => onClick()}>
			<IF predicate={!!children}>
				<span className="button-span">{children}</span>
			</IF>
			{buttonText}
		</button>
	);
};

export default Button;
