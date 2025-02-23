import './upload-video.styles.scss';
import AsyncLoader from '../../components/async-loader/async-loader.component';
import {useUserAuthContext} from '../../contexts/user-auth-context.context';
import { FaYoutube } from "react-icons/fa6";
import SubmitButton from '../../components/submit-button/submit-button.component';
import { useState } from 'react';

const options=['entertainment','music','gaming','how-To & Tutorials','technology','beauty & Fashion','lifestyle & Fitness','education','news & Politics','science & Research','travel & Adventure','sports','finance & Business','motivation & Self-Improvement','ASMR & Relaxtion','others'];

const UploadVideo = () => {

    const {user} = useUserAuthContext();
    const [catOption,setCatOption]=useState(options[0]);

    if(user){
        return <AsyncLoader text={"Nothing Here"} type={"empty"} ls={"150px"} /> ;
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault();
    }

    return ( 
        <div className='upload-video-div'>
            <h1>Upload videos</h1>
            <form className='main' onSubmit={handleSubmit}>
                <div className='n-and-d'>
                <input className='c-input' required minLength={"4"} placeholder='Video name' />
                <input className='c-input' required minLength={"2"} placeholder='Video duration (h:m:s)' />
                </div>
                <input className='c-input link' required placeholder='Video link (youtube)' />
                <div className='yt-frame'>
                    <FaYoutube className='icon' />
                    <button type='button' className='c-btn'>Check now</button>
                </div>
                <div className='cat'>
                <h4>Category</h4>
                <select name='categories' onChange={(e)=>setCatOption(e.target.value)}>
                    {options.map((opt,index)=>{
                        return <option key={`select-option-key-${index}`} value={opt}>{opt[0].toUpperCase()+opt.slice(1,opt.length)}</option>
                    })}
                </select>
                </div>
                {catOption==="others" && <input className='c-input' required maxLength={"2"} placeholder='others' />}
                <SubmitButton text={"Submit"} />
            </form>
        </div>
     );
}
 
export default UploadVideo;