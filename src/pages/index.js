import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {getSession, useSession, signOut} from 'next-auth/react'


export default function Home() {

  function handleSignOut(){
    signOut()
    }
  const {data:session} = useSession()
  
  return (
    <div className='min-h-screen'>
      <Head>
        <title>Home Page</title>
      </Head>
       {session ? User({session, handleSignOut}): Guest()}
      
        </div>
  )
}

function Guest(){
  return(
    <main className={`container mx-auto text-center py-20`}>
      <h3 className='font-bold text-4xl' >Guest HomePage</h3>
      <div className='flex justify-center'>
        <Link href={'/login'} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-400'>Sign In</Link>
      </div>
    </main>
  )
}
function User({session, handleSignOut}){
  
  return(
    <main className={`container mx-auto text-center py-20 `}>
      <h3 className='font-bold text-4xl' >Authorized User HomePage</h3>
      <div className='details'>
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
      </div>
      <div className='flex justify-center'>
        <button onClick={handleSignOut} className='mt-5 px-10 py-1 rounded-sm  bg-gray-50'>Sign Out</button>
      </div>
      <div className='flex justify-center'>
        <Link href={'/profile'} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Profile</Link>
      </div>
    </main>
  )
}

export async function getServerSideProps({req}){
  const session = await getSession({req})

  if(!session){
    return{
      redirect:{
        destination:'/login',
        permanent: false
      }
    }
  }
  return{
    props:{session}
  }
}
