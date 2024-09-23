import React from 'react';
import { FaHome, FaCalendarAlt, FaClipboardList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../CssComponents/Dashboard.css';

const SideBar = ({bar, setBar}) => {
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
  return (
    <aside className="sidebar" style={{display : bar ? 'block' : 'none', position : 'absolute', height : '100%'}}>
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
</aside>
  )
}

export default SideBar