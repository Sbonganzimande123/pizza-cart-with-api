document.addEventListener('alpine:init', () => {
    
   // alert("Alpine loaded...")
    
    Alpine.data('pizzaCartWithAPIWidget', function() {
      return {
         init () {
          
          // call the API to get all the Pizzas
          // set this.pizzas

          axios
           .get('https://pizza-cart-api.herokuapp.com/api/pizzas') 
           .then((result) => {
             // console.log(result.data);
             this.pizzas = result.data.pizzas
             this.smallpizzas = this.pizzas[11];
             this.mediumFeatured = this.pizzas[7];
             this.largeFeatured = this.pizzas[25];
            })
            .then(() => {
             return this.createCart();
            })
            .then((result) => {
              
             // console.log(result.data);
              
              this.cartId = result.data.cart_code;
            });
         
      },

    buys:true,
    payCart(amount){
    const body = {
    cart_code: this.cartID
  }
  amount = this.payment
  axios.post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/pay', body)
  .then((result)=>{
    // this.payment=result.data.payment
    // this.cartID = result.data.cart_code
    this.message = 'paym'
    this.showCart()
  });
},

      createCart() {
          // /api/pizza-cart/create
          return axios.get('https://pizza-cart-api.herokuapp.com/api/pizza-cart/create?username=' + this.username) 
          },
       
       showCart() {
        const url = `https://pizza-cart-api.herokuapp.com/api/pizza-cart/${this.cartId}/get`;
       

      axios
           .get(url)
           .then((result) => {
            this.cart = result.data;
           });
       },
       
      pizzaImage(pizza) {
        return `/img/${pizza.size}.jpg`
      },

      checkb:true,
      payNow:false,
      
      
      makePayment(){
        if(!this.paymentAmount){
          this.returnFeedback = 'please enter amount'
      }
      else if ((this.cart.total) > this.paymentAmount){
          this.returnFeedback = 'Sorry - that is not enough money!'
      }
      else{
          this.returnFeedback = 'Enjoy your pizzas'
      
        
      
      setTimeout(()=>{
        if((this.cart.total) <= this.paymentAmount){
          this.appreciation = "Thank you, refresh page to create a new order"
          }
          
          this.payNow=false;
          this.clearCart()
          this.pizzas=true
          this.appreciation
          this.cartId=''
          this.clearAtPay=false
          this.titleHide=false
      }, 30000)
  }
},

paymentAmount : 0,

  clearCart(){
    this.cart=0.0

  },
       
       message : 'Eating pizzas',
       username : 'nzimande',
       pizzas : [],
       cartId : '',
       cart : { total : 0 },
       returnFeedback : '',
       smallpizzas:[],
       mediumFeatured:[],
       largeFeatured:[],

       add(pizza) {
        // to be able to add a pizza to the cart I need cart Id...
        
        const params = {
          cart_code: this.cartId,
          pizza_id: pizza.id
        }
        
        axios
            .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/add', params)
            .then(() => {
              
              this.message = "Pizza added to the cart" 
              this.showCart();
            })
            .catch(err => alert(err) );


       // alert(pizza.id)

       },

       subtract(pizza) {
        // to be able to add a pizza to the cart I need cart Id...
        
        const params = {
          cart_code: this.cartId,
          pizza_id: pizza.id
        }
        
        axios
            .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/remove', params)
            .then(() => {
              
              this.message = "Pizza removed from the cart" 
              this.showCart();
            })
            .catch(err => alert(err) );


       // alert(pizza.id)

       }
    
    }
    });
})


  