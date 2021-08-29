import {
	BrowserRouter,
	Redirect,
	Route,
	Switch,
	useLocation
} from "react-router-dom";
import "./App.css";
import Register from "Pages/Register/Register";
import Login from "Pages/Login/Login";
import { useUserContext } from "Store";
import Home from "Pages/Home/Home";

function App() {
	const { userState } = useUserContext();
	// console.log(useLocation())
	// const location = ;
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route exact path="/">
						{userState.Id ? <Home /> : <Redirect to="/login" />}
					</Route>
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
