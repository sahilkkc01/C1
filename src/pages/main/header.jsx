import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export default function Header() {
    const location = useLocation();
    const { userId } = useParams();

    const pathname = location.pathname;

    const initialMenu = sessionStorage.getItem('myMenu') || 'light-style layout-navbar-fixed layout-compact layout-menu-fixed';
    const initialToggle = sessionStorage.getItem('myToggle') === 'true';

    const [menu, setMenu] = useState(initialMenu);
    const [toggle, setToggle] = useState(initialToggle);

    useEffect(() => {
        sessionStorage.setItem('myMenu', menu);
        sessionStorage.setItem('myToggle', toggle);

        document.documentElement.className = menu;
        // console.log(`menu : ${menu}`);
    }, [menu, toggle]);

    const changeMenuOnHover = () => {
        if (toggle) {
            setMenu('light-style layout-navbar-fixed layout-compact layout-menu-fixed layout-menu-collapsed layout-menu-hover');
        } else {
            setMenu('light-style layout-navbar-fixed layout-compact layout-menu-fixed');
        }
    };

    const changeMenuOffHover = () => {
        if (toggle) {
            setMenu('light-style layout-navbar-fixed layout-compact layout-menu-fixed layout-menu-collapsed');
        } else {
            setMenu('light-style layout-navbar-fixed layout-compact layout-menu-fixed');
        }
    };

    const changeMenuOnClick = () => {
        setMenu('light-style layout-navbar-fixed layout-compact layout-menu-fixed layout-menu-collapsed');
        setToggle(!toggle);
    };


    const user_permissions = localStorage.getItem("user_permissions");
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        if (user_permissions) {
            // Parse the JSON string back into an object
            const parsedPermissions = JSON.parse(user_permissions);
            setPermissions(parsedPermissions);
            // console.log(parsedPermissions);
            // This will now log the object correctly
        }
    }, [user_permissions]);

    return (
        <>
            <aside
                id="layout-menu"
                className="layout-menu menu-vertical menu bg-menu-theme" onMouseOver={changeMenuOnHover} onMouseOut={changeMenuOffHover}
            >
                <div className="app-brand demo">
                    <Link to={'/'} className="app-brand-link">
                        <span className="app-brand-logo demo me-1">
                            <span style={{ color: "var(--bs-primary)" }}>
                                <svg
                                    width={30}
                                    height={24}
                                    viewBox="0 0 250 196"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12.3002 1.25469L56.655 28.6432C59.0349 30.1128 60.4839 32.711 60.4839 35.5089V160.63C60.4839 163.468 58.9941 166.097 56.5603 167.553L12.2055 194.107C8.3836 196.395 3.43136 195.15 1.14435 191.327C0.395485 190.075 0 188.643 0 187.184V8.12039C0 3.66447 3.61061 0.0522461 8.06452 0.0522461C9.56056 0.0522461 11.0271 0.468577 12.3002 1.25469Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        opacity="0.077704"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M0 65.2656L60.4839 99.9629V133.979L0 65.2656Z"
                                        fill="black"
                                    />
                                    <path
                                        opacity="0.077704"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M0 65.2656L60.4839 99.0795V119.859L0 65.2656Z"
                                        fill="black"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M237.71 1.22393L193.355 28.5207C190.97 29.9889 189.516 32.5905 189.516 35.3927V160.631C189.516 163.469 191.006 166.098 193.44 167.555L237.794 194.108C241.616 196.396 246.569 195.151 248.856 191.328C249.605 190.076 250 188.644 250 187.185V8.09597C250 3.64006 246.389 0.027832 241.935 0.027832C240.444 0.027832 238.981 0.441882 237.71 1.22393Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        opacity="0.077704"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M250 65.2656L189.516 99.8897V135.006L250 65.2656Z"
                                        fill="black"
                                    />
                                    <path
                                        opacity="0.077704"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M250 65.2656L189.516 99.0497V120.886L250 65.2656Z"
                                        fill="black"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12.2787 1.18923L125 70.3075V136.87L0 65.2465V8.06814C0 3.61223 3.61061 0 8.06452 0C9.552 0 11.0105 0.411583 12.2787 1.18923Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12.2787 1.18923L125 70.3075V136.87L0 65.2465V8.06814C0 3.61223 3.61061 0 8.06452 0C9.552 0 11.0105 0.411583 12.2787 1.18923Z"
                                        fill="white"
                                        fillOpacity="0.15"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M237.721 1.18923L125 70.3075V136.87L250 65.2465V8.06814C250 3.61223 246.389 0 241.935 0C240.448 0 238.99 0.411583 237.721 1.18923Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M237.721 1.18923L125 70.3075V136.87L250 65.2465V8.06814C250 3.61223 246.389 0 241.935 0C240.448 0 238.99 0.411583 237.721 1.18923Z"
                                        fill="white"
                                        fillOpacity="0.3"
                                    />
                                </svg>
                            </span>
                        </span>
                        <span className="app-brand-text demo menu-text fw-semibold ms-2">
                            TAS
                        </span>
                    </Link>
                    <Link 
                        className="layout-menu-toggle menu-link text-large ms-auto"
                    >
                        <i className="menu-toggle-icon d-xl-block align-middle " onClick={changeMenuOnClick} />
                    </Link>
                </div>
                <div className="menu-inner-shadow" />
                <ul className="menu-inner py-1">
                    {permissions &&
                        [...new Set(permissions.map(permission => permission.application.url))]
                            .filter(url =>
                                [
                                    "https://ctas.live/Gate",
                                    "https://ctas.live/CISF",
                                    
                                    "https://ctas.live/RakeInWord",
                                    "https://ctas.live/RakeOutWord",
                                    "https://ctas.live/RakeOutWordWTR",
                                    
                                    "https://ctas.live/YardTransactions",
                                    
                                    "https://ctas.live/CartingReadFCL",
                                    "https://ctas.live/Delivery",
                                    "https://ctas.live/DeStuffingReadFCL",
                                    "https://ctas.live/DeStuffingReadLCL",
                                    "https://ctas.live/StuffingReadFCL",

                                    // "https://ctas.live/DTMSGate",
                                    // "https://ctas.live/DTMSYardTransactions",
                                    // "https://ctas.live/CartingReadLCL",
                                    // "https://ctas.live/StuffingReadLCL",
                                ].includes(url)
                            )
                            .map((url, i) => {
                                // console.log(url);
                                const shortUrl = url.replace("https://ctas.live/", "");
                                return (
                                    <li key={i} className={`menu-item ${pathname === `/${shortUrl}` ? 'active' : ''}`}>
                                        <Link to={`/${shortUrl}`} className="menu-link" aria-label={shortUrl}>
                                            <i className="menu-icon tf-icons ri-user-lne" />
                                            <div data-i18n={shortUrl} className="text-capitalize">
                                                {shortUrl}
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })}

                </ul>
            </aside>

        </>

    );
}