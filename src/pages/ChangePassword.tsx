import React from 'react';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {ChangePasswordForm} from "../components/changePasswordForm/ChangePasswordForm";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../store/selectors/app";
import {Navigate} from "react-router-dom";
import {PATH} from "../constants";


export const ChangePassword = () => {

    const isAuth = useSelector(selectIsAuth)

    if (!isAuth) {
        return <Navigate to={PATH.LOGIN}/>
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
                    Change Password
                </Typography>
                <ChangePasswordForm/>
            </Box>
        </Container>
    );
};