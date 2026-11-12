"use client";

import { useRouter } from "next/navigation";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { SignUpForm, type SignUpData } from "@/components/auth/sign-up-form";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
    const router = useRouter();

    const handleSignUp = async (data: SignUpData) => {
        const { error } = await authClient.signUp.email({
            name: data.name, // required, The name of the user.
            email: data.email, // required, The email address of the user.
            password: data.password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
            role: data.role, // "seeker", "recruiter" or "admin"
        });

        // The form shows this message to the user.
        if (error) throw new Error(error.message ?? "Could not create your account.");

        // Sign-up logs the user in automatically, so end that session
        // and send them to the sign-in page, as planned.
        await authClient.signOut();
        router.push("/sign-in");
    }

    return (
        <Card className="w-full gap-6 rounded-xl bg-[#141418] py-8 text-white ring-white/10">
            <CardHeader>
                <CardTitle className="font-heading text-2xl font-semibold text-white">
                    Create your account
                </CardTitle>
                <CardDescription className="text-white/60">
                    Join HireLoop and find your next role faster.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <SignUpForm onSubmit={handleSignUp} />
            </CardContent>
        </Card>
    );
}