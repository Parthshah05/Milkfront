import React,{Component}  from "react";
import Header from "../header";
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
//import { Link } from "react-router-dom";
import { addProductMutation } from '../../queries/queries';

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


class ProductInsert extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            description: '',
            image: '',
            price:''
        };
    }
    submitForm(e){
        e.preventDefault()
        // use the adduserMutation
        this.props.addProductMutation({
            variables: {
                name: this.state.name,
                description: this.state.description,
                image: this.state.image,
                price:parseInt(this.state.price)
            },
          
        });
        this.props.history.push('/product');
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
                            <h5>Product Insert</h5>
                          </CardHeader>
                         
                          <CardBody>
                            <Form id="register" onSubmit={ this.submitForm.bind(this) }>
                            <FormGroup>
                                <Label for="userName">Name</Label>
                                <Input
                                  type="text"
                                  onChange={ (e) => this.setState({ name: e.target.value }) }
                                  placeholder="Enter Product name"
                                  required
                                />
                              </FormGroup>
                              <FormGroup>
                                <Label>Description</Label>
                                <Input
                                  type="text"
                                  onChange={ (e) => this.setState({ description: e.target.value }) }
                                  placeholder="Enter Description"
                                  required
                                />
                              </FormGroup>
                              <FormGroup>
                                <Label >Image</Label>
                                <Input
                                  type="text"
                                  onChange={ (e) => this.setState({ image: e.target.value }) }
                                  placeholder="Image"
                                  required
                                />
                              </FormGroup>
                              <FormGroup>
                                <Label >Price</Label>
                                <Input
                                  type="number"
                                  onChange={ (e) => this.setState({ price: e.target.value }) }
                                  placeholder="Enter Price"
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
    graphql(addProductMutation, { name: "addProductMutation" }),
    
)(ProductInsert);


