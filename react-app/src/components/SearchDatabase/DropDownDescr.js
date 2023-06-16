import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import '../OpeningScene/OpeningScene.css'
import { postDescSearch } from "../../store/searchResults";
import { postPlace } from "../../store/placesVisited";



const DropDownDescr = ({ allowedChars }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const results = useSelector(state => state.searchResults.description)
    const [showMenu, setShowMenu] = useState(false);
    const [occupation, setOccupation] = useState('')
    const [age, setAge] = useState([]);
    const [hair, setHair] = useState('');
    const [gender, setGender] = useState('');


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
        formData.append('occupation', occupation)
        formData.append('age', age)
        formData.append('hair_color', hair)
        formData.append('gender', gender)

        await dispatch(postDescSearch(formData))
        closeMenu()
    }

    const handleChoice = async (e, scene) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('scene', scene)

        await dispatch(postPlace(formData))
    }



    const menuClassName = "menu-dropdown" + (showMenu ? "" : " hidden");

    return (
        <div className="choice-buttons">
            <button onClick={openMenu}>Search by description</button>
            <div id='descr-search-house' className={menuClassName}>
                <form onSubmit={handleSubmit}>
                    <p>*If you are unsure of any fields, it may be best to leave them blank for more results*</p>
                    <label>
                        Are you looking for a...
                        <select
                        onChange={(e) => setGender(e.target.value)}
                        >
                            <option value={' '}> </option>
                            <option value={'Male'}>Male</option>
                            <option value={'Female'}>Female</option>
                        </select>
                    </label>
                    <label>
                        Hair color:
                        <select
                        onChange={(e) => setHair(e.target.value)}
                        >
                            <option value={' '}> </option>
                            <option value={'Blonde'}>Blonde</option>
                            <option value={'Brown'}>Brown</option>
                            <option value={'Black'}>Black</option>
                            <option value={'Auburn'}>Auburn</option>
                        </select>
                    </label>
                    <label>
                        Age:
                        <select
                        onChange={(e) => setAge(e.target.value)}
                        >
                            <option value={[20, 45]}> </option>
                            <option value={[20, 25]}>20-25</option>
                            <option value={[25, 30]}>25-30</option>
                            <option value={[30, 35]}>30-35</option>
                            <option value={[35, 40]}>35-40</option>
                            <option value={[40, 45]}>40-45</option>
                        </select>
                    </label>
                    <label>
                        Occupation:
                        <select
                        onChange={(e) => setOccupation(e.target.value)}
                        >
                            <option value={' '}> </option>
                            <option value={'Hairstylist'}>Hairstylist</option>
                            <option value={'Server'}>Server</option>
                            <option value={'Butcher'}>Butcher</option>
                            <option value={'Sales clerk'}>Sales Clerk</option>
                            <option value={'Delivery driver'}>Delivery Driver</option>
                            <option value={'Office assistant'}>Office Assistant</option>
                            <option value={'Dental assistant'}>Dental Assistant</option>
                        </select>
                    </label>
                    <button onClick={() => closeMenu()}>Search</button>
                </form>
                <button onClick={() => closeMenu()}>Cancel</button>
            </div>
            <div className="search-results-house">
                {results.map(res => {
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


export default DropDownDescr
