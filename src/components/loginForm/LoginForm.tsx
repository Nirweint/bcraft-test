import React from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {emailValidation, passwordValidation} from "../../utils/validators";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {RegistrationFormInputsType} from "../registrationForm/RegistrationForm";
import {errorStyle} from "../../common/styles";

type LoginFormInputsType = Omit<RegistrationFormInputsType, 'confirmPassword'>

export const LoginForm = () => {

    const {
        control,
        formState: {errors},
        handleSubmit
    } = useForm<LoginFormInputsType>();

    const onSubmit: SubmitHandler<LoginFormInputsType> = data => {
        console.log(data)
    };

    return (
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
    );
};