"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";

export default function Page() {
  const groupList = useQuery(api.group.getAllGroups);

  return (
    <div>
      <div className="row">
        <div className="col-lg-7 col-md-6 col-12">
          <div className="row">
            <div className="col-9">
              <div className="bg-white-000 rounded-10 p-4 d-flex justify-content-between">
                <div>
                  <p className="text-pink text-sm">Personal savings</p>
                  <p className="text-sm mb-0">2000000</p>
                </div>
                <div className="mt-auto">
                  <Icon
                    icon="weui:eyes-on-outlined"
                    width="2.5rem"
                    height="2.5rem"
                  />
                </div>
              </div>
            </div>
            <div className="col-3 d-flex flex-column justify-content-between">
              <button className="btn btn-sm rounded-01 btn-green">
                Add Money
              </button>
              <button className="btn btn-sm rounded-01 btn-primary">
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
              <button className="btn btn-sm rounded-01 btn-primary">
                Change Details
              </button>
            </div>
            <div className="ms-auto bg-purple rounded-10 p-4 col-6 d-flex flex-column justify-content-between">
              <p className="text-white-000 text-xs fw-bold">WEMA Bank</p>
              <p className="text-white-000 text-xs">5199 **** **** 22211</p>
              <p className="text-white-000 text-xs">Adejumo Adeyemi</p>
            </div>
          </div>
          <p className="text-xl fw-bold">Transactions</p>
          <table className="table">
            <thead>
              <tr>
                <th className="py-3 bg-primary-500 text-white-000 text-sm ps-4">
                  Groups
                </th>
                <th className="py-3 bg-primary-500 text-white-000 text-sm ps-4">
                  Desc
                </th>
                <th className="py-3 bg-primary-500 text-white-000 text-sm ps-4">
                  Amounts
                </th>
                <th className="py-3 bg-primary-500 text-white-000 text-sm ps-4">
                  Member
                </th>
                <th className="py-3 bg-primary-500 text-white-000 text-sm ps-4">
                  My Number
                </th>
                <th className="py-3 bg-primary-500 text-white-000 text-sm ps-4">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {groupList?.slice(0, 6).map((group, index) => (
                <tr key={index}>
                  <td className="py-3 text-nowrap ps-4">{group.name}</td>
                  <td className="py-3  ps-4 desc">{group.description}</td>
                  <td className="py-3 text-nowrap ps-4">
                    {group.savings_per_interval}
                  </td>
                  <td className="py-3 text-nowrap ps-4">
                    {group.number_of_people}
                  </td>
                  <td className="py-3 text-nowrap ps-4">
                    {group.number_of_people_present}
                  </td>
                  <td className="py-3 text-nowrap px-4">
                    {group.number_of_people_present}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-lg-5 col-md-6 col-12">
          <div className="bg-white-000 rounded-10 p-4 ">
            <p className="text-xl fw-bold text-center">My Savings Plans</p>
            <div className="row">
              <div className="col-6 my-2">
                <div className="bg-purple rounded-10 p-4 d-flex flex-column justify-content-between">
                  <p className="text-white-000 text-xs fw-bold">WEMA Bank</p>
                  <p className="text-white-000 text-xs">5199 **** **** 22211</p>
                  <p className="text-white-000 text-xs">Adejumo Adeyemi</p>
                </div>
              </div>
              <div className="col-6 my-2">
                <div className="bg-purple rounded-10 p-4 d-flex flex-column justify-content-between">
                  <p className="text-white-000 text-xs fw-bold">WEMA Bank</p>
                  <p className="text-white-000 text-xs">5199 **** **** 22211</p>
                  <p className="text-white-000 text-xs">Adejumo Adeyemi</p>
                </div>
              </div>
              <div className="col-6 my-2">
                <div className="bg-purple rounded-10 p-4 d-flex flex-column justify-content-between">
                  <p className="text-white-000 text-xs fw-bold">WEMA Bank</p>
                  <p className="text-white-000 text-xs">5199 **** **** 22211</p>
                  <p className="text-white-000 text-xs">Adejumo Adeyemi</p>
                </div>
              </div>
              <div className="col-6 my-2">
                <div className="bg-purple rounded-10 p-4 d-flex flex-column justify-content-between">
                  <p className="text-white-000 text-xs fw-bold">WEMA Bank</p>
                  <p className="text-white-000 text-xs">5199 **** **** 22211</p>
                  <p className="text-white-000 text-xs">Adejumo Adeyemi</p>
                </div>
              </div>
              <div className="col-6 my-2">
                <div className="bg-purple rounded-10 p-4 d-flex flex-column justify-content-between">
                  <p className="text-white-000 text-xs fw-bold">WEMA Bank</p>
                  <p className="text-white-000 text-xs">5199 **** **** 22211</p>
                  <p className="text-white-000 text-xs">Adejumo Adeyemi</p>
                </div>
              </div>
              <div className="col-6 my-2">
                <div className="bg-purple rounded-10 p-4 d-flex flex-column justify-content-between">
                  <p className="text-white-000 text-xs fw-bold">WEMA Bank</p>
                  <p className="text-white-000 text-xs">5199 **** **** 22211</p>
                  <p className="text-white-000 text-xs">Adejumo Adeyemi</p>
                </div>
              </div>
              <div className="col-6 my-2">
                <div className="bg-purple rounded-10 p-4 d-flex flex-column justify-content-between">
                  <p className="text-white-000 text-xs fw-bold">WEMA Bank</p>
                  <p className="text-white-000 text-xs">5199 **** **** 22211</p>
                  <p className="text-white-000 text-xs">Adejumo Adeyemi</p>
                </div>
              </div>
              <div className="col-6 my-2">
                <div className="bg-purple rounded-10 p-4 d-flex flex-column justify-content-between">
                  <p className="text-white-000 text-xs fw-bold">WEMA Bank</p>
                  <p className="text-white-000 text-xs">5199 **** **** 22211</p>
                  <p className="text-white-000 text-xs">Adejumo Adeyemi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
