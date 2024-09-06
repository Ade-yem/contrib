// import { Icon } from "@iconify/react";

export const SortBy = ({
  setSort,
  sort,
  // pagingInfo: { currentPage, itemCount, itemsPerPage, totalItems },
}: {
  setSort: (e: string) => void;
  sort: string;
  // pagingInfo: {
  //   currentPage: number;
  //   itemCount: number;
  //   itemsPerPage: number;
  //   totalItems: number;
  // };
}) => {
  // const startIndex = (currentPage - 1) * itemsPerPage + 1;
  // const endIndex = startIndex + itemCount - 1;

  return (
    <div className="d-flex align-items-center justify-content-between mb-4">
      <p className="text-sm text-black-000 mb-0">
        Showing{" "}
        <span className="text-black-000">
          {/* {startIndex}-{endIndex} of {totalItems} */}
        </span>{" "}
        results
      </p>
      <div className="d-flex align-items-center gap-3 me-3">
        <p className="text-sm text-black-000 mb-0 text-nowrap ">Sort by:</p>
        <select
          className="text-xs border rounded border-black-000"
          id="sort-dropdown"
          onChange={(e) => setSort(e.target.value)}
          defaultValue={sort}
        >
          <option value="popular">Popular</option>
          <option value="latest">Latest</option>
        </select>
        {/* <span className="sort-menu btn-transition">
          <Icon icon="iconoir:menu" width="1.2rem" height="1.2rem" />
        </span> */}
      </div>
    </div>
  );
};
