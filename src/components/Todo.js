import React, { useState } from "react";
import "../App.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, delTodo, delAll, editTodo } from "../redux/actions/index";
import { getAuth, signOut } from "firebase/auth";




const Todo = () => {
    const [inputData, setInputData] = useState("");
    const [id, setId] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [loader , setLoader] = useState(false)


    const list = useSelector(state => state.todoReducer.list);
    const dispatch = useDispatch();

    const history = useHistory()

    const add_Todo = e => {
        e.preventDefault();
        dispatch(addTodo(inputData));
        setInputData("");
    };
    const edit_todo = e => {
        e.preventDefault();
        if (inputData === "") {
            alert("Please Add a todo");
        } else {
            dispatch(editTodo(id, inputData));
            setInputData("");
            setIsEdit(false);
        }
    };
    const sign_out = (e) => {
        e.preventDefault()
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            history.push('/')
        }).catch((error) => {
            // An error happened.
            alert('Firebase Error')
        });
    }
if(loader) return <div className="loader"></div>
    return (
        <>
            <div className="cont">
                <div className="sub-cont">
                    <h1>Add Todo here</h1>
                    <form>
                        <input
                            className="inpu"
                            placeholder="✍ write here"
                            value={inputData}
                            autoFocus
                            maxLength="50"
                            onChange={e => setInputData(e.target.value)}
                            type="text"
                        />
                        {isEdit ? (
                            <input
                                type="submit"
                                className="btns add-btns"
                                value="Update"
                                onClick={e => edit_todo(e)}
                            />
                        ) : (
                            <input
                                type="submit"
                                className="btns add-btns"
                                value="Add"
                                onClick={e => add_Todo(e)}
                            />
                        )}

                        <br />
                        <div id="main-btns-div">
                            {
                                list.length > 0 ? (
                                    <button className="btns del-all" onClick={() => dispatch(delAll())}>
                                        DELETE ALL
                                    </button>
                                ) : ''
                            }
                            <button className="btns del-all" onClick={(e) => sign_out(e)}>
                                Log Out
                            </button>
                        </div>
                    </form>
                    <div className="all-todos">
                        {list.map(curElem => {
                            return (
                                <div className="todo" key={curElem.id}>
                                    <p>{curElem.data}</p>

                                    <div className="btns">
                                        {
                                            isEdit ?
                                                (<i
                                                    onClick={(e) => edit_todo(e)}
                                                    className="btns edit-btns far fa-edit"
                                                ></i>)
                                                : (<i
                                                    onClick={() => {
                                                        setInputData(curElem.data);
                                                        setId(curElem.id);
                                                        setIsEdit(true);
                                                    }}
                                                    className="btns edit-btns far fa-edit"
                                                ></i>)
                                        }
                                        <i
                                            onClick={() => dispatch(delTodo(curElem.id))}
                                            className="btns del-btns fas fa-trash-alt"
                                        ></i>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Todo;
