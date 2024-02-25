import Home from "../pages/Home"
import Career from "../pages/Career"
import Dashboard from "../pages/AdminPages/Dashboard"
import AdminLogin from "../pages/AdminLogin"
import CareerAdmin from "../pages/AdminPages/CareerAdmin";
import AddCareerAdmin from "../pages/AdminPages/AddCareerAdmin";
import Details from "../pages/Career/Details";
import Service from "../pages/AdminPages/Service";
import DetailService from "../pages/AdminPages/DetailService";
import AddEditProject from "../pages/AdminPages/AddEditProject";

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
        path: "/admin/karir/:type/:id",
        component: <AddCareerAdmin />,
    },
    {
        path: "/admin/pelayanan",
        component: <Service />,
    },
    {
        path: "/admin/pelayanan/:id",
        component: <DetailService />,
    },
    {
        path: "/admin/pelayanan/:type/:service_id/:id",
        component: <AddEditProject />,
    },
]