import Button from "Components/Button/Button";
import LogoutButton from "Components/LogoutButton/LogoutButton";
import { useHistory } from "react-router";
import { useUserContext } from "Store";
import { clearUser } from "Store/User/userAction";

const Home = () => {
	const { userDispatch } = useUserContext();
	const history = useHistory();

	const handleLogout = () => {
		userDispatch(clearUser());
		history.push("login");
	};

	return (
		<div className="container">
			<LogoutButton
				// onClick={() => {}}
				onClick={() => handleLogout()}
				buttonText={"Logout"}
			/>
		</div>
	);
};

export default Home;
