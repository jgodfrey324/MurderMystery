import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from '../OpenModalButton';
import { logout } from "../../store/session";
import SolutionModal from '../SolutionModal';
import './Navigation.css';

function Navigation({ isLoaded }){
	const dispatch = useDispatch()
	const sessionUser = useSelector(state => state.session.user);

	const handleLogout = async (e) => {
		e.preventDefault();
		await fetch('/api/reset/');
		dispatch(logout());
	};

	const logoutFunc = async (e) => {
		e.preventDefault();
		await dispatch(logout());
	}


	return (
		<>
			{sessionUser && (
				<>
					<button id='logout' onClick={handleLogout}>End Game</button>
					<button id='save-game' onClick={(e) => logoutFunc(e)}>Save Game</button>
					<div id='solution'>
						<OpenModalButton
							buttonImage="Submit Answer"
							modalComponent={<SolutionModal />}
						/>
					</div>
				</>
			)}
		</>

		// null
	);
}

export default Navigation;
