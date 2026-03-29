// import React from "react";
// import {useNavigate} from "react-router-dom";
import Hero from "../Components/Hero";
import Trending from "../Components/TrendingNow";
import "../Pages/ProductDetails";
// import Contact from "../Components/Contact";

function Home (){
    // const navigate = useNavigate()
    return(
        <>
        {/* <NavBar/> */}
        <Hero/>

        <Trending/>
        {/* <Contact/> */}
        </>
    )
}
export default Home;