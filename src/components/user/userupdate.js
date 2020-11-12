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
import * as userActions from '../../store/actions/userAction';

class UserUpdate extends Component {  


constructor(props) {
  super(props);

  const { selectedUser, history } = props;

  if (!selectedUser) {
    history.push('/userlist');
  }

  this.state = {
    ...selectedUser,
  };
}

handleInputChange = (e, field) => {
  this.setState({
    [field]: e.target.value,
  });
};

  render() {
    const { name, email, password } = this.state;
   const { updateUserMutation } = this.props;

        return(
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
                <Link to="/userlist">Back</Link>
                </Button>
                </Col>
                <CardBody>
                <Form>
                    <FormGroup>
                      <Label for="exampleFirstName"> Name:</Label>
                      <Input
                        type="text"
                        name="name"
                        id="exampleFirstName"
                        placeholder="Edit your Name"
                        value={name}
                        onChange={(e) => this.handleInputChange(e, 'name')}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleemail">Email:</Label>
                      <Input
                        type="email"
                        name="email"
                        id="exampleLastName"
                        placeholder="Edit your Email"
                        value={email}
                        onChange={(e) => this.handleInputChange(e, 'email')}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplepass">Password:</Label>
                      <Input
                        type="password"
                        name="password"
                        id="examplepass"
                        placeholder="Edit your Password"
                        value={password}
                        onChange={(e) => this.handleInputChange(e, 'password')}
                      />
                    </FormGroup>
                    <Button
                      onClick={() => updateUserMutation(this.state)}
                      style={{
                        background: "#1ABC9C",
                        color: "#BC1A4B",
                        borderColor: "#1ABC9C",
                      }}
                    >
                      <b>Update</b>
                    </Button>
                  </Form>
                {/* <tbody>
                    {this.displayUserData(selectedUser)}
                </tbody> */}
               
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
        error: user.error,
        loading: user.loading,
        selectedUser: user.selectedUser,
      };
    }
    
    function mapDispatchToProps(dispatch) {
      return {
        updateUserMutation: (userData) => dispatch(userActions.fetchUserUpdateId(userData)),
      };
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserUpdate));
    


