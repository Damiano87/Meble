import { useMemo } from "react";
import { useSearchParams } from "react-router";

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage?: number;
  totalPages: number;
}

const PaginationRaters = ({ currentPage, totalPages }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // function to handle page change
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    setSearchParams(params);
  };

  // generate page numbers to display
  const pageNumbers = useMemo(() => {
    const range = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust startPage if endPage is at the end of the range
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    return range;
  }, [currentPage, totalPages]);

  // if only one page, do not display pagination controls
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 my-5">
      {/* button for first page */}
      {currentPage > 1 && (
        <button
          onClick={() => handlePageChange(1)}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          {"<<"}
        </button>
      )}

      {/* button for previous page */}
      {currentPage > 1 && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          {"<"}
        </button>
      )}

      {/* numbers of pages */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => handlePageChange(number)}
          className={`
            px-3 py-1 border rounded 
            ${
              currentPage === number
                ? "bg-red-900 text-white"
                : "hover:bg-gray-100"
            }
          `}
        >
          {number}
        </button>
      ))}

      {/* button for next page */}
      {currentPage < totalPages && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          {">"}
        </button>
      )}

      {/* button for last page */}
      {currentPage < totalPages && (
        <button
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          {">>"}
        </button>
      )}
    </div>
  );
};

export default PaginationRaters;
