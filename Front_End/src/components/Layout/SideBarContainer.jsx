import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { MenuContext } from '../../context/menu';

function SideBarContainer() {
  const[{ isCollapsed }] = React.useContext(MenuContext);
  return (
    <div className='menu'>
        <div className='navbar-brand-box my-3'>
          { !isCollapsed && (
            <Link to={"/dashboard"} className='logo text-decoration-none mx-3 px-3'>
              SARI-SARI
            </Link>
          )}
        </div>
        <div data-simplebar className='h-100'>
            <Sidebar />
        </div>
    </div>  
  )
}
  
export default SideBarContainer;