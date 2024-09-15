export const SortBy = ({
  setSort,
  sort,
  pagingInfo,
}: {
  setSort: (e: string) => void;
  sort: string;
  pagingInfo: {
    privateCount: number;
    nonPrivateCount: number;
    total: number;
    hourlyCount: number;
    dailyCount: number;
    weeklyCount: number;
    monthlyCount: number;
  };
}) => {
  return (
    <div className="d-flex align-items-center justify-content-between mb-4">
      <p className="text-sm text-gray-400 mb-0">
        Showing{" "}
        <span className="text-black-000">
          {sort === "all" && <>{pagingInfo.total}</>}
          {sort === "private" && <>{pagingInfo.privateCount}</>}
          {sort === "public" && <>{pagingInfo.nonPrivateCount}</>}
          {sort === "hourly" && <>{pagingInfo.hourlyCount}</>}
          {sort === "daily" && <>{pagingInfo.dailyCount}</>}
          {sort === "weekly" && <>{pagingInfo.weeklyCount}</>}
          {sort === "monthly" && <>{pagingInfo.monthlyCount}</>}
        </span>{" "}
        results for{" "}
        <span className="text-black-000">
          {sort === "all" && <>all groups</>}
          {sort === "private" && <>private groups</>}
          {sort === "public" && <>public groups</>}
          {sort === "hourly" && <>hourly groups</>}
          {sort === "daily" && <>daily groups</>}
          {sort === "weekly" && <>weekly groups</>}
          {sort === "monthly" && <>monthly groups</>}
        </span>
      </p>
      <div className="d-flex align-items-center gap-3 me-3">
        <p className="text-sm text-gray-400 mb-0 text-nowrap ">Sort by:</p>
        <select
          className="text-lg bg-transparent text-black-000 border rounded border-black-000"
          id="sort-dropdown"
          onChange={(e) => setSort(e.target.value)}
          defaultValue={sort}
        >
          <option value="all">All</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        {/* <span className="sort-menu btn-transition">
          <Icon icon="iconoir:menu" width="1.2rem" height="1.2rem" />
        </span> */}
      </div>
    </div>
  );
};
