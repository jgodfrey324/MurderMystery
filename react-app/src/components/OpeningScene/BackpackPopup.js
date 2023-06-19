import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './OpeningScene.css';
import { getItems } from '../../store/backpack';


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
        for (const ele in items) {
            spotHolder.push(ele)
        }
    }

    return (
        <>
            <button onClick={openMenu}><img src="https://i.imgur.com/HbZRQyN.png" alt="backpack icon"></img></button>
            <div className={menuClassName}>
                {spotHolder.map(ele => {
                    return (
                        <div className='item-house'>

                        </div>
                    )
                })}
            </div>
        </>

    )
}

export default BackpackPopup
