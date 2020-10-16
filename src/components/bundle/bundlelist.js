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
import { getbundleQuery } from "../../queries/queries";


class BundleList extends Component {

    displayBundles(){
        var data = this.props.getbundleQuery;
   
       if(data.loading){
            return( <div>Loading Users...</div> );
        } else {
         return data.getBundle.map(bund => {
             return (
                 <tr>
               <td >
               {bund.id}
           </td>
           <td>
               {bund.name}
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
                  <h5>List of Bundles</h5>
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
                <Link to="/bundleinsert">Add Bundle</Link>
                </Button>
                </Col>
                <CardBody>
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th> Name</th>
                       
                        <th colSpan="3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.displayBundles()}
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
    
    graphql(getbundleQuery, { name: "getbundleQuery" })
)(BundleList);
