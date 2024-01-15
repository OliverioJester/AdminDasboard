import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from '../context/theme';
import "../assets/scss/app.scss";
import Header_dashboard from './Layout/Header_dashboard';
import Footer_dashboard from './Layout/Footer_dashboard';
import SideBarContainer from './Layout/SideBarContainer';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { MenuContext } from '../context/menu';
import { useStateContext } from '../context/ContextProvider';


export default function DefaultLayout() {
  

  library.add(fas);
   
    const { token, setToken} = useStateContext();
    if (!token) {
        return <Navigate to="/login" />
      }

    const [{ menuClass }] = useContext(MenuContext);



    
  return (

    //admin dashboard
    
    // I can do this!!!!
    <div className={ menuClass }>
    <div id= "defaultLayout">
   <ThemeProvider>
        <Header_dashboard />
        <SideBarContainer />
          <div className='main-content'>
              <div className='page-content'>
                <Outlet/>
              </div>
          </div>
        <Footer_dashboard />
    </ThemeProvider>    
      </div>
    </div>
  );
};
