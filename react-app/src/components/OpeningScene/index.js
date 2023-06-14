import { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import NotepadModal from "./NotepadModal"
import SuspectModal from "./SuspectModal";
import { dialog1, dialog2 } from "../../dialog/OpeningScene";
import './OpeningScene.css'


const OpeningScene = () => {
    const [index, setIndex] = useState(0);
    const [seeFootage, setSeeFootage] = useState(false);


    return (
        <div className="home-office-screen">
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
                    {index < 3 && seeFootage && (
                        <>
                            <div className="dialog-text">
                                <p>{dialog2[index]}</p>
                            </div>
                            <button className='continue-button' onClick={() => setIndex(index + 1)}>continue...</button>
                        </>
                    )}
                    {seeFootage && !dialog2[index] && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button>Visit Minnie's apartment</button>
                                <button>Visit Minnie's place of work</button>
                                <button>Check the system for name's of the people on the footage</button>
                                <button>Go to the coffee shop</button>
                            </div>
                        </>
                    )}
                    {!seeFootage && !dialog1[index] && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button>Visit Minnie's apartment</button>
                                <button>Visit Minnie's place of work</button>
                                <button onClick={() => {
                                    setSeeFootage(true);
                                    setIndex(0);
                                    }}>Check the apartment complex security footage</button>
                                <button>Go to the coffee shop</button>
                            </div>
                        </>
                    )}
                </div>
                {index < 3 && !seeFootage && (
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


export default OpeningScene
