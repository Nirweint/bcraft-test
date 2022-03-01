import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {emailValidation, passwordValidation} from "../utils/validators";

export type RegistrationFormInputsType = {
    email: string;
    password: string;
    confirmPassword: string;
}

export const Registration = () => {

    const {
        control,
        formState: {errors},
        setError,
        handleSubmit
    } = useForm<RegistrationFormInputsType>();

    const onSubmit: SubmitHandler<RegistrationFormInputsType> = data => {
        if (data.password === data.confirmPassword) {
            console.log(data)
        } else {
            setError("confirmPassword", {
                type: "confirm",
                message: "passwords do not match"
            });
        }
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
                    Registration
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
                        <Grid item xs={12}>
                            <Controller
                                name="confirmPassword"
                                control={control}
                                rules={{
                                    required: "Please confirm your password",
                                }}
                                defaultValue=""
                                render={({field}) => <TextField
                                    {...field}
                                    required
                                    label={'Confirm password'}
                                    fullWidth
                                />}
                            />
                            <Grid item style={errorStyle}>
                                {errors.confirmPassword && errors.confirmPassword.message}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};