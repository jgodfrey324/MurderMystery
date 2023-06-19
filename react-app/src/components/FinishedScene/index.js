import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";


const FinishedScene = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)


    const handleLogout = async (e) => {
		e.preventDefault();
		await fetch('/api/reset/');
		dispatch(logout());
	};

    if (!user) return <Redirect to='/signup'/>

    return (
        <>
            <h1>Congratulations!</h1>
            <p>You have upkept your reputation as detective and solved the crime in no time. Thank you for all your help. Click the button bellow to exit the game...</p>
            <button onClick={handleLogout}>End Game</button>
        </>
    )
}


export default FinishedScene
