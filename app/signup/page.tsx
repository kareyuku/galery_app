import SignupForm from "@/components/forms/SignupForm";
import Link from "next/link";
import { Suspense } from "react";

export default function SignUpPage() {
    return <div className="flex flex-col gap-3 max-w-[500px] mx-auto">
        <Suspense>
            <SignupForm />
            <Link href="/signin" className="text-center">
                <span>Already have an account? Sign In</span>
            </Link>
        </Suspense>
    </div>
}