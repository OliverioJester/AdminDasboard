import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { useStateContext } from '../../context/ContextProvider';
import { ThemeContext } from "../../context/theme";
import { MenuContext } from '../../context/menu';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axiosClient from '../../axios-client';


function Header_dashboard(args) {
// modal
      const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
// end modal

const {user, token, setUser, setToken } = useStateContext();
useEffect(() => {
  axiosClient.get('/user')
    .then(({data}) =>{
        setUser(data)
    })
}, [])


//2:07:17
// logout
const [isLogoutInProgress, setIsLogoutInProgress] = useState(false);
      const onLogout = async (ev) => {
        try {
          ev.preventDefault()

          if (isLogoutInProgress) {
            return;
          }

          setIsLogoutInProgress(true);  

          await axiosClient.post('/logout')
          .then(() => {
            setUser({})
            setToken(null)
          })
        } catch (error) {
          console.error('Logout failed:', error);
      
        } finally {
          // Re-enable the button regardless of success or failure
          // Your button enabling logic here
          try {
            // Re-enable the button or revert any other UI actions that were taken during the logout process
            setIsLogoutInProgress(false);
          } catch (finallyError) {
            console.error('Error in finally block:', finallyError);
          }
    
        }

      }     
// end logout

  // darkmode    
    const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);
// end darkmode

// burger menu toogle
    const [{ }, toggleMenu] = useContext(MenuContext);
// end burger menu toogle

    return (
    <header id='page-topbar'>
        <div className='navbar-header'>
            <div className='d-flex w-100 justify-content-between'>
                <div>
                    <button 
                        onClick={toggleMenu}
                        className='btn btn-sm px-3 font-size-16 header-item'>
                        <FontAwesomeIcon icon="fa-solid fa-bars" />
                    </button>
                </div>
                <div className='header-navigation'>
                    <button className=' theme-icon mx-3  dd' onClick={toggleTheme}>
                        {
                            isDark ? (
                                <FontAwesomeIcon icon="fa-solid fa-sun" />
                            ) : (
                                <FontAwesomeIcon icon="fa-solid fa-moon" />
                            )
                        }

                    </button>
                    <button className=' theme-icon dd p-3' onClick={toggle}>    
                     <FontAwesomeIcon  icon="fa-solid fa-user" />
                    </button>
                    <button className='theme-icon dd p-3'>
                     <FontAwesomeIcon icon="fa-solid fa-gear" className=''/>
                    </button>    
                    <Modal style={{color: 'black'}} isOpen={modal} toggle={toggle} {...args} size='sm'>
        <ModalHeader className='mx-auto' >Do you wish to log out?</ModalHeader>
        <ModalBody className='text-center'>
            <FontAwesomeIcon icon=" fa-solid fa-user-circle" size='xl' />
               <p>{user.name}</p> 
        </ModalBody>
        <ModalFooter className='mx-auto'>
          <Button color="primary" onClick={onLogout} disabled={isLogoutInProgress}>
            Logout
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
                </div>
            </div>
        </div>
    </header>
  );
}

export default Header_dashboard;