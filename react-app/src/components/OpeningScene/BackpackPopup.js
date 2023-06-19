import { useState } from 'react';
import './OpeningScene.css';


const BackpackPopup = () => {
    const [showMenu, setShowMenu] = useState(false);


    const openMenu = () => {
        if (showMenu) return setShowMenu(false);
        return setShowMenu(true);
    }


    const menuClassName = "backpack-popup" + (showMenu ? "" : " hidden");

    const spotHolder = [...Array(4)]

    return (
        <>
            <button onClick={openMenu}><img src="https://i.imgur.com/HbZRQyN.png" alt="backpack icon"></img></button>
            <div className={menuClassName}>
                {spotHolder.map(ele => {
                    console.log(ele)
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
