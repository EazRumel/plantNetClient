
import useCart from '../../hooks/useCart';

const Cart = () => {
  const [cart] = useCart();
  return (
    <div className="mx-auto gap-10 flex justify-evenly">
<h2>cart</h2>
  <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        cart.map(carts => <tr>
                      
        <td>
          <div className="flex items-center gap-10">
            <div className="avatar">
              <div className="mask mask-squircle h-16 w-16">
                <img
                  src={carts.image} />
              </div>
            </div>
            <div>
              <div className="font-bold">{carts.name}</div>
              
            </div>
          </div>
        </td>
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