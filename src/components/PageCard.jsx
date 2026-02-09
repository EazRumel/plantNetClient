import { Button, ButtonGroup, Card } from 'flowbite-react';


const PageCard = ({plant}) => {
  const {image,category,difficulty,price} = plant;
  console.log(plant);
  return (
    <div className="">
          <div className="card bg-base-100  w-96 shadow-sm">
  <figure>
    <img className="h-96 w-full"
      src={image}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{category}</h2>

    <p>{difficulty}</p>
    <div className="card-actions justify-end">
      <button className="btn bg-green-300 hover:bg-green-100">Add to Cart <span>{price} BDT</span></button>
      
    </div>
  </div>
</div>
    </div>
  );
};

export default PageCard;