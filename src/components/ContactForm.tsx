import { useState } from "react";
import { profile } from "@/data/profile";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "opened" | "unconfigured">("idle");

  const validate = () => {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "Please enter a valid email address.";
    if (values.message.trim().length < 20)
      next.message = "Please describe your project in at least 20 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // No backend is connected yet, so the form hands off to the visitor's email
    // client rather than pretending the message was delivered.
    if (!profile.contact.email) {
      setStatus("unconfigured");
      return;
    }
    const subject = encodeURIComponent(`Project enquiry from ${values.name}`);
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
    window.location.href = `mailto:${profile.contact.email}?subject=${subject}&body=${body}`;
    setStatus("opened");
  };

  const field =
    "hairline w-full rounded-sm bg-background/50 px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="name" className="eyebrow">
          Your name
        </label>
        <input
          id="name"
          name="name"
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={`${field} mt-2`}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-xs text-destructive">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="eyebrow">
          Your email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`${field} mt-2`}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-xs text-destructive">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="eyebrow">
          Project details
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => setValues({ ...values, message: e.target.value })}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${field} mt-2 resize-y`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-destructive">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        Send project enquiry
      </button>

      <p aria-live="polite" className="text-xs text-muted-foreground">
        {status === "opened" &&
          "Your email app should now be open with the message ready to send."}
        {status === "unconfigured" &&
          "This form isn't connected to an inbox yet — add a contact email in src/data/profile.ts and it will start working."}
        {status === "idle" &&
          "Submitting opens your own email app with the message prepared; nothing is stored here."}
      </p>
    </form>
  );
}
