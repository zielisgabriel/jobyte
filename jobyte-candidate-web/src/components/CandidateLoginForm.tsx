"use client"

import { useContext, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/environments/regexEnv";
import { Button } from "./ui/Button";
import Link from "next/link";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { Separator } from "radix-ui";
import { Input } from "./ui/Input";
import { AuthContext } from "@/contexts/AuthContext";

const candidateLoginFormSchema = z.object({
	email: z.string().regex(EMAIL_REGEX, "Email inválido"),
	password: z.string().regex(PASSWORD_REGEX, "Senha inválida"),
});

type CandidateLoginFormType = z.infer<typeof candidateLoginFormSchema>;

export function CandidateLoginForm() {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isPending, startTransition] = useTransition();
	const [errorMessage, setErrorMessage] = useState("");
	const {login} = useContext(AuthContext);
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<CandidateLoginFormType>({
		resolver: zodResolver(candidateLoginFormSchema),
		defaultValues: { email: "", password: "" },
	});

	async function onSubmit({email, password}: CandidateLoginFormType) {
		startTransition(async () => {
			await login(email, password, setErrorMessage);
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
					<Input
						placeholder="E-mail"
						{...register("email")}
						disabled={isPending}
						className={twMerge(clsx(
							errors.email && "border-red-500"
						))}
					/>

					<Input
						placeholder="Senha"
						type={isPasswordVisible ? "text" : "password"}
						{...register("password")}
						disabled={isPending}
						className={twMerge(clsx(
							errors.password && "border-red-500"
						))}
					/>
					<button
						type="button"
						className="text-background text-start text-[12px] hover:underline font-bold opacity-60 cursor-pointer"
						onClick={() => setIsPasswordVisible(!isPasswordVisible)}
					>
						{isPasswordVisible ? "Ocultar" : "Mostrar"} senha
					</button>
				</div>

				<Button type="submit" className="w-full mt-4" variant={"color_invert"} disabled={isPending}>
					{isPending ? "Entrando..." : "Entrar"}
				</Button>

				<Separator.Root className="h-0.5 rounded-full bg-background my-4 mx-6" />

				<div className="flex gap-1 justify-center">
					<h1 className="text-background/80 text-sm">Não tem uma conta?</h1>
					<Link
						href={"/register"}
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

