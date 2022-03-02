import React, {useState} from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {emailValidation, passwordValidation} from "../../utils/validators";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {RegistrationFormInputsType} from "../registrationForm/RegistrationForm";
import {errorStyle} from "../../common/styles";
import {getLocalStorageState, setLocalStorageState} from "../../localStorage";
import {useDispatch} from "react-redux";
import {login} from "../../store/app/reducer";

type LoginFormInputsType = Omit<RegistrationFormInputsType, 'confirmPassword'>

export const LoginForm = () => {

    const dispatch = useDispatch()

    const defaultState: LoginFormInputsType = {
        email: '',
        password: '',
    }
    const defaultFormFromLocalStorage = getLocalStorageState<LoginFormInputsType>('login', defaultState)

    const [inputValues, setInputValues] = useState(defaultFormFromLocalStorage)

    const {
        control,
        formState: {errors},
        getValues,
        setValue,
        handleSubmit,
    } = useForm<LoginFormInputsType>();

    const onSubmit: SubmitHandler<LoginFormInputsType> = data => {
        setLocalStorageState('login', defaultState)
        setValue('email', '')
        setValue('password', '')
        console.log(data)
        // change isSuccess on false, to get rejected promise
        dispatch(login(true))
    };

    const handleInputChange = () => {
        const inputValues = getValues()
        setInputValues(inputValues)
        setLocalStorageState('login', inputValues)
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
                            autoComplete='off'
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
                            autoComplete='off'
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