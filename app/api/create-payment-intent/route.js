import Stripe from 'stripe'
import { useQuery, useMutation } from '@apollo/client'
import { NextResponse } from 'next/server'
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10'
})

const calculateOrderAmount = (items) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity
    return acc + itemTotal
  }, 0)
  return totalPrice
}

export async function POST (request) {
  const [CreatePaymentMutation] = useMutation(mutations.CREATE_PAYMENT)

  const body = await request.json()
  const { items, payment_intent_id } = body
  const total = calculateOrderAmount(items) * 100 // stripe toma la cantidad en centavos
  const orderData = {
    // user: {connect:{i: currentUser.id}},
    amount: total,
    currency: 'usd',
    status: 'pending',
    deliveryStatus: 'pending',
    paymentIntentId: payment_intent_id,
    products: items
  }
  if (payment_intent_id) {
    // udpdate the order
  } else {
    // create the intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'usd',
      automatic_payment_methods: { enabled: true }
    })
    // create order
    orderData.paymentIntentId = paymentIntent.id
    await CreatePaymentMutation({
      variables: {
        data: {
          reserve: '66340804e52ce99ea66f4d77',
          amount: 5000,
          paymentMethod: 'TESTINGGG'
        }
      }
    })
    return NextResponse.json({ paymentIntent })
  }
}
