import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuContext } from '../../context/menu';

function Sidebar() {
    const [{ isCollapsed }] = React.useContext(MenuContext);
    return (
    <div className='h-100'>
        <div id='sidebar-menu'>
            <ul className='list-unstyled' id='side-menu'>
                <li className='menu-title mx-3 px-3'>Menu</li>
                <li>
                    <Link to={"/dashboard"} className='menu-item py-3 text-sm my-0 mx-3 px-4 d-flex align-items-center'>
                        <div className='menu-pill'>
                            <FontAwesomeIcon icon="fa-solid fa-user" />    
                        </div>
                        {!isCollapsed && <span>Home</span>}
                    </Link>
                </li>               
                <li>
                    <Link to={"/users"} className='menu-item py-3 text-sm my-0 mx-3 px-4 d-flex align-items-center'>
                        <div className='menu-pill'>
                            <FontAwesomeIcon icon="fa-solid fa-users" />    
                        </div>
                        {!isCollapsed && <span>Users</span>}
                    </Link>
                </li>
                <li>
                    <Link to={"/categories"} className='menu-item py-3 text-sm my-0 mx-3 px-4 d-flex align-items-center'>
                        <div className='menu-pill'>
                            <FontAwesomeIcon icon="fa-solid fa-box" />                
                        </div>
                        {!isCollapsed && <span>Categories</span>}
                    </Link>
                </li>
                <li>
                    <Link to={"/products"} className='menu-item py-3 text-sm my-0 mx-3 px-4 d-flex align-items-center'>
                        <div className='menu-pill'>
                            <FontAwesomeIcon icon="fa-solid fa-boxes-stacked" />
                        </div>
                        {!isCollapsed && <span>Products</span>}
                    </Link>
                </li>
                <li>
                    <Link to={"/reports"} className='menu-item py-3 text-sm my-0 mx-3 px-4 d-flex align-items-center'>
                        <div className='menu-pill'>
                            <FontAwesomeIcon icon="fa-solid fa-chart-line" />
                        </div>
                        {!isCollapsed && <span>Reports</span>}
                    </Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar