import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import NotepadModal from "../OpeningScene/NotepadModal"
import SuspectModal from "../OpeningScene/SuspectModal";
import { inTheHallway, dialog1 } from "../../dialog/apartmentScene";
import BackpackPopup from "../OpeningScene/BackpackPopup";
import TicketsModal from "./TicketsModal";
import IdCardModal from "./idCardModal";
import ReceiptModal from "./ReceiptModal";
import '../OpeningScene/OpeningScene.css'
import './apartment.css'



const ApartmentScene = () => {
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const [index, setIndex] = useState(0);
    const [inHallway, setInHallway] = useState(true);

    if (!user) return <Redirect to='/signup' />

    return (
        <div className="home-screen">
            <h1>Minnie's Apartment</h1>
            <img src="https://i.imgur.com/60YDXOU.jpg" alt='department computer'></img>
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
            {inHallway && (
                <div className="idcard-button">
                <OpenModalButton
                buttonImage={<img src="https://i.imgur.com/CCM1KIO.png" alt='button icon'></img>}
                modalComponent={<IdCardModal />}
                />
            </div>
            )}
            {!inHallway && (
                <>
                    <div className="tickets-button">
                        <OpenModalButton
                        buttonImage={<img src="https://i.imgur.com/L97q1Na.png" alt='button icon'></img>}
                        modalComponent={<TicketsModal />}
                        />
                    </div>
                    <div className="receipt-button">
                        <OpenModalButton
                        buttonImage={<img src="https://i.imgur.com/acum3BW.png" alt='button icon'></img>}
                        modalComponent={<ReceiptModal />}
                        />
                    </div>
                </>
            )}
            <div className="dialog-box">
                <div className="first-choice">
                    {inHallway && !inTheHallway[index] && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button>Pick up the ID card</button>
                                <button onClick={() => setInHallway(false)}>Keep going</button>
                            </div>
                        </>
                    )}
                    {!inHallway && !dialog1[index] && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button onClick={() => history.push('/office-finished')}>Return to the office</button>
                                <button>Go to the coffee shop</button>
                            </div>
                        </>
                    )}
                </div>
                {inHallway && inTheHallway[index] && (
                    <>
                        <div className="dialog-text">
                            <p>{inTheHallway[index]}</p>
                        </div>
                        <button className='continue-button' onClick={() => setIndex(index + 1)}>continue...</button>
                    </>
                )}
                {!inHallway && dialog1[index] && (
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


export default ApartmentScene
