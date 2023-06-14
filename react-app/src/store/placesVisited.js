const LOAD_PLACES = 'placesVisited/LOAD_PLACES';
const ADD_PLACE = 'placesVisited/ADD_PLACE';


const loadPlaces = (places) => ({
    type: LOAD_PLACES,
    places
});

const addPlace = (place) => ({
    type: ADD_PLACE,
    place
});



export const getPlaces = () => async(dispatch) => {
    const res = await fetch('/api/places/');

    if (res.ok) {
        const data = await res.json()
        dispatch(loadPlaces(data))
        return data
    }
}

export const postPlace = (scene) => async (dispatch) => {
    const res = await fetch('/api/places/new', {
        method: "POST",
        body: scene
    });

    if (res.ok) {
        const data = await res.json()
        dispatch(addPlace(data))
        return data
    }
}



const initialState = {}

const placesVisitedReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_PLACES:
            newState = { ...action.places }
            return newState;
        case ADD_PLACE:
            newState = { ...state }
            newState[action.place.id] = action.place
            return newState;
        default:
            return state;
    }
}


export default placesVisitedReducer
