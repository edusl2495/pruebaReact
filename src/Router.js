import React, { Component } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Prueba-WebSockets'


class Router extends Component {

    render() {
        return (
            <BrowserRouter>             
                <div id="wrap">
                    <div id="main">
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route exact path="/home" element={<Home/>}/>                                                  
                    </Routes>
                    </div>
                </div>             
            </BrowserRouter>
        );
    }
}

export default Router;