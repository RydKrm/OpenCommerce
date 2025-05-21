import type { Metadata } from "next";
// import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Register | ThreadZone",
  description: "Create a new ThreadZone account",
};

export default function RegisterPage() {
  return (
    <div className="container-custom max-w-md py-12">
      {/* <RegisterForm /> */}
    </div>
  );
}
