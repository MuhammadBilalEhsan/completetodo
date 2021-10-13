export const addTodo = data => {
    return {
        type: "ADD_TODO",
        payload: {
            id: new Date().getTime().toString(),
            data: data.trim(),
        },
    };
};
export const delTodo = id => {
    return {
        type: "DEL_TODO",
        id,
    };
};
export const delAll = () => {
    return {
        type: "DEL_ALL",
    };
};
export const editTodo = (e_id, inp) => {
    return {
        type: "EDIT_TODO",
        payload: {
            e_id, inp
        }
    };
};
