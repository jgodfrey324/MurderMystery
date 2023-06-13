import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getSuspects } from '../../store/suspects';

import './OpeningScene.css'



const SuspectModal = () => {
    const dispatch = useDispatch();
    const suspects = Object.values(useSelector(state => state.suspects))


    useEffect(() => {
        dispatch(getSuspects())
    }, [dispatch])


    if (!suspects) return null;

    return (
        <div className='suspect-container'>
            {suspects.map(suspect => {
                return (
                    <div className='single-suspect'>
                        <p>{suspect.first_name} {suspect.last_name}</p>
                    </div>
                )
            })}
        </div>
    )
}


export default SuspectModal
