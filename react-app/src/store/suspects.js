
const LOAD_SUSPECTS = 'suspects/LOAD_SUSPECTS';



const loadSuspects = (suspects) => ({
    type: LOAD_SUSPECTS,
    suspects
});



export const getSuspects = () => async(dispatch) => {
    const res = await fetch('/api/suspects/');

    if (res.ok) {
        const data = await res.json()
        dispatch(loadSuspects(data))
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
        default:
            return state;
    }
}


export default suspectsReducer
