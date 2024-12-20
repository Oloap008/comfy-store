import { Form, Link, redirect } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import { registerUser } from "../services/apiUser";
import { toast } from "react-toastify";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const response = await registerUser(data);

  if (response.user) {
    toast.success("You have successfully registered");
    return redirect("/login");
  } else {
    toast.error(response.error);
    return null;
  }
}

function Register() {
  return (
    <section className="min-h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput
          type="text"
          label="Username"
          name="username"
          defaultValue="test1 smith"
        />
        <FormInput
          type="email"
          label="Email"
          name="email"
          defaultValue="test1@gmail.com"
        />
        <FormInput
          type="password"
          label="Password"
          name="password"
          defaultValue="secret"
        />
        <div className="mt-4">
          <SubmitBtn text="Register" />
        </div>
        <p className="text-center">
          Already a member?{" "}
          <Link to="/login" className="ml-2 link link-hover link-primary">
            Login
          </Link>
        </p>
      </Form>
    </section>
  );
}

export default Register;
