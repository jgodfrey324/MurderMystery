import { useHistory } from "react-router-dom"


const FinishedScene = () => {
    const history = useHistory();

    return (
        <div className="congrats-house">
            <h1>Congratulations!</h1>
            <p>You have upkept your reputation as detective and solved the crime in no time. Thank you for all your help. Click the button bellow to exit the game...</p>
            <button onClick={() => history.push('/signup')}>Return</button>
        </div>
    )
}


export default FinishedScene
