import React,{Component}  from "react";
import Header from "../header";
//import { graphql } from 'react-apollo';
//import {flowRight as compose} from 'lodash';
import * as userActions from "../../store/actions/userAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//import { adduserMutation,getroleQuery } from '../../queries/queries';

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


class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            role_id:'',
            error:false,
            success:false,
            errormessage:""
        };
    if(localStorage.getItem('userLogin') !== null)
    {
       this.props.history.push('/userlist');
    }
    }

    componentDidMount() {
     
      const { getAllRoles } = this.props;
      getAllRoles();

    }
  
    // componentDidUpdate() {
    //   if (this.props.userDetails) {
    //     this.props.history.push("/userlist");
    //   }
    // }
  
    submitForm(e) {
      e.preventDefault();
      this.props.RegisterUser(this.state.name,this.state.email, this.state.password,parseInt(this.state.role_id)).then(() => {
        this.props.history.push("/");
      })
      .catch((error) => {
       
        if(error){
          this.setState({
            error:error,
            success:false,
            errormessage:error.message.slice(15),
          });
        }
        
  
      });
    }
  
    displayRoles(){
      
      const { loading, roleList } = this.props;
     
      if(loading){
          return( <option disabled>Loading roles</option> );
      } else {
          return roleList.map((role) => {
              return( <option key={ role.id } value={role.id}>{ role.name }</option> );
          });
      }
    
    }
    // submitForm(e){
    //     e.preventDefault()
    //     // use the adduserMutation
    //     this.props.adduserMutation({
    //         variables: {
    //             name: this.state.name,
    //             email: this.state.email,
    //             password: this.state.password,
    //             role_id:parseInt(this.state.role_id)
    //         },
          
    //     }).then((data) => {
    //       this.props.history.push("/");
    //     })
    //     .catch((error) => {
    //      // console.log(error);
    //       if(error){
    //         this.setState({
    //           error:error,
    //           success:false,
    //           errormessage:error.message.slice(15),
    //         });
    //       }
          

    //     });
    // }
    render(){
    
      const errorMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-danger"
                style={{ display:this.state.error ? "" : "none" }}
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
                            <h5>Please Register here</h5>
                          </CardHeader>
                          {errorMessage()}
                         
                          <CardBody>
                            <Form id="register" onSubmit={ this.submitForm.bind(this) }>
                            <FormGroup>
                                <Label for="userName">Name</Label>
                                <Input
                                  type="text"
                                  onChange={ (e) => this.setState({ name: e.target.value }) }
                                  placeholder="Enter your name"
                                  required
                                />
                              </FormGroup>
                              <FormGroup>
                                <Label>Email</Label>
                                <Input
                                  type="email"
                                  onChange={ (e) => this.setState({ email: e.target.value }) }
                                  placeholder="Enter your email"
                                  required
                                />
                              </FormGroup>
                              <FormGroup>
                                <Label >Password</Label>
                                <Input
                                  type="password"
                                  onChange={ (e) => this.setState({ password: e.target.value }) }
                                  placeholder="Enter your password"
                                  required
                                />
                              </FormGroup>
                              <FormGroup tag="fieldset">
                              <Label >Role : </Label>
                              <select onChange={ (e) => this.setState({ role_id: e.target.value }) } >
                              <option>Select Role</option>
                              { this.displayRoles() }
                             </select>
                                
                            </FormGroup>
                              <Button
                                
                                style={{
                                  background: "#1ABC9C",
                                  color: "#BC1A4B",
                                  borderColor: "#1ABC9C",
                                }}
                              >
                                <b>Register</b>
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
    //error: user.error,
    loading: user.loading,
    userDetails: user.userDetails,
    roleList:user.roleList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllRoles: () => dispatch(userActions.fetchRoles()),
    RegisterUser: (name,email, password,role_id) =>
      dispatch(userActions.RegisterUser(name,email, password,role_id)),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signup));





