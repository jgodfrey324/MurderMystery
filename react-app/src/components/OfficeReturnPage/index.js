import { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import NotepadModal from "../OpeningScene/NotepadModal"
import SuspectModal from "../OpeningScene/SuspectModal";
import { dialog2 } from "../../dialog/OpeningScene";
import '../OpeningScene/OpeningScene.css'
import { useSelector } from "react-redux";


const OfficeReturnPage = () => {
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const [index, setIndex] = useState(0);
    const [seeFootage, setSeeFootage] = useState(false);


    if (!user) return <Redirect to='/signup' />


    return (
        <div className="home-screen">
            <h1>Dept. Office</h1>
            <img src="https://i.imgur.com/1HDvBws.jpg" alt='department office'></img>
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
            <div className="dialog-box">
                <div className="first-choice">
                    {dialog2[index] && seeFootage && (
                        <>
                            <div className="dialog-text">
                                <p>{dialog2[index]}</p>
                            </div>
                            <button className='continue-button' onClick={() => setIndex(index + 1)}>continue...</button>
                        </>
                    )}
                    {!seeFootage && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button>Visit Minnie's apartment</button>
                                <button onClick={() => {
                                    setSeeFootage(true);
                                    }}>Check the apartment complex security footage</button>
                                <button>Search the system for a person</button>
                                <button>Go to the coffee shop</button>
                            </div>
                        </>
                    )}
                    {!dialog2[index] && seeFootage && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button>Visit Minnie's apartment</button>
                                <button onClick={() => history.push('/salon')}>Visit Minnie's place of work</button>
                                <button>Search the system for a person</button>
                                <button>Go to the coffee shop</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}


export default OfficeReturnPage
