import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { postPlace } from "../../store/placesVisited";
import OpenModalButton from "../OpenModalButton";
import NotepadModal from "./NotepadModal"
import SuspectModal from "./SuspectModal";
import { dialog1, dialog2 } from "../../dialog/OpeningScene";
import './OpeningScene.css'
import BackpackPopup from "./BackpackPopup";


const OpeningScene = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [index, setIndex] = useState(0);
    const [seeFootage, setSeeFootage] = useState(false);

    let audioUrl = require('../../static/Jl-Moody-Alt-Country.mp3');


    useEffect(() => {
        let sound = new Audio(audioUrl.default);
        sound.autoplay = true;
        sound.loop = true;
        // sound.play()
    }, [audioUrl.default]);

    const handleChoice = async (e, scene) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('scene', scene)

        await dispatch(postPlace(formData))
    }

    // const runInterval = (text) => {
    //     let charIndex = 0;
    //     const arr = text.split('')
    //     const timer = setInterval(() => {
    //         const char = arr[charIndex];
    //         charIndex++;

    //         if (charIndex >= arr.length) {
    //             clearInterval(timer);
    //         }
    //         // return <span>{char}</span>
    //         return char
    //     }, 100);
    //     // return timer
    // }

    //   for (let index = 0; index < dialog1.length; index++) {
    //     runInterval(dialog1[index], index);
    //   }

    if (!user) return <Redirect to='/signup' />

    // react-app/src/static/Jl-Moody-Alt-Country.mp3
    // console.log(sound, 'audio url ---------------------------> ')

    return (
        <div className="home-screen">
            {/* {sound} */}
            {/* {{ url_for('static', filename='bootstrap.min.css') }} */}
            {/* <img src='react-app/src/static/IMG_0063-removebg-preview.png'></img> */}
            <audio src={audioUrl.default}></audio>
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
                            <button className='continue-button' onClick={() => {
                                if (!dialog2[index + 1]) {
                                    setSeeFootage(false)
                                    history.push('/office-return')
                                }
                                setIndex(index + 1)
                                }}>continue...</button>
                        </>
                    )}
                    {!seeFootage && !dialog1[index] && (
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
                {dialog1[index] && !seeFootage && (
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
