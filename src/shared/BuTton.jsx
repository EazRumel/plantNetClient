

const ButTon = ({label}) => {
   return(
      <button
          className="mt-3
    btn relative overflow-hidden group
    bg-transparent border border-green-500 text-green-500
    transition-shadow duration-200
    hover:shadow-lg
  "
>
  {/* Pour layer */}
  <span
    className="
      absolute inset-0 bg-green-500
      transform scale-y-0 origin-top
      transition-transform duration-300 ease-out
      delay-75
      group-hover:scale-y-100
    "
  ></span>

  {/* Button content */}
  <span className="
      relative z-10 flex items-center gap-2
      transition-colors duration-150
      group-hover:text-white
    ">
    {label}
    </span>
        </button>
   )
};

export default ButTon;