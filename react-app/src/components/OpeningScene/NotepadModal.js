import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import { addNotes, deleteNote, getNotes } from "../../store/notes"
import './OpeningScene.css'


const NotepadModal = () => {
    const dispatch = useDispatch()
    const notes = Object.values(useSelector(state => state.notes))
    const user = useSelector(state => state.session.user)
    const [text, setText] = useState('');
    const [errors, setErrors] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        dispatch(getNotes())
    }, [dispatch])


    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitted(true);

        const formData = new FormData()
        formData.append('text', text)

        const data = await dispatch(addNotes(formData))

        if (data.errors) {
            setErrors(data.errors)
            return;
        }
        if (submitted && errors) {
            setErrors('');
        }

        setText('');
        setSubmitted(false);
    }




    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    const closeMenu = () => setShowMenu(false);


    const handleDelete = async (e, note) => {
        e.preventDefault();

        await dispatch(deleteNote(note.id))
        closeMenu()
        return
    }



    const menuClassName = "menu-dropdown" + (showMenu ? "" : " hidden");



    if (!user) return <Redirect to='/signup' />

    if (!notes) return null

    const user_notes = []

    for (const note of notes) {
        if (note.user_id === user.id) {
            user_notes.push(note)
        }
    }


    return (
        <div className="notepad-content-house">
            <img id='modal-notepad' src="https://i.imgur.com/7kwSq0B.png" alt='notepad'></img>
            <div className="notepad-empty-div">
                {user_notes.length === 0 ? <p className="note-contents">Add a new note! Write down any information you think you may need later</p> : user_notes.map(note => {
                    return (
                        <div className="note-contents" key={note.id}>
                            <p>{note.text}</p>
                            <div className="button-menu-house">
                                <button onClick={openMenu}>delete</button>
                                <div className={menuClassName}>
                                    <button onClick={(e) => handleDelete(e, note)}>delete note?</button>
                                    <button onClick={closeMenu}>cancel</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className="new-note-form-house">
                    <form onSubmit={handleSubmit}>
                        <ul>
                            {errors && (
                            <p>{errors}</p>
                            )}
                        </ul>
                        <textarea
                        placeholder="Write a note here..."
                        minLength={1}
                        maxLength={255}
                        required
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        />
                        <button>add note</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default NotepadModal
