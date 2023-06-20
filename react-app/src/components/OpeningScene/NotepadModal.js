import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import { addNotes, getNotes } from "../../store/notes"
import DropDownMenu from "./DropDownMenu"
import './OpeningScene.css'
import { useModal } from "../../context/Modal"


const NotepadModal = () => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const notes = Object.values(useSelector(state => state.notes))
    const user = useSelector(state => state.session.user)
    const [text, setText] = useState('');
    const [errors, setErrors] = useState('');


    useEffect(() => {
        dispatch(getNotes())
    }, [dispatch])

    useEffect(() => {
        if (text.length > 255) {
            setErrors('Note cannot be longer than 255 characters.')
        }
        if (text.length <= 255) {
            setErrors('')
        }
    }, [text])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('text', text)

        await dispatch(addNotes(formData))

        setText('');
    }



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
            <i onClick={() => closeModal()} className="fa-regular fa-rectangle-xmark" style={{color: "maroon"}}></i>
            <img id='modal-notepad' src="https://i.imgur.com/7kwSq0B.png" alt='notepad'></img>
            <div className="notepad-empty-div">
                {user_notes.length === 0 ? <p className="note-contents">Add a new note! Write down any information you think you may need later</p> : user_notes.map(note => {
                    // console.log('note from inside mapping ----------------> ', note)
                    return (
                        <div className="note-contents" key={note.id}>
                            <p>{note.text}</p>
                            <DropDownMenu note={note} />
                        </div>
                    )
                })}
                <div className="new-note-form-house">
                    <form onSubmit={handleSubmit}>
                        <ul>
                            {errors && (
                            <p style={{color: 'maroon'}}>{errors}</p>
                            )}
                        </ul>
                        <textarea
                        placeholder="Write a note here..."
                        minLength={1}
                        required
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        />
                        <button disabled={errors ? true : false}>add note</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default NotepadModal
