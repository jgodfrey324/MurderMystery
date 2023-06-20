import { useState, useEffect } from "react";
import { useDispatch } from "react-redux"
import { putNote } from "../../store/notes";
import './OpeningScene.css'


const UpdateNoteModal = ({ note }) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState('');
    const [text, setText] = useState(note.text)
    const [showMenu, setShowMenu] = useState(false);
    const [updated, setUpdated] = useState(false);


    useEffect(() => {
        setUpdated(false)
        return () => null
    }, [updated])

    useEffect(() => {
        console.log('use effect is running')
        if (text.length > 255) {
            setErrors('Note cannot be longer than 255 characters.')
        }
        if (text.length <= 255) {
            setErrors('')
        }
    }, [text])


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

        const formData = new FormData()
        formData.append('text', text)

        await dispatch(putNote(note.id, formData))

        setText(note.text);
        closeMenu();
    }

    const menuClassName = "form-dropdown" + (showMenu ? "" : " hidden");

    return (
        <div className="update-modal-content">
            <button onClick={openMenu}><i className="fa-solid fa-pencil" style={{color: "#000000"}}></i></button>
            <form onSubmit={handleSubmit} className={menuClassName}>
                <ul>
                    {errors && (
                    <p style={{color: 'maroon', position: 'absolute', bottom: '-2px', fontSize: '14px', left: '130px'}}>{errors}</p>
                    )}
                </ul>
                <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                />
                <div className="edit-button-house">
                    <button style={{cursor: 'pointer'}}onClick={closeMenu}>cancel</button>
                    <button disabled={errors ? true : false}>update</button>
                </div>
            </form>
        </div>
    )
}


export default UpdateNoteModal
