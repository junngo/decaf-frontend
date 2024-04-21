import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/components/common/Sidebar.scss'; 


const Sidebar = () => {
    const getActiveLinkClass = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link';

    return (
        <aside className="sidebar">
            <ul className="sidebar-nav">
                <li>
                    <NavLink to="/dashboard" className={getActiveLinkClass}>Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to="/accounts" className={getActiveLinkClass}>Accounts</NavLink>
                </li>
                <li>
                    <NavLink to="/transactions" className={getActiveLinkClass}>Transactions</NavLink>
                </li>
                <li>
                    <NavLink to="/reports" className={getActiveLinkClass}>Reports</NavLink>
                </li>
                {/* Add more navigation links as needed */}
            </ul>
        </aside>
    );
};

export default Sidebar;
