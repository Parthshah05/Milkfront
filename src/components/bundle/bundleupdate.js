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

import * as bundleActions from "../../store/actions/bundleAction";

class BundleUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      success: false,
      errormessage: "",
    };

    const { selectedBundle, history } = props;

    if (!selectedBundle) {
      history.push("/bundle");
    }

    this.state = {
      ...selectedBundle,
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
    const { name } = this.state;
    const { updateBundleMutation } = this.props;

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
                    <Link to="/bundle">Back</Link>
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
                    
                    <Button
                      onClick={() =>
                        updateBundleMutation(this.state)
                          .then((data) => {
                            this.props.history.push("/bundle");
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

function mapStateToProps({ bundle }) {
  return {
    error: bundle.error,
    loading: bundle.loading,
    selectedBundle: bundle.selectedBundle,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateBundleMutation: (bundleData) =>
      dispatch(bundleActions.fetchBundleUpdateId(bundleData)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BundleUpdate));
