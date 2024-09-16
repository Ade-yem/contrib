"use client";
import { GroupCard } from "@/components/shared/groupCard";
import { OurTeam } from "@/components/shared/ourTeam";
import { SubPageBanner } from "@/components/shared/subPageBanner";
import { usePaginatedQuery, useQuery } from "convex/react";
import React, { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { SortBy } from "@/components/shared/sortBy";
import EmptyData from "@/components/shared/EmptyData";
import Loader from "@/components/shared/Loader";

export default function GroupsPage() {
  const [sort, setSort] = useState("all");
  const {
    results: groupList,
    loadMore,
    status,
  } = usePaginatedQuery(api.group.getAllGroups, {}, { initialNumItems: 16 });
  console.log(groupList.filter((g) => g.private === true));
  return (
    <div className="text-center">
      <SubPageBanner
        title="Groups"
        subtitle="Find yourself a group here and enjoy financial growth."
      />
      {/* <div className="container mt-6">
        <h2 className="sub-title  fw-bold">
          Your Can <span className="text-primary-500">Find</span> Your
          <span className="text-primary-500"> Financial Besties</span> Here
        </h2>
      </div> */}

      <div className="container">
        <div className="row px-lg-6">
          <div className="my-5_6">
            <SortBy
              setSort={setSort}
              sort={sort}
              pagingInfo={{
                total: groupList?.length || 0,
                privateCount:
                  groupList?.filter((group) => group.private === true).length ||
                  0,
                nonPrivateCount:
                  groupList?.filter((group) => group.private === false)
                    .length || 0,
                hourlyCount:
                  groupList?.filter((group) => group.interval === "hourly")
                    .length || 0,
                dailyCount:
                  groupList?.filter((group) => group.interval === "daily")
                    .length || 0,
                weeklyCount:
                  groupList?.filter((group) => group.interval === "weekly")
                    .length || 0,
                monthlyCount:
                  groupList?.filter((group) => group.interval === "monthly")
                    .length || 0,
              }}
            />
          </div>
          {!groupList ? (
            <Loader description="Fetching" height="50vh" />
          ) : groupList?.length === 0 ? (
            <EmptyData height="50vh" text="No groups yet." />
          ) : (
            <>
              {sort === "private" ? (
                <>
                  {groupList
                    ?.filter((group) => group.private === true)
                    .map((item, index) => {
                      const colors = [0, 1, 2, 3];
                      const rowSize = 4;
                      const rowIndex = Math.floor(index / rowSize);
                      const shift = rowIndex % rowSize;
                      const color = colors[(index + shift) % colors.length];
                      return (
                        <GroupCard
                          key={index}
                          color={color}
                          img={item.image || "/groupAvatar.png"}
                          savings_per_interval={item.savings_per_interval}
                          title={item.name}
                          interval={item.interval}
                          desc={item.description}
                          privateGroup={item.private}
                          groupId={item._id}
                          expectedMembers={item.number_of_people}
                          membersPresent={item.number_of_people_present}
                        />
                      );
                    })}
                </>
              ) : sort === "public" ? (
                <>
                  {groupList
                    ?.filter((group) => group.private === false)
                    .map((item, index) => {
                      const colors = [0, 1, 2, 3];
                      const rowSize = 4;
                      const rowIndex = Math.floor(index / rowSize);
                      const shift = rowIndex % rowSize;
                      const color = colors[(index + shift) % colors.length];
                      return (
                        <GroupCard
                          key={index}
                          color={color}
                          img={item.image || "/groupAvatar.png"}
                          savings_per_interval={item.savings_per_interval}
                          title={item.name}
                          interval={item.interval}
                          desc={item.description}
                          privateGroup={item.private}
                          groupId={item._id}
                          expectedMembers={item.number_of_people}
                          membersPresent={item.number_of_people_present}
                        />
                      );
                    })}
                </>
              ) : sort === "hourly" ? (
                <>
                  {groupList
                    ?.filter((group) => group.interval === "hourly")
                    .map((item, index) => {
                      const colors = [0, 1, 2, 3];
                      const rowSize = 4;
                      const rowIndex = Math.floor(index / rowSize);
                      const shift = rowIndex % rowSize;
                      const color = colors[(index + shift) % colors.length];
                      return (
                        <GroupCard
                          key={index}
                          color={color}
                          img={item.image || "/groupAvatar.png"}
                          savings_per_interval={item.savings_per_interval}
                          title={item.name}
                          interval={item.interval}
                          desc={item.description}
                          privateGroup={item.private}
                          groupId={item._id}
                          expectedMembers={item.number_of_people}
                          membersPresent={item.number_of_people_present}
                        />
                      );
                    })}
                </>
              ) : sort === "daily" ? (
                <>
                  {groupList
                    ?.filter((group) => group.interval === "daily")
                    .map((item, index) => {
                      const colors = [0, 1, 2, 3];
                      const rowSize = 4;
                      const rowIndex = Math.floor(index / rowSize);
                      const shift = rowIndex % rowSize;
                      const color = colors[(index + shift) % colors.length];
                      return (
                        <GroupCard
                          key={index}
                          color={color}
                          img={item.image || "/groupAvatar.png"}
                          savings_per_interval={item.savings_per_interval}
                          title={item.name}
                          interval={item.interval}
                          desc={item.description}
                          privateGroup={item.private}
                          groupId={item._id}
                          expectedMembers={item.number_of_people}
                          membersPresent={item.number_of_people_present}
                        />
                      );
                    })}
                </>
              ) : sort === "weekly" ? (
                <>
                  {groupList
                    ?.filter((group) => group.interval === "weekly")
                    .map((item, index) => {
                      const colors = [0, 1, 2, 3];
                      const rowSize = 4;
                      const rowIndex = Math.floor(index / rowSize);
                      const shift = rowIndex % rowSize;
                      const color = colors[(index + shift) % colors.length];
                      return (
                        <GroupCard
                          key={index}
                          color={color}
                          img={item.image || "/groupAvatar.png"}
                          savings_per_interval={item.savings_per_interval}
                          title={item.name}
                          interval={item.interval}
                          desc={item.description}
                          privateGroup={item.private}
                          groupId={item._id}
                          expectedMembers={item.number_of_people}
                          membersPresent={item.number_of_people_present}
                        />
                      );
                    })}
                </>
              ) : sort === "monthly" ? (
                <>
                  {groupList
                    ?.filter((group) => group.interval === "monthly")
                    .map((item, index) => {
                      const colors = [0, 1, 2, 3];
                      const rowSize = 4;
                      const rowIndex = Math.floor(index / rowSize);
                      const shift = rowIndex % rowSize;
                      const color = colors[(index + shift) % colors.length];
                      return (
                        <GroupCard
                          key={index}
                          color={color}
                          img={item.image || "/groupAvatar.png"}
                          savings_per_interval={item.savings_per_interval}
                          title={item.name}
                          interval={item.interval}
                          desc={item.description}
                          privateGroup={item.private}
                          groupId={item._id}
                          expectedMembers={item.number_of_people}
                          membersPresent={item.number_of_people_present}
                        />
                      );
                    })}
                </>
              ) : (
                <>
                  {groupList?.map((item, index) => {
                    const colors = [0, 1, 2, 3];
                    const rowSize = 4;
                    const rowIndex = Math.floor(index / rowSize);
                    const shift = rowIndex % rowSize;
                    const color = colors[(index + shift) % colors.length];
                    return (
                      <GroupCard
                        key={index}
                        color={color}
                        img={item.image || "/groupAvatar.png"}
                        savings_per_interval={item.savings_per_interval}
                        title={item.name}
                        interval={item.interval}
                        desc={item.description}
                        privateGroup={item.private}
                        groupId={item._id}
                        expectedMembers={item.number_of_people}
                        membersPresent={item.number_of_people_present}
                      />
                    );
                  })}
                </>
              )}
            </>
          )}
          <button
            onClick={() => loadMore(5)}
            disabled={status !== "CanLoadMore"}
          >
            Load More
          </button>
        </div>
      </div>
      <div className="mt-5_6 py-2  text-white-000">
        <div className="bg-primary-500 py-6">
          <div className="container">
            <h2 className="sub-title mb-4 fw-bold">Join A Group</h2>
            <p className="text-xl">Save Collectively and Collaboratively!</p>
          </div>
        </div>
      </div>
      <OurTeam />
    </div>
  );
}
