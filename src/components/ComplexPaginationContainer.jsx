import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

function ComplexPaginationContainer() {
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

  function addPageButton(pageNumber, activeClass) {
    return (
      <button
        key={pageNumber}
        type="button"
        onClick={() => handlePageChange(pageNumber)}
        className={`btn btn-xs sm:btn-md border-none join-item ${
          activeClass ? "bg-base-300 border-base-300" : ""
        }`}
      >
        {pageNumber}
      </button>
    );
  }

  function renderPageButton() {
    const pageButtons = [];

    // first button
    pageButtons.push(addPageButton(1, page === 1));

    // dots
    if (page > 2) {
      pageButtons.push(
        <button
          className="btn btn-xs sm:btn-md border-none join-item"
          key="dots-1"
        >
          ...
        </button>
      );
    }

    // active button
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton(page, true));
    }

    // dots
    if (page < pageCount - 1) {
      pageButtons.push(
        <button
          className="btn btn-xs sm:btn-md border-none join-item"
          key="dots-2"
        >
          ...
        </button>
      );
    }

    // last button
    pageButtons.push(addPageButton(pageCount, page === pageCount));

    return pageButtons;
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
        {renderPageButton()}
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

export default ComplexPaginationContainer;
