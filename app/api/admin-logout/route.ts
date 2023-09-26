import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { APIKEY } from "@/lib";

//admin-logout api route
export async function GET(request: NextRequest) {

  const apikey = request.headers.get("api-key") !== APIKEY;

  const cookieStore = cookies();

  try {

    if (apikey) {
      throw Error
    }

    cookieStore.set({
      name: "user-token",
      httpOnly: true,
      value: "",
      secure: process.env.NODE_ENV === "production",
      path: "/"
    })

    return NextResponse.json("success");

  } catch {

    return NextResponse.json({
      status: "error",
      message: "something went wrong",
    });

  }

}