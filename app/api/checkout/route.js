import { NextResponse } from 'next/server'
import Stripe from 'stripe'
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

const stripe = new Stripe(STRIPE_SECRET_KEY)

export async function POST (request) {
  const body = await request.json()
  console.log('🚀 ~ POST ~ body:', body)

  const session = await stripe.checkout.sessions.create({
    success_url: 'http://localhost:3000/success',
    line_items: [ // con todos los productos que queremos cobrar
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: body.name,
            images: [body.image]
          },
          unit_amount: body.price
        },
        quantity: 1
      }
    ],
    payment_intent_data: {
      application_fee_amount: 123
    },
    mode: 'payment'
  },
  {
    stripeAccount: 'acct_1PDFX8BCFLfeZNkg'
  }
  )
  // await createPaymentOnDB()
  return NextResponse.json(session)
}

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
/*
const session = await stripe.checkout.sessions.create(
  {
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 1000,
        },
        quantity: 1,
      },
    ],
    payment_intent_data: {
      application_fee_amount: 123,
    },
    mode: 'payment',
    success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
  },
  {
    stripeAccount: '{{CONNECTED_ACCOUNT_ID}}',
  }
); */
