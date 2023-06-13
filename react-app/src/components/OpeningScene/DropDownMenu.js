import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteNote } from "../../store/notes"
import OpenModalButton from '../OpenModalButton'
import UpdateNoteModal from "./UpdateNoteModal";
import NotepadModal from "./NotepadModal";
import './OpeningScene.css';



const DropDownMenu = ({ note }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const [deleted, setDeleted] = useState(false);


    useEffect(() => {
        setDeleted(false)
        return () => null
    }, [deleted])



    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }
    const closeMenu = () => {
        if (!showMenu) return;
        setShowMenu(false)
    };


    const handleDelete = async (e, noteId) => {
        e.preventDefault();

        await dispatch(deleteNote(noteId))
        closeMenu()
        setDeleted(true);
    }



    const menuClassName = "menu-dropdown" + (showMenu ? "" : " hidden");

    return (
        <div className="button-menu-house">
            <button onClick={openMenu}>delete</button>
            <div className={menuClassName}>
                <button onClick={(e) => handleDelete(e, note.id)}>delete note</button>
                <button onClick={closeMenu}>cancel</button>
            </div>
            <div className='modal-edit-button'>
                <OpenModalButton
                    buttonImage={<i className="fa-solid fa-pencil" style={{color: "#000000"}}></i>}
                    modalComponent={<UpdateNoteModal note={note} />}
                />
            </div>
        </div>
    )
}


export default DropDownMenu
