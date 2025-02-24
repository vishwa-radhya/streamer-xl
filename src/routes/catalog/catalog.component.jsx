import './catalog.styles.scss';
import { useParams } from 'react-router-dom';
import SearchBar from '../../components/searchbar/searchbar.component';
import ImgLoader from '../../components/img-loader/img-loader.component';

const obj=[
    {key:123,videoName:'unknown name',videoDuration:'4:34',videoLink:''},
    {key:124,videoName:'unknown name',videoDuration:'4:34',videoLink:''},
    {key:125,videoName:'unknown name',videoDuration:'4:34',videoLink:''},
    {key:126,videoName:'unknown name',videoDuration:'4:34',videoLink:''},
]

const Catalog = () => {
    const {catalogName}=useParams();
    return ( <div className="catalog-div cc-div">
        <h1>{catalogName[0].toUpperCase()+catalogName.slice(1,catalogName.length)}</h1>
        <SearchBar/>
        <div className='main'>
            {obj.map((ob,index)=>{
                return <div key={`${catalogName}-tile-${index}`} className='tile'>
                    <ImgLoader imgSrc={ob.videoLink} />
                    <h3>{ob.videoName}</h3>
                    <h3>{ob.videoDuration}</h3>
                </div>
            })}
        </div>
    </div> );
}
 
export default Catalog;