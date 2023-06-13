import OpenModalButton from "../OpenModalButton";
import NotepadModal from "./NotepadModal"
import './OpeningScene.css'


const OpeningScene = () => {


    return (
        <>
            <h1>This is opening scene page!</h1>
            <div className="notepad-button">
                <OpenModalButton
                buttonImage="https://i.imgur.com/7kwSq0B.png"
                //   onItemClick={closeMenu}
                modalComponent={<NotepadModal />}
                />
            </div>
        </>
    )
}


export default OpeningScene
