export const authAPI = {
    login(isSuccess: boolean) {
        return new Promise<responseType>((res, rej) => {
            if (isSuccess) {
                res({data: true})
            } else {
                rej({message: 'something wrong'})
            }
        })
    },
    register(isSuccess: boolean) {
        return new Promise<responseType>((res, rej) => {
            if (isSuccess) {
                res({data: true})
            } else {
                rej({message: 'something wrong'})
            }
        })
    },
    changePassword(isSuccess: boolean) {
        return new Promise<responseType>((res, rej) => {
            if (isSuccess) {
                res({data: true})
            } else {
                rej({message: 'something wrong'})
            }
        })
    },
}

type responseType = {
    data: boolean
}