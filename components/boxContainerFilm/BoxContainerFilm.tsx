import * as React from 'react';
import style from "./BoxContainerFilm.module.scss"
export interface IAppProps {

}

export interface listImage {
    images:string[]
}

const ImageSlider: React.FC<listImage> = ({images}) => {
  
    const scrollContainer = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft -= 300; 
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft += 300; 
    }
  };
  
    return ( 
      <div className={style["image-slider"]}>
        <button className={style["prev-button"]} onClick={scrollLeft}>
            &#10094;
            </button>
        <div className={style["slider-images"]} ref={scrollContainer}>
            
          {images.map((image, index) => (
            <img
              key={index}
              src={`/tmp/${image}`}
            />
          ))}     
        </div>
        <button className={style["next-button"]} onClick={scrollRight}>
            &#10095;
        </button>
      </div>
    );
  };


export default function BoxContainerFilm (props: IAppProps) {
    const ListFile = ["film1.png","film2.png","film3.png","film4.png","film5.png","film1.png","film2.png","film3.png","film4.png","film5.png"]
    return (
    <div style={{
        marginTop:"24px",
        color:style.textColor
    }}>
        <span>Hot movies</span>
        <ImageSlider  images={ListFile}/>
    </div>
  );
}
