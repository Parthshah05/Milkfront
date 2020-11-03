import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as userActions from "../store/actions/userAction";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar style={{ background: "#BC1A4B" }} light expand="md">
        <NavbarBrand href="/">
          <h3>MilkMan :)</h3>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">
                <b>Signin</b>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/signup">
                <b>Signup</b>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/userlist">
                <b>User</b>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/product">
                <b>Product</b>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/bundle">
                <b>Bundle</b>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/bundle_product">
                <b>Bundle_Product</b>
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink href="/role">
                <b>Role</b>
              </NavLink>
            </NavItem> */}
            <NavItem>
              <div
                onClick={() => {
                  // this.props.logoutUser();
                  localStorage.removeItem("userLogin");
                }}
              >
                <NavLink href="/">
                  <b>Signout</b>
                </NavLink>
              </div>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: () => dispatch(userActions.logoutUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
