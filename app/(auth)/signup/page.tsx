import { Card } from "@/components/ui";

export default function SignupPage() {
  return (
    <Card className="text-center">
      <h1 className="text-h2 text-text-primary">Invite only</h1>
      <p className="mt-2 text-body text-text-secondary">
        Restaurant owner accounts are created by the Loglime team. Use the invite link from your email to set up access.
      </p>
      <a className="mt-5 inline-flex text-small font-semibold text-coral" href="/login">
        Back to login
      </a>
    </Card>
  );
}
