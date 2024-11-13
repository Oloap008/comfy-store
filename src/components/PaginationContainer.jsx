import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

function PaginationContainer() {
  const {
    meta: {
      pagination: { pageCount, page },
    },
  } = useLoaderData();

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  function handlePageChange(pageNumber) {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);

    navigate(`${pathname}?${searchParams.toString()}`);
  }

  if (pageCount < 2) return null;

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handlePageChange(index + 1)}
            className={`btn btn-xs sm:btn-md border-none join-item ${
              index + 1 === page ? "bg-base-300 border-base-300" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === pageCount}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PaginationContainer;
