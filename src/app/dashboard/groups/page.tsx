"use client";

import { LayoutContext } from "@/context/layoutContext";
import { ModalTypes } from "@/services/_schema";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePaginatedQuery, useQuery } from "convex/react";
import React, { useContext } from "react";
import { api } from "../../../../convex/_generated/api";
import Loader from "@/components/shared/Loader";
import EmptyData from "@/components/shared/EmptyData";
import { useRouter } from "next/navigation";
import { thousandFormatter } from "@/components/utilities";
import ShareGroupModal from "@/components/modals/shareGroupModal";

export default function GroupPage() {
  const {
    setShowModal,
  }: {
    setShowModal: (value: ModalTypes) => void;
  } = useContext(LayoutContext);

  // const groupList = useQuery(api.group.getAllGroups);
  const user = useQuery(api.user.getUser);
  const router = useRouter();

  const { results, status, loadMore } = usePaginatedQuery(
    api.user.getMyGroups,
    { userId: user!?._id },
    { initialNumItems: 5 }
  );
  // if (status === "LoadingFirstPage") {
  //   return <Loader height="30vh" />;
  // }
  // console.log(status);
  return (
    <>
      <button
        className="btn btn-md btn-primary ms-auto mb-4 gap-3"
        onClick={() => setShowModal("createGroup")}
      >
        <Icon
          icon="humbleicons:plus"
          width="2rem"
          height="2rem"
          style={{ color: "white" }}
        />
        Create New Group
      </button>
      <div className="table-responsive bg-white-000 p-4 mt-5">
        {status === "LoadingFirstPage" ? (
          <>
            <table className="table w-100">
              <thead>
                <tr>
                  <th className="py-4_5 bg-primary-500 text-white-000 text-lg ps-4">
                    Groups
                  </th>
                  <th className="py-4_5 bg-primary-500 text-white-000 text-lg ps-4">
                    Desc
                  </th>
                  <th className="py-4_5 bg-primary-500 text-white-000 text-lg ps-4">
                    Amounts
                  </th>
                  <th className="py-4_5 bg-primary-500 text-white-000 text-lg ps-4">
                    Member
                  </th>
                  <th className="py-4_5 bg-primary-500 text-white-000 text-lg ps-4">
                    My Number
                  </th>
                  <th className="py-4_5 bg-primary-500 text-white-000 text-lg ps-4"></th>
                </tr>
              </thead>
            </table>
            <Loader height="30vh" />
          </>
        ) : results?.length === 0 ? (
          <>
            <table className="table w-100">
              <thead>
                <tr>
                  <th className="py-4_5 bg-primary-500 text-white-000 text-lg ps-4">
                    Groups
                  </th>
                  <th className="py-4_5 bg-primary-500 text-white-000 text-lg ps-4">
                    Desc
                  </th>
                  <th className="py-4_5 bg-primary-500 text-white-000 text-lg ps-4">
                    Amounts
                  </th>
                  <th className="py-4_5 bg-primary-500 text-white-000 text-lg ps-4">
                    Member
                  </th>
                  <th className="py-4_5 bg-primary-500 text-white-000 text-lg ps-4">
                    My Number
                  </th>
                  <th className="py-4_5 bg-primary-500 text-white-000 text-lg ps-4"></th>
                </tr>
              </thead>
            </table>
            <EmptyData height="30vh" text="You aren't part of any group." />
          </>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th className="py-4_5 bg-primary-500 text-white-000 text-lg ps-4">
                  Groups
                </th>
                <th className="py-4_5 bg-primary-500 text-white-000 text-lg ps-4">
                  Desc
                </th>
                <th className="py-4_5 bg-primary-500 text-white-000 text-lg ps-4">
                  Amounts
                </th>
                <th className="py-4_5 bg-primary-500 text-white-000 text-lg ps-4">
                  Member
                </th>
                <th className="py-4_5 bg-primary-500 text-white-000 text-lg ps-4">
                  My Number
                </th>
                <th className="py-4_5 bg-primary-500 text-white-000 text-lg ps-4"></th>
              </tr>
            </thead>

            <tbody>
              {results?.map((group, index) => (
                <tr key={index}>
                  <td className="py-4_5 ps-4">{group.name}</td>
                  <td className="py-4_5 ps-4 desc">{group.description}</td>
                  <td className="py-4_5 ps-4">
                    &#8358; {thousandFormatter(group.paymentPerInterval / 100)}
                  </td>
                  <td className="py-4_5 ps-4">{group.numOfMembers}</td>
                  <td className="py-4_5 ps-4">{group.collectionNumber}</td>
                  <td className="py-4_5 ps-4">
                    <div className="dropdown">
                      <div>
                        <div className="d-flex align-items-center ">
                          <Icon
                            icon="iconamoon:menu-kebab-vertical"
                            width="2rem"
                            role="button"
                            data-toggle="dropdown"
                          />
                        </div>
                        <div className="dropdown-content right">
                          <p
                            className="hover-link"
                            role="button"
                            onClick={() =>
                              router.push(`/dashboard/groups/${group.groupId}`)
                            }
                          >
                            View Group
                          </p>
                          {/* <p
                            className="hover-link"
                            role="button"
                            onClick={() =>
                              router.push(`/${group.groupId}#messages`)
                            }
                          >
                            Messages
                          </p> */}
                          <p
                            className="hover-link"
                            role="button"
                            onClick={() => setShowModal("shareGroup")}
                          >
                            Share Group
                          </p>
                          {/* <p className="hover-link" role="button">
                            Edit Group Name
                          </p> */}
                        </div>
                        <ShareGroupModal inviteLink={group.groupId} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
