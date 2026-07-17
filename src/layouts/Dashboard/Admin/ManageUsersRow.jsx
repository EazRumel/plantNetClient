import React from 'react';

const ManageUsersRow = ({user}) => {
  return (
     <tr>
      <td>
       {user.email}
      </td>
      <td>{user.role}</td>

      <td>{user.status}</td>
     

      <td>
        <button className="btn bg-green-200 opacity-70 btn-ghost rounded-full">
          Update Role
        </button>
      </td>
    </tr>
  );
};

export default ManageUsersRow;