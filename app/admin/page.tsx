"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { APIKEY } from "@/lib";

//page
export default function LoginPage() {
  const router = useRouter();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => {
    axios
      .get(`/api/admin-login?login=${login}&password=${password}`, {
        withCredentials: true,
        headers: {
          "api-key": APIKEY,
        },
      })
      .then(() => {
        router.push("/dashboard/video");
      });
  };

  return (
    <div className={`grid h-[100vh] w-full place-items-center text-3xl`}>
      <div className="flex h-[380px] w-[520px] flex-col justify-center rounded-[10px] border-2 border-dashed border-[color:var(--color-orange)] p-[49px] backdrop-blur-sm">
        <h2 className="text-center text-[color:var(--color-orange)]">
          Admin Login
        </h2>

        <Input
          name={"video-login"}
          value={login.trim()}
          onChange={(event) => setLogin((event.target as HTMLInputElement).value)}
          type={"text"}
          placeholder={"Login. . ."}
        />

        <Input
          name={"video-password"}
          value={password.trim()}
          onChange={(event) => setPassword((event.target as HTMLInputElement).value)}
          type={"password"}
          placeholder={"Password. . ."}
        />

        <Button onClick={loginHandler}>Submit</Button>
      </div>
    </div>
  );
}
