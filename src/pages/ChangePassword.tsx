import React from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {passwordValidation} from "../utils/validators";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type ChangePasswordFormInputsType = {
    oldPassword: string;
    password: string;
    confirmPassword: string;
}

export const ChangePassword = () => {

    const {
        control,
        formState: {errors},
        setError,
        handleSubmit
    } = useForm<ChangePasswordFormInputsType>();

    const onSubmit: SubmitHandler<ChangePasswordFormInputsType> = data => {
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
                    Change Password
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}
                     sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                name="oldPassword"
                                control={control}
                                rules={{
                                    required: "Please enter old password",
                                }}
                                defaultValue=""
                                render={({field}) => <TextField
                                    {...field}
                                    required
                                    label={'Old password'}
                                    fullWidth
                                />}
                            />
                            <Grid item style={errorStyle}>
                                {errors.oldPassword && errors.oldPassword.message}
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
                        Change Password
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};