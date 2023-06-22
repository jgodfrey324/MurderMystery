import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { getPlaces, postPlace } from "../../store/placesVisited";
import OpenModalButton from "../OpenModalButton";
import NotepadModal from "../OpeningScene/NotepadModal"
import SuspectModal from "../OpeningScene/SuspectModal";
import { dialog1, dialog2 } from "../../dialog/BoyfriendScene";
import '../OpeningScene/OpeningScene.css'
import BackpackPopup from "../OpeningScene/BackpackPopup";




const BoyfriendScene = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const places = useSelector(state => state.placesVisited)
    const [index, setIndex] = useState(0);

    let audioUrl = require('../../static/Jl-Moody-Alt-Country.mp3');

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
            <audio src={audioUrl.default}></audio>
            <h1>Kallum's House</h1>
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
                buttonImage={<i id='suspect-icon' className="fa-solid fa-user-secret" style={{color: "#000000"}}></i>}
                modalComponent={<SuspectModal />}
                />
            </div>
            <div className="character-image">
                <img src="https://i.imgur.com/08kzjrF.png" alt="Kalum Ray"></img>
            </div>
            <div className="dialog-box">
                <div className="first-choice">
                    {!places.includes('apartment') && !dialog2[index] && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button onClick={(e) => {
                                    handleChoice(e, "apartment")
                                    history.push('/apartment')
                                }}>Visit Minnie's apartment</button>
                                <button onClick={() => history.push('/office-finished')}>Return to the office</button>
                                <button>Go to the coffee shop</button>
                            </div>
                        </>
                    )}
                    {places.includes('apartment') && !dialog1[index] && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button onClick={() => history.push('/office-finished')}>Return to the office</button>
                                <button>Go to the coffee shop</button>
                            </div>
                        </>
                    )}
                </div>
                {places.includes('apartment') && dialog1[index] && (
                    <>
                        <div className="dialog-text">
                            <p>{dialog1[index]}</p>
                        </div>
                        <button className='continue-button' onClick={() => setIndex(index + 1)}>continue...</button>
                    </>
                )}
                {!places.includes('apartment') && dialog2[index] && (
                    <>
                        <div className="dialog-text">
                            <p>{dialog2[index]}</p>
                        </div>
                        <button className='continue-button' onClick={() => setIndex(index + 1)}>continue...</button>
                    </>
                )}
            </div>

        </div>
    )
}

export default BoyfriendScene
