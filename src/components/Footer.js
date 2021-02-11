import React, { Component } from 'react';
import './css/Footer.css';

class Footer extends Component {
    state = {  }
    render() { 
        return ( 
            <footer>
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                  <div>
                    <h4>联系方式</h4>
                    <dl>
                        <dt>咨询电话:</dt>
                        <dd>+65 12345678</dd>
                        <dd>+65 01234567</dd>
                    </dl>
                    <dl>
                        <dt>邮箱:</dt>
                        <dd><a href="mailto:someone@email.com">someone1@email.com</a></dd>
                        <dd><a href="mailto:someone@email.com">someone2@email.com</a></dd>
                    </dl>
                  </div>
                </div>
                <div className="col-sm-6">
                  <h4>关注我们</h4>
                      <ul className="social-network social-circle">
                       <li><a href="https://www.facebook.com/NTUCSapchinesedebate/" className="icoFacebook" title="Facebook" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                       <li><a href="https://www.instagram.com/apchinesedebate/" className="icoinstagram" title="instagram" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a></li>
                       <li><a href="https://www.youtube.com/channel/UCbcpKtCxhYXWGptwk-deteg" className="icoyoutube" title="youtube" target="_blank" rel="noreferrer"><i className="fab fa-youtube"></i></a></li>
                       <li><a href="https://weibo.com/u/5398940329" className="icoweibo" title="weibo" target="_blank" rel="noreferrer"><i className="fab fa-weibo"></i></a></li>
                      </ul>       
                </div>
              </div>
              <div className="row">
                <div className="col-12 copy">
                  <p className="text-center">&copy; Copyright 2021 - 南洋理工大学中文协会 Nanyang Technological University Chinese Society</p>
                </div>
              </div>
            </div>
          </footer>
        );
    }
}
 
export default Footer;