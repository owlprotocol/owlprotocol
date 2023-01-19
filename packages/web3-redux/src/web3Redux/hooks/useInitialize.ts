import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { initialize } from '../actions/index.js';

export const useInitialize = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initialize())
    }, [dispatch])
}
