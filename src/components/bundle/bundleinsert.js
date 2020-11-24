import React,{Component}  from "react";
import Header from "../header";
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import { Link, withRouter } from "react-router-dom";
import { addBundleMutation } from '../../queries/queries';
import * as bundleActions from "../../store/actions/bundleAction";


import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";


class BundleInsert extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            error:false,
            success:false,
            errormessage:""
            
        };
    }
    submitForm(e){
        e.preventDefault()
        // use the adduserMutation
        this.props.InsertBundle(this.state.name).then((data) => {
          this.props.history.push("/bundle");
        })
        .catch((error) => {
          console.log(error);
          if(error){
            this.setState({
              error:error,
              success:false,
              errormessage:error.message.slice(15),
            });
          }
          

        });
    }
    render(){
      const errorMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-danger"
                style={{ display:this.state.error ? "" : "none" }}
              >
                {this.state.errormessage}
              </div>
            </div>
          </div>
        );
      };
        return (
                <div>
                <Header />
                <Button
                style={{
                      background: "#1ABC9C",
                      color: "#BC1A4B",
                      borderColor: "#1ABC9C",
                      }}>
                       <Link to="/bundle"> 
                      <b>Back</b>
                      </Link>
                  </Button>
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
                            <h5>Bundle Insert</h5>
                          </CardHeader>
                         {errorMessage()}
                          <CardBody>
                            <Form id="register" onSubmit={ this.submitForm.bind(this) }>
                            <FormGroup>
                                <Label for="bundlename">Name</Label>
                                <Input
                                  type="text"
                                  onChange={ (e) => this.setState({ name: e.target.value }) }
                                  placeholder="Enter Bundle name"
                                  required
                                />
                              </FormGroup>
                                <Button
                                
                                style={{
                                  background: "#1ABC9C",
                                  color: "#BC1A4B",
                                  borderColor: "#1ABC9C",
                                }}
                              >
                                <b>Insert</b>
                              </Button>
                            </Form>
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
    
    loading: bundle.loading,
    bundleDetails: bundle.productDetails,
    
  };
}
function mapDispatchToProps(dispatch) {
  return {
   
    InsertBundle: (name) =>
      dispatch(bundleActions.InsertBundle(name)),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BundleInsert));


// export default compose(
//     graphql(addBundleMutation, { name: "addBundleMutation" }),
    
// )(BundleInsert);
