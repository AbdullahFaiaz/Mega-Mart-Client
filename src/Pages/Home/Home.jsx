
import { About } from './About';


import BannerSlider from "../../Components/BannerSlider";

import { Helmet } from "react-helmet-async";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import Advertisement from '../../Components/Advertisement';

// ..
AOS.init();





const Home = () => {




    return (
        <>
        <Helmet>
            <title>Mega Mart | Home</title>
        </Helmet>
                        

    <ToastContainer></ToastContainer>







    <div className="relative">
    <BannerSlider></BannerSlider>
    </div>

    {/* advertisement section */}
        <Advertisement/>



    <About/>




</>
    );
};

export default Home;