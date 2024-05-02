import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import mutations from "../services/payments/mutations";
import { MenuItem, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schemaFormCreate = yup.object({
  paymentMethod: yup.string(),
  reserve: yup.string(),
  amount: yup.number(),
});

const data = {
  data: {
    reserve: "661c3201e61a92bc2c83e4ce",
    amount: 5000,
    paymentMethod: "card",
  },
};

export default function Reserves() {
  const [CreatePaymentMutation] = useMutation(mutations.CREATE_PAYMENT);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schemaFormCreate),
  });
  const onSubmit = async () => {
    try {
      await CreatePaymentMutation({
        variables: {
          data: {
            reserve: "66340804e52ce99ea66f4d77",
            amount: 5000,
            paymentMethod: "TESTINGGG",
          },
        },
      });
      console.log('se logró')
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    }
  };

  return (
    <div className="text-center mt-10">
      <p className="mb-10">Reserva</p>
      <form>
        <p className="subtitle">Detalles de reserva</p>
        <TextField
          {...register("paymentMethod")}
          error
          helperText=""
          className="w-100"
          id="outlined-basic"
          label="Método de pago"
          variant="outlined"
        />
        <TextField
          {...register("reserve")}
          error
          helperText=""
          className="w-100"
          id="outlined-basic"
          label="id de reserva"
          variant="outlined"
        />
        <TextField
          {...register("amount")}
          error
          helperText=""
          className="w-100"
          id="outlined-basic"
          label="Total"
          variant="outlined"
        />
        <div></div>
      </form>
      <button onClick={onSubmit} className="btn-landrada desktop">
        Guardar
      </button>
    </div>
  );
}
