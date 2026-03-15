
import useCart from '../../hooks/useCart';

const Cart = () => {
  const [cart] = useCart();
  const totalPrice = cart.reduce((sum,item)=>sum+item.price,0)
  return (
    <div className="mx-auto">
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
         <td> <div className="font-bold">{carts.name}</div></td>
        <td>
         {carts.category}
          <br />
         
        </td>
        <td>{carts.price}</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>)
      }
     
    </tbody>
    
  </table>
</div>
    </div>
  );
};

export default Cart;