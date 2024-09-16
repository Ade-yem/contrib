"use client";

import Loader from "@/components/shared/Loader";
import { thousandFormatter } from "@/components/utilities";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePaginatedQuery, useQuery } from "convex/react";
import Image from "next/image";
import React from "react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { GroupChat } from "@/components/shared/groupChat";
import GoBack from "@/components/shared/GoBack";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

export default function GroupDetails({
  params,
}: {
  params: { details: string };
}) {
  const user = useQuery(api.user.getUser);
  const groupId = params.details;
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
      <GoBack />
      <br />
      <h1 className="text-lg text-primary-500 fw-bold">
        <span className="text-black-000">GROUP NAME:</span>{" "}
        {GroupDetails?.nameOfGroup}
      </h1>
      <br />
      <Tabs
        className="d-lg-none mb-2"
        id="myTabContent"
        defaultActiveKey="overview"
      >
        <Tab
          title="Overview"
          eventKey={"overview"}
          id="overview"
          aria-labelledby="overview-tab"
          className="d-lg-none"
        >
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-9 h-auto bg-white-000 rounded-10 p-4_5 d-flex justify-content-between">
                  <div>
                    <p className="text-gray-400 text-sm">Available Savings</p>
                    <p className="text-sm mb-4">
                      &#8358;{" "}
                      {visible
                        ? thousandFormatter(GroupDetails?.available ?? 0)
                        : "*****"}
                    </p>
                    <p className="text-sm text-primary-500 fw-bold mb-0">
                      Next Collector:{" "}
                      <span className="text-black-000">
                        {GroupDetails?.nextReceiver}
                      </span>
                    </p>
                  </div>
                  <div
                    className="my-auto click"
                    onClick={() => setVisible((prev) => !prev)}
                  >
                    {!visible ? (
                      <Icon
                        icon="weui:eyes-on-outlined"
                        width="2.5rem"
                        height="2.5rem"
                        role="button"
                      />
                    ) : (
                      <Icon
                        icon="iconamoon:eye-off-thin"
                        width="2.5rem"
                        height="2.5rem"
                        role="button"
                      />
                    )}
                  </div>
                </div>
                <div className="col-3 h-auto d-flex gap-2 flex-column justify-content-between">
                  <div className="bg-purple rounded-10 h-100 p-2 d-flex align-items-center gap-3">
                    <p className="text-white-000 text-2xs mb-0 pl-3">
                      <span className="d-sm-block d-none">Collection</span>
                      Cycle:
                    </p>
                    <p className="text-white-000 text-2xs mb-0">
                      {GroupCollectionPercentage}%
                    </p>
                  </div>
                  <div className="bg-white-000 rounded-10 h-100 p-2 d-flex flex-column justify-content-between">
                    <p className="text-red text-center text-2xs mb-2 fw-bold">
                      Defaulters{" "}
                      <span className="d-sm-block d-none">of the Day</span>
                    </p>
                    {GetDefaultersDetails?.map((defaulter, index) => (
                      <p className="text-3xs mb-0" key={index}>
                        {defaulter.amount}
                        {defaulter.status}
                        {/* {defaulter.userId} */}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="bg-white-000 rounded-10 col-5 p-4">
                  <p className="text-lg fw-bold text-center mb-4">
                    Group Members
                  </p>
                  <div className="webkit-scrollbar-none overflow-auto details-container">
                    {GroupMembershipsDetails?.map((members, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center gap-3 mb-3 "
                      >
                        <Image
                          src={members.image ?? "/avatar.svg"}
                          width={40}
                          height={40}
                          alt="profile-pics"
                          className="rounded-circle"
                        />
                        <p className="text-xs fw-bold mb-0"> {members.name}</p>
                        {members.creator && (
                          <Icon
                            icon="openmoji:crown"
                            width="2rem"
                            height="2rem"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-7 ">
                  <div className="bg-white-000 rounded-10 p-4">
                    <p className="text-lg fw-bold text-center mb-4">
                      Recent Activities
                    </p>
                    <div className="webkit-scrollbar-none overflow-auto details-container">
                      {GetRecentActivity?.map((activity, index) => (
                        <div
                          className="d-flex justify-content-between gap-3 mb-3 "
                          key={index}
                        >
                          <div className="d-flex justify-content-between gap-2 ">
                            <p className="text-xs text-primary-500 fw-bold mb-0">
                              {activity.name}
                            </p>
                            <p className="text-xs text-primary-500 fw-bold mb-0">
                              {activity.details}
                            </p>
                          </div>
                          <p className="text-xs fw-bold mb-0 text-green">
                            + &#8358;{thousandFormatter(activity.amount ?? 0)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tab>

        <Tab
          title="Group Chat"
          eventKey={"chat"}
          id="chat"
          aria-labelledby="chat-tab"
          className="d-lg-none"
        >
          <div className="bg-white-000 rounded-10 p-4 ">
            <p className="text-xl fw-bold text-primary-500 mb-">Group Chats</p>
            <GroupChat groupId={groupId as Id<"groups">} userId={user!?._id} />
          </div>
        </Tab>
      </Tabs>

      <div className="row d-none d-lg-flex">
        <div className="col-lg-7 col-12">
          <div className="row">
            <div className="col-9 h-auto bg-white-000 rounded-10 p-4_5 d-flex justify-content-between">
              <div>
                <p className="text-gray-400 text-sm">Available Savings</p>
                <p className="text-sm mb-4">
                  &#8358;{" "}
                  {visible
                    ? thousandFormatter(GroupDetails?.available ?? 0)
                    : "*****"}
                </p>
                <p className="text-sm text-primary-500 fw-bold mb-0">
                  Next Collector:{" "}
                  <span className="text-black-000">
                    {GroupDetails?.nextReceiver}
                  </span>
                </p>
              </div>
              <div
                className="my-auto click"
                onClick={() => setVisible((prev) => !prev)}
              >
                {!visible ? (
                  <Icon
                    icon="weui:eyes-on-outlined"
                    width="2.5rem"
                    height="2.5rem"
                    role="button"
                  />
                ) : (
                  <Icon
                    icon="iconamoon:eye-off-thin"
                    width="2.5rem"
                    height="2.5rem"
                    role="button"
                  />
                )}
              </div>
            </div>
            <div className="col-3 h-auto d-flex gap-2 flex-column justify-content-between">
              <div className="bg-purple rounded-10 h-100 p-2 d-flex align-items-center gap-3">
                <p className="text-white-000 text-2xs pl-3 mb-0">
                  Collection Cycle:
                </p>
                <p className="text-white-000 text-2xs mb-0">
                  {GroupCollectionPercentage}%
                </p>
              </div>
              <div className="bg-white-000 rounded-10 h-100 p-2 d-flex flex-column justify-content-between">
                <p className="text-red text-center text-2xs mb-2 fw-bold">
                  Defaulters of the Day
                </p>
                {GetDefaultersDetails?.map((defaulter, index) => (
                  <p className="text-3xs mb-0" key={index}>
                    {defaulter.amount}
                    {defaulter.status}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="bg-white-000 rounded-10 col-5 p-4">
              <p className="text-lg fw-bold text-center mb-4">Group Members</p>
              <div className="webkit-scrollbar-none overflow-auto details-container">
                {GroupMembershipsDetails?.map((members, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center gap-3 mb-3 "
                  >
                    <Image
                      src={members.image ?? "/avatar.svg"}
                      width={40}
                      height={40}
                      alt="profile-pics"
                      className="rounded-circle"
                    />
                    <p className="text-xs fw-bold mb-0"> {members.name}</p>
                    {members.creator && (
                      <Icon icon="openmoji:crown" width="2rem" height="2rem" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="col-7 ">
              <div className="bg-white-000 rounded-10 p-4">
                <p className="text-lg fw-bold text-center mb-4">
                  Recent Activities
                </p>
                <div className="webkit-scrollbar-none overflow-auto details-container">
                  {GetRecentActivity?.map((activity, index) => (
                    <div
                      className="d-flex justify-content-between gap-3 mb-3 "
                      key={index}
                    >
                      <div className="d-flex justify-content-between gap-2 ">
                        <p className="text-xs text-primary-500 fw-bold mb-0">
                          {activity.name}
                        </p>
                        <p className="text-xs text-primary-500 fw-bold mb-0">
                          {activity.details}
                        </p>
                      </div>
                      <p className="text-xs fw-bold mb-0 text-green">
                        + &#8358;{thousandFormatter(activity.amount ?? 0)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-12" id="messages">
          <div className="bg-white-000 rounded-10 p-4 ">
            <p className="text-xl fw-bold text-primary-500 mb-">Group Chats</p>
            <GroupChat groupId={groupId as Id<"groups">} userId={user!?._id} />
          </div>
        </div>
      </div>
    </div>
  );
}
