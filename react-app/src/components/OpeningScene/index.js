import OpenModalButton from "../OpenModalButton";
import NotepadModal from "./NotepadModal"
import SuspectModal from "./SuspectModal";
import './OpeningScene.css'


const OpeningScene = () => {


    return (
        <>
            <h1>This is opening scene page!</h1>
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
        </>
    )
}


export default OpeningScene
