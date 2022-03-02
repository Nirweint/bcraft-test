import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import {RegistrationForm} from "../components/registrationForm/RegistrationForm";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../store/selectors/app";
import {Navigate} from "react-router-dom";
import {PATH} from "../constants";

export const Registration = () => {

    const isAuth = useSelector(selectIsAuth)

    if (isAuth) {
        return <Navigate to={PATH.CHANGE_PASSWORD}/>
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Registration
                </Typography>
               <RegistrationForm/>
            </Box>
        </Container>
    );
};