import React, {
    createContext,
    useState,
    useContext,
    useEffect,
} from "react";
import Footer from '../Layout/Footer'
import ProfileTab from '../Layout/ProfileTab'
import TopBar from '../Layout/TopBar'
import { useLocation } from 'react-router-dom';
import { ReactReader } from 'react-reader'
import Config from "../Config/Config.json"
import Whatsapp from "../Layout/Whatsapp";
const EpubreaderScreen = () => {

    const [locationBk, setlocationBk] = useState(2)
    const [url,setUrl] =useState("")
    const location = useLocation()
    
    useEffect(() => {

      
        
        // setUrl( Config.API_URL+location.state.publisher_name+"/"+location.state.url) 
        setUrl( Config.API_URL+ Config.PUB_IMAGES+ location.state.publisher_id+"/"+location.state.url) 

        const timer = setTimeout(() => {
            // console.log('This will run after 5 second!')
            const rootElement1 = document.getElementsByTagName('iframe');
            // console.log(rootElement1[0]["id"])
            window.frames[rootElement1[0]["id"]].contentDocument.oncontextmenu = function(){
            return false; 
            };
          }, 5000);

        function handleContextMenu(e) {
            e.preventDefault(); // prevents the default right-click menu from appearing
          }

          const rootElement = document.getElementById('southsore');
          rootElement.addEventListener('contextmenu', handleContextMenu);
          // remove the event listener when the component is unmounted
      
          return () => {
            rootElement.removeEventListener('contextmenu', handleContextMenu);
          };
          
    }, [])
    return (
        <div className='main-container'>
            <div className='container'>
                <TopBar />
                <ProfileTab />
                <Whatsapp/>
                <div id="southsore" style={{ height: '100vh' }} >
                {/* {url} */}
                    <ReactReader
                        // url="https://react-reader.metabits.no/files/alice.epub"
                        url={url}
                        // location={location}
                        // locationChanged={(epubcfi: string) => setLocation(epubcfi)}
                       
                        epubOptions={{
                            flow: 'scrolled',
                            manager: 'continuous',
                          }}
                    />
                </div>


            </div>
            <Footer />
        </div>

    )
}

export default EpubreaderScreen
