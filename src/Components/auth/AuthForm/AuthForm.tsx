import React from 'react'
import './AuthForm.css'
import { Button, TextField, Typography } from '@mui/material'
import { useForm, Controller, SubmitHandler, useFormState } from "react-hook-form"
import { loginValidate, passwordValidation } from './validation'

type AuthFormType = {
  login: string
  password: string
}
export const AuthForm = () => {
  const { handleSubmit, control } = useForm<AuthFormType>()
  const { errors } = useFormState({control})
  const onSubmit: SubmitHandler<AuthFormType> = (data) => alert(data)

  return (
    <div className='Auth-Form'>
      <Typography variant="h4" component="h2" className='auth'>
        Войдите в аккаунт
      </Typography>
      <Typography variant="subtitle1" component="h2" className='auth_subtitle' >
        Чтобы получить доступ
      </Typography>
      <form className='auth_form' onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name='login'
          rules={loginValidate}
          render={({ field }) => (
            <TextField
              label="Логин"
              size='small'
              margin='normal'
              fullWidth={true}
              className='auth_input'
              onChange={(e) => field.onChange(e)}
              value={field.value}
              error={!!errors.login?.message}
              helperText={errors.login?.message}
            />
          )}
        />
        <Controller
          control={control}
          name='password'
          rules={passwordValidation}
          render={({ field }) => (
            <TextField
              label="Пароль"
              type='password'
              size='small'
              margin='normal'
              fullWidth={true}
              className='auth_input'
              onChange={(e) => field.onChange(e)}
              value={field.value}
              error={!!errors.password?.message}
              helperText={errors.password?.message}
            />
          )}
        />
        <Button
          type='submit'
          variant='contained'
          fullWidth={true}
          disableElevation={true}
          sx={{ marginTop: 2 }}
        >
          Войти
        </Button>
      </form>
    </div>
  )
}
