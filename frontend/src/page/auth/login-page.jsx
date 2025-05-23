import { Password } from "../../components/form/password";
import { Form, useActionData } from "react-router";
import { Email } from "../../components/form/email";
import { Button } from "../../components/ui/button";
export default function LoginPage() {
  const actionData = useActionData();
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <div className="header-wrap flex justify-center items-center mb-4">
        <h1 className="font-semibold text-xl">Rukunku Login</h1>
      </div>
      {actionData?.errors?.message && (
        <div className="py-2 mb-2">
          <p
            role="alert"
            className="text-sm text-red-700 bg-red-100 border border-red-400 rounded-md px-4 py-2 font-semiboldshadow-smanimate-pulsemax-w-md"
          >
            {actionData.errors.message}
          </p>
        </div>
      )}

      <Form action="/login" method="POST" className="flex flex-col gap-2">
        <Email name="email" id="email" placeholder="Email" />
        <Password
          id="password"
          label="password"
          name="password"
          placeholder="password"
        />
        <Button type="submit" className="cursor-pointer mt-2">
          Login
        </Button>
      </Form>
    </div>
  );
}
