import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="auth">
      <section>
        <SignUp path="/sign-up" signInUrl="/sign-in" forceRedirectUrl="/dashboard" />
      </section>
    </main>
  );
}
