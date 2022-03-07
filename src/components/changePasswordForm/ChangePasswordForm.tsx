import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import {passwordValidation} from "../../utils/validators";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {errorStyle} from "../../common/styles";
import {getLocalStorageState, setLocalStorageState} from "../../localStorage";
import {changePassword} from "../../store/app/reducer";
import {useDispatch} from "react-redux";
import {RegistrationFormInputsType} from "../registrationForm/RegistrationForm";

type ChangePasswordFormInputsType = {
    oldPassword: string;
    password: string;
    confirmPassword: string;
}

export const ChangePasswordForm = () => {

    const dispatch = useDispatch()

    const defaultState: ChangePasswordFormInputsType = {
        oldPassword: '',
        password: '',
        confirmPassword: '',
    }

    const defaultFormFromLocalStorage = getLocalStorageState<ChangePasswordFormInputsType>('changePassword', defaultState)

    const [inputValues, setInputValues] = useState<ChangePasswordFormInputsType>(defaultFormFromLocalStorage)

    const {
        control,
        formState: {errors},
        getValues,
        setValue,
        setError,
        handleSubmit
    } = useForm<ChangePasswordFormInputsType>();

    const onSubmit: SubmitHandler<ChangePasswordFormInputsType> = data => {
        if (data.password === data.confirmPassword) {
            setValue('oldPassword', '')
            setValue('password', '')
            setValue('confirmPassword', '')
            setLocalStorageState('changePassword', defaultState)
            console.log(data)
            // change isSuccess on false, to get rejected promise
            dispatch(changePassword(true))
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
        setLocalStorageState('changePassword', inputValues)
    }


    return (
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
                        defaultValue={inputValues.oldPassword}
                        render={({field}) => <TextField
                            {...field}
                            required
                            label='Old password'
                            fullWidth
                            autoComplete="new-password"
                            onChange={(e) => {
                                field.onChange(e);
                                handleInputChange()
                            }}
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
                        defaultValue={inputValues.password}
                        render={({field}) => <TextField
                            {...field}
                            required
                            label='Password'
                            type='password'
                            autoComplete="new-password"
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
                            autoComplete="new-password"
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
                Change Password
            </Button>
        </Box>
    );
};