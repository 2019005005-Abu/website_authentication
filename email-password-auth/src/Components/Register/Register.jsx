import React from 'react'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../FireBase/_firebase.config';
import { Link } from 'react-router-dom';
const Register = () => {
   let formStyle_1={
     border:'1px solid red',
     width:'300px',
     margin:'0 auto',
     padding:'10px 20px',
     marginTop:'20px',
     backgroundColor:'pink'
     
   }
   let formStyling_2={
    marginBottom:'10px',
    marginTop:'10px'
   }
    let sub_btn={
      marginTop:'6px',
      width:'100px',
      backgroundColor:'blue',
      color:'white',
      border:'none',
      height:'25px',
      borderRadious:'5px',
      cursor:'pointer'
    }
   let inputStyle={
    width:'300px',
    marginTop:'10px'
   }
    let errorStyle={
      color:'red'
    }
    let successStyle={
      color:'yellow'
    }
  /****
   * Authentication starts from here
   */
    const auth=getAuth(app);
  /***
   * Authentication ends from here
   */
  const [email,SetEmail]=React.useState('')
  const [password,setPassword]=React.useState('');
  const [error,setErroor]=React.useState('');
  const[name,setName]=React.useState('');
  const [sucessFull,setSuccesfull]=React.useState('');
  const HandleName=(event)=>{
    setName(event.target.value);
  }
  const HandleEmailChange=event=>{
    SetEmail(event.target.value);
  }
  const HandlePasswordChange=event=>{
   setPassword(event.target.value)
  }
  const HandleSubmit=(event)=>{
    event.preventDefault();
    setErroor('');
    const EmailInformation={
      name:event.target.name.value,
      email:event.target.email.value,
      password:event.target.password.value
    }
    console.log(EmailInformation)

    //validate Password
    if(!/(?=.*[A-Z])/.test(password)){
        setErroor('Please Add atleasr one Uppercase');
        return;
    }else if(!/(?=.*[0-9].*[0-9])/.test(password)){
        setErroor("Please add atleast 2 numbers");
        return;
    }else if(password.length<6){
      setErroor("Please at lease 6 chaecater");
      return;
    }
    
    //create user in firebase
      createUserWithEmailAndPassword(auth,email,password)
      .then(result=>{
        const LoggedUser=result.user;
        console.log(LoggedUser);
        setErroor('')
        event.target.reset();
        setSuccesfull('User has created successfully');
        // Send Verification email
         Verification(result.user)
         //Update User Data
         updateUserData(result.user,name);
      })
      .catch((err)=>{
        setSuccesfull('');
        console.log(err.message);
        setErroor(err.message)
        
      })
  }
  const Verification=user=>{
   sendEmailVerification(user)
   .then(result=>{
    console.log(result);
    alert('Please verify Your Mail adddes')
   })
  }

  //Update User Data
  const updateUserData=(user,name)=>{
    updateProfile(user,{
      displayName:name
    }).then(()=>{
      console.log("User-Name has Updated");
    }).catch((err)=>{
      setErroor(err.message);
    })
  }

  return (
    <div style={formStyle_1}>
      <h1>Register</h1>
      <form onSubmit={HandleSubmit} style={formStyling_2}>
         <label htmlFor='name'>Name</label>
         <div>
          <input type='text' name='name' id='name' style={inputStyle}
          onChange={HandleName} placeholder='Enter Name'/>
         </div>
        <label htmlFor='email'>Enter Email</label>
        <div>
        <input type='email' name='email' id='email' 
        placeholder='Your Email' style={inputStyle}
        onChange={HandleEmailChange} 
        onBlur={HandleEmailChange} required/>
        </div>
        <label htmlFor='password'>Password</label>
        <div>
         <input type='password' name='password' 
         id='password' placeholder='Your Password'
         style={inputStyle} required
         onChange={HandlePasswordChange}
         />
        </div>
        <p style={errorStyle}>{error}</p>
         <div>
           <input type='submit' style={sub_btn}
           />
         </div>
      </form> 
       <p>
        <small>Already have an account ? Please 
        <Link to='/login'>LogIn</Link>
        </small>
       </p>
        <p style={successStyle}>{sucessFull}</p>
    </div>
  )
}

export default Register
