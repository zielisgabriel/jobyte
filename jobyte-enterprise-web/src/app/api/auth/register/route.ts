import { EnterpriseRegisterFormType } from "@/components/EnterpriseRegisterForm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    address,
    cnpj,
    companyName,
    email,
    password,
    phone
  }: EnterpriseRegisterFormType = await req.json();

  try {
    const response = await fetch("http://localhost:8000/api/auth/enterprise/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        address,
        cnpj,
        companyName,
        email,
        password,
        phone
      })
    })

    if (!response.ok) {
      console.error(response);
      return NextResponse.json({"message": "Registration failed"}, {status: response.status});
    }
  } catch (error: any) {
    return NextResponse.json({"message": "Registration failed"}, {status: 500});
  }

  return new Response(JSON.stringify({message: "Registration successful"}), {status: 200});
}