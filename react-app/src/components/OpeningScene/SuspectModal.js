import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { deleteSuspect, getSuspects, postSuspect } from '../../store/suspects';
import { getCharacters } from '../../store/characters';
import './OpeningScene.css'



const SuspectModal = () => {
    const dispatch = useDispatch();
    const characters = useSelector(state => state.characters)
    const suspects = Object.values(useSelector(state => state.suspects))


    useEffect(() => {
        dispatch(getCharacters())
        dispatch(getSuspects())
    }, [dispatch])


    const handleDelete = async (e, suspect) => {
        e.preventDefault();

        await dispatch(deleteSuspect(suspect.id))
    }

    const handleAddBack = async (e, id) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('id', id)

        await dispatch(postSuspect(formData))
    }


    if (!suspects) return null;

    const characterIds = []
    for (const character of Object.values(characters)) {
        characterIds.push(character.id)
    }
    const suspectIds = []
    for (const suspect of suspects) {
        suspectIds.push(suspect.character_id)
    }

    const addBackIds = []
    for (const id of characterIds) {
        if (!suspectIds.includes(id)) {
            addBackIds.push(id)
        }
    }

    return (
        <div className='suspect-modal-container'>
            <img src="https://i.imgur.com/7kwSq0B.png" alt='notebook'></img>
            <div className='suspect-container'>
                {suspects.map(suspect => {
                    return (
                        <div className='single-suspect' key={suspect.id}>
                            <p>{suspect.first_name} {suspect.last_name}</p>
                            <button onClick={(e) => handleDelete(e, suspect)}>remove suspect</button>
                        </div>
                    )
                })}
                <div className='add-back-buttons'>
                    {addBackIds.map(id => {
                        return (
                            <button key={id} onClick={(e) => handleAddBack(e, id)}>add back {characters[id]['first_name']} {characters[id]['last_name']}</button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}


export default SuspectModal
