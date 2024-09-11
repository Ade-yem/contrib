"use client";
import { LayoutContext } from "@/context/layoutContext";
import { ModalTypes } from "@/services/_schema";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePaginatedQuery, useQuery } from "convex/react";
import React, { useContext } from "react";
import { api } from "../../../../convex/_generated/api";
import { TableLoading } from "@/components/shared/Loader";

export default function GroupPage() {
  const {
    user,
    setShowModal,
  }: {
    user: any;
    setShowModal: (value: ModalTypes) => void;
  } = useContext(LayoutContext);

  const groupList = useQuery(api.group.getAllGroups);

  console.log(groupList);

  // const { results, status, loadMore } = usePaginatedQuery(
  //   api.user.getMyGroups,
  //   {},
  //   { initialNumItems: 5 }
  // );
  const { results, status, loadMore } = usePaginatedQuery(
    api.user.getMyGroups,
    { userId: user!?._id },
    { initialNumItems: 4 }
  );

  return (
    <>
      <button
        className="btn btn-md btn-primary ms-auto mb-4"
        onClick={() => setShowModal("createGroup")}
      >
        Create New Group
      </button>
      <div className="bg-white-000 p-4 mt-5">
        <div className="table-responsive">
          {!groupList ? (
            <TableLoading count={5} row={5} />
          ) : (
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
              <tbody>
                {groupList?.map((group, index) => (
                  <tr key={index}>
                    <td className="py-4_5 ps-4">{group.name}</td>
                    <td className="py-4_5 ps-4 desc">{group.description}</td>
                    <td className="py-4_5 ps-4">
                      {group.savings_per_interval}
                    </td>
                    <td className="py-4_5 ps-4">{group.number_of_people}</td>
                    <td className="py-4_5 ps-4">
                      {group.number_of_people_present}
                    </td>
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
                            <p className="hover-link" role="button">
                              View Group
                            </p>
                            <p className="hover-link" role="button">
                              Messages
                            </p>
                            <p className="hover-link" role="button">
                              Share Group
                            </p>
                            <p className="hover-link" role="button">
                              Edit Group Name
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
