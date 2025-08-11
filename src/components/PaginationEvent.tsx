import { ArrowLeft, ArrowRight } from "lucide-react";

export default function PaginationEvent({
  currentPage,
  nPage,
  changeCPage,
  nextPage,
  prePage,
}: any) {
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  return (
    <nav
      aria-label="Pagination"
      className="isolate inline-flex -space-x-px rounded-md shadow-xs"
    >
      <a
        href="#"
        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        onClick={prePage}
      >
        <span className="sr-only">Previous</span>
        <ArrowLeft aria-hidden="true" className="size-5" />
      </a>
      {numbers.map((n) => (
        <a
          href="#"
          className={`${
            currentPage === n ? "active" : ""
          } relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
          onClick={() => changeCPage(n)}
        >
          {n}
        </a>
      ))}

      <a
        href="#"
        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        onClick={nextPage}
      >
        <span className="sr-only">Next</span>
        <ArrowRight aria-hidden="true" className="size-5" />
      </a>
    </nav>
  );
}
