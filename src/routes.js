import React from "react";
import { Switch, Route, Router, BrowserRouter } from "react-router-dom";

import Signin from "./components/user/signin";
import Signup from "./components/user/signup";
import Product from "./components/product/productlist";
import Bundle from "./components/bundle/bundlelist";
import Bundle_Product from "./components/bundle_product/bundle_productlist";
import Role from "./components/role/roleinsert";
import UserList from "./components/user/userlist";
import ProductInsert from "./components/product/productinsert";
import BundleInsert from "./components/bundle/bundleinsert";
import Bundle_ProductInsert from "./components/bundle_product/bundle_productinsert";
import RoleInsert from "./components/role/roleinsert";
import UserInsert from "./components/user/userinsert";
import UserData from "./components/user/userdata";
import UserUpdate from "./components/user/userupdate";
import ProductData from "./components/product/productdata";
import createHistory from 'history/createHashHistory';

export const history = createHistory();

const Routes = () => {
  return (
    <div>
      <BrowserRouter >
        <Switch>
          <Route path="/signup" component={Signup} />
         
          <Route path="/" exact component={Signin} />
          <Route path="/product" exact component={Product} />
          <Route path="/bundle" exact component={Bundle} />
          <Route path="/bundle_product" exact component={Bundle_Product} />
          <Route path="/role" exact component={Role} />
          <Route path="/userlist" exact component={UserList} />
          <Route path="/productinsert" exact component={ProductInsert} />
          <Route path="/bundleinsert" exact component={BundleInsert} />
          <Route path="/bundle_productinsert" exact component={Bundle_ProductInsert} />
          <Route path="/roleinsert" exact component={RoleInsert} />
          <Route path="/userinsert" exact component={UserInsert} />
          <Route path="/userdata/:id" exact component={UserData} />
          <Route path="/userupdate" exact component={UserUpdate} />
          <Route path="/productdata/:id" exact component={ProductData} />
          {/* <Route path="/" exact component={Home} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
