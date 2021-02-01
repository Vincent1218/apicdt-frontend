import React, { Component } from 'react';
import HomeHeader from '../components/HomeHeader'
import Info from '../components/Info'
import Footer from '../components/Footer'

class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <div id="home">
                <HomeHeader />
                <Info />
                <Footer />
            </div>
        );
    }
}
 
export default Home;