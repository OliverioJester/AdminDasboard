import {Navigate, createBrowserRouter} from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import UserForm from "./views/UserForm";
import Categories from "./views/Categories";
import Products from "./views/Products";
import EditCategory from "./views/EditCategory";
import AddProduct from "./views/AddProduct";
import EditProduct from "./views/EditProduct";
import Reports from "./views/Reports";
import WeeklyReports from "./views/WeeklyReports";
import AnnuallyReports from "./views/AnnuallyReports";

const router = createBrowserRouter([

    //defaultlayout
    //this is the link pages for the dashboard
    {
    path: '/',
    element: <DefaultLayout/>,
    children: [
        {
            path: '/',
            element: <Navigate to="/dashboard" />
        } ,

        {
            path: '/users',
            element: <Users/>
        } ,

        {
            path: '/users/new',
            element: <UserForm key="userCreate"/>
        } ,

        {
            path: '/users/:id',
            element: <UserForm key="userUpdate"/>
        } ,

        {
            path: '/dashboard',
            element: <Dashboard/>
        } ,

        {
            path: '/categories',
            element: <Categories/>
        } ,

        {
            path: '/editcategory/:id/edit',
            element: <EditCategory/>
        } ,


        {
            path: '/products',
            element: <Products/>
        } ,       
        
        {
            path: '/addproduct',
            element: <AddProduct/>
        } ,    

        {
            path: '/editproduct/:id/edit',
            element: <EditProduct/>
        } ,   

        {
            path: '/reports',
            element: <Reports/>
        } ,  

        {
            path: '/annuallyreports',
            element: <AnnuallyReports/>
        } ,   

        
        {
            path: '/weeklyreports',
            element: <WeeklyReports/>
        } 

    ]
    },



    //guestlayout
    {
    path: '/',
    element: <GuestLayout/>,
    children: [
        {
            path: '/',
            element: <Navigate to="/login" />
        } ,
        {
            path: '/login',
            element: <Login/>
        } ,
        {
        path: '/signup',
        element: <Signup/>
        } ,
    ]
    } ,

    {
        path: '*',
        element: <NotFound/>
    } ,  
])

export default router;