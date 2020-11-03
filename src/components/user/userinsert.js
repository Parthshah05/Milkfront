import React,{Component}  from "react";
import Header from "../header";
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import { Link } from "react-router-dom";
import { adduserMutation,getroleQuery } from '../../queries/queries';

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


class Userinsert extends Component {
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
    }
    displayRoles(){

        var data = this.props.getroleQuery;
        if(data.error == null) {
        if(data.loading){
            return( <option disabled>Loading roles</option> );
        } else {
            return data.getRole.map(role => {
                return( <option key={ role.id } value={role.id}>{ role.name }</option> );
            });
        }
      }
    }
    submitForm(e){
        e.preventDefault()
        // use the adduserMutation
        this.props.adduserMutation({
            variables: {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                role_id:parseInt(this.state.role_id)
            },
          
        }).then((data) => {
          this.props.history.push("/userlist");
        })
        .catch((error) => {
          console.log(error);
          if(error){
            this.setState({
              error:error,
              success:false,
              errormessage:error.message.slice(15),
            });
          }
          

        });

    }
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
                <Button
                style={{
                      background: "#1ABC9C",
                      color: "#BC1A4B",
                      borderColor: "#1ABC9C",
                      }}>
                       <Link to="/userlist"> 
                      <b>Back</b>
                      </Link>
                  </Button>
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
                            <h5>User Insert</h5>
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
                                <b>Insert</b>
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
    graphql(adduserMutation, { name: "adduserMutation" }),
    graphql(getroleQuery, { name: "getroleQuery" })
)(Userinsert);


