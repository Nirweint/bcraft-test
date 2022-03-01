export const authAPI = {
    me() {
        return new Promise((res, rej) => {
            res({authSuccess: true})
        })
    },
    login() {
        return new Promise((res, rej) => {
            res({loginSuccess: true})
        })
    },
    register() {
        return new Promise((res, rej) => {
            res({loginSuccess: true})
        })
    },
}