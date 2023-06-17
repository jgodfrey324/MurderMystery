const SEARCH_NAMES = 'searchResults/SEARCH_NAMES';
const SEARCH_DESC = 'searchResults/SEARCH_DESC';


const searchNames = (res) => ({
    type: SEARCH_NAMES,
    res
});

const searchDesc = (res) => ({
    type: SEARCH_DESC,
    res
});



export const postNameSearch = (name) => async(dispatch) => {
    const res = await fetch('/api/characters/search-name', {
        method: "POST",
        body: name
    });

    if (res.ok) {
        const { results } = await res.json()
        dispatch(searchNames(results))
        return results
    }
}

export const postDescSearch = (descr) => async (dispatch) => {
    const res = await fetch('/api/characters/search-descr', {
        method: "POST",
        body: descr
    });


    if (res.ok) {
        const { results } = await res.json()
        dispatch(searchDesc(results))
        return results
    }
}



const initialState = { name: [], description: [] }

const searchResultsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SEARCH_NAMES:
            newState = { description: [] }
            newState.name = action.res
            return newState;
        case SEARCH_DESC:
            newState = { name: [] }
            newState.description = action.res
            return newState;
        default:
            return state;
    }
}


export default searchResultsReducer
