'use client';
import SuccessIcon from '../icons/SuccessIcon'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { reset, setErrorMsg, setSuccessMsg } from '../redux/features/alertSlice';
import { useEffect } from 'react';

export default function AlertBar() {
    const { errorMsg, successMsg } = useAppSelector(state => state.alertReducer)
    const dispatch = useAppDispatch();

    useEffect(() => {
        setTimeout(() => dispatch(reset()), 3000);
    }, [errorMsg, successMsg])

    return (
        <div className='w-full'>
            {successMsg && (
                <div className="bg-success bg-opacity-70 w-full p-2 text-sm flex items-center justify-center gap-5 cursor-pointer" onClick={() => dispatch(setSuccessMsg(''))}>
                    <div className="flex items-center gap-3">
                        <SuccessIcon />
                        {/* <span>A reset password link has been sent to your email. Follow the instructions in the email.</span> */}
                        <span>{successMsg}</span>
                    </div>
                    <span className="text-xs">(tap to close)</span>
                </div>
            )}
            {errorMsg && (
                <div className="bg-error bg-opacity-70 w-full p-2 text-sm flex items-center justify-center gap-5 cursor-pointer" onClick={() => dispatch(setErrorMsg(''))}>
                    <div className="flex items-center gap-3">
                        <SuccessIcon />
                        <span>{errorMsg}</span>
                    </div>
                    <span className="text-xs">(tap to close)</span>
                </div>
            )}
        </div>
    )
}
