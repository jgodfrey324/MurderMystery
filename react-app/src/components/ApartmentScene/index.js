import { useEffect, useState } from "react";
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
    const [items, setItems] = useState({})
    const backpack_items = Object.values(useSelector(state => state.backpack))

    const getItems = async () => {
        const res = await fetch('/api/backpack_items/items/all')
        const data = await res.json()

        setItems(data);
        return data
    }

    useEffect(() => {
        getItems()
    }, [])

    const item_names = []

    for (const item of backpack_items) {
        item_names.push(item.item.name)
    }


    if (!user) return <Redirect to='/signup' />

    return (
        <div className="home-screen">
            <h1>Allen Grove</h1>
            {inHallway ? <img src="https://i.imgur.com/60YDXOU.jpg" alt='hallway'></img> : <img src="https://i.imgur.com/cQdClX6.jpg" alt='apartment livingroom'></img>}
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
            {inHallway && Object.values(items)[4] && !item_names.includes(Object.values(items)[4].name) && (
                <div className="idcard-button">
                <OpenModalButton
                buttonImage={<img src="https://i.imgur.com/CCM1KIO.png" alt='button icon'></img>}
                modalComponent={<IdCardModal gymCard={Object.values(items)[4]} />}
                />
            </div>
            )}
            {!inHallway && (
                <>
                    <div className="tickets-button">
                        <OpenModalButton
                        buttonImage={<img src="https://i.imgur.com/L97q1Na.png" alt='button icon'></img>}
                        modalComponent={<TicketsModal tickets={Object.values(items)[3]} />}
                        />
                    </div>
                    <div className="receipt-button">
                        <OpenModalButton
                        buttonImage={<img src="https://i.imgur.com/acum3BW.png" alt='button icon'></img>}
                        modalComponent={<ReceiptModal receipt={Object.values(items)[2]} />}
                        />
                    </div>
                </>
            )}
            <div className="dialog-box">
                <div className="first-choice">
                    {/* {inHallway && !inTheHallway[index] && (
                        <>
                            <p>Would you like to:</p>
                            <div className="choice-buttons">
                                <button>Pick up the ID card</button>
                                <button onClick={() => setInHallway(false)}>Keep going</button>
                            </div>
                        </>
                    )} */}
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
                        <button className='continue-button' onClick={() => {
                            if (!inTheHallway[index + 1]) {
                                setInHallway(false)
                            }
                            setIndex(index + 1)
                            }}>continue...</button>
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
