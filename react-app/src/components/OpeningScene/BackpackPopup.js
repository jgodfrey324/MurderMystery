import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './OpeningScene.css';
import { getItems } from '../../store/backpack';
import IdCardModal from '../ApartmentScene/idCardModal';
import OpenModalButton from '../OpenModalButton';


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

    const spotHolder = [...Array(3)]

    if (items.length > 0) {
        for (const ele of items) {
            spotHolder.unshift()
            spotHolder.push(ele)
        }
    }

    let id = 0

    return (
        <>
            <button onClick={openMenu}><img src="https://i.imgur.com/HbZRQyN.png" alt="backpack icon"></img></button>
            <div className={menuClassName}>
                {spotHolder.map(ele => {
                    console.log(ele, 'element from backpack iterations')
                    id += 1
                    return (
                        <div key={id} className='item-house'>
                            {ele && (
                                <OpenModalButton
                                buttonImage={<img src={ele.item.image} alt='item icon'></img>}
                                modalComponent={<IdCardModal gymCard={ele.item} />}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
        </>

    )
}

export default BackpackPopup
