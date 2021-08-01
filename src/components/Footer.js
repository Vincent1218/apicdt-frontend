import React, { Component } from 'react';
import './css/Footer.css';
import sponsor from '../assets/image/sponsorlogotransp.png';
import tys from '../assets/image/TYSLogo.png';
import clcf from '../assets/image/CLCFLogo.png';
import nyc from '../assets/image/NYCLogo.png';
import mansa from '../assets/image/MANSALogo.png';
import sc from '../assets/image/SCLogo.png';
import se from '../assets/image/SELogo.png';
import iqy from '../assets/image/IQYLogo.png';



class Footer extends Component {
    state = {  }
    render() { 
        return ( 
            <footer>
            <div className="footercontainer">
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div>
                    <h4>联系方式</h4>
                    <dl>
                        <dd>何佳萱：+65 83148709</dd>
                    </dl>
                    <dl>
                        <dd><a href="mailto:ho0012an@e.ntu.edu.sg">ho0012an@e.ntu.edu.sg</a></dd>
                    </dl>
                    <dl>
                        <dd>何智圆：+65 86500369</dd>
                    </dl>
                    <dl>
                        <dd><a href="mailto:c190024@e.ntu.edu.sg">c190024@e.ntu.edu.sg</a></dd>
                    </dl>
                    <dl>
                        <dd>沈佳欣：+65 91087660</dd>
                    </dl>
                    <dl>
                        <dd><a href="mailto:jsim029@e.ntu.edu.sg">jsim029@e.ntu.edu.sg</a></dd>
                    </dl>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <h4>关注我们</h4>
                  <ul className="social-network social-circle">
                    <li><a href="https://www.facebook.com/NTUCSapchinesedebate/" className="icoFacebook" title="Facebook" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                    <li><a href="https://www.instagram.com/apchinesedebate/" className="icoinstagram" title="instagram" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a></li>
                    <li><a href="https://www.youtube.com/channel/UCbcpKtCxhYXWGptwk-deteg" className="icoyoutube" title="youtube" target="_blank" rel="noreferrer"><i className="fab fa-youtube"></i></a></li>
                    <li><a href="https://weibo.com/u/5398940329" className="icoweibo" title="weibo" target="_blank" rel="noreferrer"><i className="fab fa-weibo"></i></a></li>
                  </ul>       
                </div>
                <div className="col-12 ">
                  <h4>合作伙伴 Title Partner</h4>
                  <a href="https://singapore.icbc.com.cn/ICBC/%E6%B5%B7%E5%A4%96%E5%88%86%E8%A1%8C/%E6%96%B0%E5%8A%A0%E5%9D%A1%E7%BD%91%E7%AB%99/en/" target="_blank"><img src={sponsor} alt="ICBC" className="ICBC-logo"/></a>
                </div>
                <div className="col-12 ">
                  <h4>宣传伙伴 Supporting Partner</h4>
                  <img src={tys} alt="TYS" className="TYS-logo"/>
                </div>
                <div className="col-12 ">
                  <h4>赞助商 Sponsors</h4>
                  <a href="https://www.iq.com/" target="_blank"><img src={iqy} alt="IQY" className="IQY-logo"/></a>
                  <img src={clcf} alt="CLCF" className="CLCF-logo"/>
                  <img src={nyc} alt="NYC" className="NYC-logo"/>
                  <img src={mansa} alt="MANSA" className="MANSA-logo"/>
                </div>
                <div className="col-12 ">
                  <h4> 媒体伙伴 Media Partners</h4>
                  <img src={sc} alt="SC" className="SC-logo"/>
                  <img src={se} alt="SE" className="SE-logo"/>
                </div>

              </div>
              <div className="row bottom-div">
                <div className="col-12 bottom-text">
                  <p className="text-center">南洋理工大学中文学会 Nanyang Technological University Chinese Society</p>
                </div>
              </div>
            </div>
          </footer>
        );
    }
}
 
export default Footer;