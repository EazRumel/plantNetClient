
import PageCard from './PageCard';

const TabItems = ({plants}) => {
  return (
    <div className="grid md:grid-cols-3 gap-5 mx-auto mb-10">
      {
        plants.map(plant=>(
          <div className="">
            <PageCard plant={plant} key={plant._id}></PageCard>
          </div>
        ))
      }

  
    </div>
  );
};

export default TabItems;