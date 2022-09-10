import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/Register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/Login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },

  {
    path: "/route_name/:route_name/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
  ///////////////add the router in the pages///////////
  {
    path: "/About",
    name: "About",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/users/familyRecipes",
    name: "familyRecipes",
    component: () => import("./pages/FamilyRecipesPage"),
  },
  {
    path: "/users/MyRecipes",
    name: "MyRecipesPage",
    component: () => import("./pages/MyRecipesPage"),
  },
  
  {
    path: "/users/favorites",
    name: "FavoritesPage",
    component: () => import("./pages/FavoritesPage"),
  },
  {
    path: "/users/CreateRecipe",
    name: "create",
    component: () => import("./pages/CreateRecipePage"),
  },
 // {
  //  path: "/Logout",
 //   name: "logout",
 //   component: () => import("./pages/LoginPage"), //??????????????????????????
//  },
];

export default routes;
