import { useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import NotepadModal from "../OpeningScene/NotepadModal"
import SuspectModal from "../OpeningScene/SuspectModal";
import '../OpeningScene/OpeningScene.css'
import { useDispatch, useSelector } from "react-redux";
import { getPlaces, postPlace } from "../../store/placesVisited";
import DropDownName from "./DropDownName";
import DropDownDescr from "./DropDownDescr";


const SearchDatabase = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const searchRes = useSelector(state => state.searchResults)
    const places = useSelector(state => state.placesVisited)


    const allowedChars = [12, 3, 10, 11, 4]


    useEffect(() => {
        dispatch(getPlaces())
    }, [dispatch])




    const handleChoice = async (e, scene) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('scene', scene)

        await dispatch(postPlace(formData))
    }



    if (!user) return <Redirect to='/signup' />

    if (!searchRes) return null;

    const results = searchRes.name.length ? searchRes.name : searchRes.description


    return (
        <div className="home-screen">
            <h1>Dept. Computer</h1>
            <img src="https://i.imgur.com/1HDvBws.jpg" alt='department computer'></img>
            <div className="backpack-button">
                <button><img src="https://i.imgur.com/HbZRQyN.png" alt="backpack icon"></img></button>
            </div>
            <div className="notepad-button">
                <OpenModalButton
                buttonImage={<img src="https://i.imgur.com/7kwSq0B.png" alt='button icon'></img>}
                modalComponent={<NotepadModal />}
                />
            </div>
            <div className="suspect-button">
                <OpenModalButton
                buttonImage={<i id='suspect-icon' className="fa-solid fa-user-secret" style={{color: "#000000"}}></i>}
                modalComponent={<SuspectModal />}
                />
            </div>
            <div className="dialog-box">
                <div className="first-choice">
                    <p>Would you like to:</p>
                    <div className="choice-buttons">
                        <DropDownDescr />
                        <DropDownName />
                    </div>
                    <div className="computer-screen">

                    </div>
                    <div className="search-results-house">
                        {results.map(res => {
                            return (
                                <div key={res.id} className="char-info-house" onClick={(e) => {
                                    if (res.id === 6) {
                                        window.alert('You are headed out to visit Kallum Ray')
                                        return history.push('/boyfriend')
                                    }
                                    if (res.id === 13) {
                                        window.alert('You are headed out to visit Rush Giles')
                                        return history.push('/neighbor')
                                    }
                                    if (!allowedChars.includes(res.id)) {
                                        window.alert('This person didn\'t answer the phone')
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
            </div>
        </div>
    )
}


export default SearchDatabase
