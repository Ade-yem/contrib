"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { useAction, usePaginatedQuery, useQuery } from "convex/react";
import { LayoutContext } from "@/context/layoutContext";
import { ModalTypes } from "@/services/_schema";

export default function Page() {
  const user = useQuery(api.user.getUser);
  const { setShowModal }: { setShowModal: (value: ModalTypes) => void } =
    React.useContext(LayoutContext);
  const savings = useQuery(api.user.getMySavings);
  const { results, status, loadMore } = usePaginatedQuery(
    api.transactions.getMyTransactions,
    { userId: user!?._id },
    { initialNumItems: 5 }
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
        <div className="col-lg-7 col-md-6 col-12">
          <div className="row">
            <div className="col-9">
              <div className="bg-white-000 rounded-10 p-4 d-flex justify-content-between">
                <div>
                  <p className="text-pink text-sm">Personal savings</p>
                  <p className="text-sm mb-0">
                    &#8358; {visible ? (totalSavings ?? 0) / 100 : "*****"}
                  </p>
                </div>
                <div
                  className="mt-auto click"
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
            </div>
            <div className="col-3 d-flex flex-column justify-content-between">
              <button
                className="btn btn-sm rounded-01 btn-green"
                onClick={() => setShowModal("createRecipient")}
              >
                Add Money
              </button>
              <button
                className="btn btn-sm rounded-01 btn-primary"
                onClick={() => setShowModal("withdrawFunds")}
              >
                Withdraw
              </button>
            </div>
          </div>
          <div className="bg-white-000 rounded-10 p-4 py-5 row my-5">
            <div className="col-lg-5 col-6 d-flex flex-column justify-content-between">
              <p className="text-pink text-sm">Payment Account</p>
              <p className="text-xs text-gray-400">
                You can use your Bank Cards for <br /> Payment, No hidden
                charges !
              </p>
              <button
                className="btn btn-sm rounded-01 btn-primary"
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
          <table className="table">
            <thead>
              <tr>
                <th className="py-3 bg-primary-500 text-white-000 text-sm ps-4">
                  Group Name
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
                <th className="py-3 bg-primary-500 text-white-000 text-sm ps-4">
                  Reference code
                </th>
              </tr>
            </thead>
            <tbody>
              {results?.map((transaction, index) => (
                <tr key={index}>
                  <td className="py-3 text-nowrap ps-4">{transaction.name}</td>
                  <td className="py-3  ps-4 desc">
                    &#8358; {transaction.amount}
                  </td>
                  <td className="py-3 text-nowrap ps-4">
                    {transaction.details}
                  </td>
                  <td className="py-3 text-nowrap ps-4">
                    {transaction.status}
                  </td>
                  <td className="py-3 text-nowrap ps-4">
                    {transaction.reference}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-lg-5 col-md-6 col-12">
          <div className="bg-white-000 rounded-10 p-4 ">
            <p className="text-xl fw-bold text-center">My Savings Plans</p>
            <button
              className="btn btn-sm rounded-01 btn-primary text-center"
              onClick={() => setShowModal("createPersonalSavings")}
            >
              Add new plan
            </button>
            <div className="row">
              {savings?.map((saving, index) => (
                <div className="col-6 my-2" key={index}>
                  <div className="bg-purple rounded-10 p-4 d-flex flex-column justify-content-between">
                    <p className="text-white-000 text-xs fw-bold">
                      {saving.name}
                    </p>
                    <p className="text-white-000 text-xs">
                      &#8358; {saving.amount / 100}
                    </p>
                    <p className="text-white-000 text-xs">{saving.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
