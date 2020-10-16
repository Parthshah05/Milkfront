import React,{Component}  from "react";
import Header from "../header";
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
//import { Link } from "react-router-dom";
import { addRoleMutation } from '../../queries/queries';

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


class RoleInsert extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            
        };
    }
    submitForm(e){
        e.preventDefault()
        // use the adduserMutation
        this.props.addRoleMutation({
            variables: {
                name: this.state.name,
               
            },
          
        });
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
                            <h5>Role Insert</h5>
                          </CardHeader>
                         
                          <CardBody>
                            <Form id="role" onSubmit={ this.submitForm.bind(this) }>
                            <FormGroup>
                                <Label for="rolename">Name</Label>
                                <Input
                                  type="text"
                                  onChange={ (e) => this.setState({ name: e.target.value }) }
                                  placeholder="Enter Role name"
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
    graphql(addRoleMutation, { name: "addRoleMutation" }),
    
)(RoleInsert);
