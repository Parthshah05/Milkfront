import { gql } from 'apollo-boost';

const userloginMutation = gql`
    mutation userLogin($email: String!, $password: String!){
        userLogin(email: $email, password: $password){
            email
            
        }
    }
`;

const adduserMutation = gql`
    mutation addUser($name: String, $email: String,$password: String, $role_id: Int){
        addUser(name:$name, email: $email, password: $password, role_id:$role_id){
            name
            email
        }
    }
`;

const getroleQuery = gql`
    {
        getRole {
            name
            id
        }
    }
`;

const addProductMutation = gql`
    mutation addProduct($name: String, $description: String,$image: String, $price: Int){
        addProduct(name:$name, description: $description, image: $image, price:$price){
            name
            price
        }
    }
`;

const addBundleMutation = gql`
    mutation addBundle($name: String){
        addBundle(name:$name){
            name
            
        }
    }
`;

const addRoleMutation = gql`
    mutation addRole($name: String){
        addRole(name:$name){
            name
            
        }
    }
`;

const deleteUserMtation = gql`
    mutation deleteUser($id: Int){
        deleteUser(id:$id){
            id
        }
    }

`;

const addBundle_ProductMutation = gql`
    mutation addBundle_Product($product_id: Int,$bundle_id: Int){
        addBundle_Product(product_id:$product_id,bundle_id:$bundle_id){
            product_id
            
        }
    }
`;

const getproductQuery = gql`
    {
        getProduct {
            id
            name
            description
            image
            price
        }
    }
`;

const getbundleQuery = gql`
    {
        getBundle {
            name
            id
        }
    }
`;
const getuserQuery = gql`
    {
        getUser {
            id
            name
            email
            password
            role{
                name
            }
        }
    }
`;

const getbundle_productQuery = gql`
    {
        getBundle_Product {
            id
            product{
                name
                price
            }
            bundle{
                name
            }
        }
    }
`;


export { userloginMutation, adduserMutation, getroleQuery,getbundle_productQuery ,deleteUserMtation,addProductMutation, addRoleMutation, addBundleMutation, addBundle_ProductMutation, getproductQuery, getbundleQuery,getuserQuery };