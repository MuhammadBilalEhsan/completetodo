const initialData = {
    list: [],
    user:{}
};

const todoReducer = (state = initialData, action) => {
    switch (action.type) {
        case "GET_ALL":
            return { ...state, list: action.payload }

        case "ADD_USER":
            return {
                ...state, user:action.payload
            }
        default:
            return state;
    }
};
export default todoReducer;
