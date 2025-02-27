import React from 'react'

export default function login_validate(values) {
 const errors = {};
 if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if(!values.password){
    errors.password = 'Required';
  }else if(values.password.length < 8 || values.password.length > 20){
    errors.password= 'Must be greater than 8 and less than 20'
  } else if(values.password.includes(' ')){
    errors.password = 'Invalid Password'
  }


  return errors;
}
export function registerValidate(values){
    const errors = {};
    if(!values.username.includes(' ')){
        errors.username='invalide Username..!'
    }

    if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if(!values.password){
        errors.password = 'Required';
      }else if(values.password.length < 8 || values.password.length > 20){
        errors.password= 'Must be greater than 8 and less than 20'
      } else if(values.password.includes(' ')){
        errors.password = 'Invalid Password'
      }

      if(!values.cpassword){
        errors.cpassword = 'Required';
      }else if(values.password!==values.cpassword){
        errors.cpassword= 'Password Not Match...!'
      }else if(values.cpassword.includes(' ')){
        errors.cpassword = 'Invalid Confirm Password'
      }
}
