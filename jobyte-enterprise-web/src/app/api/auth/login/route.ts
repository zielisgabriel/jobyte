export async function POST(req: Request) {
  const {email, password} = await req.json();

  return await fetch(`${process.env.PUBLIC_API_URL}/api/auth/enterprise/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}