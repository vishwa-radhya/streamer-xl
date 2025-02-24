import './img-loader.styles.scss';
import PropTypes from 'prop-types';
import Loader from '../loader/loader.component';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ImgLoader = ({imgSrc='',type='img',iframeId,ls="30px",route}) => {
    const [isLoading,setIsLoading]=useState(true);
    const router = useNavigate();
    return ( 
        <div className='img-loader-div'>
            {isLoading && <Loader ls={ls} pos={"absolute"} />}
            {type==='img' && <img src={imgSrc} onLoad={()=>setIsLoading(false)} onClick={()=>router(route)}  />}
            {type==='iframe' && <iframe src={`https://www.youtube.com/embed/${iframeId}`}   frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" 
            referrerPolicy="strict-origin-when-cross-origin" className='iframe' onLoad={()=>setIsLoading(false)}
            allowFullScreen></iframe>}
        </div>
     );
}
ImgLoader.propTypes={
    imgSrc:PropTypes.string,
    type:PropTypes.string,
    iframeId:PropTypes.string,
    ls:PropTypes.string,
    route:PropTypes.string,
}
export default ImgLoader;