"use client"

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/environments/regexEnv";
import { Button } from "./ui/Button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { Separator } from "radix-ui";

const enterpriseLoginFormSchema = z.object({
	email: z.string().regex(EMAIL_REGEX, "Email inválido"),
	password: z.string().regex(PASSWORD_REGEX, "Senha inválida"),
});

type EnterpriseLoginFormType = z.infer<typeof enterpriseLoginFormSchema>;

export function EnterpriseLoginForm() {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isPending, startTransition] = useTransition();
	const [errorMessage, setErrorMessage] = useState("");
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<EnterpriseLoginFormType>({
		resolver: zodResolver(enterpriseLoginFormSchema),
		defaultValues: { email: "", password: "" },
	});

	const router = useRouter();

	async function onSubmit({email, password}: EnterpriseLoginFormType) {
		startTransition(async () => {
			try {
				const response = await fetch("/api/auth/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email,
						password
					})
				});

				if (!response.ok) {
					setErrorMessage("Falha ao autenticar. Verifique suas credenciais.");
					return;
				}
				
				router.push("/");
			} catch (error: any) {
				console.error("Erro no login:", error);
				setErrorMessage("Erro inesperado. Tente novamente.");
			}
		})
	}

	return (
		<form
			className="flex flex-col justify-center items-center h-full w-full"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="w-full max-w-md">
				<h1 className={twMerge(clsx("text-3xl font-bold mb-4 ml-1 text-background"))}>
					Entrar
				</h1>

				{errorMessage && (
					<div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
						{errorMessage}
					</div>
				)}

				<div className="flex flex-col gap-2">
					<div
						className={twMerge(
							clsx(
								"flex w-full rounded-full border-1 border-background",
								errors.email && "border-red-500"
							)
						)}
					>
						<input
							type="text"
							{...register("email")}
							placeholder="Digite seu e-mail"
							disabled={isPending}
							className="w-full p-2 placeholder:text-background/80 text-background disabled:opacity-50"
						/>
					</div>
					{errors.email && (
						<p className="text-xs text-red-500 ml-2">{errors.email.message}</p>
					)}

					<div className="flex flex-col">
						<div
							className={twMerge(
								clsx(
									"flex w-full rounded-full border-1 border-background",
									errors.password && "border-red-500"
								)
							)}
						>
							<input
								type={isPasswordVisible ? "text" : "password"}
								{...register("password")}
								placeholder="Digite sua senha"
								disabled={isPending}
								className="w-full p-2 placeholder:text-background/80 text-background disabled:opacity-50"
							/>
							<Button
								onClick={() => setIsPasswordVisible((v) => !v)}
								variant={"ghost"}
								type="button"
								disabled={isPending}
							>
								{isPasswordVisible ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
							</Button>
						</div>
						{errors.password && (
							<p className="text-xs text-red-500 ml-2">{errors.password.message}</p>
						)}
					</div>
				</div>

				<Button type="submit" className="w-full mt-4" variant={"color_invert"} disabled={isPending}>
					{isPending ? "Entrando..." : "Entrar"}
				</Button>

				<Separator.Root className="h-0.5 rounded-full bg-background my-4 mx-6" />

				<div className="flex gap-1 justify-center">
					<h1 className="text-background/80 text-sm">Não tem uma conta?</h1>
					<Link
						href={"/enterprise/register"}
						title="Criar conta"
						className="text-sm font-semibold hover:underline text-background"
					>
						Criar conta
					</Link>
				</div>
			</div>
		</form>
	);
}

