import React,{Component}  from "react";
import Header from "../header";

import { Link, withRouter } from "react-router-dom";
import * as productActions from "../../store/actions/productAction";


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



class ProductInsert extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            description: '',
            image: '',
            price:'',
            error:false,
            success:false,
            errormessage:""
        };
    }
     
     
    submitForm(e){
     
        // use the adduserMutation
        e.preventDefault();
        this.props.InsertProduct(this.state.name,this.state.description, parseInt(this.state.price),this.state.image)
        
        // this.props.addProductMutation({
        //     variables: {
        //         name: this.state.name,
        //         description: this.state.description,
        //         image: this.state.image,
        //         price:parseInt(this.state.price)
        //     },
          
        // })
        .then(() => {
          this.props.history.push("/product");
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
                       <Link to="/product"> 
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
                            <h5>Product Insert</h5>
                          </CardHeader>
                         {errorMessage()}
                          <CardBody>
                            <Form id="register" onSubmit={ this.submitForm.bind(this) }>
                            <FormGroup>
                                <Label for="userName">Name</Label>
                                <Input
                                  type="text"
                                  onChange={ (e) => this.setState({ name: e.target.value }) }
                                  placeholder="Enter Product name"
                                  required
                                />
                              </FormGroup>
                              <FormGroup>
                                <Label>Description</Label>
                                <Input
                                  type="text"
                                  onChange={ (e) => this.setState({ description: e.target.value }) }
                                  placeholder="Enter Description"
                                  required
                                />
                              </FormGroup>
                              <FormGroup>
                              <Label >Image</Label>
                              <Input
                                  type="text"
                                  onChange={ (e) => this.setState({ image: e.target.value }) }
                                  placeholder="Enter Image"
                                  required
                                />
        
                              </FormGroup>
                              <FormGroup>
                                <Label >Price</Label>
                                <Input
                                  type="number"
                                  onChange={ (e) => this.setState({ price: e.target.value }) }
                                  placeholder="Enter Price"
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

function mapStateToProps({ product }) {
  return {
    //error: user.error,
    loading: product.loading,
    productDetails: product.productDetails,
    
  };
}

function mapDispatchToProps(dispatch) {
  return {
   
    InsertProduct: (name, description, price, image) =>
      dispatch(productActions.InsertProduct(name, description, price, image)),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductInsert));




