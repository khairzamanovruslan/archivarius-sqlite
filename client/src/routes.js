import ArchFirstPage from "./pages/ArchFirstPage";
import ArchSecondPage from "./pages/ArchSecondPage";
import ArchThirdPage from "./pages/ArchThirdPage";
import MainPage from "./pages/MainPage";
import {
  ARCH_FIRST_ROUTE,
  ARCH_SECOND_ROUTE,
  ARCH_THIRD_ROUTE,
  MAIN_ROUTE,
} from "./utils/consts";

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: MainPage,
  },
  {
    path: ARCH_FIRST_ROUTE,
    Component: ArchFirstPage,
  },
  {
    path: ARCH_SECOND_ROUTE,
    Component: ArchSecondPage,
  },
  {
    path: ARCH_THIRD_ROUTE,
    Component: ArchThirdPage,
  },
];
