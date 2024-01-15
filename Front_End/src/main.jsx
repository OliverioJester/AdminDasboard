import React from 'react';
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import { ContextProvider } from './context/ContextProvider.jsx';

import { MenuProvider } from './context/menu';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      
        <MenuProvider>
          <RouterProvider router={router} />
        </MenuProvider>
      
    </ContextProvider>
  </React.StrictMode>
)
