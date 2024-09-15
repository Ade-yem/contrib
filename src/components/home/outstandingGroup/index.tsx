"use client";
import EmptyData from "@/components/shared/EmptyData";
import { GroupCard } from "@/components/shared/groupCard";
import Loader from "@/components/shared/Loader";
import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../convex/_generated/api";

export const OustandingGroup = () => {
  const groupList = useQuery(api.group.getAllGroups);

  return (
    <div className="container text-center py-6">
      <h2 className="sub-title  mb-6 fw-bold">
        Our <span className="text-primary-500">Outstanding</span> August Groups
      </h2>
      <div className="row px-6">
        {!groupList ? (
          <Loader description="Fetching" height="50vh" />
        ) : groupList?.length === 0 ? (
          <EmptyData height="40vh" text="No groups yet." />
        ) : (
          <>
            {groupList
              ?.slice(0, 4)
              .map((item, index) => (
                <GroupCard
                  key={index}
                  color={index}
                  img={item.image || "/groupAvatar.png"}
                  savings_per_interval={item.savings_per_interval}
                  title={item.name}
                  desc={item.description}
                  privateGroup={item.private}
                  groupId={item._id}
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
};
