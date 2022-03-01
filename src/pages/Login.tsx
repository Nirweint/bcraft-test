import React from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {emailValidation, passwordValidation} from "../utils/validators";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {RegistrationFormInputsType} from "./Registration";

type LoginFormInputsType = Omit<RegistrationFormInputsType, 'confirmPassword'>

export const Login = () => {
    const {
        control,
        formState: {errors},
        handleSubmit
    } = useForm<LoginFormInputsType>();

    const onSubmit: SubmitHandler<LoginFormInputsType> = data => {
        console.log(data)
    };

    const errorStyle = {height: '12px', color: 'red'}

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
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}
                     sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                name="email"
                                control={control}
                                rules={emailValidation}
                                defaultValue=""
                                render={({field}) => <TextField
                                    {...field}
                                    required
                                    label={'Email'}
                                    fullWidth
                                />}
                            />
                            <Grid item style={errorStyle}>
                                {errors.email && errors.email.message}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="password"
                                control={control}
                                rules={passwordValidation}
                                defaultValue=""
                                render={({field}) => <TextField
                                    {...field}
                                    required
                                    label={'Password'}
                                    fullWidth
                                />}
                            />
                            <Grid item style={errorStyle}>
                                {errors.password && errors.password.message}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};