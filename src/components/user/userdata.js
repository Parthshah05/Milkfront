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
import * as userActions from '../../store/actions/userAction';

class UserData extends Component {  

  componentDidMount() {
    const { getUserById, match: {params: { id }}} = this.props;

    getUserById(parseInt(id));
  }

 displayUserData(Users){
    if(Users){
     
      return(
          <div>
               <h4><b>Name : </b>{ Users.name }</h4>
              <h4><b>Email : </b>{ Users.email }</h4>
              <h4><b>Role : </b>{ Users.role.name }</h4> 
             
          </div>
      );
   
  } else {
      return( <div>No Users selected...</div> );
  }

 }
  render() {
    const { selectedUser } = this.props;
    

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
                  <h5>User Details</h5>
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
                <Link to="/userlist">Back</Link>
                </Button>
                </Col>
                <CardBody>
                <tbody>
                    {this.displayUserData(selectedUser)}
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

    function mapStateToProps({ user }) {
      return {
        error: user.error,
        loading: user.loading,
        selectedUser: user.selectedUser,
      };
    }
    
    function mapDispatchToProps(dispatch) {
      return {
        getUserById: (userId) => dispatch(userActions.fetchUserbyId(parseInt(userId, 10))),
      };
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserData));
    


