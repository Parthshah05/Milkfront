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
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import Header from "../header";
import { getproductQuery } from "../../queries/queries";



class ProductList extends Component {

    displayProducts(){
        var data = this.props.getproductQuery;
   
       if(data.loading){
            return( <div>Loading Users...</div> );
        } else {
         return data.getProduct.map(prod => {
             return (
                 <tr>
               <td >
               {prod.id}
           </td>
           <td>
               {prod.name}
           </td>
           <td>{prod.description}</td>
          
           <td>{prod.price}</td>
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
                  <h5>List of Products</h5>
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
                <Link to="/productinsert">Add Product</Link>
                </Button>
                </Col>
                <CardBody>
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                       
                        <th>Price</th>
                        <th colSpan="3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.displayProducts()}
                      
                    </tbody>
                
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
    
    graphql(getproductQuery, { name: "getproductQuery" })
)(ProductList);


