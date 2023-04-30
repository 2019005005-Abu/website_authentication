import { getAuth, sendPasswordResetEmail, 
  signInWithEmailAndPassword } from 'firebase/auth';

import React, { useRef } from 'react'
import app from '../FireBase/_firebase.config';
import {Link} from 'react-router-dom'
const auth=getAuth(app)
const LogIn = () => {
   const[email,setEmail]=React.useState('');
   const [password,setPassword]=React.useState('');
   const [Error,setError]=React.useState('');
   const [Success,setSuccesfull]=React.useState('');
   const emailRef=useRef();
   const handleSubmitEmail=event=>{
    setEmail(event.target.value);
   }
   const HandlePassword=event=>{
    setPassword(event.target.password)
   }
    
   const HandleSubmit=event=>{
    event.preventDefault();
    const FormInformation={
      email:event.target.email.value,
      password:event.target.password.value
    }
    console.log(FormInformation);
    setError('')
    setSuccesfull('')
    //validate of Password
    if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
      setError('Please add at least 2 uppearCase');
      return;
    }else if(/(?=.*[!@$&*])/.test(password)){
      setError('Please add (!,@,$,&) special Keyword');
      return;
    }else if(password.length){
      setError("Password Must be 6 charcaters Long");
      return;
    }
    //sing In
    
    signInWithEmailAndPassword(auth,email,password)
    .then(result=>{
      const LoggedUser=result.user;
      setSuccesfull(LoggedUser);
      if(!LoggedUser.emailVerified){
        alert("Your data is not Verified");
      }
      setError('');
    }).catch((err)=>{
      setError(err.message);
    })
   }

   //Reset Password
   const HandleResetPassword=()=>{
      const email=emailRef.current.value;
      if(!email){
        alert("Please Provide your emailaddress to reset password");
      }
      sendPasswordResetEmail(auth,email)
      .then(()=>{
        alert("Please  Chack Your Mail")
      }).catch(err=>{
        setError(err.message);
      })
    }
   
  return (
    <div >
      <h1 style={{textAlign:'center',color:'greenyellow'}}>Please LogIn</h1>
       <form style={{width:'500px',margin:'0 auto',
         border:'1px solid black',padding:'20px 30px'}}
         onSubmit={HandleSubmit}>
        <label htmlFor='email'>Email</label>
        <div>
         <input type='email' placeholder='Enter Email' 
         id='email' name='email' onChange={handleSubmitEmail}
         style={{color:'red',width:'300px'}} 
         required ref={emailRef}/>
        </div>
         <label htmlFor='password'>Password</label>
        <div>
        <input type='password' placeholder='Enter Passeord' 
        id='password' name='password' onChange={HandlePassword}
        style={{color:'red',width:'300px'}} required/>
       </div>
        <div>
         <input type='submit' style={{marginTop:'20px',width:'100px',padding:'10px 20px',color:'white',
         background:'navy',border:'none',fontWeight:'bolder',cursor:'pointer'}}/>
        </div>
        <div>
        <p><small>Forget Password ? Please 
         <button onClick={HandleResetPassword}>Reset Password</button>
        </small></p>
        <p><small>New to this Website ?
         Please <Link to='/register'>Register</Link>
        </small>
        </p>
        <p>{Error}</p>
        <p>{Success}</p>
        </div>
        
       </form>
      
    </div>
  )
}

export default LogIn
