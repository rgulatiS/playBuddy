import './App.css';
import {Header} from "./components/header";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {RegisterBuddy} from "./components/register-buddy";
import {RegisterFacility} from "./components/register-faciity";
import {Facilities} from "./components/facilities";
import {AppProvider} from "./common/context";


function App() {


    const router = createBrowserRouter([
        {
            path: "/home",
            element: <>
                <Header title={"Available Courts"}></Header>
                <Facilities></Facilities>
            </>

            // (
            //     <div>
            //
            //       <Link to="registerBuddy">Register</Link>
            //       <div></div>
            //       <Link to="login">Login</Link>
            //
            //       <div><span>Are you a Play Facility provider Register Here</span></div>
            //       <Link to="registerFacility">RegisterFacility</Link>
            //     </div>
            // ),
        },
        {
            path: "/about",
            element: <>
                <Header title={"About Us"}></Header>
                <div>About</div>
            </>,
        },
        {
            path: "/login",
            element: <>
                <Header title={"Login"}></Header>
                <div>Login</div>
            </>,
        },
        {
            path: "/registerBuddy",
            element: <>
                <Header title={"Register Buddy"}></Header>
                <RegisterBuddy></RegisterBuddy>
            </>,
        },
        {
            path: "/registerFacility",
            element: <>
                <Header title={"Register Facility"}></Header>
                <RegisterFacility></RegisterFacility>
            </>,
        },
        {
            path: "/",
            element: <>
                <Header title={"Available Courts"}></Header>
                <Facilities></Facilities>
            </>
        },
    ]);


    return (
        <AppProvider>
            <div className="App">

                <RouterProvider router={router}></RouterProvider>
            </div>
        </AppProvider>
    );
}

export default App;
