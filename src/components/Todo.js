import React, { useState, useEffect } from "react";
import { getDatabase, ref, push, child, remove, update } from "firebase/database";
import "../App.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";




const Todo = () => {
    const [inputData, setInputData] = useState("");
    const [id, setId] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [loader, setLoader] = useState(true)

    const list = useSelector(state => state.todoReducer.list);
    const auth = getAuth();

    const uid = auth.currentUser.uid

    const history = useHistory()

    const add_Todo = e => {
        e.preventDefault();
        if (inputData.trim()) {
            let db = getDatabase();

            push(ref(db, 'users/' + uid), {
                data: inputData
            }).then(() => {
                setInputData("");
            }).catch(() => console.log("ERR"))
        } else {
            alert("Please Add a todo");
        }
    };
    const edit_todo = e => {
        e.preventDefault();
        if (!inputData) {
            alert("Please Add a todo");
        } else {
            let db = getDatabase()
            const edit = {
                data: inputData.trim(),
            };
            update(child(ref(db), 'users/' + uid + '/' + id), edit);

            setInputData("");
            setIsEdit(false);
        }
    };
    const delOne = (id) => {
        let db = getDatabase();
        const newPostKey = remove(child(ref(db), 'users/' + uid + '/' + id)).key;
    }
    const del_all = (e) => {
        e.preventDefault()
        let db = getDatabase();
        const newPostKey = remove(child(ref(db), 'users/' + uid)).key;
    }
    const sign_out = (e) => {
        setLoader(true)
        e.preventDefault()
        const auth = getAuth();
        signOut(auth).then(() => {
            setLoader(false)
            history.push('/')
        }).catch((error) => {
            setLoader(false)
            console.log(error)
            alert('Firebase Error')
        });
    }
    useEffect(() => {
        if (list.length > 0) {
            setLoader(false)
        }

    })
    if (loader) return <div className="loader"></div>
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
                                    <button className="btns del-all" onClick={(e) => del_all(e)}>
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
                                            onClick={(e) => delOne(curElem.id)}
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
    )
};

export default Todo