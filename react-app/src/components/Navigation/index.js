import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from '../OpenModalButton';
import { logout } from "../../store/session";
import SolutionModal from '../SolutionModal';
import './Navigation.css';
import TutorialModal from '../TutorialModal';

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
					<button id='save-game' onClick={(e) => {
						if (sessionUser.id === 1) {
							return window.alert('Cannot save on default character. Please click \'end game\'.')
						}
						return logoutFunc(e)
						}}>Save Game</button>
					<div id='solution'>
						<OpenModalButton
							buttonImage="Submit Answer"
							modalComponent={<SolutionModal />}
						/>
					</div>
					<div id='tutorial-nav'>
						<OpenModalButton
							buttonImage={<i className="fa-regular fa-circle-question" style={{color: "#ffffff"}}></i>}
							modalComponent={<TutorialModal />}
						/>
					</div>
				</>
			)}
		</>
	);
}

export default Navigation;
