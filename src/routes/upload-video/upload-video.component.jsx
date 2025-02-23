import './upload-video.styles.scss';
import AsyncLoader from '../../components/async-loader/async-loader.component';
import {useUserAuthContext} from '../../contexts/user-auth-context.context';


const UploadVideo = () => {

    const {user} = useUserAuthContext();

    if(!user){
        return <AsyncLoader text={"Nothing Here"} type={"empty"} ls={"150px"} /> ;
    }

    return ( 
        <div className='upload-video-div'>
            upvideo
        </div>
     );
}
 
export default UploadVideo;