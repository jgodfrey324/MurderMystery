import { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import NotepadModal from "../OpeningScene/NotepadModal"
import SuspectModal from "../OpeningScene/SuspectModal";
import { dialog2 } from "../../dialog/OpeningScene";
import '../OpeningScene/OpeningScene.css'
import { useDispatch, useSelector } from "react-redux";
import { getPlaces, postPlace } from "../../store/placesVisited";


const OfficeReturnPage = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const places = useSelector(state => state.placesVisited)
    const [index, setIndex] = useState(0);
    const [seeFootage, setSeeFootage] = useState(false);
    // const [visitSalon, setVisitSalon] = useState(false);


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

    // if (places.includes('salon')) console.log('salon');
    // if (places.includes('security footage')) console.log('security footage');



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
                    {!places.includes('security footage') && places.includes('salon') && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button onClick={(e) => {
                                    handleChoice(e, 'neighbor')
                                    history.push('/neighbor')
                                }}>Visit Minnie's down stairs neighbor</button>
                                <button onClick={() => history.push('/search')}>Search the database for a person</button>
                                <button>Go to the coffee shop</button>
                            </div>
                        </>
                    )}
                    {places.includes('security footage') && !places.includes('salon') && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button onClick={(e) => {
                                    handleChoice(e, 'neighbor')
                                    history.push('/neighbor')
                                }}>Visit Minnie's down stairs neighbor</button>
                                <button onClick={() => history.push('/search')}>Search the database for a person</button>
                                <button>Go to the coffee shop</button>
                            </div>
                        </>
                    )}
                    {places.includes('security footage') && places.includes('salon') && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button onClick={(e) => {
                                    handleChoice(e, 'neighbor')
                                    history.push('/neighbor')
                                }}>Visit Minnie's down stairs neighbor</button>
                                <button onClick={() => history.push('/search')}>Search the database for a person</button>
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
