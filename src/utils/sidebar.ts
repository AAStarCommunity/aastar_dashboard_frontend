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
    path: "/api-keys",
    icon: "FormsIcon",
    name: "APIKey apply",
  },
  {
    path: "/cards",
    icon: "CardsIcon",
    name: "Regist Project Info",
  },
  {
    path: "/strategy",
    icon: "PagesIcon",
    name: "Strategy Data",
  },
];

export default routes;
