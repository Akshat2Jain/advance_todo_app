import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/login";

import Signup from "./components/signup";
import { auth, db } from "./config/config";

export class App extends Component {
  state = {
    currentUser: null,
    todos: [],
  };

  componentDidMount() {
    // getting current user
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            this.setState({
              currentUser: snapshot.data().fullname,
            });
          });
      } else {
        console.log("user is not signed in to retrive username");
      }
    });

    // getting todos for current user
    auth.onAuthStateChanged((user) => {
      if (user) {
        const todoList = this.state.todos;
        // console.log(todoList);
        db.collection("todo of " + user.email).onSnapshot((snapshot) => {
          let changes = snapshot.docChanges();
          // console.log(changes);
          changes.forEach((change) => {
            // console.log(change.doc.data().Todo)
            if (change.type === "added") {
              // this is method one

              // todoList.push({
              //   id: change.doc.id,
              //   Todo: change.doc.data().Todo,
              // });

              // this is method two

              // todoList.splice(todoList.length, 0, {
              //   id: change.doc.id,
              //   Todo: change.doc.data().Todo,
              // });

              // this is method three

              todoList.unshift({
                id: change.doc.id,
                Todo: change.doc.data().Todo,
              });
            }
            if (change.type === "removed") {
              // console.log("removed")
              for (let i = 0; i < todoList.length; i++) {
                if (todoList[i].id === change.doc.id) {
                  todoList.splice(i, 1);
                }
              }
            }
            this.setState({
              todos: todoList,
            });
          });
        });
      } else {
        console.log("user is not signed in to retrive todos");
      }
    });
  }
  // ---------------------

  deleteTodo = (id) => {
    console.log(id);
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("todo of " + user.email)
          .doc(id)
          .delete();
      } else {
        console.log("user is not signed in to delete todos");
      }
    });
  };

  render() {
    // console.log(this.state.todos);
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <Home
                currentUser={this.state.currentUser}
                todos={this.state.todos}
                deleteTodo={this.deleteTodo}
              />
            )}
          />
          <Route path="/signup" component={Signup} />
          <Route path="/loginup" component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;
