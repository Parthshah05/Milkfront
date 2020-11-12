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
} from "reactstrap";
import Header from "../header";
import { connect } from "react-redux";
import * as productActions from '../../store/actions/productAction';

class ProductData extends Component {  

  componentDidMount() {
    const { getProductById, match: {params: { id }}} = this.props;

    getProductById(parseInt(id));
  }

 displayProductData(Products){
    if(Products){
     
      return(
          <div>
               <h4><b>Name : </b>{ Products.name }</h4>
              <h4><b>Description : </b>{ Products.description }</h4>
              <h4><b>Price : </b>{ Products.price }</h4> 
             
          </div>
      );
   
  } else {
      return( <div>No Products selected...</div> );
  }

 }
  render() {
    const { selectedProduct } = this.props;
    

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
                  <h5>Products Details</h5>
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
                <Link to="/product">Back</Link>
                </Button>
                </Col>
                <CardBody>
                <tbody>
                    {this.displayProductData(selectedProduct)}
                </tbody>
               
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
    

}
    }

    function mapStateToProps({ product }) {
      return {
        error: product.error,
        loading: product.loading,
        selectedProduct: product.selectedProduct,
      };
    }
    
    function mapDispatchToProps(dispatch) {
      return {
        getProductById: (productId) => dispatch(productActions.fetchProductbyId(parseInt(productId, 10))),
      };
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductData));
    


