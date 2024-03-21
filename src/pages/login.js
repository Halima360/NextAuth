import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../../layout/layout';
import Link from 'next/link';
import styles from '../styles/Form.module.css'
import Image from 'next/image';
import {HiFingerPrint, HiAtSymbol} from 'react-icons/hi'
import {signIn, signOut} from 'next-auth/react';
import { useFormik } from 'formik';
import login_validate from '../../lib/validate';
import { useRouter } from 'next/router';
function Login() {
    const router = useRouter()
    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validate:login_validate,
        onSubmit
    })
    console.log(formik.errors)
    async function onSubmit(values){
    const status= await signIn('credentials',{
        redirect: false,
        email:values.email,
        password:values.password,
        callbackUrl:'/'
    })
    if(status.ok) router.push(status.url)
        
    }
    const [show, setShow] = useState(false);
    async function handleGoogleSignIn() {
        signIn('google', {callbackUrl:'http://localhost:3000'})
    }
    //githubLogin
    async function handleGithubSignIn(){
        signIn('github', {callbackUrl:'http://localhost:3000'}) 
    }

  return (
    <Layout>
        <Head><title>Login</title></Head>
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className='title'>
                <h1 className='text-gray-800 text-4xl font-bold py-4'>Explore</h1>
                <p className='w-3/4 mx-auto text-center text-gray-400 py-10'>lorem ipsum dolor</p>
                </div>

                <form onSubmit={formik.handleSubmit} className='flex flex-col gap-5'>
                    <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-500' : ''}  `}>
                        <input onChange={formik.handleChange} 
                        value={formik.values.email} className={styles.input_text}  
                        type='email' name='email' placeholder='Email' {...formik.getFieldProps('email')}/>
                        <span className='icon flex items-center px-4'><HiAtSymbol size={25}/></span>
                        
                    </div>
                    {/* {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>} */}
                    <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-500' : ''}  `}>
                        <input onChange={formik.handleChange} 
                        value={formik.values.password} 
                        className={styles.input_text} type={`${show ? 'text' : 'password'}`} name='password' 
                        placeholder='password' {...formik.getFieldProps('password')} />
                        <span className='icon flex items-center px-4' onClick={()=>setShow(!show)}><HiFingerPrint size={25} /></span>
                    </div>
                    {/* {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>} */}
                    <div className='input-button'>
                        <button onClick={onSubmit} className={styles.button} type='submit'>Login</button>
                    </div>
                    <div className='input-button'>
                        <button onClick={handleGoogleSignIn} type='button' className={styles.button_custom}>
                            Sign in with Google <Image src={'/assets/google.svg'} width='20' height='20'></Image></button>
                    </div>
                    <div className='input-button'>
                        <button onClick={handleGithubSignIn} type='button' className={styles.button_custom}>
                            Sign in with Github <Image src={'/assets/github.svg'} width='25' height='25' ></Image></button>
                    </div>
                </form>
                <p className='text-center text-gray-400'>don't have an account yet?
                 <Link href={'/register'} className='text-blue-700'>Sign Up</Link></p>
        </section>
    </Layout>
  ) 
}

export default Login