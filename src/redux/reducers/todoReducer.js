const initialData = {
    list: [],
};

const todoReducer = (state = initialData, action) => {
    switch (action.type) {
        case "GET_ALL":
            return { ...state, list: action.payload }
        default:
            return state;
    }
};
export default todoReducer;
