import { useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import NotepadModal from "../OpeningScene/NotepadModal"
import SuspectModal from "../OpeningScene/SuspectModal";
import '../OpeningScene/OpeningScene.css'
import { useDispatch, useSelector } from "react-redux";
import { getPlaces, postPlace } from "../../store/placesVisited";
import BackpackPopup from "../OpeningScene/BackpackPopup";


const OfficeReturnPage = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const places = useSelector(state => state.placesVisited)

    useEffect(() => {
        dispatch(getPlaces())
    }, [dispatch])


    const handleChoice = async (e, scene) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('scene', scene)

        await dispatch(postPlace(formData))
    }

    if (!user) return <Redirect to='/signup' />



    return (
        <div className="home-screen">
            <h1>Dept. Office</h1>
            <img src="https://i.imgur.com/1HDvBws.jpg" alt='department office'></img>
            <div className="backpack-button">
                <BackpackPopup />
            </div>
            <div className="notepad-button">
                <OpenModalButton
                buttonImage={<img src="https://i.imgur.com/7kwSq0B.png" alt='button icon'></img>}
                modalComponent={<NotepadModal />}
                />
            </div>
            <div className="suspect-button">
                <OpenModalButton
                buttonImage={<img style={{borderRadius: '50px'}} src="https://i.imgur.com/WFMnS64.jpg" alt="suspect icon"></img>}
                modalComponent={<SuspectModal />}
                />
            </div>
            <div className="dialog-box">
                <div className="first-choice">
                    {places[places.length - 1] === 'salon' && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button onClick={(e) => {
                                    if (!places.includes('neighbor')) {
                                        handleChoice(e, 'neighbor')
                                    }
                                    history.push('/neighbor')
                                }}>Visit Minnie's down stairs neighbor</button>
                                <button onClick={() => history.push('/search')}>Search the database for a person</button>
                                {/* <button onClick={() => window.alert('Feature coming soon!')}>Go to the coffee shop</button> */}
                            </div>
                        </>
                    )}
                    {places[places.length - 1] === 'Lucian' && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                {!places.includes('neighbor') && (
                                    <button onClick={(e) => {
                                        handleChoice(e, 'neighbor')
                                        history.push('/neighbor')
                                    }}>Visit Minnie's down stairs neighbor</button>
                                )}
                                <button onClick={() => history.push('/search')}>Search the database for a person</button>
                                {/* <button onClick={() => window.alert('Feature coming soon!')}>Go to the coffee shop</button> */}
                            </div>
                        </>
                    )}
                    {/* {(places[places.length - 1] === 'Penny' || places[places.length - 1] === 'Wilma' || places[places.length - 1] === 'Lea' || places[places.length - 1] === 'Fabian' || places[places.length - 1] === 'security footage') && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button onClick={() => history.push('/search')}>Search the database for a person</button>
                                <button onClick={() => history.push('/office-finished')}>Stop looking at footage</button>
                                <button>Go to the coffee shop</button>
                            </div>
                        </>
                    )} */}
                </div>
            </div>
        </div>
    )
}


export default OfficeReturnPage
