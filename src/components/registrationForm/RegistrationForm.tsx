import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {emailValidation, passwordValidation} from "../../utils/validators";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {errorStyle} from "../../common/styles";
import {getLocalStorageState, setLocalStorageState} from "../../localStorage";
import {useDispatch} from "react-redux";
import {register} from "../../store/app/reducer";

export type RegistrationFormInputsType = {
    email: string;
    password: string;
    confirmPassword: string;
}

export const RegistrationForm = () => {

    const dispatch = useDispatch()

    const defaultState: RegistrationFormInputsType = {
        email: '',
        password: '',
        confirmPassword: '',
    }

    const defaultFormFromLocalStorage = getLocalStorageState<RegistrationFormInputsType>('registration', defaultState)

    const [inputValues, setInputValues] = useState(defaultFormFromLocalStorage)

    const {
        control,
        formState: {errors},
        setError,
        getValues,
        setValue,
        handleSubmit
    } = useForm<RegistrationFormInputsType>();

    const onSubmit: SubmitHandler<RegistrationFormInputsType> = data => {
        if (data.password === data.confirmPassword) {
            setLocalStorageState('registration', defaultState)
            setValue('email', '')
            setValue('password', '')
            setValue('confirmPassword', '')
            console.log(data)
            // change isSuccess on false, to get rejected promise
            dispatch(register(true))
        } else {
            setError("confirmPassword", {
                type: "confirm",
                message: "passwords do not match"
            });
        }
    };

    const handleInputChange = () => {
        const inputValues = getValues()
        setInputValues(inputValues)
        setLocalStorageState('registration', inputValues)
    }

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}
             sx={{mt: 3}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Controller
                        name="email"
                        control={control}
                        rules={emailValidation}
                        defaultValue={inputValues.email}
                        render={({field}) => <TextField
                            {...field}
                            required
                            label='Email'
                            type='email'
                            fullWidth
                            onChange={(e) => {
                                field.onChange(e);
                                handleInputChange()
                            }}
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
                        defaultValue={inputValues.password}
                        render={({field}) => <TextField
                            {...field}
                            required
                            label='Password'
                            type='password'
                            fullWidth
                            onChange={(e) => {
                                field.onChange(e);
                                handleInputChange()
                            }}
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
                        defaultValue={inputValues.confirmPassword}
                        render={({field}) => <TextField
                            {...field}
                            required
                            label='Confirm password'
                            type='password'
                            fullWidth
                            onChange={(e) => {
                                field.onChange(e);
                                handleInputChange()
                            }}
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
    );
};