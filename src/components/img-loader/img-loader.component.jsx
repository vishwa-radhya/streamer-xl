import './img-loader.styles.scss';
import PropTypes from 'prop-types';
import Loader from '../loader/loader.component';
import { useState } from 'react';

const ImgLoader = ({imgSrc='',type='img'}) => {
    const [isLoading,setIsLoading]=useState(true);
    return ( 
        <div className='img-loader-div'>
            {isLoading && <Loader ls={"30px"} pos={"absolute"} />}
            <img src={imgSrc} onLoad={()=>setIsLoading(false)}  />
        </div>
     );
}
ImgLoader.propTypes={
    imgSrc:PropTypes.string,
    type:PropTypes.string,
}
export default ImgLoader;