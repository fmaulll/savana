import Home from "../pages/Home"
import Career from "../pages/Career"
import Dashboard from "../pages/Dashboard"
import AdminLogin from "../pages/AdminLogin"

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
]