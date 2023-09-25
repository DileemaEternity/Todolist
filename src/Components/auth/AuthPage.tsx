import React from 'react'
import './AuthPage.css'
import { AuthForm } from './AuthForm/AuthForm'

type authpageProps = {

}

export function AuthPage(props: authpageProps) {
  return (
    <div className='Auth-Page'>
    <AuthForm />
    </div>
  )
}
