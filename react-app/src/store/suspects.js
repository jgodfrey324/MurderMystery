
const LOAD_SUSPECTS = 'suspects/LOAD_SUSPECTS';
const REMOVE_SUSPECT = 'suspects/REMOVE_SUSPECTS';
const ADD_SUSPECT = 'suspects/ADD_SUSPECT';


const loadSuspects = (suspects) => ({
    type: LOAD_SUSPECTS,
    suspects
});

const removeSuspect = (suspectId) => ({
    type: REMOVE_SUSPECT,
    suspectId
});

const addSuspect = (suspect) => ({
    type: ADD_SUSPECT,
    suspect
})



export const getSuspects = () => async(dispatch) => {
    const res = await fetch('/api/suspects/');

    if (res.ok) {
        const data = await res.json()
        dispatch(loadSuspects(data))
        return data
    }
}

export const deleteSuspect = (suspectId) => async(dispatch) => {
    const res = await fetch(`/api/suspects/${suspectId}/delete`, {
        method: "DELETE"
    });

    if (res.ok) {
        const data = await res.json()
        dispatch(removeSuspect(suspectId))
        return data
    }
}

export const postSuspect = (characterId) => async(dispatch) => {
    const res = await fetch('/api/suspects/add', {
        method: "POST",
        body: characterId
    });

    if (res.ok) {
        const data = await res.json()
        dispatch(addSuspect(data))
        return data
    }
}



const initialState = {}

const suspectsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SUSPECTS:
            newState = { ...action.suspects }
            return newState;
        case REMOVE_SUSPECT:
            newState = { ...state }
            delete newState[action.suspectId]
            return newState;
        case ADD_SUSPECT:
            newState = { ...state }
            newState[action.suspect.id] = action.suspect
            return newState;
        default:
            return state;
    }
}


export default suspectsReducer
