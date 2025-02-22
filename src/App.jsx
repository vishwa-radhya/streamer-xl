import { Fragment } from "react"
import { Routes,Route } from "react-router-dom"
import UploadVideo from './routes/upload-video/upload-video.component';
import Home from "./routes/home/home.component"
import Navbar from "./components/navbar/navbar.component";
import '@fontsource/poppins';
import '@fontsource/bebas-neue';

function App() {

  return (
    <Fragment>
    <Routes>
      <Route path="/" element={<Navbar/>}>
        <Route index element={<Home/>} />
        <Route path="upload-video" element={<UploadVideo/>} />
      </Route>
    </Routes>
    </Fragment>
  )
}

export default App
