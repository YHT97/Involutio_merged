import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store.ts";

/*TODO: какого-то хуя эта конструкция всегда работала, а сейчас не работает, пока не знаю схуя, но надо разобраться*/

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


