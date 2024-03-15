import Home from "../pages/Home";
import Pelayanan from "../pages/Pelayanan";
import Career from "../pages/Career";
import Dashboard from "../pages/AdminPages/Dashboard";
import AdminLogin from "../pages/AdminLogin";
import CareerAdmin from "../pages/AdminPages/CareerAdmin";
import AddCareerAdmin from "../pages/AdminPages/AddCareerAdmin";
import Details from "../pages/Career/Details";
import Service from "../pages/AdminPages/Service";
import DetailService from "../pages/AdminPages/DetailService";
import AddEditProject from "../pages/AdminPages/AddEditProject";
import EditServiceDescription from "../pages/AdminPages/EditServiceDescription";
import AboutUs from "../pages/AdminPages/AboutUs";
import AboutUsDetail from "../pages/AdminPages/AboutUsDetail";
import AddEditEmployee from "../pages/AdminPages/AddEditEmployee";
import DetailPelayanan from "../pages/Pelayanan/DetailPelayanan";
import DetailProyek from "../pages/Proyek/DetailProyek";
import Proyek from "../pages/Proyek";
import TentangKami from "../pages/TentangKami";
import DetailTeam from "../pages/TentangKami/DetailTeam";
import DetailTentangKami from "../pages/TentangKami/DetailTentangKami";

export const NonAuthRoutes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/services",
    component: <Pelayanan />,
  },
  {
    path: "/services/detail/:id",
    component: <DetailPelayanan />,
  },
  {
    path: "/article",
    component: <Proyek />,
  },
  {
    path: "/article/project/:id",
    component: <DetailProyek />,
  },
  {
    path: "/career",
    component: <Career />,
  },
  {
    path: "/career/details/:id",
    component: <Details />,
  },
  {
    path: "/about",
    component: <TentangKami />,
  },
  {
    path: "/about/detail",
    component: <DetailTentangKami />,
  },
  {
    path: "/about/team/:id",
    component: <DetailTeam />,
  },
  {
    path: "/admin/login",
    component: <AdminLogin />,
  },
];

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
  {
    path: "/admin/pelayanan/description/:type/:id",
    component: <EditServiceDescription />,
  },
  {
    path: "/admin/about",
    component: <AboutUs />,
  },
  {
    path: "/admin/about/:id",
    component: <AboutUsDetail />,
  },
  {
    path: "/admin/about/employee/:type/:id",
    component: <AddEditEmployee />,
  },
  {
    path: "/admin/about/employee/:type",
    component: <AddEditEmployee />,
  },
];
