import userAxiosSecure from "../../../hooks/userAxiosSecure";


const MyInventoryRow = ({plant}) => {
  const {image,name,category,quantity,_id} = plant;
  console.log(plant);
  const axiosSecure = userAxiosSecure();


   const handleDelete = async() =>{
    console.log(_id)

    try {
      const {data} = await axiosSecure.delete(`/plants/${_id}`)
      console.log(data);
    }
    catch(error){
      console.log(error)
      console.log(error.message)
    }

  }
  return (
     <tr>
      <td>
        <img className="w-12" src={image} alt="" />
      </td>
      <td>{name}</td>

      <td>
     {category}
      
      </td>
     

      <td>
       {quantity}
      </td>
      <td>
        <button className="border border-green-500 px-2  bg-green-400 bg-opacity-80 text-white  rounded-full cursor-pointer">Update</button>
      </td>

      <td>
  <button onClick={handleDelete} className="border border-red-500 px-2  bg-red-400 bg-opacity-80 text-white  rounded-full cursor-pointer">Delete</button>      </td>
    </tr>
  );
};

export default MyInventoryRow;