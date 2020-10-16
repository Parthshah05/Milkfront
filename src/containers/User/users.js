import React, { Component } from "react";
import {
  Table,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import axios from "axios";
import TableRow from "../../components/User/tableRow";
import Header from "../../components/Core/header";

class User extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    console.log("LOLLLLLLLLLLLLLl", this.props);
    axios
      .get("/users")
      .then((response) => {
        const users = response.data.data.map((user) => {
          return {
            ...user,
          };
        });
        this.setState({
          users: users,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let users = this.state.users.map((user, i) => {
      return <TableRow key={i} obj={user} />;
    });

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
                <CardBody>
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th colSpan="3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>{users}</tbody>
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

export default User;
