import { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import NotepadModal from "../OpeningScene/NotepadModal"
import SuspectModal from "../OpeningScene/SuspectModal";
import { dialog2 } from "../../dialog/OpeningScene";
import '../OpeningScene/OpeningScene.css'
import { useDispatch, useSelector } from "react-redux";
import { getPlaces, postPlace } from "../../store/placesVisited";
import BackpackPopup from "../OpeningScene/BackpackPopup";


const FinishedRoute = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const places = useSelector(state => state.placesVisited)
    const [index, setIndex] = useState(0);
    const [seeFootage, setSeeFootage] = useState(false);


    useEffect(() => {
        dispatch(getPlaces())
    }, [dispatch])

    useEffect(() => {
        if (seeFootage) {
            setSeeFootage(true)
        }
    }, [seeFootage])


    if (places.length === 0) return <Redirect to='/' />

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
            <div className="dialog-box">
                <div className="first-choice">
                    {dialog2[index] && seeFootage && (
                        <>
                            <div className="dialog-text">
                                <p>{dialog2[index]}</p>
                            </div>
                            <button className='continue-button' onClick={() => {
                                if (!dialog2[index + 1]) {
                                    setSeeFootage(false)
                                    history.push('/office-finished')
                                }
                                setIndex(index + 1)
                                }}>continue...</button>
                        </>
                    )}
                    {!seeFootage && !places.includes('security footage') && !places.includes('salon') && places.includes('apartment') && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button onClick={(e) => {
                                    handleChoice(e, "salon")
                                    history.push('/salon')
                                }}>Visit Minnie's place of work</button>
                                <button onClick={(e) => {
                                    setSeeFootage(true);
                                    handleChoice(e, "security footage")
                                }}>Check the apartment complex security footage</button>
                                <button onClick={() => history.push('/search')}>Search the database for a person</button>
                                <button onClick={() => window.alert('Feature coming soon!')}>Go to the coffee shop</button>
                            </div>
                        </>
                    )}
                    {!seeFootage && places.includes('security footage') && !places.includes('salon') && !places.includes('apartment') && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button onClick={(e) => {
                                    handleChoice(e, "apartment")
                                    history.push('/apartment')
                                }}>Visit Minnie's apartment</button>
                                <button onClick={(e) => {
                                    handleChoice(e, "salon")
                                    history.push('/salon')
                                }}>Visit Minnie's place of work</button>
                                <button onClick={() => history.push('/search')}>Search the database for a person</button>
                                <button onClick={() => window.alert('Feature coming soon!')}>Go to the coffee shop</button>
                            </div>
                        </>
                    )}
                    {!seeFootage && !places.includes('security footage') && places.includes('salon') && !places.includes('apartment') && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button onClick={(e) => {
                                    handleChoice(e, "apartment")
                                    history.push('/apartment')
                                }}>Visit Minnie's apartment</button>
                                <button onClick={(e) => {
                                    setSeeFootage(true);
                                    handleChoice(e, "security footage")
                                }}>Check the apartment complex security footage</button>
                                <button onClick={() => history.push('/search')}>Search the database for a person</button>
                                <button onClick={() => window.alert('Feature coming soon!')}>Go to the coffee shop</button>
                            </div>
                        </>
                    )}
                    {!seeFootage && places.includes('security footage') && places.includes('salon') && !places.includes('apartment') && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button onClick={(e) => {
                                    handleChoice(e, "apartment")
                                    history.push('/apartment')
                                }}>Visit Minnie's apartment</button>
                                <button onClick={() => history.push('/search')}>Search the database for a person</button>
                                <button onClick={() => window.alert('Feature coming soon!')}>Go to the coffee shop</button>
                            </div>
                        </>
                    )}
                    {!seeFootage && places.includes('security footage') && !places.includes('salon') && places.includes('apartment') && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button onClick={(e) => {
                                    handleChoice(e, "salon")
                                    history.push('/salon')
                                }}>Visit Minnie's place of work</button>
                                <button onClick={() => history.push('/search')}>Search the database for a person</button>
                                <button onClick={() => window.alert('Feature coming soon!')}>Go to the coffee shop</button>
                            </div>
                        </>
                    )}
                    {!seeFootage && !places.includes('security footage') && places.includes('salon') && places.includes('apartment') && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button onClick={(e) => {
                                    setSeeFootage(true);
                                    handleChoice(e, "security footage")
                                }}>Check the apartment complex security footage</button>
                                <button onClick={() => history.push('/search')}>Search the database for a person</button>
                                <button onClick={() => window.alert('Feature coming soon!')}>Go to the coffee shop</button>
                            </div>
                        </>
                    )}
                    {!seeFootage && places.includes('security footage') && places.includes('salon') && places.includes('apartment') && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button onClick={() => history.push('/search')}>Search the database for a person</button>
                                <button onClick={() => window.alert('Feature coming soon!')}>Go to the coffee shop</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}


export default FinishedRoute
