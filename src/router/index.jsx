import Home from "../pages/Home"
import Career from "../pages/Career"
import Dashboard from "../pages/Dashboard"

export const NonAuthRoutes = [
    {
        path: "/",
        component: <Home />
    },
    {
        path: "/career",
        component: <Career />
    },
]

// dynamic sidebar menu 

export const AuthRoutes = [
    {
        path: "/admin/dashboard",
        component: <Dashboard />,
    },
]