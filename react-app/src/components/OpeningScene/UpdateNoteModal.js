import { useState, useEffect } from "react";
import { useDispatch } from "react-redux"
import { putNote } from "../../store/notes";



const UpdateNoteModal = ({ note }) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState('');
    const [submitted, setSubmitted] = useState(false)
    const [text, setText] = useState(note.text)
    const [showMenu, setShowMenu] = useState(false);
    const [updated, setUpdated] = useState(false);


    useEffect(() => {
        setUpdated(false)
        return () => null
    }, [updated])



    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }
    const closeMenu = () => {
        if (!showMenu) return;
        setShowMenu(false)
    };


    const handleSubmit = async(e) => {
        e.preventDefault();

        setSubmitted(true);

        const formData = new FormData()
        formData.append('text', text)

        const data = await dispatch(putNote(note.id, formData))

        if (data.errors) {
            setErrors(data.errors)
            return;
        }
        if (submitted && errors) {
            setErrors('');
        }

        setText(note.text);
        setSubmitted(false);
        closeMenu();
    }

    const menuClassName = "form-dropdown" + (showMenu ? "" : " hidden");

    return (
        <div className="update-modal-content">
            <button onClick={openMenu}><i className="fa-solid fa-pencil" style={{color: "#000000"}}></i></button>
            <form onSubmit={handleSubmit} className={menuClassName}>
                <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                />
                <div className="edit-button-house">
                    <button onClick={closeMenu}>cancel</button>
                    <button>update</button>
                </div>
            </form>
        </div>
    )
}


export default UpdateNoteModal
