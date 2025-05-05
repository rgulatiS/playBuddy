import './App.css';
import {Header} from "./pages/header.tsx";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {RegisterBuddy} from "./pages/register-buddy.tsx";
import {RegisterFacility} from "./pages/register-faciity.tsx";
import {Facilities} from "./pages/facilities.tsx";
import {AppProvider} from "./common/context";
import PhoneNumberPage from "./pages/phoneNumberPage.tsx";
import VerificationPage from "./pages/verificationPage.tsx";
import BuddyProfile from "./pages/buddyProfile.tsx";


function App() {
    // <Route path="/" element={<PhoneNumberPage />} />
    // <Route path="/verify" element={<VerificationPage />} />

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
                <PhoneNumberPage></PhoneNumberPage>
            </>,
        },
        {
            path: "/verify",
            element: <>
                <Header title={"Verify"}></Header>
                <VerificationPage></VerificationPage>
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
            path: "/myProfile",
            element: <>
                <Header title={"My Profile"}></Header>
                <BuddyProfile></BuddyProfile>
            </>
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
