import { headers } from 'next/headers'
import Stripe from 'stripe'
const { NextResponse } = require('next/server')
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

const stripe = new Stripe(STRIPE_SECRET_KEY)

const ENDPOINT_SECRET = process.env.ENDPOINT_SECRET

export async function POST (request) {
  const body = await request.text()
  // console.log("🚀 ~ POST ~ body:", body)
  const headersList = headers()
  const sign = headersList.get('stripe-signature')
  console.log('🚀 ~ POST ~ sign:', sign)

  let event // pueden llegar muchos tipos de events, en este caso solo habilitamos el "checkout" event

  try {
    event = stripe.webhooks.constructEvent(body, sign, ENDPOINT_SECRET)
    // console.log("🚀 ~ POST ~ event:", event)
  } catch (error) {
    console.log('🚀 ~ POST ~ error:', error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object
      // con un switch o un IF se podría actualizar la DB o enviar un correo
      console.log('Consultando producto con id', checkoutSessionCompleted.metadata.productId)

      // console.log("🚀 ~ POST ~ checkoutSessionCompleted:", {checkoutSessionCompleted})
      break
    default: console.log(`Evento no manejado: ${event.type}`)
  }

  return new Response(null, { status: 200 })
}
