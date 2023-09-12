import React, { useRef, useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import style from "./Banner.module.scss";
import { Tag } from "@/pages/index";

interface BannerProps {
    listData: Tag[];
  }

const Banner: React.FC<BannerProps> = ({ listData }) => {
  const [active, setActive] = useState(0);
  const listDivRef = useRef(null);

  const bannerImages = listData.map(e => e.thumbnail) 

  const changeNext = () => {
    setActive((prevActive) => (prevActive + 1) % bannerImages.length);
  };
  
  const changePrev = () => {
    setActive((prevActive) =>
      prevActive === 0 ? bannerImages.length - 1 : prevActive - 1
    );
  };
  
  return (
    <div className={style.slider} id="slider">
      <div className={style.list} ref={listDivRef}>
        <div className="banner-item">
          <img src={bannerImages[active]} alt={`Banner ${active}`} />
        </div>
      </div>
      <div className={style.buttons}>
        <IconButton className={style.iconBtn} id="prev" onClick={changePrev}>
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton className={style.iconBtn} id="next" onClick={changeNext}>
          <NavigateNextIcon />
        </IconButton>
      </div>
      <ul className={style.dots}>
        {listData.map((e, index) => {
            return <li className={active == index ? style.active : ""}></li>
        })}
      </ul>
    </div>
  );
};

export default Banner;
