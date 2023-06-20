import { useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import '../OpeningScene/OpeningScene.css'
import '../ApartmentScene/apartment.css'


const ItemDetailModal = ({ item }) => {
    const { closeModal } = useModal()
    const backpack_items = Object.values(useSelector(state => state.backpack))

    const item_names = []

    for (const item of backpack_items) {
        item_names.push(item.item.name)
    }

    return (
        <div className="item-detail-modal">
            <i onClick={() => closeModal()} className="fa-regular fa-rectangle-xmark" style={{color: "maroon"}}></i>
            <img src={item.image} alt="small id card"></img>
            <p className='item-description'>{item.description}</p>
        </div>
    )
}

export default ItemDetailModal
