import { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import NotepadModal from "../OpeningScene/NotepadModal"
import SuspectModal from "../OpeningScene/SuspectModal";
import { dialog1 } from "../../dialog/SalonScene";
import '../OpeningScene/OpeningScene.css'
import { useSelector } from "react-redux";




const SalonScene = () => {
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const places = useSelector(state => state.placesVisited)
    const [index, setIndex] = useState(0);


    if (!user) return <Redirect to='/signup' />


    return (
        <div className="home-screen">
            <h1>Thomasville Salon</h1>
            <div className="backpack-button">
                <button><img src="https://i.imgur.com/HbZRQyN.png" alt="backpack icon"></img></button>
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
                <img src="https://i.imgur.com/8ixElli.png" alt="Pippa Clements"></img>
            </div>
            <div className="dialog-box">
                <div className="first-choice">
                    {!places.includes('apartment') && !dialog1[index] && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button>Visit Minnie's apartment</button>
                                <button>Visit Minnie's downstairs neighbor</button>
                                <button onClick={() => history.push('/office-return')}>Return to the office</button>
                                <button>Go to the coffee shop</button>
                            </div>
                        </>
                    )}
                    {places.includes('apartment') && !dialog1[index] && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button>Visit Minnie's downstairs neighbor</button>
                                <button onClick={() => history.push('/office-return')}>Return to the office</button>
                                <button>Go to the coffee shop</button>
                            </div>
                        </>
                    )}
                </div>
                {index < 7 && (
                    <>
                        <div className="dialog-text">
                            <p>{dialog1[index]}</p>
                        </div>
                        <button className='continue-button' onClick={() => setIndex(index + 1)}>continue...</button>
                    </>
                )}
            </div>

        </div>
    )
}

export default SalonScene
