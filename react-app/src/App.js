import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import OpeningScene from "./components/OpeningScene";
import SalonScene from "./components/SalonScene";
import OfficeReturnPage from "./components/OfficeReturnPage";
import FinishedScene from "./components/FinishedScene";
import BoyfriendScene from "./components/BoyfriendScene";
import CriminalScene from "./components/CriminalScene";
import FinishedRoute from "./components/OfficeReturnPage/FinishedRoute";
import SearchDatabase from "./components/SearchDatabase";
import OfficeCall from "./components/OfficeReturnPage/OfficeCall";
import ApartmentScene from "./components/ApartmentScene";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <OpeningScene />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/congrats'>
            <FinishedScene />
          </Route>
          <Route path='/office-return'>
            <OfficeReturnPage />
          </Route>
          <Route path='/search'>
            <SearchDatabase />
          </Route>
          <Route path='/office-call'>
            <OfficeCall />
          </Route>
          <Route path='/office-finished'>
            <FinishedRoute />
          </Route>
          <Route path='/salon'>
            <SalonScene />
          </Route>
          <Route path='/apartment'>
            <ApartmentScene />
          </Route>
          <Route path='/boyfriend'>
            <BoyfriendScene />
          </Route>
          <Route path='/neighbor'>
            <CriminalScene />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
