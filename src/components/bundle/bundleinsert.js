import React,{Component}  from "react";
import Header from "../header";
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
//import { Link } from "react-router-dom";
import { addBundleMutation } from '../../queries/queries';

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


class BundleInsert extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            
        };
    }
    submitForm(e){
        e.preventDefault()
        // use the adduserMutation
        this.props.addBundleMutation({
            variables: {
                name: this.state.name,
               
            },
          
        });
        this.props.history.push('/bundle');
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
                            <h5>Bundle Insert</h5>
                          </CardHeader>
                         
                          <CardBody>
                            <Form id="register" onSubmit={ this.submitForm.bind(this) }>
                            <FormGroup>
                                <Label for="bundlename">Name</Label>
                                <Input
                                  type="text"
                                  onChange={ (e) => this.setState({ name: e.target.value }) }
                                  placeholder="Enter Bundle name"
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
    graphql(addBundleMutation, { name: "addBundleMutation" }),
    
)(BundleInsert);
