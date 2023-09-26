import { jwtVerify } from "jose"

interface UserJwtPayload {
  jti: string
  iat: number
}

export const getJwtSecretKey = () => {

  const secret = "gsdfkshdkjfhkjhsdkjfTRYTfvhvsdhjfbjsdhf.sjdnfk"

  if (!secret || secret?.length === 0) {

    throw Error("The enviroment variable is not set")
  }

  return secret
}

export const verifyAuth = async (token: string) => {
  try {
    
    const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()))

    return verified.payload as UserJwtPayload

  } catch (error) {

    throw Error("Your token has expired")
  }
}