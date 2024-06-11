import { useState } from 'react'
import Image from 'next/legacy/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { PulseLoader } from 'react-spinners'

import { useMutation } from '@apollo/client'
import mutations from '../services/authentication/mutations'

import { setToken } from '../lib/sessionStorage'

import WARNING_RED from '../public/assets/icons/icon_warning_red.svg'
const schemaValidationLogin = Yup.object().shape({
  email: Yup.string().email('Email no válido').required('No contiene tu e-mail'),
  password: Yup.string().required('Campo Requerido')
})

export default function Login () {
  const [errorMessage, setErrorMessage] = useState(null)
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const [LoginUserMutation] = useMutation(mutations.LOGIN)

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: 'all',
    reValidateMode: 'all',
    criteriaMode: 'all',
    resolver: yupResolver(schemaValidationLogin, {
      validateAllFieldCriteria: true
    })
  })

  const onSubmit = async (dataToSend) => {
    setIsLoading(true)
    setErrorMessage(null)
    try {
      const { data } = await LoginUserMutation({
        variables: {
          data: {
            email: dataToSend.email,
            password: dataToSend.password
          }
        }
      })
      setToken(data?.login?.token)
      setIsLoading(false)
      reset({ email: '', password: '' })
      router.push('/')
    } catch (error) {
      setErrorMessage('Credenciales inválidas')
      setIsLoading(false)
    }
  }

  const handleClickShowPassword = () => {
    setIsShowPassword(!isShowPassword)
    if (!isShowPassword) {
      document.querySelectorAll('.showPassword').forEach(input => { input.type = 'text' })
      return
    }
    document.querySelectorAll('.showPassword').forEach(input => { input.type = 'password' })
  }
  return (
    <div className='text-center'>
      <div className='background-flower' />
      <section className='container-fluid main-container-image-login '>
        <div className='row'>
          <div className='d-block d-lg-none col-12 text-center welcome' />
          <div className='login'>
            <div className='d-none d-lg-block col-7 welcome' />
            <div className='col-12 col-lg-5 login__card'>
              <h3>Inicia sesión</h3>
              <div className='separator' />
              <section className='login__content-form'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='input-lable-group'>
                    <label>
                      <span className={errors.email ? 'error' : ''}>Correo electrónico</span>
                    </label>
                    <div className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                      <input {...register('email')} className={errors.email ? 'error2' : ''} type='email' name='email' placeholder='usuario@email.com' />

                    </div>
                  </div>
                  {
                    errors.email && <div className='password-checks error'> <Image src={WARNING_RED} alt='Icono de advertencia color de fondo rojo' /> <p className='error error-custom'>{errors.email?.message}</p></div>
                  }
                  <div className='input-lable-group'>
                    <div className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                      <label><span className={errors.password ? 'error' : ''}>Contraseña</span>
                      </label>
                      {
                        isShowPassword
                          ? <Image
                              className='input-lable-group__show-img'
                              src='/assets/icons/icon-view-outline-gray.webp' alt='Icono de ocultar contraseña' loading='lazy' width={18}
                              height={18}
                              onClick={() => handleClickShowPassword()}
                            />
                          : <Image
                              className='input-lable-group__show-img'
                              src='/assets/icons/icon-visibility-off.svg' alt='Icono de ocultar contraseña' loading='lazy' width={18}
                              height={18}
                              onClick={() => handleClickShowPassword()}
                            />
                      }
                    </div>
                    <div className='input1'><input {...register('password')} className='showPassword' type='password' name='password' placeholder='*********' />

                    </div>
                  </div>
                  {
                    errors.password && <div className='password-checks error'> <Image src={WARNING_RED} alt='Icono de advertencia color de fondo rojo' /> <p className='error error-custom'>{errors.password?.message}</p></div>
                  }
                  {isLoading &&
                    <PulseLoader
                      color='#4CAF50'
                      size={10}
                    />}

                  <div className='login__content-form-google-auth d-flex justify-content-center' />
                  {
                    errorMessage && <p className='text-danger text-center p-2'>{errorMessage}</p>
                  }
                  {/*                   <Link className='link' href='/recuperacion'>Recuperar mi contraseña</Link>
 */}
                  <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' href='/login' disabled={isLoading}>Iniciar sesión</button>
                </form>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>

  )
}
