import React from "react";
import './crousel.css'
import Slider from "react-slick";

  
function Crousel() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
      };

  return (
                    //w-3/4
    <div className="w-third-forth m-auto"> 

      <div className="mt-20">

        <Slider {...settings}>
        {data.map((d) => (      /*jab multiple jsx eak sath return karna hota hai then parenthaisi me likhatte hai*/
                                //h-[450 px]
          <div className="bg-white h-ght text-black rounded-xl">               
                <div className="h-56 rounded-t-xl bg-indigo-500 flex justify-center items-center"> 
                    <img src={d.img} alt="" className="h-44 w-44 rounded-full"/>
                </div>

                <div className="flex flex-col justify-center items-center gap-4 p-4">
                    <p className="text-xl font-semibold">{d.name}</p>
                    <p>{d.review}</p>
                    <button className="bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl">Read More</button>
                </div>
          </div>
          
        ))}
        </Slider>
      </div>

    </div>
  );
}

const data = [

  {
    name: "john Morgen",
    img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
    review:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ea consectetur minus cupiditate"
  },
  {
    name: "karan Singh",
    img: "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    review:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ea consectetur minus cupiditate"
  },
  {
    name: "Carry Peter",
    img: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    review:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ea consectetur minus cupiditate"
  },
  {
    name: "Sima Kumari",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    review:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ea consectetur minus cupiditate"
  },
  {
    name: "Adelina Ana",
    img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    review:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ea consectetur minus cupiditate"
  },
  {
    name: " Marco Man",
    img: "https://images.unsplash.com/photo-1617718860170-dd5d9f2ed43d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    review:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ea consectetur minus cupiditate"
  },
  
];


export default Crousel;

