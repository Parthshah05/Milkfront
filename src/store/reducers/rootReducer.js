import { combineReducers } from "redux";

import userReducer from "./userReducer";
import productReducer from "./productReducer";
import bundleReducer from "./bundleReducer";
import bundle_productReducer from "./bundle_productReducer";

export default combineReducers({
    user: userReducer,
    product: productReducer,
    bundle: bundleReducer,
    bundle_product:bundle_productReducer,
});
