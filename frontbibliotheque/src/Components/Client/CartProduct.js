import CartItem from './Cart';
import { useCart } from "react-use-cart";
import StripeCheckout from 'react-stripe-checkout';
import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { useNavigate} from "react-router-dom";

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const CartProduct = () => {

 let navigate = useNavigate ();

    const {
        isEmpty,
        items,
        totalItems,
        cartTotal,
        emptyCart,
        clearCartMetadata
      } = useCart();

    const commander=()=>{
   
      navigate("/loginclient");
    }

    const more=()=>{
        navigate("/");
    }

    const clear=()=>{
      //Vider le cart
      emptyCart();
      clearCartMetadata();
     }

     if (isEmpty || totalItems===0) return <h1>Cart Empty</h1>;
     const MySwal = withReactContent(Swal);
 
  const publishableKey =
    'pk_test_51L007yKzPanlxWfz6XydMeyqnU3G2RxDb6v7fGh7D6OhyQ7lgk2g3KW3gUBO9nqDKM09ILC8dhJf1FZZWWHMNMpU00dAYw2qHT';
  ;
 
  const handleSuccess = () => {
    MySwal.fire({
      icon: 'success',
      title: 'Payment was successful',
      time: 4000,
    });
  };
  const handleFailure = () => {
    MySwal.fire({
      icon: 'error',
      title: 'Payment was not successful',
      time: 4000,
    });
  };
  const payNow = async token => {
    try {
      const response = await axios({
        url: 'http://localhost:5000/api/payment',
        method: 'post',
        data: {
          amount: cartTotal * 100,
          token,
        },
      });
      if (response.status === 200) {
        handleSuccess();
      }
    } catch (error) {
      handleFailure();
      console.log(error);
    }
  };
    return ( 
     
        <Grid container spacing={2} columns={15} marginTop={10} marginLeft={10}>

                <Grid item xs={5}>
                {
                    items.map(item =>  <CartItem key={item._id} item={item}/>)
                }  
                </Grid> 

                <Grid item xs={5}> 
                    
                                    <Button color="error" variant="outlined" onClick={more}>Ajouter des articles</Button>
                                <p>Total Articles</p>
                                <h4>{totalItems}</h4>
                                <p>Total Payement</p>
                                <h3>{cartTotal} TND</h3>
                                <hr />
                                <div>
                                <StripeCheckout
        stripeKey={publishableKey}
        label="Pay Now"
        name="Pay With Credit Card"
        billingAddress
        shippingAddress
        amount={cartTotal}
        description={`Your total is ${cartTotal} TND`}
        token={payNow}
      />
                                    <Button color="info" variant="outlined" onClick={clear}>Annuler</Button>
                                </div>

                           </Grid>
                       
                 </Grid>

     );
}
 
export default CartProduct;
