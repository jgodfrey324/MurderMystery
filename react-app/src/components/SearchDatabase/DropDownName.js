import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { deleteNote } from "../../store/notes"
// import UpdateNoteModal from "./UpdateNoteModal";
import { postNameSearch } from "../../store/searchResults";
import '../OpeningScene/OpeningScene.css'



const DropDownName = () => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const [name, setName] = useState('');
    const results = useSelector(state => state.searchResults.name)



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
        <div className="choice-buttons">
            <button onClick={openMenu}>Search by name</button>
            <div id='name-search-house' className={menuClassName}>
                <form onSubmit={handleSubmit}>
                    <input
                    style={{outline: 'none'}}
                    placeholder="Enter a full name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    minLength={1}
                    />
                    <button>Search</button>
                    <button onClick={() => closeMenu()}>Cancel</button>
                </form>
            </div>
            <div className="search-results-house">
                {results.map(res => {
                    return (
                        <p key={res.id}>{res.first_name} {res.last_name}</p>
                    )
                })}
            </div>
        </div>
    )
}


export default DropDownName
