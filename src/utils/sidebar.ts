/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */

interface IRouteItem {
  path?: string;
  icon?: string;
  name: string;
  routes?: IRouteItem[];
}
type IRoutes = IRouteItem[];

const routes: IRoutes = [
  {
    path: "/", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/apikeys",
    icon: "FormsIcon",
    name: "APIKey apply",
  },
  {
    path: "/cards",
    icon: "CardsIcon",
    name: "Regist Project Info",
  },
  // {
  //   path: "/charts",
  //   icon: "ChartsIcon",
  //   name: "Charts",
  // },
  // {
  //   path: "/buttons",
  //   icon: "ButtonsIcon",
  //   name: "Buttons",
  // },
  // {
  //   path: "/modals",
  //   icon: "ModalsIcon",
  //   name: "Modals",
  // },
  // {
  //   path: "/tables",
  //   icon: "TablesIcon",
  //   name: "Tables",
  // },
  {
    icon: "PagesIcon",
    name: "Strategy Data",
    routes: [
      // submenu
      {
        path: "/login",
        name: "Login",
      },
      {
        path: "/create-account",
        name: "Create account",
      },
      {
        path: "/forgot-password",
        name: "Forgot password",
      },
      {
        path: "/404",
        name: "404",
      },
      {
        path: "/blank",
        name: "Blank",
      },
    ],
  },
];

export default routes;
