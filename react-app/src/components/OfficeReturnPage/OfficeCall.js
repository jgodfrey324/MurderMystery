import { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import NotepadModal from "../OpeningScene/NotepadModal"
import SuspectModal from "../OpeningScene/SuspectModal";
import { dialog2 } from "../../dialog/OpeningScene";
import '../OpeningScene/OpeningScene.css'
import { useDispatch, useSelector } from "react-redux";
import { getPlaces, postPlace } from "../../store/placesVisited";




const OfficeCall = () => {
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
                    {/* {dialog1[index] && places[places.length - 1] === 'Penny' && (
                        <>
                            <div className="dialog-text">
                                <p>{dialog1[index]}</p>
                            </div>
                            <button className='continue-button' onClick={() => setIndex(index + 1)}>continue...</button>
                        </>
                    )} */}
                    {/* {dialog2[index] && places[places.length - 1] === 'Lea' && (
                        <>
                            <div className="dialog-text">
                                <p>{dialog2[index]}</p>
                            </div>
                            <button className='continue-button' onClick={() => setIndex(index + 1)}>continue...</button>
                        </>
                    )} */}
                    {/* {dialog3[index] && places[places.length - 1] === 'Wilma' && (
                        <>
                            <div className="dialog-text">
                                <p>{dialog3[index]}</p>
                            </div>
                            <button className='continue-button' onClick={() => setIndex(index + 1)}>continue...</button>
                        </>
                    )} */}
                    {/* {dialog4[index] && places[places.length - 1] === 'Lucian' && (
                        <>
                            <div className="dialog-text">
                                <p>{dialog4[index]}</p>
                            </div>
                            <button className='continue-button' onClick={() => setIndex(index + 1)}>continue...</button>
                        </>
                    )} */}
                </div>
            </div>
        </div>
    )
}


export default OfficeCall
