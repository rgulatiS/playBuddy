import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Header} from "./components/header";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import {RegisterBuddy} from "./components/register-buddy";
import {GlobalVariable} from "./global";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
          <div>
            <h1>Hello World</h1>
            <Link to="register">Register</Link>
            <div></div>
            <Link to="login">Login</Link>
          </div>
      ),
    },
    {
      path: "about",
      element: <div>About</div>,
    },
    {
      path: "login",
      element: <div>Login</div>,
    },
    {
      path: "register",
      element:<RegisterBuddy></RegisterBuddy>,
    },
  ]);

  return (
    <div className="App">
    <Header></Header>

      <RouterProvider router={router}></RouterProvider>
      {/*<div>*/}
      {/*  <img src={logo} className="App-logo" alt="logo"/>*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.tsx</code> and save to reload.*/}
      {/*  </p>*/}
      {/*  <a*/}
      {/*      className="App-link"*/}
      {/*      href="https://reactjs.org"*/}
      {/*      target="_blank"*/}
      {/*      rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    Learn React*/}
      {/*  </a>*/}
      {/*</div>*/}
    </div>
  );
}

export default App;
