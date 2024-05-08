const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
import Stripe from 'stripe'
import { NextResponse } from "next/server";

const stripe = new Stripe(STRIPE_SECRET_KEY)

export async function POST() {
    const account = await stripe.accounts.create({
        country: 'MX',
        default_currency:'mxn',
        email: 'cin.ruiz@example.com',
        controller: {
            fees: {
                payer: 'application',
            },
            losses: {
                payments: 'application',
            },
            stripe_dashboard: {
                type: 'express',
            },
        },
    });
    console.log('account :>> ', account);
    return NextResponse.json(account)
}
