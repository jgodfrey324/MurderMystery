import { useState } from "react";
import { useDispatch } from "react-redux";
import { postNameSearch } from "../../store/searchResults";
import './search.css'



const DropDownName = () => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const [name, setName] = useState('');



    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }
    const closeMenu = () => {
        if (!showMenu) return;
        setShowMenu(false)
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('name', name)

        await dispatch(postNameSearch(formData))
        closeMenu()
    }


    const menuClassName = "menu-dropdown" + (showMenu ? "" : " hidden");


    return (
        <>
            <button onClick={() => {
                setName('')
                return openMenu()
                }}>Search by name</button>
            <div id='name-search-house' className={menuClassName}>
                <form onSubmit={handleSubmit}>
                    <input
                    style={{outline: 'none'}}
                    placeholder="Enter a first OR last name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    minLength={1}
                    />
                    <button onClick={() => closeMenu()}>Search</button>
                </form>
                <button onClick={() => closeMenu()}>Cancel</button>
            </div>
        </>
    )
}


export default DropDownName
