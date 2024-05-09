const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
import Stripe from 'stripe'
import { NextResponse } from "next/server";

const stripe = new Stripe(STRIPE_SECRET_KEY)

export async function POST() {
    const account = await stripe.accounts.create({
        country: 'MX',
        default_currency: 'mxn',
        email: 'cintiaruizv@gmail.com',
        type: 'custom',
        components: {
            account_onboarding: { enabled: true },
        },
        capabilities: {
            card_payments: {
                requested: true,
            },
            transfers: {
                requested: true,
            },
        },
    });
    console.log('account :>> ', account);
    return NextResponse.json(account)
}


/* export async function POST() {
    const capability = await stripe.accounts.retrieveCapability(
        'acct_1PDyYWPdv9FZsTKH',
        'card_payments'
    );
    console.log("🚀 ~ POST ~ capability:", capability)
    return NextResponse.json(capability)
} */

/* export async function POST() {
    const account = await stripe.accounts.update(
        'acct_1PDyYWPdv9FZsTKH',
        {
            tos_acceptance: {
                date: 1715044954,
                ip: '196.168.1.1',
            }
        }
    );
    console.log("🚀 ~ POST ~ account:", account)
    return NextResponse.json(account)
} */