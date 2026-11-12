"use client";

import { useRouter } from "next/navigation";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { SignInForm, type SignInData } from "@/components/auth/sign-in-form";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
    const router = useRouter();

    const handleSignIn = async (data: SignInData) => {
        const { error } = await authClient.signIn.email({
            email: data.email, // required, The email address of the user.
            password: data.password, // required, The password of the user.
            rememberMe: data.rememberMe, // keep the user signed in after the browser closes.
        });

        // The form shows this message to the user.
        if (error) throw new Error(error.message ?? "Invalid email or password.");

        router.push("/");
        router.refresh();
    }

    return (
        <Card className="w-full gap-6 rounded-xl bg-[#141418] py-8 text-white ring-white/10">
            <CardHeader>
                <CardTitle className="font-heading text-2xl font-semibold text-white">
                    Welcome back
                </CardTitle>
                <CardDescription className="text-white/60">
                    Sign in to HireLoop and pick up where you left off.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <SignInForm onSubmit={handleSignIn} />
            </CardContent>
        </Card>
    );
}