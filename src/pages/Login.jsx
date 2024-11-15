import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import { store } from "../store";
import { loginGuestUser, loginUser as loginUserAPI } from "../services/apiUser";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const response = await loginUserAPI(data);

  console.log(response);

  if (response.user) {
    toast.success("Logged in successfull");

    store.dispatch(loginUser(response.user));
    return redirect("/");
  } else {
    toast.error(response.error);
    return null;
  }
}

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleGuestUserLogin() {
    const response = await loginGuestUser({
      identifier: "test@test.com",
      password: "secret",
    });

    if (response.user) {
      toast.success("Logged in successfull as a guest user");

      dispatch(loginUser(response.user));
      return navigate("/");
    } else {
      toast.error("Guest user login error. Please try again.");
      return null;
    }
  }

  return (
    <section className="min-h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput type="email" label="Email" name="identifier" />
        <FormInput type="password" label="Password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="Login" />
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={handleGuestUserLogin}
        >
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
