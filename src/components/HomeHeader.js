import React, { Component } from 'react';
import logoBase from '../assets/image/yatai 10th logo-10.png';
import logoTop1 from '../assets/image/yatai 10th logo-bian.png';
import './css/HomeHeader.css'

class HomeHeader extends Component {
    state = {  }
    render() { 
        return (  
            <header className="logo-block container-fluid">
                    <div className="row h-100" > 
                        <div className="col-sm-6 h-sm-50 d-inline-block align-self-center text-center text-sm-right">
                            <img src={logoBase} alt="Asia-Pacific Intervarsity Chinese Debate Tournament" className="ten-logo"  width="50%" />
                            <img src={logoTop1} alt="Asia-Pacific Intervarsity Chinese Debate Tournament" className="bian-logo" width="50%" />
                        </div>
                        <div className="col-sm-6 h-sm-25 d-inline-block align-self-center text-center text-sm-left">
                            <div className="header" >
                                <h1 className="cn-title-1">第十届</h1>
                                <h1 className="cn-title-2">亚太华语</h1>
                                <h1 className="cn-title-2">辩论公开赛</h1>
                                <h1 className="eng-title"> 10th Asia-Pacific<br/>Intervarsity Chinese Debate Tournament </h1>
                            </div>
                        </div>
                        
                    </div>
            </header>
        );
    }
}
 
export default HomeHeader;