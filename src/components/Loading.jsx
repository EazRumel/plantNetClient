
import { Circles } from 'react-loader-spinner';

const Loading = () => {
  return (
    
      <div className="flex max-w-0 mx-auto">
        <Circles
height="80"
width="80"
color="#4fa94d"
ariaLabel="circles-loading"
wrapperStyle={{}}
wrapperClass=""
visible={true}
/>
    
      </div>
  );
};

export default Loading;