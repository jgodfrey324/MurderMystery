import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import NotepadModal from "../OpeningScene/NotepadModal"
import SuspectModal from "../OpeningScene/SuspectModal";
import { dialog1 } from "../../dialog/NeighborScene";
import '../OpeningScene/OpeningScene.css'
import BackpackPopup from "../OpeningScene/BackpackPopup";




const CriminalScene = () => {
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const [index, setIndex] = useState(0);


    if (!user) return <Redirect to='/signup' />


    return (
        <div className="home-screen">
            <h1>Minnie's Neighbor</h1>
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
                buttonImage={<img style={{borderRadius: '50px'}} src="https://i.imgur.com/WFMnS64.jpg" alt="suspect icon"></img>}
                modalComponent={<SuspectModal />}
                />
            </div>
            <div className="character-image">
                <img src="https://i.imgur.com/7k0Cpjd.png" alt="Kalum Ray"></img>
            </div>
            <div className="dialog-box">
                <div className="first-choice">
                    {!dialog1[index] && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button onClick={() => history.push('/office-finished')}>Return to the office</button>
                                {/* <button onClick={() => window.alert('Feature coming soon!')}>Go to the coffee shop</button> */}
                            </div>
                        </>
                    )}
                </div>
                {dialog1[index] && (
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

export default CriminalScene
