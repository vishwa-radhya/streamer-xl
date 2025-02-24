import './catalog.styles.scss';
import { useParams } from 'react-router-dom';
import SearchBar from '../../components/searchbar/searchbar.component';
import ImgLoader from '../../components/img-loader/img-loader.component';
import AsyncLoader from '../../components/async-loader/async-loader.component';
import { useUserAuthContext } from '../../contexts/user-auth-context.context';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalDataContext } from '../../contexts/global-data.context';
import { realtimeDb } from '../../utils/firebase';
import { onValue,ref,remove } from 'firebase/database';

// const dataAr=[{id:345,videoName:'test',videoDuration:'4:34',videoLink:'Ec08db2hP10?si=FXyltz-6OAogrrDj'}]

const Catalog = () => {
    const {catalogName}=useParams();
    const [data,setData]=useState([]);
    const [isLoading,setIsLoading]=useState(false);
    const {user}=useUserAuthContext();
    const router = useNavigate();
    const {handleSetVideoDataObject}=useGlobalDataContext();

    useEffect(()=>{
        setIsLoading(true);
        try{
            const dbRef = ref(realtimeDb,`catalogs/${catalogName}`);
            onValue(dbRef,(snapshot)=>{
                if(!snapshot.exists()){
                    setData([]);
                }else{
                    const data= snapshot.val();
                    if(data){
                        const dataArray = Object.entries(data).map(([id,{videoName,videoDuration,videoLink}])=>({id,videoName,videoDuration,videoLink}));
                        setData(dataArray);
                    }
                }
            })
        }catch(e){
            console.error(e);
            setData([]);
        }finally{
            setIsLoading(false);
        }
    },[])

    const handleDelete=(id)=>{
        if(id){
            try{
                const dbRef = ref(realtimeDb,`catalogs/${catalogName}/${id}`);
                remove(dbRef);
            }catch(e){
                console.error(e);
            }
        }
    }

    if(!data?.length) return <AsyncLoader text={"Nothing yet"} type={"empty"} />
    if(isLoading) return <AsyncLoader text={"Loading content"} type={"loading"} ls={"90px"} />

    return ( <div className="catalog-div cc-div">
        <h1>{catalogName[0].toUpperCase()+catalogName.slice(1,catalogName.length)}</h1>
        <SearchBar/>
        <div className='main'>
            {data?.map((obj)=>{
                return <div key={obj?.id} className='tile'>
                    <ImgLoader imgSrc={`https://img.youtube.com/vi/${obj?.videoLink?.slice(0,11)}/hqdefault.jpg`} route={`/watch/${encodeURIComponent(obj?.videoLink)}`} />
                    <h3>{obj?.videoName}</h3>
                    <h3>{obj?.videoDuration}</h3>
                    {user && <button className='c-btn' onClick={()=>handleDelete(obj?.id)}>Delete</button>}
                </div>
            })}
        </div>
    </div> );
}
 
export default Catalog;