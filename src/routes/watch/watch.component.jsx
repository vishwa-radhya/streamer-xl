import './watch.styles.scss';
import { useParams } from 'react-router-dom';
import { useGlobalDataContext } from '../../contexts/global-data.context';
import ImgLoader from '../../components/img-loader/img-loader.component';

const Watch = () => {
    const {code}=useParams();
    const decodedString= decodeURIComponent(code);
    const {videoDataObject}=useGlobalDataContext();

    return ( 
        <div className='watch-div cc-div'>
            <div className='main'>
                <ImgLoader type='iframe' iframeId={decodedString} ls={"150px"} />
            </div>
                <div className='time'>
                <p>{videoDataObject?.videoName}</p>
                <p>{videoDataObject?.videoDuration}</p>
                </div>
        </div>
     );
}
 
export default Watch;