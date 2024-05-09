import { lazy } from "react";
import Loadable from '../components/shared/Loadable';
const TodoScreen = Loadable(lazy(() => import('./todo/index')));


const Router = [
  { path: "/", element: <TodoScreen /> },
]

export default Router

