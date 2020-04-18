import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

import Login from "./page/Login";
import Register from "./page/Register";

import Navbar from "./component/Navbar";
import Footer from "./component/Footer";


import Home from "./page/Home";
import Member from "./page/Member"
import DataLapangan from "./page/DataLapangan"
import DataSewa from "./page/DataSewa"

import Profile from "./Member/Profile"
import Sewa from "./Member/Sewa"


class Main extends Component{
    render = () => {
        return(
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route exact path="/">
                    <Navbar />
                    <Home />
                    <Footer />
                </Route>
                <Route exact path="/admin">
                    <Navbar />
                    <Member />
                    <Footer />
                </Route>
                <Route exact path="/dataLapangan">
                    <Navbar />
                    <DataLapangan />
                    <Footer />
                </Route>
                <Route exact path="/dataSewa">
                    <Navbar />
                    <DataSewa />
                    <Footer />
                </Route>
                <Route exact path="/myprofile">
                    <Navbar />
                    <Profile />
                    <Footer />
                </Route>
                <Route exact path="/mysewa">
                    <Navbar />
                    <Sewa />
                    <Footer />
                </Route>
            </Switch>
        );
    }
}

export default Main;
