
import image from "../../../assets/img/parallax.jpg";
import { BookmarkX } from "lucide-react";
import userAxiosSecure from "../../../hooks/userAxiosSecure";
import Swal from "sweetalert2";
import { Notyf } from "notyf";


const CustomerOrderRow = ({orderData,refetch}) => {

  const {price,category,name,image,quantity,_id,status,plantId} = orderData;
  const axiosSecure = userAxiosSecure();

  const notyf = new Notyf({
          duration: 2000,
          position: {
            x: 'center',
            y: 'top',
          },
          types: [
            {
              type: 'success',
              background: 'green',
              icon: {
                className: 'material-icons',
                tagName: 'i',
                text: 'success'
              }
            },
            {
              type: 'success',
              background: 'green',
              duration: 2000,
              dismissible: true
            }
          ]
        });


  const handleDelete = async()=>{
      //  console.log(plantId)
      try{


       const result = await Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#008000",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!"
       })
        if (result.isConfirmed) {
           const response = await axiosSecure.delete(`/order/${_id}`)

           const res = await axiosSecure.patch(`/plants/quantity/${plantId}`,{
            updateQuantity:quantity,
            status:"increase"
           }
         
           )
             console.log(res)
            console.log(response.data)
             if (response.data.deletedCount > 0 && res.data.modifiedCount > 0) {
    notyf.success(`${name} has been removed from your order`);
    refetch();
    }
   }



      }
      catch(error){
        console.log(error)
        notyf.error(error.response.data)
        console.log(error.message)
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