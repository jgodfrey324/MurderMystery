import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './OpeningScene.css';
import { getItems } from '../../store/backpack';
import OpenModalButton from '../OpenModalButton';
import DropItemModal from './DropItemModal';
import ItemDetailModal from './ItemDetailModal';


const BackpackPopup = () => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const items = Object.values(useSelector(state => state.backpack))

    useEffect(() => {
        dispatch(getItems())
    }, [dispatch])


    const openMenu = () => {
        if (showMenu) return setShowMenu(false);
        return setShowMenu(true);
    }


    const menuClassName = "backpack-popup" + (showMenu ? "" : " hidden");

    const spotHolder = [...Array(4)]

    if (items.length > 0) {
        for (const ele of items) {
            spotHolder.shift()
            spotHolder.push(ele)
        }
    }
    if (spotHolder.length < 4) {
        spotHolder.push(null)
    }
    if (spotHolder.length > 4) {
        spotHolder.shift()
    }

    let id = 0

    return (
        <>
            <button onClick={openMenu}><img src="https://i.imgur.com/HbZRQyN.png" alt="backpack icon"></img></button>
            <div className={menuClassName}>
                {spotHolder.map(ele => {
                    id += 1
                    return (
                        <div key={id} className='item-house'>
                            {ele && (
                                <>
                                    <OpenModalButton
                                    buttonImage={<i className="fa-regular fa-square-minus" style={{color: "#000000"}}></i>}
                                    modalComponent={<DropItemModal itemId={ele.id} />}
                                    />
                                    <OpenModalButton
                                    buttonImage={<img src={ele.item.image} alt='item icon'></img>}
                                    modalComponent={<ItemDetailModal item={ele.item} />}
                                    />
                                    <p>{ele.item_quantity}</p>
                                </>
                            )}
                        </div>
                    )
                })}
            </div>
        </>

    )
}

export default BackpackPopup
