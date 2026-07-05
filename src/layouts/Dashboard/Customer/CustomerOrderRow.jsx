import React from "react";
import image from "../../../assets/img/parallax.jpg";
import { BookmarkX } from "lucide-react";

const CustomerOrderRow = ({orderData}) => {
  const {price} = orderData;
  return (
    <tr>
      <td>
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="mask mask-squircle h-16 w-16">
              <img src={image} />
            </div>
          </div>
        </div>
      </td>

      <td>
        <div className="font-bold">{orderData.name}</div>
      </td>

      <td>{orderData.category}</td>

      <td>{price}</td>
      <td>43</td>
      <td>Pending</td>

      <td>
        <button className="btn bg-red-400 btn-ghost">
          <BookmarkX />
        </button>
      </td>
    </tr>
  );
};

export default CustomerOrderRow;