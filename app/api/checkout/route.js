/* import { NextResponse } from "next/server";
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
import Stripe from 'stripe'

const stripe = new Stripe(STRIPE_SECRET_KEY)

export async function POST(request){

    const body = await request.json()
    console.log("🚀 ~ POST ~ body:", body)

    const session = await stripe.checkout.sessions.create({
        success_url:"http://localhost:3000/success",
        line_items:[ //con todos los productos que queremos cobrar
            {
                price_data: {
                    currency:"usd",
                    product_data:{
                        name:body.name,
                        images: [body.image]
                    },
                    unit_amount: body.price
                },
                quantity:1
            }
        ],
        metadata:{
            productId: body.id
        },
        mode:"payment"
    })
    await createPaymentOnDB()
    return NextResponse.json(session)
} */