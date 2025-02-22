import './navbar.styles.scss';
import { Fragment,useState } from 'react';
import { useNavigate,Outlet } from 'react-router-dom';
const Navbar = () => {

    const [page,setPage]=useState('Home');
    const pageIdentifiers=['Home','Video upload'];
    const pageNavigators = ['/','/upload-video']
    const navigateRouter = useNavigate();

    const handleNavigation=(name,path)=>{
        setPage(name);
        navigateRouter(path);
    }

    return ( 
        <Fragment>
        <nav className='navbar-div'>
            <div className='company'>
                Streamer
            </div>
            <div className='pages'>
                {pageIdentifiers.map((name,index)=>{
                    return <p key={`page-identifier-${index}`} onClick={()=>handleNavigation(name,pageNavigators[index])}
                     style={{backgroundColor:page === name ? 'black' : '',color:page === name ? 'white' : ''}}>
                        {name}
                    </p>
                })}
            </div>
            <div className='ext'>Cortex</div>
        </nav>
        <Outlet/>
    </Fragment>
     );
}
 
export default Navbar;