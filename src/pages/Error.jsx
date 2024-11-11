import { Link, useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();

  return (
    <main className="grid min-h-screen place-items-center">
      {error.status === 404 ? (
        <div className="text-center">
          <p className="text-9xl font-semibild text-primary">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl capitalize">
            page not found
          </h1>
          <p className="mt-6 text-lg leading-7">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
          <div className="mt-10">
            <Link to="/" className="btn btn-secondary uppercase font-semibold">
              Go back home
            </Link>
          </div>
        </div>
      ) : (
        <h4 className="text-center font-bold text-4xl">
          There was an error...
        </h4>
      )}
    </main>
  );
}

export default Error;
