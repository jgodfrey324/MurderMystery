import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import "./OpeningScene.css"
import { deleteItem } from "../../store/backpack";


const DropItemModal = ({ itemId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch()

    const handleDelete = async () => {
        await dispatch(deleteItem(itemId))
    }

    return (
        <div className="drop-item-house">
            <h1>You are about to drop an item...</h1>
            <p>*Be careful, if you drop an item you may not encounter it again.*</p>
            <div className="drop-button-house">
                <button onClick={() => {
                    handleDelete()
                    closeModal()
                }}>Drop</button>
                <button onClick={() => closeModal()}>Keep</button>
            </div>
        </div>
    )
}

export default DropItemModal
