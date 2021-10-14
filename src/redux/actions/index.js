export const getAll = (data) => {
    return {
        type: "GET_ALL",
        payload: data

    }
}

export const addUser = (user) => {
    return {
        type: "ADD_USER",
        payload: user
    }
}

