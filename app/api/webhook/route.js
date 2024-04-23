const { NextResponse } = require("next/server");

export function POST(requets){
    return NextResponse("Recibiendo webhook")
}
