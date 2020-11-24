import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
//import { Mutation } from "react-apollo";
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

import * as userActions from "../../store/actions/userAction";
import { connect } from "react-redux";

class UserList extends Component {
 
  constructor(props) {
    
    super(props);
    this.state = {
      selected: null,
    };
   
  }

  componentDidMount() {
   
    if(localStorage.getItem('userLogin') == null)
    {
       this.props.history.push('/');
       return ;
    }
   
    const { getAllUsers } = this.props;
    if (getAllUsers == null )
    {
     //
    }
    else{
    getAllUsers();
    }
  }

  handleEdit = (selectedUser) => {
    const { setSelectedUser } = this.props;
    setSelectedUser(selectedUser);
    this.props.history.push('/userupdate');
  }

  displayUsers() {
    
    const { loading, error, userList, deleteUser } = this.props;
   

    if (error) {
      return <div>Something went wrong!</div>;
    } else if (loading) {
      return <div>Loading Users...</div>;
    } else {
      
      return userList.map((user) => {
        return (
          <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role.name}</td>
            <td>
              <Button color="info" onClick={() => this.handleEdit(user)}>
                Edit
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                color="danger"
                onClick={() => {
                  deleteUser(user.id);
                }}
              >
              
                Delete
               
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                color="success"
                key={user.id}
                onClick={(e) => this.setState({ selected: user.id })}
              >
              <Link to={`/userdata/${user.id}`}> 
                View
                </Link>
              </Button>
            </td>
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
                    <tbody>{this.displayUsers()}</tbody>
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

function mapStateToProps({ user }) {
  return {
    error: user.error,
    loading: user.loading,
    userList: user.userList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllUsers: () => dispatch(userActions.fetchUsers()),
    deleteUser: (userId) => dispatch(userActions.deleteUser(userId)),
    setSelectedUser: (selectedUser) => dispatch(userActions.setSelectedUser(selectedUser)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserList));
