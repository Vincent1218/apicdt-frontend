import React, { Component } from 'react';
// import logoBase from '../assets/image/yatai 10th logo-10.png';
// import logoTop1 from '../assets/image/yatai 10th logo-bian.png';
import logo from '../assets/image/yatai 10th logo700.png';
import './css/HomeHeader.css'

import Particles from 'react-particles-js';

import particleJSConfig from "./json/particlejs-config.json";

class HomeHeader extends Component {
    state = {  }
    render() { 
        return (  
            <header className="logo-block container-fluid">
                    <div className="row h-100" > 
                        <Particles id="particles-js" canvasClassName="example" params={{...particleJSConfig}}    />
                        <div className="col-sm-6 h-sm-50 d-inline-block align-self-center text-center text-sm-right">
                            <img src={logo} alt="Asia-Pacific Intervarsity Chinese Debate Tournament" className="yatai-logo"  width="50%" />
                        </div>
                        <div className="col-sm-6 h-sm-25 d-inline-block align-self-center text-center text-sm-left">
                            <div className="header" >
                                <h1 className="cn-title-1">第十届</h1>
                                <h1 className="cn-title-2">工行杯</h1>
                                <h1 className="cn-title-3">亚太大专华语辩论公开赛</h1>
                                <h1 className="eng-title"> 10th Asia-Pacific<br/>Intervarsity Chinese Debate Tournament </h1>
                            </div>
                        </div>
                        
                    </div>
            </header>
        );
    }
}
 
export default HomeHeader;