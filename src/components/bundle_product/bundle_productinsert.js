import React,{Component}  from "react";
import Header from "../header";
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import { Link } from "react-router-dom";
import { addBundle_ProductMutation,getbundleQuery,getproductQuery } from '../../queries/queries';

import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";


class Bundle_ProductInsert extends Component {
    constructor(props){
        super(props);
        this.state = {
            product_id: '',
            bundle_id: '',
            error:false,
            success:false,
            errormessage:""
        };
    }
    displayProduct(){
        var data = this.props.getproductQuery;
        if(data.error == null) {
        if(data.loading){
            return( <option disabled>Loading roles</option> );
        } else {
            return data.getProduct.map(product => {
                return( <option key={ product.id } value={product.id}>{ product.name }</option> );
            });
        }
      }
    }
    displayBundle(){
        var data = this.props.getbundleQuery;
        if(data.error == null) {
        if(data.loading){
            return( <option disabled>Loading roles</option> );
        } else {
            return data.getBundle.map(bundle => {
                return( <option key={ bundle.id } value={bundle.id}>{ bundle.name }</option> );
            });
        }
      }
    }
    submitForm(e){
        e.preventDefault()
        // use the adduserMutation
        this.props.addBundle_ProductMutation({
            variables: {
                product_id: parseInt(this.state.product_id),
                bundle_id:parseInt(this.state.bundle_id)
            },
          
        }).then((data) => {
          this.props.history.push("/bundle_product");
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
                       <Link to="/bundle_product"> 
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
                            <h5>Bundle_Product Insert </h5>
                          </CardHeader>
                         {errorMessage()}
                          <CardBody>
                            <Form id="register" onSubmit={ this.submitForm.bind(this) }>
                            <FormGroup tag="fieldset">
                              <Label >Product : </Label>
                              <select onChange={ (e) => this.setState({ product_id: e.target.value }) } >
                              <option>Select Product</option>
                              { this.displayProduct() }
                             </select>
                                
                            </FormGroup>
                              <FormGroup tag="fieldset">
                              <Label >Bundle : </Label>
                              <select onChange={ (e) => this.setState({ bundle_id: e.target.value }) } >
                              <option>Select Bundle</option>
                              { this.displayBundle() }
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
    graphql(addBundle_ProductMutation, { name: "addBundle_ProductMutation" }),
    graphql(getbundleQuery, { name: "getbundleQuery" }),
    graphql(getproductQuery, { name: "getproductQuery" })
)(Bundle_ProductInsert);


