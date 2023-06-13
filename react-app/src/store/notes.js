// actions -->
const LOAD_NOTES = "notes/LOAD_NOTES";
const ADD_NOTE = "notes/ADD_NOTE";
const REMOVE_NOTE = 'notes/REMOVE_NOTE';


// action creators -->
const loadNotes = (notes) => ({
	type: LOAD_NOTES,
	notes
});

const addNote = (note) => ({
    type: ADD_NOTE,
    note
});

const removeNote = (noteId) => ({
    type: REMOVE_NOTE,
    noteId
})


// thunk action creators -->
export const getNotes = () => async (dispatch) => {
    const response = await fetch("/api/notes/");

	if (response.ok) {
        const data = await response.json();
		if (data.errors) {
            return data;
		}

		dispatch(loadNotes(data));
        return data;
	}
};

export const addNotes = (text) => async (dispatch) => {
    const res = await fetch('/api/notes/new', {
        method: "POST",
        body: text
    });

    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return data;
        }

        dispatch(addNote(data));
        return data;
    }
}

export const deleteNote = (noteId) => async (dispatch) => {
    const res = await fetch(`/api/notes/${noteId}/delete`, {
        method: "DELETE"
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(removeNote(noteId));

        return data;
    }
}



// initial state set -->
const initialState = {};
// reducer func -->
const notesReducer = (state = initialState, action) => {
    let newState;
	switch (action.type) {
		case LOAD_NOTES:
			newState = { ...action.notes }
            return newState;
        case ADD_NOTE:
            newState = { ...state }
            newState[action.note.id] = action.note
            return newState;
        case REMOVE_NOTE:
            newState = { ...state }
            delete newState[action.noteId]
            return newState;
		default:
			return state;
	}
}

export default notesReducer
