
const LOAD_CHARACTERS = 'characters/LOAD_CHARACTERS';


const loadCharacters = (characters) => ({
    type: LOAD_CHARACTERS,
    characters
});



export const getCharacters = () => async(dispatch) => {
    const res = await fetch('/api/characters/');

    if (res.ok) {
        const data = await res.json()
        dispatch(loadCharacters(data))
        return data
    }
}



const initialState = {}

const characterReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_CHARACTERS:
            newState = { ...action.characters }
            return newState;
        default:
            return state;
    }
}


export default characterReducer
