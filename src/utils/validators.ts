export const emailValidation = {
    required: "Please enter your email",
    pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'invalid email',
    }
}

export const passwordValidation = {
    required: "Please enter your password",
    minLength: {
        value: 4,
        message: 'Min length 4 chars',
    },
    maxLength: {
        value: 10,
        message: 'Max length 10 chars',
    },
    pattern: {
        value: /^(?=.*[A-Z]).*$/,
        message: 'At least one capital letter',
    }
}