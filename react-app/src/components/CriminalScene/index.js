import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { getPlaces } from "../../store/placesVisited";
import OpenModalButton from "../OpenModalButton";
import NotepadModal from "../OpeningScene/NotepadModal"
import SuspectModal from "../OpeningScene/SuspectModal";
import { dialog1 } from "../../dialog/NeighborScene";
import '../OpeningScene/OpeningScene.css'




const CriminalScene = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const places = useSelector(state => state.placesVisited)
    const [index, setIndex] = useState(0);

    useEffect(() => {
        dispatch(getPlaces())
    }, [dispatch])


    if (!user) return <Redirect to='/signup' />


    return (
        <div className="home-screen">
            {(places.includes('apartment') || places.includes('security')) && (
                <h1>Rush's Apartment</h1>
            )}
            <h1>Downstairs Neighbor</h1>
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
                <img src="https://i.imgur.com/7k0Cpjd.png" alt="Kalum Ray"></img>
            </div>
            <div className="dialog-box">
                <div className="first-choice">
                    {!dialog1[index] && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button onClick={() => history.push('/office-finished')}>Return to the office</button>
                                <button>Go to the coffee shop</button>
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
