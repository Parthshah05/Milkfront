import React, { Component } from "react";
import { Link } from "react-router-dom";
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
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import Header from "../header";
import { getuserQuery,getUserByIdMutation } from "../../queries/queries";

class UserData extends Component {
   

 displayUserData(){
     var data = this.props.getuserQuery;

    if(data.loading){
         return( <div>Loading Users...</div> );
     } else {
      return data.getUser.map(user => {
          return (
              <div>
                    <h4>{user.id}</h4>
                    <h3>{user.name}</h3>
                    <h4>{user.email}</h4>
                    <h4>{user.role.name}</h4>
              </div>
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
                <Link to="/userlist">Back</Link>
                </Button>
                </Col>
                <CardBody>
                <tbody>
                    {this.displayUserData()}
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


export default compose(
    graphql(getUserByIdMutation,{name:"getUserByIdMutatin"}),
    graphql(getuserQuery, { name: "getuserQuery" })
)(UserData);

