import React, {useEffect, useState} from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {selectAppError, selectAppStatus} from "../../store/selectors/app";
import {useDispatch, useSelector} from "react-redux";
import {setAppError, setAppStatus} from "../../store/app/reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const StatusSnackbar = () => {

    const status = useSelector(selectAppStatus)
    const error = useSelector(selectAppError)
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false);
    const [timerId, setTimerId] = useState<number>(0)

    useEffect(() => {
        if (status !== null) {
            setOpen(true)
            const id: number = window.setTimeout(() => {
                setOpen(false)
                dispatch(setAppStatus(null))
            }, 4000)
            setTimerId(id)
        }

        if (error !== null) {
            setOpen(true)
            const id: number = window.setTimeout(() => {
                setOpen(false)
                dispatch(setAppError(null))
            }, 4000)
            setTimerId(id)
        }

        return () => clearTimeout(timerId)

    }, [status, error])

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        clearTimeout(timerId)
        dispatch(setAppStatus(null))
        dispatch(setAppError(null))
    };

    return (
        <Stack spacing={2} sx={{width: '100%'}}>
            {error !== null && <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    {error}
				</Alert>
			</Snackbar>}

            {status !== null && <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                    {status}
				</Alert>
			</Snackbar>}
        </Stack>
    );
}