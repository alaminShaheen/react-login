import { IButton } from "Components/Button/Button"
import "Components/LogoutButton/LogoutButton.css"

interface ILogoutButton extends IButton {}

const LogoutButton = ({buttonText, onClick}: ILogoutButton) => {
    return (
        <button className="logout-button" onClick={() => onClick()}>
            <i className="fas fa-power-off"></i>
        </button>
    )
}

export default LogoutButton
