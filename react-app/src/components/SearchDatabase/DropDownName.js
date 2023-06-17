import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { deleteNote } from "../../store/notes"
// import UpdateNoteModal from "./UpdateNoteModal";
import { postNameSearch } from "../../store/searchResults";
import { postPlace } from "../../store/placesVisited";
import './search.css'



const DropDownName = ({ allowedChars }) => {
    const dispatch = useDispatch();
    const history = useHistory()
    const [showMenu, setShowMenu] = useState(false);
    const [name, setName] = useState('');
    const searchRes = useSelector(state => state.searchResults)
    const places = useSelector(state => state.placesVisited)



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

    const handleChoice = async (e, scene) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('scene', scene)

        await dispatch(postPlace(formData))
    }



    const menuClassName = "menu-dropdown" + (showMenu ? "" : " hidden");

    if (!searchRes) return null;

    const results = searchRes.name;

    return (
        <div className="choice-buttons">
            <button onClick={() => {
                setName('')
                return openMenu()
                }}>Search by name</button>
            <div id='name-search-house' className={menuClassName}>
                <form onSubmit={handleSubmit}>
                    <input
                    style={{outline: 'none'}}
                    placeholder="Enter a full name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    minLength={1}
                    />
                    <button onClick={() => closeMenu()}>Search</button>
                </form>
                <button onClick={() => closeMenu()}>Cancel</button>
            </div>
            <div className="computer-screen">

            </div>
            <div className="search-results-house">
                {results.map(res => {
                    console.log('res from inside mapping =====> ', res)
                    return (
                        <div key={res.id} className="char-info-house" onClick={(e) => {
                            if (res.id === 6) {
                                window.alert('You are headed out to visit Kallum Ray')
                                return history.push('/boyfriend')
                            }
                            if (!allowedChars.includes(res.id)) {
                                window.alert('This person did\'t answer the phone')
                            }
                            if (allowedChars.includes(res.id)) {
                                if (places.includes(res.first_name)) {
                                    return window.alert('You\'ve already made a call to this person')
                                }
                                window.alert(`Calling ${res.first_name} ${res.last_name}...`)
                                handleChoice(e, res.first_name)
                                return history.push('/office-call')
                            }
                        }}>
                            <p className='char-name'>{res.first_name} {res.last_name}</p>
                            <p>Gender: {res.description.gender}</p>
                            <p>Age: {res.description.age}</p>
                            <p>Height: {res.description.height}</p>
                            <p>Hair color: {res.description.hair_color}</p>
                            <p>Occupation: {res.description.occupation.job_title}</p>
                            <p>Employer: {res.description.occupation.employer}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default DropDownName
