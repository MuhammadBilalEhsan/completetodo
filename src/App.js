import React, { useState, useEffect } from 'react';
import * as firebase from "@firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseConfig from "./firebase/firebaseConfig";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAll, addUser } from "./redux/actions/index";



import PrivateRoute from './PrivateRoute'
import Todo from './components/Todo';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import ConfirmPassword from './components/ConfirmPassword';
import { getAuth, onAuthStateChanged } from '@firebase/auth'


firebase.initializeApp(firebaseConfig)


const App = () => {
  const [user, setUser] = useState({})
  const [loader, setLoader] = useState(true)


  const dispatch = useDispatch()


  const auth = getAuth()
  onAuthStateChanged(auth, user => {
    if (user) {
      setUser(user)
      setLoader(false)
      dispatch(addUser(user))
    } else {
      setUser(false)
      setLoader(false)
    }
  })
  useEffect(() => {
    if (user) {
      const db = getDatabase();
      const starCountRef = ref(db, 'users/' + user?.uid);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          dispatch(getAll(Object.entries(data).map(item => ({ ...item[1], id: item[0] }))))

        } else {
          dispatch(getAll([]))
        }
      });
    }

  }, [user])

  if (loader) return <div className="loader"></div>

  return (
    <>
      <Router>
        <Switch>

          <PrivateRoute auth={user} exact path="/" SuccessComp={<Todo />} FailComp={<Login />} />
          <PrivateRoute auth={user} exact path="/todo" SuccessComp={<Todo />} FailComp={<Login />} />
          <PrivateRoute auth={user} exact path="/signup" SuccessComp={<Todo />} FailComp={<SignUp />} />
          <PrivateRoute auth={user} exact path="/rpassword" SuccessComp={<Todo />} FailComp={<ResetPassword />} />
          <PrivateRoute auth={user} exact path="/cpassword" SuccessComp={<Todo />} FailComp={<ConfirmPassword />} />
          <PrivateRoute auth={user} path="/*" SuccessComp={<Todo />} FailComp={<Login />} />

          {/* <Route exact path="/cpassword">
            <ConfirmPassword />
          </Route>
          <Route exact path="/rpassword">
            <ResetPassword />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/todo">
            <Todo />
          </Route>
          <Route path="/*">
            <Login />
          </Route> */}

        </Switch>
      </Router>

    </>
  );
}

export default App;
