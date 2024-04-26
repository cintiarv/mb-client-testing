import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import queries from "../services/payments/mutations";
import mutations from "../services/payments/mutations";
import { MenuItem, TextField } from "@mui/material";
import { useForm } from 'react-hook-form'

const schemaFormCreate = yup.object({
    paymentMethod: yup.string(),
    reserve: yup.string(),
    amount: yup.number()
  })


export default function Reserves() {
  const [CreatePaymentMutation] = useMutation(mutations.CREATE_PAYMENT);

  const onSubmit = async (dataToSend) => {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
        resolver: yupResolver(schemaFormCreate)
      })
    
    try {
      const response = await CreatePaymentMutation({
        variables: {
          data: {
            paymentMethod: dataToSend.paymentMethod,
            reserve: dataToSend.reserve,
            amount: parseInt(dataToSend.amount),
          },
        },
      });
      if (response) {
        console.log("🚀 ~ onSubmit ~ response:", "It worked!!!");
      }
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    }
  };

  return (
    <div className="text-center mt-10">
      <p className="mb-10">Reserva</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="subtitle">Detalles de reserva</p>
        <TextField {...register('paymentMethod')} error helperText='' className='w-100' id='outlined-basic' label='Método de pago' variant='outlined' />
        <TextField {...register('reserve')} error helperText='' className='w-100' id='outlined-basic' label='id de reserva' variant='outlined' />
        <TextField {...register('amount')} error helperText='' className='w-100' id='outlined-basic' label='Total' variant='outlined' />
      <div>
      <button type='submit' className='btn-landrada desktop'>Guardar</button>
      </div>
      </form>
    </div>
  );
}
