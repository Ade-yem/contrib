import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

export default function GroupPage() {
  return (
    <div className="bg-white-000 p-4 mt-5 ">
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
          <tr>
            <td className="py-4_5 ps-4">Group...</td>
            <td className="py-4_5 ps-4 desc">
              Description... Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Temporibus accusantium sit voluptas perspiciatis tempora
              quas nulla culpa eveniet at nis
            </td>
            <td className="py-4_5 ps-4">$100</td>
            <td className="py-4_5 ps-4">5</td>
            <td className="py-4_5 ps-4">12345</td>
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
          <tr>
            <td className="py-4_5 ps-4">Group...</td>
            <td className="py-4_5 ps-4 desc">
              Description... Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Temporibus accusantium sit voluptas perspiciatis tempora
              quas nulla culpa eveniet at nis
            </td>
            <td className="py-4_5 ps-4">$100</td>
            <td className="py-4_5 ps-4">5</td>
            <td className="py-4_5 ps-4">12345</td>
            <td className="py-4_5 ps-4">
              <Icon
                icon="iconamoon:menu-kebab-vertical"
                width="2rem"
                role="button"
                data-toggle="dropdown"
              />
            </td>
          </tr>
          <tr>
            <td className="py-4_5 ps-4">Group...</td>
            <td className="py-4_5 ps-4 desc">
              Description... Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Temporibus accusantium sit voluptas perspiciatis tempora
              quas nulla culpa eveniet at nis
            </td>
            <td className="py-4_5 ps-4">$100</td>
            <td className="py-4_5 ps-4">5</td>
            <td className="py-4_5 ps-4">12345</td>
            <td className="py-4_5 ps-4">
              <Icon
                icon="iconamoon:menu-kebab-vertical"
                width="2rem"
                role="button"
                data-toggle="dropdown"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
