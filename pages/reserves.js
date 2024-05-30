import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import mutations from '../services/payments/mutations'
import { MenuItem, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import PayButton from '@/app/components/PayButton'


const data = {
  data: {
    reserve: '661c3201e61a92bc2c83e4ce',
    amount: 5000,
    paymentMethod: 'card'
  }
}

export default function Reserves() {
  const [CreatePaymentMutation] = useMutation(mutations.CREATE_PAYMENT)

  const onSubmit = async () => {
    try {
      await CreatePaymentMutation({
        variables: {
          data: {
            reserve: '66340804e52ce99ea66f4d77',
            amount: 5000,
            paymentMethod: 'TESTINGGG'
          }
        }
      })
    } catch (error) {
    }
  }

  return (
    <div className='text-center mt-10'>
      <p className='mb-10'>Reserva</p>
      <form>
        <p className='subtitle'>Detalles de reserva</p>
      </form>
      <button onClick={onSubmit} className='btn-landrada desktop'>
        BUTTON ONSUBMIT
      </button>
      <div>
        <PayButton />
      </div>

    </div>
  )
}
