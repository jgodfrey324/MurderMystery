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


    useEffect(() => {
        dispatch(getPlaces())
    }, [dispatch])



    // const handleChoice = async (e, scene) => {
    //     e.preventDefault();

    //     const formData = new FormData()
    //     formData.append('scene', scene)

    //     await dispatch(postNameSearch(formData))
    // }



    if (!user) return <Redirect to='/signup' />




    return (
        <div className="home-screen">
            <h1>Dept. Computer</h1>
            <img src="https://i.imgur.com/DxS5Dpg.png" alt='department office'></img>
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
                        <DropDownName allowedChars={[12, 3, 10, 11]} />
                        <DropDownDescr allowedChars={[12, 3, 10, 11]} />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SearchDatabase
