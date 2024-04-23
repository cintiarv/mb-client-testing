import { NextResponse } from "next/server";
import Stripe from 'stripe'

const stripe = new Stripe
("KEY")

export async function POST(request){

    const body = await request.json()

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
        mode:"payment"
    })

    console.log('session->', session)
    return NextResponse.json(session)
}