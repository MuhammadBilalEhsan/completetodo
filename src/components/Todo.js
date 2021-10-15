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
    const [loader, setLoader] = useState(true);

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
    const cancelEdit = (e) => {
        e.preventDefault()
        setInputData('');
        setId(null);
        setIsEdit(false);
    }
    const delOne = (id) => {
        let db = getDatabase();
        remove(child(ref(db), 'users/' + uid + '/' + id));
        setLoader(false)

    }
    const del_all = (e) => {
        e.preventDefault()
        let db = getDatabase();
        remove(child(ref(db), 'users/' + uid));
        setLoader(false)

    }
    const sign_out = (e) => {
        e.preventDefault()
        setLoader(true)
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
        if (list) {
            setLoader(false)
        }
    }, [list])
    return (
        <>
            <div className="cont">
                <div className="sub-cont">
                    <div className="upper-div">
                        <h1>Add Todo here</h1>
                        <form>
                            <input
                                className="inpu"
                                placeholder="✍ write here"
                                value={inputData}
                                autoFocus
                                maxLength="100"
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
                                    list?.length > 0 && !isEdit ?
                                        (<button className="btns del-all" onClick={(e) => del_all(e)}>
                                            DELETE ALL
                                        </button>)
                                        : ''
                                }
                                <button className="btns del-all" onClick={(e) => sign_out(e)}>
                                    Log Out
                                </button>
                                {
                                    isEdit ? (<button className="btns del-all"
                                        onClick={(e) => cancelEdit(e)}
                                        className="btns del-all"
                                    >Cancel Edit</button>)
                                        : <></>
                                }
                            </div>
                        </form>
                    </div>
                    <div className="all-todos">
                        {
                            loader ? <div className="loader"></div> : list.map(curElem => {

                                return (

                                    <div className="todo" key={curElem.id}>
                                        <p>{curElem.data}</p>

                                        <div className="two-btns">
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
                                            {
                                                isEdit ? '' :
                                                    <i
                                                        onClick={(e) => delOne(curElem.id)}
                                                        className="btns del-btns fas fa-trash-alt"
                                                    ></i>
                                            }
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
};

export default Todo