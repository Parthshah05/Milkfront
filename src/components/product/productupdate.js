import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
//import { Mutation } from "react-apollo";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input,
  Form,
} from "reactstrap";
import Header from "../header";
import { connect } from "react-redux";

import * as productActions from "../../store/actions/productAction";

class ProductUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      success: false,
      errormessage: "",
    };

    const { selectedProduct, history } = props;

    if (!selectedProduct) {
      history.push("/product");
    }

    this.state = {
      ...selectedProduct,
    };
  }

  handleInputChange = (e, field) => {
    this.setState({
      [field]: e.target.value,
    });
  };

  render() {
    const errorMessage = () => {
      return (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <div
              className="alert alert-danger"
              style={{ display: this.state.error ? "" : "none" }}
            >
              {this.state.errormessage}
            </div>
          </div>
        </div>
      );
    };
    const { name, description,price,image } = this.state;
    const { updateProductMutation } = this.props;

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
                  <h5>Update Your Data</h5>
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
                    <Link to="/product">Back</Link>
                  </Button>
                </Col>
                {errorMessage()}
                <CardBody>
                  <Form>
                    <FormGroup>
                      <Label for="exampleName"> Name:</Label>
                      <Input
                        type="text"
                        name="name"
                        id="exampleName"
                        placeholder="Edit your Product Name"
                        value={name}
                        onChange={(e) => this.handleInputChange(e, "name")}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampledesc">Description:</Label>
                      <Input
                        type="text"
                        name="description"
                        id="exampledesc"
                        placeholder="Edit your Description"
                        value={description}
                        onChange={(e) => this.handleInputChange(e, "description")}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleprice">Price:</Label>
                      <Input
                        type="number"
                        name="price"
                        id="exampleprice"
                        placeholder="Edit your Price"
                        value={price}
                        onChange={(e) => this.handleInputChange(e, "price")}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleimage">Image:</Label>
                      <Input
                        type="text"
                        name="image"
                        id="exampleimage"
                        placeholder="Edit your Image"
                        value={image}
                        onChange={(e) => this.handleInputChange(e, "image")}
                      />
                    </FormGroup>
                    <Button
                      onClick={() =>
                        updateProductMutation(this.state)
                          .then((data) => {
                            this.props.history.push("/product");
                          })
                          .catch((error) => {
                            console.log(error);
                            if (error) {
                              this.setState({
                                error: error,
                                success: false,
                                errormessage: error.message.slice(15),
                              });
                            }
                          })
                      }
                      style={{
                        background: "#1ABC9C",
                        color: "#BC1A4B",
                        borderColor: "#1ABC9C",
                      }}
                    >
                      <b>Update</b>
                    </Button>
                  </Form>
                 
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
    selectedProduct: product.selectedProduct,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateProductMutation: (productData) =>
      dispatch(productActions.fetchProductUpdateId(productData)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductUpdate));
