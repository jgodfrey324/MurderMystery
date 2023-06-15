import { useDispatch } from "react-redux";
import { logout } from "../../store/session";


const FinishedScene = () => {
    const dispatch = useDispatch();


    const handleLogout = async (e) => {
		e.preventDefault();
		await fetch('/api/reset/');
		dispatch(logout());
	};

    return (
        <>
            <h1>Congratulations!</h1>
            <p>You have upkept your reputation as detective and solved the crime in no time. Thank you for all your help. Click the button bellow to exit the game...</p>
            <button onClick={handleLogout}>End Game</button>
        </>
    )
}


export default FinishedScene
