/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import EmptyData from "@/components/shared/EmptyData";
import Loader from "@/components/shared/Loader";
import { thousandFormatter } from "@/components/utilities";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePaginatedQuery, useQuery } from "convex/react";
import Image from "next/image";
import React from "react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { GroupChat } from "@/components/shared/groupChat";

export default function GroupDetails({
  params,
}: {
  params: { details: string };
}) {
  const groupId = params.details;
  console.log(params);
  console.log(groupId);

  if (!groupId) {
    return <div>Error: Group ID is missing.</div>;
  }
  console.log(params.details);
  const [visible, setVisible] = React.useState(false);
  const GroupDetails = useQuery(api.groupBoard.getAvailableMoneyAndReceiver, {
    groupId: groupId as Id<"groups">,
  });
  const GroupCollectionPercentage = useQuery(
    api.groupBoard.getCollectionPercentage,
    {
      groupId: groupId as Id<"groups">,
    }
  );

  const GroupMembershipsDetails = useQuery(api.groupBoard.getGroupMemberships, {
    groupId: groupId as Id<"groups">,
  });

  const GetDefaultersDetails = useQuery(api.intervalReport.getDefaulters, {
    groupId: groupId as Id<"groups">,
  });

  const {
    results: GetRecentActivity,
    status,
    loadMore,
  } = usePaginatedQuery(
    api.transactions.getGroupTransactions,
    { groupId: groupId as Id<"groups"> },
    { initialNumItems: 10 }
  );

  return (
    <div>
      <br />
      {GroupDetails?.nameOfGroup}
      <br />
      <div className="row">
        <div className="col-lg-7 col-md-6 col-12">
          <div className="row">
            <div className="col-9 h-auto bg-white-000 rounded-10 p-4_5 d-flex justify-content-between">
              <div>
                <p className="text-gray-400 text-sm">Available Savings</p>
                <p className="text-sm mb-4">
                  &#8358;
                  {visible
                    ? thousandFormatter(GroupDetails?.available ?? 0)
                    : "*****"}
                </p>
                <p className="text-sm text-primary-500 fw-bold mb-0">
                  Next Collector:
                  <span className="text-black-000">
                    {GroupDetails?.nextReceiver}
                  </span>
                </p>
              </div>
              <div
                className="my-auto click"
                onClick={() => setVisible((prev) => !prev)}
              >
                <Icon
                  icon="weui:eyes-on-outlined"
                  width="2.5rem"
                  height="2.5rem"
                  role="button"
                />
              </div>
            </div>
            <div className="col-3 h-auto d-flex flex-column justify-content-between">
              <div className="bg-purple rounded-10 h-auto p-2 d-flex align-items-center gap-3">
                <p className="text-red text-xs">Collection Cycle:</p>
                <span>{GroupCollectionPercentage}%</span>
              </div>
              <div className="bg-white-000 rounded-10 h-auto p-2">
                <p className="text-red text-2xs mb-2 fw-bold">
                  Defaulters of the Day
                </p>
                {GetDefaultersDetails?.map((defaulter, index) => (
                  <p className="text-3xs mb-0" key={index}>
                    {defaulter.amount}
                    {defaulter.status}
                    {defaulter.userId}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="bg-white-000 rounded-10 col-5 p-4">
              <p className="text-lg fw-bold text-center mb-4">Group Members</p>
              {GroupMembershipsDetails?.map((members, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center gap-3 mb-3"
                >
                  <Image
                    src={members.image ?? "/avatar.svg"}
                    width={40}
                    height={40}
                    alt="profile-pics"
                    className="rounded-circle"
                  />
                  <p className="text-xs fw-bold mb-0"> {members.name}</p>
                  <Icon icon="openmoji:crown" width="2rem" height="2rem" />
                </div>
              ))}
            </div>
            <div className="col-7 ">
              <div className="bg-white-000 rounded-10 p-4">
                <p className="text-lg fw-bold text-center mb-4">
                  Recent Activities
                </p>
                {GetRecentActivity?.map((activity, index) => (
                  <>
                    <div
                      className="d-flex justify-content-between gap-3 mb-3"
                      key={index}
                    >
                      <div>
                        <p className="text-xs text-primary-500 fw-bold mb-0">
                          {activity.details}
                        </p>
                        <p className="text-xs text-gray-400 mb-0">
                          {activity.reference}
                        </p>
                      </div>
                      <p className="text-xs fw-bold mb-0 text-green">
                        + &#8358;{thousandFormatter(activity.amount ?? 0)}
                      </p>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-md-6 col-12">
          <div className="bg-white-000 rounded-10 p-4 ">
            <p className="text-xl fw-bold text-primary-500 mb-">Group Chats</p>
            <GroupChat />
          </div>
        </div>
      </div>
    </div>
  );
}
