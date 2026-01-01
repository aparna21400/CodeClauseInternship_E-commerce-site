import React from "react";
import Hero from "../components/Hero/Hero";
import Popular from "../components/Popular/Popular";
import Offers from "../components/Offer/Offers";
import NewCollections from "../components/NewCollections/NewCollections"
import NewsLetter from "../components/NewsLetter/NewsLetter"
import OurPolicy from "../components/Ourpolicy/OurPolicy"

const Home = () => {

    return (
        <div>
            <Hero />
            <Popular />
            <Offers />
            <NewCollections />
            <OurPolicy />
            <NewsLetter />
        </div>
    )
}
export default Home;