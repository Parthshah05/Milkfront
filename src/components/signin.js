import React,{Component} from "react";
import Header from "./header";
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import { userloginMutation } from '../queries/queries';
//import PropTypes from 'prop-types';
//import { connect } from 'react-redux'
//import { addTodo } from '../actions'


// //import { signin } from "../containers/Login/signin";
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

//import { signin } from "../containers/Login/signin";



class Signin extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            success:0
        };
    }
    
    submitForm(e){
        e.preventDefault()
        this.setState({success: true});
        // use the userloginmutation
        this.props.userloginMutation({

            variables: {
                email: this.state.email,
                password: this.state.password,
                
            },
            
            
        });
        
        this.props.history.push('/userlist');
        
        
    }
    render(){
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
                             
                              <CardBody>
                                <Form id="user-login" onSubmit={ this.submitForm.bind(this) }>
                                  <FormGroup>
                                    <Label >Email</Label>
                                    <Input
                                      type="email"
                                      onChange={ (e) => this.setState({ email: e.target.value }) }
                                       placeholder="Enter your email"
                                      required
                                    />
                                  </FormGroup>
                                  <FormGroup>
                                    <Label>Password</Label>
                                    <Input
                                      type="password"
                                 
                                      onChange={ (e) => this.setState({ password: e.target.value }) }
                                      placeholder="Enter your password"
                                      required
                                    />
                                  </FormGroup>
                                       {/* <div className="row">
                                        <div className="col-md-6 offset-sm-3 text-left">
                                        <div
                                        className="alert alert-success"
                                        style={{ display: this.state.success ? "" : "none", marginTop: "10px" }}
          >
            Login successfully.
          </div>
        </div></div> */}
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


export default compose(
    
    graphql(userloginMutation, { name: "userloginMutation" })
)(Signin);

