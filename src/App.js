import React, { useState } from 'react';
import * as firebase from "@firebase/app";
import firebaseConfig from "./firebase/firebaseConfig";
import { BrowserRouter as Router, Switch} from "react-router-dom";

import PrivateRoute from './PrivateRoute'
import Todo from './components/Todo';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import ConfirmPassword from './components/ConfirmPassword';
import { getAuth, onAuthStateChanged } from '@firebase/auth'


firebase.initializeApp(firebaseConfig)


const App = () => {
  const [user, setUser] = useState(false)
  const[loader,setLoader]= useState(true)

  const auth = getAuth()
  onAuthStateChanged(auth, user => {
    if (user) {
      setUser(true)
      setLoader(false)
    } else {
      setUser(false)
      setLoader(false)
    }
  })

  if(loader) return <div className="loader"></div>

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
