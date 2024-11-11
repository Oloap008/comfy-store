import { Form, Link } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";

function Login() {
  return (
    <section className="min-h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput
          type="email"
          defaultValue="test@test.com"
          label="Email"
          name="indentifier"
        />
        <FormInput
          type="password"
          defaultValue="secret"
          label="Password"
          name="password"
        />
        <div className="mt-4">
          <SubmitBtn text="Login" />
        </div>
        <button type="button" className="btn btn-secondary btn-block">
          Guest User
        </button>
        <p className="text-center">
          Not a member yet?{" "}
          <Link to="/register" className="ml-2 link link-hover link-primary">
            Register
          </Link>
        </p>
      </Form>
    </section>
  );
}

export default Login;
