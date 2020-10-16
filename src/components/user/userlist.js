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
import { getuserQuery } from "../../queries/queries";

class UserList extends Component {
   

 displayUsers(){
     var data = this.props.getuserQuery;

    if(data.loading){
         return( <div>Loading Users...</div> );
     } else {
      return data.getUser.map(user => {
          return (
              <tr>
            <td >
            {user.id}
        </td>
        <td>
            {user.name}
        </td>
        <td>{user.email}</td>
        <td>
            {user.role.name}
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
                  <h5>List of Users</h5>
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
                <Link to="/userinsert">Add User</Link>
                </Button>
                </Col>
                <CardBody>
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th colSpan="3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.displayUsers()}
                      
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
    
    graphql(getuserQuery, { name: "getuserQuery" })
)(UserList);

