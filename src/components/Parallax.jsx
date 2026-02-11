import React from 'react';
import parallaxBg from "../assets/img/parallax.jpg";
import { Parallax } from 'react-parallax';


const CoverParallax = () => {
  return (
    <Parallax blur={{min:-50,max:50}} bgImage={parallaxBg} bgImageAlt="the cat" strength={-200}>
        <div
  className="hero h-[700px]"
 
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
      <p className="mb-5">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      
    </div>
  </div>
</div>
    </Parallax>
    
  );
};

export default CoverParallax;