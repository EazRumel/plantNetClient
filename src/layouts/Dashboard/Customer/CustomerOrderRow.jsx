
import image from "../../../assets/img/parallax.jpg";
import { BookmarkX } from "lucide-react";
import userAxiosSecure from "../../../hooks/userAxiosSecure";


const CustomerOrderRow = ({orderData,refetch}) => {

  const {price,category,name,image,quantity,_id,status} = orderData;
  const axiosSecure = userAxiosSecure();


  const handleDelete = async()=>{
      //  console.log(plantId)
      try{
        await axiosSecure.delete(`/order/${_id}`)
        refetch();
      }
      catch(error){
        console.log(error)
      }
  }
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
        <div className="font-bold">{name}</div>
      </td>

      <td>{category}</td>

      <td>{price} BDT</td>
      <td>{quantity}</td>
      <td>{status}</td>

      <td>
        <button onClick={handleDelete} className="btn bg-red-400 btn-ghost">
          <BookmarkX />
        </button>
      </td>
    </tr>
  );
};

export default CustomerOrderRow;