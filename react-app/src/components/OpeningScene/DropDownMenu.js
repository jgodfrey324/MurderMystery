import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteNote } from "../../store/notes"
import UpdateNoteModal from "./UpdateNoteModal";
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
            <button onClick={openMenu}><i className="fa-regular fa-trash-can" style={{color: "#000000"}}></i></button>
            <div className={menuClassName}>
                <button onClick={(e) => handleDelete(e, note.id)}>delete note</button>
                <button onClick={closeMenu}>cancel</button>
            </div>
            <div className='modal-edit-button'>
                <UpdateNoteModal note={note} />
            </div>
        </div>
    )
}


export default DropDownMenu
