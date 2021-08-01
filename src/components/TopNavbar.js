import React, {useState} from 'react'
import {NavLink} from "react-router-dom";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import logoRed from '../assets/image/logo-red.png'
import logoWhite from '../assets/image/logo-white.png'
// import AuthButton from "./AuthButton"

function TopNavbar() {
    const [navbarColor, setNavbarColor] = useState("transparent");
    const [expanded, setExpanded] = useState(false);
    React.useEffect(() => {
        const updateNavbarColor = () => {
            if (
                document.documentElement.scrollTop > 20 ||
                document.body.scrollTop > 20 ||
                expanded
            ) {
                setNavbarColor("dark");
            } else {
                setNavbarColor("transparent");
            }
        };
        window.addEventListener("scroll", updateNavbarColor);
        return function cleanup() {
            window.removeEventListener("scroll", updateNavbarColor);
        };
    });

    const toggleExpanded = () =>{
        if(document.documentElement.scrollTop < 20 &&
            document.body.scrollTop < 20 ){
            setNavbarColor(expanded?"transparent":"dark");
        }
        setExpanded(!expanded);
    }

    const closeExpanded = () => {
        if(document.documentElement.scrollTop < 20 &&
            document.body.scrollTop < 20 ){
            setNavbarColor("transparent");
        }
        setExpanded(false);
    }


    return (
        <Navbar bg={navbarColor} variant={(navbarColor==="dark")?"dark":"light"} fixed="top" collapseOnSelect expand="sm" 
                expanded={expanded} onToggle={toggleExpanded}>
            <Navbar.Brand href="/">
                <img src={(navbarColor==="dark")?logoWhite:logoRed} className="img-fluid" width="30px" alt=""/> 亚太辩论
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav className="" onClick={closeExpanded}>
                    <NavLink to="/" exact className="nav-link" activeClassName="router-link-exact-active"> 主页 </NavLink>
                    {/* <NavLink to="/register" exact className="nav-link" activeClassName="router-link-exact-active"> 报名 </NavLink> */}
                    {/* <NavLink to="/schoolList" exact className="nav-link" activeClassName="router-link-exact-active"> 查看报名学校 </NavLink> */}
                    {/* <NavLink to="/starwarslisttemp" exact className="nav-link" activeClassName="router-link-exact-active"> 电子抽签成绩 </NavLink> */}
                    <NavLink to="/matchUpTable" exact className="nav-link" activeClassName="router-link-exact-active"> 对垒表 </NavLink>
                    <NavLink to="/raffleResult" exact className="nav-link" activeClassName="router-link-exact-active"> 辩题抽签结果 </NavLink>
                    <NavLink to="/handbook" exact className="nav-link" activeClassName="router-link-exact-active"> 辩手手册 </NavLink>
                    <NavLink to="/sponsor" exact className="nav-link" activeClassName="router-link-exact-active"> 鸣谢 </NavLink>
                    {/* <NavLink to="/judgeLogin" exact className="nav-link" activeClassName="router-link-exact-active"> 评审登入 </NavLink> */}
                </Nav>
               {/*} <Nav className="" onClick={closeExpanded}>
                    <AuthButton/>
    </Nav> */}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default TopNavbar;
