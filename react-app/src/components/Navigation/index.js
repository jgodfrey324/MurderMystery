import React from 'react';
import { useDispatch } from "react-redux";
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
import { logout } from "../../store/session";
import './Navigation.css';

function Navigation({ isLoaded }){
	const dispatch = useDispatch()
	// const sessionUser = useSelector(state => state.session.user);

	const handleLogout = async (e) => {
		e.preventDefault();
		await fetch('/api/reset/');
		dispatch(logout());
	  };


	return (
		<button id='logout' onClick={handleLogout}>Log Out</button>
		// null
	);
}

export default Navigation;
