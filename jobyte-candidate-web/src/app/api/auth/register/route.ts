import { CandidateRegisterFormType } from "@/components/CandidateRegisterForm";
import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const {
    email,
    password,
    address,  
    cpf,
    fullName,
    phone
  }: CandidateRegisterFormType = await req.json();

  try {
    const response = await fetch("http://localhost:8000/api/auth/candidate/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        address,
        cpf,
        fullName,
        email,
        password,
        phone
      })
    })

    if (!response.ok) {
      console.log(await response.json());
      return NextResponse.json({"message": "Registration failed"}, {status: response.status});
    }
  } catch (error: any) {
    return NextResponse.json({"message": "Registration failed"}, {status: 500});
  }

  return new Response(JSON.stringify({message: "Registration successful"}), {status: 200});
}