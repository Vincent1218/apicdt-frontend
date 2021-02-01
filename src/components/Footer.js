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
                    <h4>Contact</h4>
                    <dl>
                        <dt>Tel:</dt>
                        <dd>+65 12345678</dd>
                        <dd>+65 01234567</dd>
                    </dl>
                    <dl>
                        <dt>Email:</dt>
                        <dd><a href="mailto:someone@email.com">someone1@email.com</a></dd>
                        <dd><a href="mailto:someone@email.com">someone2@email.com</a></dd>
                    </dl>
                  </div>
                </div>
                <div className="col-sm-6">
                  <h4>Follow Us</h4>
                      <ul className="social-network social-circle">
                       <li><a href="https://www.facebook.com/NTUChineseSoc/" className="icoFacebook" title="Facebook" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                       <li><a href="https://www.instagram.com/ntuchinesesoc/" className="icoinstagram" title="instagram" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a></li>
                       <li><a href="https://www.youtube.com/user/NTUChineseSociety/" className="icoyoutube" title="youtube" target="_blank" rel="noreferrer"><i className="fab fa-youtube"></i></a></li>
                       <li><a href="https://weibo.com/3085264027/" className="icoweibo" title="weibo" target="_blank" rel="noreferrer"><i className="fab fa-weibo"></i></a></li>
                      </ul>       
                </div>
              </div>
              <div class="row">
                <div class="col-12 copy">
                  <p class="text-center">&copy; Copyright 2021 - 南洋理工大学中文协会 Nanyang Technological University Chinese Society</p>
                </div>
              </div>
            </div>
          </footer>
        );
    }
}
 
export default Footer;