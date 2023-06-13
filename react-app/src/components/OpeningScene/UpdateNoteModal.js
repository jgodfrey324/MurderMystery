import { useState } from "react";
import { useDispatch } from "react-redux"
import { putNote } from "../../store/notes";
import { useModal } from "../../context/Modal";



const UpdateNoteModal = ({ note }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // const notes = useSelector(state => state.notes);
    const [errors, setErrors] = useState('');
    const [submitted, setSubmitted] = useState(false)
    const [text, setText] = useState(note.text)


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

        setText('');
        setSubmitted(false);
        closeModal();
    }



    // if (!notes) return null;

    // const note = notes[noteId]



    return (
        <div className="update-modal-content">
            <form onSubmit={handleSubmit}>
                <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                />
                <button>update</button>
            </form>
        </div>
    )
}


export default UpdateNoteModal
