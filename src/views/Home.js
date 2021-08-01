import React, { Component } from 'react';
import HomeHeader from '../components/HomeHeader'
import Info from '../components/Info'
import Timeline from '../components/Timeline'
import Footer from '../components/Footer'

class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <div id="home">
                <HomeHeader />
                <Info />
                <Timeline />
                <Footer />
            </div>
        );
    }
}
 
export default Home;