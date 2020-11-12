import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
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

import * as bundleActions from "../../store/actions/bundleAction";
import { graphql,Mutation } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import Header from "../header";
import { getbundleQuery,deleteBundleMutation } from "../../queries/queries";
import { connect } from "react-redux";


class BundleList extends Component {

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
   
    const { getAllBundles } = this.props;
    if (getAllBundles == null )
    {
     //
    }
    else{
    getAllBundles();
    }
  }

  

    displayBundles(){
      const { loading, error, bundleList,deleteBundle } = this.props;
   

      if (error) {
        return <div>Something went wrong!</div>;
      } else if (loading) {
        return <div>Loading Users...</div>;
      } else {
      //   var data = this.props.getbundleQuery;
      //   if(data.error == null) {
      //  if(data.loading){
      //       return( <div>Loading Users...</div> );
      //   } else {
         return bundleList.map(bund => {
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
           {/* <Mutation mutation={deleteBundleMutation}>
        {(mutation) => (
        <Button color="danger"
         onClick={() => {
                mutation({
                  variables: { id: bund.id },
                  refetchQueries: [{ query: getbundleQuery }],
                });
              }}
              >
        Delete
        </Button>
        )}
        </Mutation> */}
        <Button
                color="danger"
                onClick={() => {
                  deleteBundle(bund.id);
                }}
              >
              
                Delete
               
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

function mapStateToProps({ bundle }) {
  return {
    error: bundle.error,
    loading: bundle.loading,
    bundleList: bundle.bundleList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllBundles: () => dispatch(bundleActions.fetchBundles()),
    deleteBundle: (bundleId) => dispatch(bundleActions.deleteBundle(bundleId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BundleList));
// export default compose(
    
//     graphql(getbundleQuery, { name: "getbundleQuery" }),
//     graphql(deleteBundleMutation, { name: "deleteBundleMutation" })
// )(BundleList);
