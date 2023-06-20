import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import { getCharacters } from '../../store/characters';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useModal } from '../../context/Modal';
import '../OpeningScene/OpeningScene.css'



const SolutionModal = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const { closeModal } = useModal();
    const characters = Object.values(useSelector(state => state.characters))
    const user = useSelector(state => state.session.user)
    const [answer, setAnswer] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState('');


    useEffect(() => {
        dispatch(getCharacters())
        // dispatch(getSuspects())
    }, [dispatch])

    if (!characters) return null;

    const character_names = []
    for (const character of characters) {
        character_names.push(`${character.first_name} ${character.last_name}`)
    }




    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitted(true);

        const res = await fetch('/api/solution/')
        const solution_file = await res.json()

        if (solution_file.answer === answer) {
            closeModal()
            return history.push('/congrats')
        }
        if (character_names.includes(answer) && solution_file.answer !== answer) {
            setErrors('Not quite! I know you can do it, take minute to look over your notes.')
        }

        if (!character_names.includes(answer)) {
            setErrors('Please enter valid character name.')
        }
        console.log(errors, 'errors')

        if (submitted && errors) {
            console.log('i got reset')
            setErrors('')
        }
        console.log(submitted, 'submitted')

        setAnswer('');
        setSubmitted(false);
    }


    if (!user) return <Redirect to='/signup' />


    return (
        <div className='solution-modal-container'>
            <i onClick={() => closeModal()} className="fa-regular fa-rectangle-xmark" style={{color: "maroon"}}></i>
            <div className='solution-container'>
                <p>*Please input a first and last name. Make sure to capitalize your pronouns, and double check spelling!*</p>
                <form onSubmit={handleSubmit}>
                    {errors && (
                        <p style={{color: 'maroon'}}>{errors}</p>
                    )}
                    <input
                    placeholder="Who is the killer?"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    style={{outline: 'none'}}
                    />
                    <button>Check Answer</button>
                </form>
            </div>
        </div>
    )
}


export default SolutionModal
