import Home from "../pages/Home"
import Career from "../pages/Career"
import Dashboard from "../pages/Dashboard"
import AdminLogin from "../pages/AdminLogin"
import CareerAdmin from "../pages/AdminPages/CareerAdmin";
import AddCareerAdmin from "../pages/AdminPages/AddCareerAdmin";
import Details from "../pages/Career/Details";

export const NonAuthRoutes = [
    {
        path: "/",
        component: <Home />
    },
    {
        path: "/markets",
        component: <div>asd</div>
    },
    {
        path: "/news",
        component: <div>asd</div>
    },
    {
        path: "/career",
        component: <Career />
    },
    {
        path: "/career/details/:id",
        component: <Details />
    },
    {
        path: "/about",
        component: <div>asd</div>
    },
    {
        path: "/admin/login",
        component: <AdminLogin />
    },
]

// dynamic sidebar menu 

export const AuthRoutes = [
    {
        path: "/admin/dashboard",
        component: <Dashboard />,
    },
    {
        path: "/admin/karir",
        component: <CareerAdmin />,
    },
    {
        path: "/admin/karir/tambah",
        component: <AddCareerAdmin />,
    },
]