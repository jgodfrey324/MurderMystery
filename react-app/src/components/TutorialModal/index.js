import { useModal } from '../../context/Modal'
import './tutorial.css'


const TutorialModal = () => {
    const { closeModal } = useModal()

    return (
        <div className='tutorial-house'>
            <i onClick={() => closeModal()} className="fa-regular fa-rectangle-xmark" style={{color: "maroon"}}></i>
            <h1>Welcome to Case #1124</h1>
            <div className='tutorial-text'>
                <p>In this game you are a detective tasked with aiding the nearby town solve a mystery.</p>
                <p>The available details of this case are available in the documents given to you in your backpack.</p>
                <p>As a detective you have access to a backpack, which has a max capacity of 4 items, so be sure not to exceed this! Click the backpack icon to open the backpack, then click any item withtin the pack to examine it. Click the '-' to drop an item. To close the pack, click the backpack icon again.</p>
                <p>You also have access to a notepad and a list of suspects. You can narrow down your list of suspects by clicking 'remove supsect'. If you later change your mind, just find the supsects name and click 'add back'.</p>
                <p>Every good detective utilizes a notepad. Don't be afraid to jot down bits of dialog or descriptions, as you may not see that information again!</p>
                <p>Later on, you may encouter a 'search database' option. Be sure to click on the character you are searching for if you find them! You can interact with all characters through the database.</p>
                <p>When you think you know who-dun-it, click 'submit answer' to input your guess. The input requires a first and last name, proper spelling and capitalization!</p>
                <p>If you decide to quite the game, you have two options: 'save game', or 'end game'. Clicking 'end game' will delete your character and all progress made. If you wish to save and exit, click 'save game'.</p>
            </div>
            <p id='side-note'>* A note on this: if you choose to use a default character, you cannot save data. All progress will be deleted. *</p>

        </div>

    )
}


export default TutorialModal
