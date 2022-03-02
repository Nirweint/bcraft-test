import React from 'react';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {LoginForm} from "../components/loginForm/LoginForm";
import {selectIsAuth} from "../store/selectors/app";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {PATH} from "../constants";


export const Login = () => {

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
                    Login
                </Typography>
                <LoginForm/>
            </Box>
        </Container>
    );
};