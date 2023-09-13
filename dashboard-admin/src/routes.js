/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import UsersTable from "views/UsersTable.js";
import IdeasTable from "views/IdeasTable.js";
import IdeaDetail from "views/IdeaDetail.js";
import Home from "views/Home";
import AddUser from "views/AddUser";

const dashboardRoutes = [
  {
    path: "dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-palette",
    component: Dashboard,
    layout: "/",
  },
  {
    path: "user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/",
  },
  {
    path: "UsersTable",
    name: "User Table",
    icon: "nc-icon nc-single-02",
    component: UsersTable,
    layout: "/",
  },
  {
    path: "IdeasTable",
    name: "Idea Table",
    icon: "nc-icon nc-bulb-63",
    component: IdeasTable,
    layout: "/",
  },

  {
    path: "addUser",
    name: "Add User",
    icon: "nc-icon nc-simple-add",
    component: AddUser,
    layout: "/",
  },
  {
    path: "Detail/:id",
    name: "Detail",
    icon: "nc-icon nc-bell-55",
    component: IdeaDetail,
    layout: "/",
  },
  {
    path: "",
    name: "Home",
    icon: "nc-icon nc-bank",
    component: Home,
    layout: "/",
  },
];

export default dashboardRoutes;
