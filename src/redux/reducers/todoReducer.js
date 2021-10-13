const initialData = {
    list: [],
};

const todoReducer = (state = initialData, action) => {
    switch (action.type) {
        case "ADD_TODO":
            let { id, data } = action.payload;
            if (data === "") {
                alert("Please Add a todo");
                return state;
            } else {
                return {
                    ...state,
                    list: [
                        ...state.list,
                        {
                            id: id,
                            data: data,
                        },
                    ],
                };
            }
        case "DEL_TODO":
            const newList = state.list.filter(elem => elem.id !== action.id);
            return {
                ...state,
                list: newList,
            };
        case "DEL_ALL":
            return {
                list: [],
            };
        case "EDIT_TODO":
            const { e_id, inp } = action.payload;
            const edited = state.list.find(curElem => curElem.id === e_id);
            edited.data = inp.trim()
            if (edited.data === "") {
                alert("Please Enter a Todo")
                return state
            } else {
                return {
                    list: [...state.list]
                }
            }

        default:
            return state;
    }
};
export default todoReducer;
