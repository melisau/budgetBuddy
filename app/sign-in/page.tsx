import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="auth">
      <section>
        <SignIn path="/sign-in" signUpUrl="/sign-up" forceRedirectUrl="/dashboard" />
      </section>
    </main>
  );
}
