import { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import NotepadModal from "../OpeningScene/NotepadModal"
import SuspectModal from "../OpeningScene/SuspectModal";
import { lucian, lea, wilma, wilma2, penny, fabian } from "../../dialog/callScene";
import '../OpeningScene/OpeningScene.css'
import { useDispatch, useSelector } from "react-redux";
import { getPlaces } from "../../store/placesVisited";
import BackpackPopup from "../OpeningScene/BackpackPopup";




const OfficeCall = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const places = useSelector(state => state.placesVisited)
    const [index, setIndex] = useState(0);


    useEffect(() => {
        dispatch(getPlaces())
    }, [dispatch])


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
                    {penny[index] && places[places.length - 1] === 'Penny' && (
                        <>
                            <div className="dialog-text">
                                <p>{penny[index]}</p>
                            </div>
                            <button className='continue-button' onClick={() => {
                                if (!penny[index + 1]) {
                                    return history.push('/office-finished')
                                }
                                setIndex(index + 1)
                                }}>continue...</button>
                        </>
                    )}
                    {lea[index] && places[places.length - 1] === 'Lea' && (
                        <>
                            <div className="dialog-text">
                                <p>{lea[index]}</p>
                            </div>
                            <button className='continue-button' onClick={() => {
                                if (!lea[index + 1]) {
                                    return history.push('/office-finished')
                                }
                                setIndex(index + 1)
                                }}>continue...</button>
                        </>
                    )}
                    {wilma[index] && (places[places.length - 1] === 'Wilma') && !(places[places.length - 2] === 'Penny') && (
                        <>
                            <div className="dialog-text">
                                <p>{wilma[index]}</p>
                            </div>
                            <button className='continue-button' onClick={() => {
                                if (!wilma[index + 1]) {
                                    return history.push('/office-finished')
                                }
                                setIndex(index + 1)
                                }}>continue...</button>
                        </>
                    )}
                    {wilma2[index] && places[places.length - 2] === 'Penny' && places[places.length - 1] === 'Wilma' && (
                        <>
                            <div className="dialog-text">
                                <p>{wilma2[index]}</p>
                            </div>
                            <button className='continue-button' onClick={() => {
                                if (!wilma2[index + 1]) {
                                    return history.push('/office-finished')
                                }
                                setIndex(index + 1)
                                }}>continue...</button>
                        </>
                    )}
                    {lucian[index] && places[places.length - 1] === 'Lucian' && (
                        <>
                            <div className="dialog-text">
                                <p>{lucian[index]}</p>
                            </div>
                            <button className='continue-button' onClick={() => {
                                if (!lucian[index + 1]) {
                                    return history.push('/office-return')
                                }
                                setIndex(index + 1)
                                }}>continue...</button>
                        </>
                    )}
                    {fabian[index] && places[places.length - 1] === 'Fabian' && (
                        <>
                            <div className="dialog-text">
                                <p>{fabian[index]}</p>
                            </div>
                            <button className='continue-button' onClick={() => {
                                if (!fabian[index + 1]) {
                                    return history.push('/office-finished')
                                }
                                setIndex(index + 1)
                                }}>continue...</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}


export default OfficeCall
