import React from 'react';
import {Registration} from "./pages/Registration";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./pages/Login";
import {ChangePassword} from "./pages/ChangePassword";
import {PATH} from "./constants";
import {Header} from "./components/Header";



function App() {

    return (
        <>
            <Header/>
            <Routes>
                <Route index element={<Navigate replace to={PATH.LOGIN}/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.CHANGE_PASSWORD} element={<ChangePassword/>}/>
            </Routes>
        </>
    );
}

export default App;
