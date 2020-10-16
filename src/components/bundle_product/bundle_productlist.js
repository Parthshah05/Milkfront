import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  Container,
  Row,
  Col,
  Card,
  Button,
  CardHeader,
  CardBody,
} from "reactstrap";


import Header from "../header";
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';

import { getbundle_productQuery } from "../../queries/queries";

class Bundle_ProductList extends Component {

    displayBundle_Product(){
        var data = this.props.getbundle_productQuery;
   
       if(data.loading){
            return( <div>Loading Users...</div> );
        } else {
         return data.getBundle_Product.map(bnp => {
             return (
                 <tr>
               <td >
               {bnp.id}
           </td>
           <td>
               {bnp.product.name}
           </td>
           <td>
               {bnp.product.price}
           </td>
           <td>
               {bnp.bundle.name}
           </td>
           <td><Button color="info">
               Edit
           </Button>
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <Button color="danger">
           Delete
           </Button></td>
           </tr>
   
             );
   
         });
        }
   
    }

  render() {

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
                  <h5>List of Bundle_Product</h5>
                </CardHeader>
                <br></br>
                <Col sm="4">
                <Button
                
                // onClick={onclick}
                style={{
                    background: "#1ABC9C",
                    color: "#BC1A4B",
                    borderColor: "#1ABC9C",
                }}
                >
                <Link to="/bundle_productinsert">Add Bundle_Product</Link>
                </Button>
                </Col>
                <CardBody>
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th> Product</th>
                        <th>Price</th>
                        <th>Bundle</th>
                      
                        <th colSpan="3">Actions</th>
                      </tr>
                    </thead>
                 <tbody>{this.displayBundle_Product()}</tbody> 
                  </Table>
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
    
    graphql(getbundle_productQuery, { name: "getbundle_productQuery" })
)(Bundle_ProductList);
