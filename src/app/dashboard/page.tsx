"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { useAction, usePaginatedQuery, useQuery } from "convex/react";
import { LayoutContext } from "@/context/layoutContext";
import { ModalTypes } from "@/services/_schema";
import EmptyData from "@/components/shared/EmptyData";
import Loader from "@/components/shared/Loader";
import { thousandFormatter } from "@/components/utilities";

export default function Page() {
  const user = useQuery(api.user.getUser);
  const { setShowModal }: { setShowModal: (value: ModalTypes) => void } =
    React.useContext(LayoutContext);
  const savings = useQuery(api.user.getMySavings);
  const { results, status, loadMore } = usePaginatedQuery(
    api.transactions.getMyTransactions,
    { userId: user!?._id },
    { initialNumItems: 8 }
  );
  const card = useQuery(api.user.getCard);
  const totalSavings = useQuery(api.user.getTotalSavings);
  const initializeTransaction = useAction(
    api.payments.initializePaystackTransaction
  );
  const [visible, setVisible] = React.useState(false);
  const addCard = async () => {
    const res = await initializeTransaction({
      amount: 100,
      email: user?.email as string,
      metadata: {
        userId: user?._id as Id<"users">,
        details: "add card",
      },
    });
    if (res) {
      window.open(res.data.authorization_url, "_blank");
    }
  };
  return (
    <div>
      <div className="row">
        <div className="col-lg-7 col-12">
          <div className="row">
            <div className="col-8">
              <div className="bg-white-000 rounded-10 p-4 d-flex justify-content-between">
                <div>
                  <p className="text-pink text-sm">Personal savings</p>
                  <p className="text-sm mb-0">
                    &#8358;{" "}
                    {visible
                      ? thousandFormatter((totalSavings ?? 0) / 100)
                      : "*****"}
                  </p>
                </div>
                <div
                  className="mt-auto click"
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
            </div>
            <div className="col-4 d-flex flex-column justify-content-between">
              <button
                className="btn btn-sm rounded-01 text-xs btn-green"
                onClick={() => setShowModal("createRecipient")}
              >
                Add Money
              </button>
              <button
                className="btn btn-sm rounded-01 text-xs btn-primary"
                onClick={() => setShowModal("withdrawFunds")}
              >
                Withdraw
              </button>
            </div>
          </div>
          <div className="bg-white-000 rounded-10 p-4 my-5 d-lg-none d-block">
            <p className="text-xl fw-bold">My Savings Plans</p>

            <div className="webkit-scrollbar-none overflow-auto savings-plan-mobile">
              {!savings ? (
                <Loader height="30vh" />
              ) : savings?.length === 0 ? (
                <EmptyData height="30vh" text="No savings plan." />
              ) : (
                <div className="row">
                  {savings?.map((saving, index) => {
                    const colors = [
                      "bg-pink",
                      "bg-primary-500",
                      "bg-purple",
                      "bg-orange",
                      "bg-green",
                    ];
                    const colorClass = colors[index % colors.length];
                    return (
                      <div className="col-6 my-2" key={index}>
                        <div
                          className={`rounded-10 p-4 d-flex flex-column justify-content-between ${colorClass}`}
                        >
                          <p className="text-white-000 text-xs fw-bold">
                            {saving.name}
                          </p>
                          <p className="text-white-000 text-xs">
                            &#8358; {thousandFormatter(saving.amount / 100)}
                          </p>
                          <p className="text-white-000 text-xs">
                            {saving.reason}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="d-flex justify-content-center align-items-center pt-4 bg-gray-30">
              <button
                className="btn btn-sm btn-primary text-center text-white-000"
                onClick={() => setShowModal("createPersonalSavings")}
              >
                <Icon
                  icon="humbleicons:plus"
                  width="2rem"
                  height="2rem"
                  style={{ color: "white" }}
                />
                Add new plan
              </button>
            </div>
          </div>
          <div className="bg-white-000 rounded-10 p-4 py-5 row my-5">
            <div className="col-lg-5 col-6 d-flex flex-column justify-content-between">
              {/* <p className="text-pink text-sm">Payment Account</p> */}
              <p className="text-xl fw-bold">Payment Account</p>

              <p className="text-xs text-gray-400">
                You can use your Bank Cards for <br /> Payment, No hidden
                charges !
              </p>
              <button
                className="btn btn-sm rounded-01 btn-purplee"
                onClick={addCard}
              >
                {card ? "Change card details" : "Add Card"}
              </button>
            </div>
            <div className="ms-auto bg-purple rounded-5 p-4 col-6 d-flex flex-column justify-content-between gap-4">
              <div className="d-flex justify-content-between">
                <p className="text-white-000 text-xs fw-bold">{card?.bank}</p>
                <p className="text-white-000 text-xs">
                  {card?.brand.toUpperCase()}
                </p>
              </div>
              <p className="text-white-000 text-xs">
                {card?.bin} **** **** {card?.last4}
              </p>
              <div className="d-flex justify-content-between">
                <p className="text-white-000 text-xs">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-white-000 text-xs">
                  {card?.exp_month}/{card?.exp_year}
                </p>
              </div>
            </div>
          </div>
          <p className="text-xl fw-bold">Transactions</p>
          {status === "LoadingFirstPage" ? (
            <Loader height="30vh" />
          ) : results?.length === 0 ? (
            <div className="rounded-4 bg-white">
              <EmptyData height="30vh" text="No transaction yet." />
            </div>
          ) : (
            <div>
              <div className="table-responsive bg-white">
                <table className="table w-100">
                  <thead>
                    <tr>
                      <th className="py-3 bg-primary-500 text-white-000 text-sm ps-4">
                        Name
                      </th>
                      <th className="py-3 bg-primary-500 text-white-000 text-sm ps-4">
                        Amount
                      </th>
                      <th className="py-3 bg-primary-500 text-white-000 text-sm ps-4">
                        Details
                      </th>
                      <th className="py-3 bg-primary-500 text-white-000 text-sm ps-4">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results?.map((transaction, index) => (
                      <tr key={index}>
                        <td className="py-3 text-nowrap ps-4">
                          {transaction.name}
                        </td>
                        <td className="py-3  ps-4 text-nowrap">
                          &#8358; {thousandFormatter(transaction.amount / 100)}
                        </td>
                        <td className="py-3 ps-4 desc">
                          {transaction.details}
                        </td>
                        <td className="py-3 text-nowrap ps-4">
                          {transaction.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                className="btn-primary w-100"
                onClick={() => loadMore(5)}
                disabled={status !== "CanLoadMore"}
              >
                Load More
              </button>
            </div>
          )}
        </div>
        <div className="col-lg-5 d-lg-block d-none col-12">
          <div className="bg-white-000 rounded-10 p-4 ">
            <p className="text-xl fw-bold text-cente mb-">My Savings Plans</p>

            <div className="webkit-scrollbar-none overflow-auto savings-plan">
              {!savings ? (
                <Loader height="30vh" />
              ) : savings?.length === 0 ? (
                <EmptyData height="30vh" text="No savings plan." />
              ) : (
                <div className="row">
                  {savings?.map((saving, index) => {
                    const colors = [
                      "bg-pink",
                      "bg-primary-500",
                      "bg-purple",
                      "bg-orange",
                      "bg-green",
                    ];
                    const colorClass = colors[index % colors.length];
                    return (
                      <div className="col-6 my-2" key={index}>
                        <div
                          className={`rounded-10 p-4 d-flex flex-column justify-content-between ${colorClass}`}
                        >
                          <p className="text-white-000 text-xs fw-bold">
                            {saving.name}
                          </p>
                          <p className="text-white-000 text-xs">
                            &#8358; {thousandFormatter(saving.amount / 100)}
                          </p>
                          {/* <p className="text-white-000 text-xs">
                            &#8358; {saving?.amountTarget / 100}
                          </p> */}
                          <p className="text-white-000 text-xs">
                            {saving.reason}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="d-flex justify-content-center align-items-center pt-4 bg-gray-30">
              <button
                className="btn btn-sm btn-primary text-center text-white-000"
                onClick={() => setShowModal("createPersonalSavings")}
              >
                <Icon
                  icon="humbleicons:plus"
                  width="2rem"
                  height="2rem"
                  style={{ color: "white" }}
                />
                Add new plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
