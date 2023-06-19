import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import NotepadModal from "../OpeningScene/NotepadModal"
import SuspectModal from "../OpeningScene/SuspectModal";
import { postPlace, getPlaces } from "../../store/placesVisited";
import { dialog1 } from "../../dialog/SalonScene";
import '../OpeningScene/OpeningScene.css'
import BackpackPopup from "../OpeningScene/BackpackPopup";




const SalonScene = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const places = useSelector(state => state.placesVisited)
    const [index, setIndex] = useState(0);



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
            <h1>Thomasville Salon</h1>
            <img src="https://i.imgur.com/7DHwqz8.jpg" alt='thomasville salon'></img>
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
                <img src="https://i.imgur.com/8ixElli.png" alt="Pippa Clements"></img>
            </div>
            <div className="dialog-box">
                <div className="first-choice">
                    {!places.includes('boyfriend') && !places.includes('neighbor') && !dialog1[index] && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button onClick={() => history.push('/office-return')}>Return to office to search the database</button>
                                <button onClick={(e) => {
                                    handleChoice(e, 'neighbor')
                                    history.push('/neighbor')
                                }}>Visit Minnie's downstairs neighbor</button>
                                <button>Go to the coffee shop</button>
                            </div>
                        </>
                    )}
                    {places.includes('boyfriend') && !places.includes('neighbor') && !dialog1[index] && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button onClick={(e) => {
                                    handleChoice(e, 'neighbor')
                                    history.push('/neighbor')
                                }}>Visit Minnie's downstairs neighbor</button>
                                <button onClick={() => history.push('/office-finished')}>Return to office</button>
                                <button>Go to the coffee shop</button>
                            </div>
                        </>
                    )}
                    {!places.includes('boyfriend') && places.includes('neighbor') && !dialog1[index] && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button onClick={() => history.push('/office-return')}>Return to office to search the database</button>
                                <button>Go to the coffee shop</button>
                            </div>
                        </>
                    )}
                    {places.includes('boyfriend') && places.includes('neighbor') && !dialog1[index] && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button onClick={() => history.push('/office-finished')}>Return to office</button>
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
