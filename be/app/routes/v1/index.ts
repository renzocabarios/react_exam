import gamesRoute from "./games/route";
import { IRoutes, IRoute } from "../../types";

const routes: IRoutes = [
  {
    url: "games",
    route: gamesRoute,
  },
];

export default routes.map((e: IRoute) => {
  e.url = `v1/${e.url}`;
  return e;
});
