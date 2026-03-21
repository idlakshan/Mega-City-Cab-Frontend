import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const UserTable = ({ users, handleDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const userList = Array.isArray(users) ? users : users?.data || [];
  console.log(userList);

  const filteredUsers = userList.filter((user) => {
    const term = searchTerm.toLowerCase();

    return (
      user?.name?.toLowerCase().includes(term) ||
      user?.nic?.toLowerCase().includes(term) ||
      user?.email?.toLowerCase().includes(term) ||
      user?.phone?.toLowerCase().includes(term) ||
      user?.roles?.some((role) => role.toLowerCase().includes(term))
    );
  });

  return (
    <section>
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-semibold text-primary-black">Users</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 pl-10 w-60 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow"
          />
          <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="p-3">
        <div className="overflow-x-auto">
          <div className="max-h-96 overflow-y-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50 sticky top-0">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">NIC</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Email</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Phone</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Role</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Delete</div>
                  </th>
                </tr>
              </thead>

              <tbody className="text-sm divide-y divide-gray-100">
                {filteredUsers.map((user) => {
                  const roleName = user?.roles?.[0] || "UNKNOWN";

                  return (
                    <tr key={user.id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="font-medium text-primary-black">
                          {user?.name}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left text-primary-black">
                          {user?.nic}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left text-primary-black">
                          {user?.email}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left text-primary-black">
                          {user?.phone}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">
                          <span
                            className={`px-2 py-1 rounded-full text-sm ${
                              roleName === "CUSTOMER"
                                ? "bg-green-100 text-green-800"
                                : roleName === "ADMIN"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {roleName}
                          </span>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">
                          {roleName !== "ADMIN" && (
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};


export default UserTable;
