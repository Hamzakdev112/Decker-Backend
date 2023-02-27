const{catchAsync}=require("../helpers/request"); 
 const service=require("../services/payment"); 
 const stripe=require("stripe")( 
 "sk_test_51MbKf3Cr1olxPLecB9oZgHkDwHIA7CjFJ1NIiscJOEkg7lCRz88UiuGY2naEEHPlnHT2KjakTJZsMQSXdpto8nYo00Tb6CynqU" 
 ); 
  
 exports.createPayment=catchAsync(async(req,res,next)=>{ 
 console.log(req.user) 
 const payload={ 
 user:req.user, 
 amount:req.body.amount, 
 description:req.body.description, 
 email:req.email 
 }; 
  
 try{ 
 const{cardNumber,cardExpMonth,cardExpYear,cvc}=req.body; 
 const token=awaitstripe.tokens.create({ 
 card:{ 
 number:cardNumber, 
 exp_month:cardExpMonth, 
 exp_year:parseInt(cardExpYear), 
 cvc:cvc, 
 }, 
 }); 
 const customer=awaitstripe.customers.create({ 
 email:payload.email, 
 source:token.id, 
 }); 
 const charge=awaitstripe.charges.create({ 
 amount:payload.amount, 
 currency:"usd", 
 customer:customer.id, 
 description:payload.description, 
 }); 
 payload.stripeCustomerId=customer.id; 
  
 const payment=awaitservice.createPayment(payload); 
 constresponseObject={ 
 charge:charge, 
 payment:payment, 
 }; 
 res.status(200).json(responseObject); 
 }catch(error){ 
 res.status(500).send(error); 
 } 
  
 });