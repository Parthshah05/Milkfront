import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Table,
  Container,
  Row,
  Col,
  Card,
  Button,
  CardHeader,
  CardBody,
} from "reactstrap";

import * as productActions from "../../store/actions/productAction";
import Header from "../header";

import { connect } from "react-redux";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }
  componentDidMount() {
    if (localStorage.getItem("userLogin") == null) {
      this.props.history.push("/");
      return;
    }

    const { getAllProducts } = this.props;
    if (getAllProducts == null) {
      //
    } else {
      getAllProducts();
    }
  }
  handleEdit = (selectedProduct) => {
    const { setSelectedProduct } = this.props;
    setSelectedProduct(selectedProduct);
    this.props.history.push("/productupdate");
  };

  displayProducts() {
    const { loading, error, productList, deleteProduct } = this.props;

    if (error) {
      return <div>Something went wrong!</div>;
    } else if (loading) {
      return <div>Loading Products...</div>;
    } else {
      return productList.map((prod) => {
        return (
          <tr>
            <td>{prod.id}</td>
            <td>{prod.name}</td>
            <td>{prod.description}</td>

            <td>{prod.price}</td>
            <td>
              <Button color="info" onClick={() => this.handleEdit(prod)}>
                Edit
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                color="danger"
                onClick={() => {
                  deleteProduct(prod.id);
                }}
              >
                Delete
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                color="success"
                key={prod.id}
                onClick={(e) => this.setState({ selected: prod.id })}
              >
                <Link to={`/productdata/${prod.id}`}>View</Link>
              </Button>
            </td>
          </tr>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Container>
          <Row>
            <Col sm="12">
              <Card style={{ marginTop: "50px" }}>
                <CardHeader
                  style={{
                    textAlign: "center",
                    color: "#BC1A4B",
                    background: "#1ABC9C",
                  }}
                >
                  <h5>List of Products</h5>
                </CardHeader>
                <br></br>
                <Col sm="4">
                  <Button
                    style={{
                      background: "#1ABC9C",
                      color: "#BC1A4B",
                      borderColor: "#1ABC9C",
                    }}
                  >
                    <Link to="/productinsert">Add Product</Link>
                  </Button>
                </Col>
                <CardBody>
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>

                        <th>Price</th>
                        <th colSpan="3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>{this.displayProducts()}</tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps({ product }) {
  return {
    error: product.error,
    loading: product.loading,
    productList: product.productList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllProducts: () => dispatch(productActions.fetchProducts()),
    deleteProduct: (productId) =>
      dispatch(productActions.deleteProduct(productId)),
    setSelectedProduct: (selectedProduct) =>
      dispatch(productActions.setSelectedProduct(selectedProduct)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductList));
