import product_route from "./product_routes.json";
import user_route from "./user_routes.json";
import address_route from "./address_routes.json";
import category_route from "./category_routes.json";
import comment_route from "./comment_routes.json";
import order_route from "./order_routes.json";
import reply_route from "./reply_routes.json";
import seller_route from "./seller_routes.json";
import wishlist from "./wishlist_routes.json";

const app_routes = {
  ...product_route,
  ...user_route,
  ...address_route,
  ...category_route,
  ...comment_route,
  ...order_route,
  ...reply_route,
  ...seller_route,
  ...wishlist,
};

export default app_routes;
