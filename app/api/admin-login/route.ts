import { getJwtSecretKey } from "@/lib/auth";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from 'next/headers'
import { APIKEY } from "@/lib";

//admin login api route
export async function GET(request: NextRequest) {

  const login = request.nextUrl.searchParams.get('login');
  const password = request.nextUrl.searchParams.get('password');

  const apikey = request.headers.get("api-key") !== APIKEY;

  const cookieStore = cookies();

  try {
   
    if (apikey) {
      throw Error
    }

    if (process.env.ADMIN_LOGIN === login && process.env.ADMIN_PASSWORD === password) {

      const token = await new SignJWT({})
        .setProtectedHeader({ alg: "HS256" })
        .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime("10h")
        .sign(new TextEncoder().encode(getJwtSecretKey()));


      cookieStore.set({
        name: "user-token",
        httpOnly: true,
        value: token,
        secure: process.env.NODE_ENV === "production",
        path: "/"
      })

      return NextResponse.json("success");

    } else {

      throw Error

    }

  } catch {

    return NextResponse.json({
      status: "error",
      message: "something went wrong",
      searchCard: [],
      count: 0
    });

  }

}