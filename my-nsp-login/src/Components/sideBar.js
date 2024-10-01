import React from 'react';
import { FaHome, FaCalendarAlt, FaClipboardList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../CssComponents/Dashboard.css';
import AdminMain from './AdminMain';

const SideBar = ({ bar, setBar, role }) => {
    const navigate = useNavigate();
    const home = () => {
        navigate('/dashboard');
        setBar(false);
    };
    const schedule = () => {
        navigate('/schedule');
        setBar(false);
    };
    const request = () => {
        navigate('/shiftrequest');
        setBar(false);
    };
    const homeAdmin = () =>{
        navigate('/adminmain')
        setBar(false)
    }
    return (
        <>
            {role === "user" ? (<aside className="sidebar" style={{ display: bar ? 'block' : 'none', position: 'absolute', height: '100%' }}>
                <nav className="sidebar-menu">
                    <div className="menu-item" onClick={home}>
                        <FaHome /> Home
                    </div>
                    <div className="menu-item" onClick={schedule}>
                        <FaCalendarAlt /> Schedule
                    </div>
                    <div className="menu-item" onClick={request}>
                        <FaClipboardList /> Request
                    </div>
                </nav>
            </aside >
            ) : (

                <aside className="sidebar" style={{ display: bar ? 'block' : 'none', position: 'absolute', height: '100%', zIndex : '100000' }}>
                    <nav className="sidebar-menu">
                        <div className="menu-item" onClick={homeAdmin}>
                            <FaHome /> Home
                        </div>
                    </nav>
                </aside >
            )}
        </>
    )
}

export default SideBar