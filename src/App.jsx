import { Fragment } from "react"
import { Routes,Route } from "react-router-dom"
import UploadVideo from './routes/upload-video/upload-video.component';
import Home from "./routes/home/home.component"
import Navbar from "./components/navbar/navbar.component";
import Catalogs from "./routes/catalogs/catalogs.component";
import Catalog from './routes/catalog/catalog.component';
import Admin from './routes/admin/admin.component';
import '@fontsource/poppins';
import '@fontsource/bebas-neue';

function App() {

  return (
    <Fragment>
    <Routes>
      <Route path="/" element={<Navbar/>}>
        <Route index element={<Home/>} />
        <Route path="catalogs" element={<Catalogs/>} />
        <Route path="catalog/:catalogName" element={<Catalog/>} />
        <Route path="upload-video" element={<UploadVideo/>} />
        <Route path="admin" element={<Admin/>} />
      </Route>
    </Routes>
    </Fragment>
  )
}

export default App
