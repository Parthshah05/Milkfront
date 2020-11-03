import React, { Component } from "react";
import Header from "../header";
import * as userActions from "../../store/actions/userAction";

import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
//import { authenticate } from "../auth/authentication";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      success: false,
      errormessage: "",
    };
    if (localStorage.getItem("userLogin") !== null) {
      this.props.history.push("/userlist");
    }
  }

  componentDidMount() {
    if (this.props.userDetails) {
      this.props.history.push("/userlist");
    }
  }

  componentDidUpdate() {
    if (this.props.userDetails) {
      this.props.history.push("/userlist");
    }
  }

  submitForm(e) {
    e.preventDefault();
    this.props.loginUser(this.state.email, this.state.password).then((data) => {
      this.props.history.push("/userlist");
    })
    .catch((error) => {
     // console.log(error);
      if(error){
        this.setState({
          error:error,
          success:false,
          errormessage:error.message.slice(15),
        });
      }
      

    });
  }

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
                  <h5>Please login here</h5>
                </CardHeader>
                {errorMessage()}

                <CardBody>
                  <Form id="user-login" onSubmit={this.submitForm.bind(this)}>
                    <FormGroup>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                        placeholder="Enter your email"
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Password</Label>
                      <Input
                        type="password"
                        onChange={(e) =>
                          this.setState({ password: e.target.value })
                        }
                        placeholder="Enter your password"
                        required
                      />
                    </FormGroup>
                    
                    <Button
                      style={{
                        background: "#1ABC9C",
                        color: "#BC1A4B",
                        borderColor: "#1ABC9C",
                      }}
                    >
                      <b>LogIn</b>
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

function mapStateToProps({ user }) {
  return {
    loading: user.loading,
    userDetails: user.userDetails,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginUser: (email, password) =>
      dispatch(userActions.loginUser(email, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signin));
