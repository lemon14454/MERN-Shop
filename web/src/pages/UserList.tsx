import {
  PencilAltIcon,
  TrashIcon,
  CheckIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  clearSuccess,
  deleteUser,
  fetchUsers,
  selectUser,
} from "../redux/user";

const UserList = ({ history }: RouteComponentProps) => {
  const dispatch = useAppDispatch();
  const {
    deleteUser: { success: deleteSuccess },
    updateUser: { success: updateSuccess },
    login: { userInfo },
    users,
  } = useAppSelector(selectUser);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/");
    }

    if (deleteSuccess || updateSuccess) {
      dispatch(clearSuccess());
    }
    dispatch(fetchUsers(userInfo?.token!));
  }, [dispatch, userInfo, deleteSuccess, updateSuccess]);

  return (
    <table className="w-full bg-white relative">
      <thead className="font-bold text-lg border-b-2 border-gray-300">
        <tr>
          <th>ID</th>
          <th>使用者名稱</th>
          <th>Email</th>
          <th>管理者權限</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="text-center">
        {users.map((user) => (
          <tr
            key={user._id}
            className="text-xs border-b-[1px] border-gray-200 hover:bg-gray-100"
          >
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              {user.isAdmin ? (
                <CheckIcon className="text-main h-5 w-5 mx-auto" />
              ) : (
                <XIcon className="text-red-500 h-5 w-5 mx-auto" />
              )}
            </td>
            <td className="flex flex-col md:flex-row justify-evenly gap-y-2">
              <Link
                to={`/admin/user/${user._id}/edit`}
                className="bg-main px-4 py-2 rounded-sm shadow-sm"
              >
                <PencilAltIcon className="h-4 w-4 text-white" />
              </Link>
              <button
                onClick={() =>
                  dispatch(
                    deleteUser({ id: user._id, token: userInfo?.token! })
                  )
                }
                className="bg-red-500 px-4 py-2 rounded-sm shadow-sm"
              >
                <TrashIcon className="h-4 w-4 text-white" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
