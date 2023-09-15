import React, { useRef, useState, useEffect } from "react";
import { IconButton, Button } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import style from "./Banner.module.scss";
import Link from "next/link";

export interface Film {
  id: string;
  name: string;
  thumbnail: string;
  backdrop: string;
  description: string;
  slug?: string;
  soundtrack_count: number;
  author?: string;
  type?: number;
}

interface BannerProps {
  listData: Film[];
}

const Banner: React.FC<BannerProps> = ({ listData }) => {
  const [active, setActive] = useState(0);
  const banImgs = [listData[0], listData[1], listData[2]];
  const listDivRef = useRef(null);

  const changeNext = () => {
    setActive((prevActive) => (prevActive + 1) % banImgs.length);
  };

  const changePrev = () => {
    setActive((prevActive) =>
      prevActive === 0 ? banImgs.length - 1 : prevActive - 1
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      changeNext();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [active]);

  return <>{banImgs ?
    <div className={style.slider} id="slider">
      <div className={style.list} ref={listDivRef}>
        <div className={style.bannerItem}>
          <div className={style.content}>
            <p>{banImgs[active]?.description ?? ""}</p>
            <div className={style.row}>
              <div className={style.column}>
                <HeadphonesIcon className={style.banIcon} />
                <span>{banImgs[active]?.soundtrack_count} songs</span>
              </div>
              <div>
                <Link href={`/movies/${banImgs[active]?.slug}`}>
                  <Button
                    startIcon={<PlayArrowIcon />}
                    className={style.banButton}
                    variant="contained"
                  >
                    Play
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className={style.imgBefore}></div>
            <img
              className={style.img}
              src={banImgs[active] ? banImgs[active].backdrop : ""}
              alt={`Banner ${active}`}
            />
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
        {banImgs.map((e, index) => {
          return <li className={active == index ? style.active : ""}></li>;
        })}
      </ul>
    </div>
   : <div />}</>
};

export default Banner;
