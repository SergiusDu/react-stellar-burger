import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {TAppDispatch, RootState} from '../../services/store/store';

type DispatchFunc = () => TAppDispatch
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
