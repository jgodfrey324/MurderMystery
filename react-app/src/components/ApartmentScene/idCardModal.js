import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import { postItem } from '../../store/backpack'
import '../OpeningScene/OpeningScene.css'
import './apartment.css'


const IdCardModal = ({ gymCard }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const backpack_items = Object.values(useSelector(state => state.backpack))

    const handlePickUp = async () => {
        const formData = new FormData();
        formData.append('itemId', gymCard.id)
        await dispatch(postItem(formData))
    }

    const item_names = []

    for (const item of backpack_items) {
        item_names.push(item.item.name)
    }

    return (
        <div className="item-detail-modal">
            <i onClick={() => closeModal()} className="fa-regular fa-rectangle-xmark" style={{color: "maroon"}}></i>
            <img src={gymCard.image} alt="small id card"></img>
            {/* <p id='item-description'>Description:</p> */}
            <p className='item-description'>{gymCard.description}</p>
            {backpack_items.length >= 4 && (
                <p>Your backpack is at capacity. Please drop an item before picking one up.</p>
            )}
            {!item_names.includes('Gym membership card') && backpack_items.length < 4 && (
                <>
                    <p>Would you like to:</p>
                    <div className="choice-buttons item-options">
                        <button onClick={() => {
                            handlePickUp()
                            closeModal()
                            }}>Pick up the ID card</button>
                        <button onClick={() => closeModal()}>Keep going</button>
                    </div>
                </>
            )}
        </div>
    )
}

export default IdCardModal
