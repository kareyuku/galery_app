import SignupForm from "@/components/forms/SignupForm";
import { Suspense } from "react";

export default function SignUpPage() {
    return <div className="flex flex-col gap-3 max-w-[500px] mx-auto">
        <Suspense>
            <SignupForm />
        </Suspense>
    </div>
}