import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../../layout/layout';
import Link from 'next/link';
import styles from '../styles/Form.module.css'
import Image from 'next/image';
import {HiFingerPrint, HiAtSymbol, HiOutlineUser} from 'react-icons/hi'
import { useFormik } from 'formik';
import { registerValidate } from '../../lib/validate';
import { useRouter } from 'next/router';

function Register() {
    const router = useRouter()
    const formik = useFormik({
        initialValues:{
            username:'',
            email:'',
            password:'',
            cpassword:''
        },
        validate:registerValidate,
        onSubmit
    }
    )
    async function onSubmit(values){
        const options = {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(values)
        }
        await fetch('http://localhost:3000/api/auth/signup',options)
        .then(res => res.json())
        .then((data) => {
            if(data.ok)router.push('http://localhost:3000')
        })
    }
    const [show, setShow] = useState({password:false,cpassword:false})
  return (
    <Layout >
        <Head><title>Register</title></Head>
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className='title'>
                <h1 className='text-gray-800 text-4xl font-bold py-4'>Explore</h1>
                <p className='w-3/4 mx-auto text-center text-gray-400 py-10'>lorem ipsum dolor</p>
                </div>

                <form onSubmit={formik.handleSubmit} className='flex flex-col gap-5'>
                    <div className={styles.input_group}>
                        <input className={styles.input_text} 
                         type='text' name='username' placeholder='Username' {...formik.getFieldProps('username')}/>
                        <span className='icon flex items-center px-4'><HiOutlineUser size={25}/></span>
                    </div>
                    {formik.errors.username && formik.touched.username ? <span className='text-rose-500'>{formik.errors.username}</span> : <></>}
                    <div className={styles.input_group}>
                        <input className={styles.input_text}  type='email'
                         name='email' placeholder='Email' {...formik.getFieldProps('email')}/>
                        <span className='icon flex items-center px-4'><HiAtSymbol size={25}/></span>
                    </div>
                    {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>}
                    <div className={styles.input_group}>
                        <input className={styles.input_text} type={`${show.password ? 'text' : 'password'}`} name='password' 
                        placeholder='password' {...formik.getFieldProps('password')}/>
                        <span className='icon flex items-center px-4' onClick={()=>setShow({...show,password:!show.password})}><HiFingerPrint size={25} /></span>
                    </div>
                    {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>}
                    <div className={styles.input_group}>
                        <input className={styles.input_text} type={`${show.cpassword ? 'text' : 'cpassword'}`} name='cpassword' 
                        placeholder='Confirm password' {...formik.getFieldProps('cpassword')}/>
                        <span className='icon flex items-center px-4' onClick={()=>setShow({...show,cpassword:!show.cpassword})}><HiFingerPrint size={25} /></span>
                    </div>
                    {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500'>{formik.errors.cpassword}</span> : <></>}
                    <div className='input-button'>
                        <button className={styles.button} type='submit'>Register</button>
                    </div>
                    
                </form>
                <p className='text-center text-gray-400'>Have an account?
                 <Link href={'/login'} className='text-blue-700'>Sign In</Link></p>
        </section>
    </Layout>
  )
}

export default Register