import React from "react";
import "./Header.css";
import KeepLogo from "../../assests/th.jpeg"; 
import MenuIcon from "../../assests/three-bars-svgrepo-com.svg";
import RefreshIcon from "../../assests/refresh-cw-svgrepo-com.svg";
import ListView from "../../assests/view-list-svgrepo-com.svg"; 
import SettingsIcon from "../../assests/settings-svgrepo-com.svg";
import AppsIcon from "../../assests/10a637d3f5dedc164fdf543d5183f193_400x400.jpeg";
import AccountIcon from "../../assests/th (1).jpeg";
import SearchIcon from "../../assests/search-svgrepo-com.svg"; 
import Tooltip from '@mui/material/Tooltip';

function Header() {
    return (
        <header className="header">
            <div className="header-left">
                <Tooltip title="Main menu">
                    <img src={MenuIcon} alt="Menu" className="header-icon" />
                </Tooltip>
                <img src={KeepLogo} alt="Google Keep" className="header-logo" />
                <span className="header-title">Keep</span>
            </div>
            <div className="header-center">
                <div className="search-container">
                    <img src={SearchIcon} alt="Search" className="search-icon" />
                    <input type="text" placeholder="Search" className="header-search-input" />
                </div>
            </div>
            <div className="header-right">
                <Tooltip title="Refresh">
                    <img src={RefreshIcon} alt="Refresh" className="header-icon" />
                </Tooltip>
                <Tooltip title="List view">
                    <img src={ListView} alt="List View" className="header-icon" />
                </Tooltip>
                <Tooltip title="Settings">
                    <img src={SettingsIcon} alt="Settings" className="header-icon" />
                </Tooltip>
                <Tooltip title="Google apps">
                    <img src={AppsIcon} alt="Google apps" className="header-icon" />
                </Tooltip>
                <Tooltip title="Account">
                    <img src={AccountIcon} alt="Account" className="account-icon" />
                </Tooltip>
            </div>
        </header>
    );
}

export default Header;
