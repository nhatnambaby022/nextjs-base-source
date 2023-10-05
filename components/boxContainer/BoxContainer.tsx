import getListFilm from '@/api/getListFilm'
import { Tag } from '@/pages/index'
import { Button, CircularProgress } from '@mui/material'
import { display } from '@mui/system/Box'
import * as React from 'react'
import style from './BoxContainerFilm.module.scss'
import Link from 'next/link'

const MyFilm: React.FC<{ tag: Tag; isFirst: boolean }> = ({ tag, isFirst }) => {
  const [isHover, serIsHover] = React.useState(false)
  const onMouseEnter = () => {
    serIsHover(true)
  }
  const onMouseLeave = () => {
    serIsHover(false)
  }
  return (
    <>
      <div
        style={{
          position: 'relative'
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <img
          src={tag.thumbnail}
          style={{
            height: 300,
            width: 200,
            objectFit: 'cover',
            marginLeft: isFirst ? '' : '10px'
          }}
        />
        <img
          src={tag.thumbnail}
          style={{
            height: 300,
            width: 200,
            top: 0,
            left: isFirst ? 0 : 10,
            objectFit: 'cover',
            display: isHover ? 'block' : 'none',
            scale: isHover ? 1.2 : 1
          }}
          className={style.tagbg}
        />
        <div
          style={{
            height: 300,
            width: 200,
            top: 0,
            left: isFirst ? 0 : 10,
            backgroundColor: 'rgba(0,0,0,0.4)',
            display: isHover ? 'block' : 'none'
          }}
          className={style.tagbg}
        ></div>
        <div
          style={{
            width: 165,
            textOverflow: 'ellipsis',
            position: 'absolute',
            top: 17,
            left: isFirst ? '15px' : '20px',
            display: isHover ? 'block' : 'none'
          }}
        >
          <div
            style={{
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {tag.name}
          </div>
          <div
            style={{
              fontSize: '12px',
              paddingTop: '10px'
            }}
          >
            {`${tag.soundtrack_count} songs`}
          </div>
          <div
            className={style.textDes}
            style={{
              fontSize: '12px',
              paddingTop: '10px'
            }}
          >
            {tag.description}
          </div>
        </div>
        <Link href={`/sound/${tag.slug}`}>
          <button
            style={{
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.2)',
              width: '44px',
              height: '43px',
              border: '0px',
              cursor: 'pointer',
              position: 'absolute',
              bottom: '15px',
              left: isFirst ? '20px' : '25px',
              display: isHover ? 'block' : 'none'
            }}
            className={style.btnPlay}
          >
            <img
              src="/playButton.png"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%'
              }}
            />
          </button>
        </Link>
      </div>
    </>
  )
}

const MySound: React.FC<{ tag: Tag; isFirst: boolean }> = ({
  tag,
  isFirst
}) => {
  return (
    <>
      <div
        style={{
          width: 165,
          marginLeft: isFirst ? '' : '10px',
          cursor: 'pointer'
        }}
      >
        <img
          src={tag.thumbnail}
          style={{
            height: 165,
            width: 165,
            objectFit: 'cover'
          }}
        />

        <h4
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            width: 165,
            textOverflow: 'ellipsis'
          }}
        >
          {tag.name}
        </h4>

        <span
          style={{
            fontSize: '14px',
            fontWeight: '100',
            width: 165,
            textOverflow: 'ellipsis'
          }}
        >
          {tag.author ? tag.author : ''}
        </span>
      </div>
    </>
  )
}

export interface listImage {
  list: Tag[]
  isFilm: boolean
}
const ImageSlider: React.FC<listImage> = ({ list, isFilm }) => {
  const scrollContainer = React.useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft -= 300
    }
  }

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft += 300
    }
  }

  return (
    <div className={style['image-slider']}>
      <button className={style['prev-button']} onClick={scrollLeft}>
        &#10094;
      </button>
      <div className={style['slider-images']} ref={scrollContainer}>
        {list.map((item, index) =>
          isFilm ? (
            <MyFilm tag={item} isFirst={index == 0} />
          ) : (
            <MySound tag={item} isFirst={index == 0} />
          )
        )}
      </div>
      <button className={style['next-button']} onClick={scrollRight}>
        &#10095;
      </button>
    </div>
  )
}

export interface IAppProps {
  isFilm: boolean
  list: Tag[]
  title: string
}
export default function BoxContainer(props: IAppProps) {
  const ListFile = props.list
  return (
    <div
      style={{
        width: 'calc(100vw - 48px)',
        marginTop: '24px',
        color: style.textColor,
        maxWidth: '1100px',
        position: 'relative',
      }}
    >
      <hr style={{ marginBottom: '20px', borderColor: '#525252' }} />
      <span>{props.title}</span>
      <hr style={{ margin: '20px 0', borderColor: '#525252' }} />
      <ImageSlider list={ListFile} isFilm={props.isFilm} />
    </div>
  )
}
