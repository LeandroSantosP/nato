import { UserAlreadyExits } from "@/errors/AuthErros";
import base64 from "base-64";
export interface SignInInput {
  email: string;
  password: string;
}

export async function signIn({ email, password }: SignInInput) {
  return await fetch("http://localhost:4545/auth/sign-in", {
    cache: "no-cache",
    method: "POST",
    headers: {
      Authorization: `Basic ${base64.encode(`${email}:${password}`)}`
    }
  }).then<{ token: string }>(async (response) => {
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    return await response.json();
  });
}

export interface SignUpInput {
  email: string;
  password: string;
  username: string;
  name: string;
}

export async function signUp({ name, ...body }: SignUpInput) {
  return await fetch("http://localhost:4545/auth/sign-up", {
    cache: "no-cache",
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  }).then<void>(async (response) => {
    if (!response.ok) {
      const data = await response.json();
      if (data.message === "User Already Exists!") {
        throw new UserAlreadyExits();
      }
    }
    return;
  });
}

export async function signInFake({ email, password }: SignInInput) {
  return { token: "my_fake_token" };
}

export async function logOut(token: string) {}
