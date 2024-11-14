import SigninForm from "@/components/forms/SigninForm";
import SignupForm from "@/components/forms/SignupForm";
import { Suspense } from "react";

export default function SignInPage() {
    return <div className="flex flex-col gap-3 max-w-[500px] mx-auto">
        <Suspense>
            <SigninForm />
        </Suspense>
    </div>
}