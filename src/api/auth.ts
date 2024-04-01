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
      throw new Error("Network response was not ok");
    }
    return await response.json();
  });
}
