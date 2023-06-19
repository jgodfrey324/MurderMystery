
const LOAD_ITEMS = 'suspects/LOAD_ITEMS';
const REMOVE_ITEM = 'suspects/REMOVE_ITEM';
const ADD_ITEM = 'suspects/ADD_ITEM';


const loadItems = (items) => ({
    type: LOAD_ITEMS,
    items
});

const removeItem = (itemId) => ({
    type: REMOVE_ITEM,
    itemId
});

const addItem = (item) => ({
    type: ADD_ITEM,
    item
})



export const getItems = () => async(dispatch) => {
    const res = await fetch('/api/backpack_items/');

    if (res.ok) {
        const data = await res.json()
        dispatch(loadItems(data))
        return data
    }
}

export const deleteItem = (itemId) => async(dispatch) => {
    const res = await fetch(`/api/backpack_items/${itemId}/delete`, {
        method: "DELETE"
    });

    if (res.ok) {
        const data = await res.json()
        dispatch(removeItem(itemId))
        return data
    }
}

export const postItem = (itemId) => async(dispatch) => {
    const res = await fetch('/api/backpack_items/new', {
        method: "POST",
        body: itemId
    });

    if (res.ok) {
        const data = await res.json()
        dispatch(addItem(data))
        return data
    }
}



const initialState = {}

const backpackItemsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ITEMS:
            newState = { ...action.items }
            return newState;
        case REMOVE_ITEM:
            newState = { ...state }
            delete newState[action.itemId]
            return newState;
        case ADD_ITEM:
            newState = { ...state }
            newState[action.item.id] = action.item
            return newState;
        default:
            return state;
    }
}


export default backpackItemsReducer
