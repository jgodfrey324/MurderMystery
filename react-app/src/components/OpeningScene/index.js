import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { getPlaces, postPlace } from "../../store/placesVisited";
import OpenModalButton from "../OpenModalButton";
import NotepadModal from "./NotepadModal"
import SuspectModal from "./SuspectModal";
import { dialog1, dialog2 } from "../../dialog/OpeningScene";
import './OpeningScene.css'


const OpeningScene = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    // const places = useSelector(state => state.placeVisited)
    const [index, setIndex] = useState(0);
    const [seeFootage, setSeeFootage] = useState(false);


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
                                <button onClick={(e) => {
                                    handleChoice(e, "salon")
                                    history.push('/salon')
                                    }}>Visit Minnie's place of work</button>
                                <button>Search system for a person</button>
                                <button>Go to the coffee shop</button>
                            </div>
                        </>
                    )}
                    {!seeFootage && !dialog1[index] && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button>Visit Minnie's apartment</button>
                                <button onClick={() => history.push('/salon')}>Visit Minnie's place of work</button>
                                <button onClick={(e) => {
                                    setSeeFootage(true);
                                    setIndex(0);
                                    handleChoice(e, "security footage")
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
