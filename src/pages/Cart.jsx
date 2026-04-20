
import { BookmarkX } from 'lucide-react';
import useCart from '../hooks/useCart';
import Swal from 'sweetalert2';

import userAxiosSecure from '../hooks/userAxiosSecure';
import { Notyf } from 'notyf';

const Cart = () => {
  const [cart,refetch] = useCart();
  console.log(cart);
  const axiosSecure = userAxiosSecure();
  const totalPrice = cart.reduce((sum,item)=>sum+item.price,0);


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

  //handel delete cart using a specific id

  const handleDelete = (id) =>{
    const deletedItem = cart.find(item => item._id === id)
      Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#008000",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {

  
  if (result.isConfirmed) {
    axiosSecure.delete(`/carts/${id}`)
    .then(response=>{
      // console.log(response.data)
       if(response.data.deletedCount > 0){

       notyf.success(`${deletedItem.name} has been removed from cart`)
       console.log(response)
      refetch();

      
    }
    })
  }
});
  }
  return (
    <div className="mx-auto my-10">
<div className="flex justify-evenly my-5">
  <h2 className="font-bold text-2xl text-green-400">Cart Item :{cart.length}</h2>
<p className="font-bold text-2xl text-green-400">Total Price: {totalPrice}</p>
</div>

  <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Serial</th>
        <th>Plant Preview</th>
        <th>Name</th>
        <th>Category</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        cart.map((carts,index) => <tr>

        <td>{index+1}</td>
                      
        <td>
          <div className="flex items-center gap-10">
            <div className="avatar ">
              <div className="mask mask-squircle h-16 w-16">
                <img
                  src={carts.image} />
              </div>
            </div>
            <div>
            
            </div>
          </div>
        </td>
         <td> 
         <div className="font-bold">{carts.name}</div>
         </td>
        <td>
         {carts.category}
          <br />
         
        </td>
        <td>{carts.price}</td>
       
          <td>
          <button onClick={()=>handleDelete(carts._id)} className="btn bg-red-400 btn-ghost"><BookmarkX /></button></td>
        
      </tr>)
      }
     
    </tbody>
    
  </table>
</div>
    </div>
  );
};

export default Cart;