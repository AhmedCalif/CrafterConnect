"use client"
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";


export function HomePage() {

    return (
      <div className="flex flex-col justify-center items-center">
        <LoginLink>Sign in</LoginLink>
        <RegisterLink>Sign up</RegisterLink>
      </div>
    );
}


