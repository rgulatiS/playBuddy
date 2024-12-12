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
import {RegisterFacility} from "./components/register-faciity";
import {Facilities} from "./components/facilities";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
          <div>
            <h1>Hello World</h1>
              <Facilities></Facilities>
            <Link to="registerBuddy">Register</Link>
            <div></div>
            <Link to="login">Login</Link>

            <div><span>Are you a Play Facility provider Register Here</span></div>
            <Link to="registerFacility">RegisterFacility</Link>
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
      path: "registerBuddy",
      element:<RegisterBuddy></RegisterBuddy>,
    },
    {
      path: "registerFacility",
      element:<RegisterFacility></RegisterFacility>,
    },
  ]);

  return (
    <div className="App">
    <Header></Header>
<body>
getFacilities().forEach()
</body>
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
