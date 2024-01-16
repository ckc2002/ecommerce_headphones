import React from 'react';
import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = ({ products, bannerData }) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,

  };

  return (
    <>
      <Slider {...settings}>
        {
          bannerData.length !== 0 && bannerData.map((banner) => (
            <HeroBanner heroBanner={banner} />
          ))
        }
      </Slider>

      {
        console.log(bannerData)
      }
      <div className='products-heading'>
        <h2>Best Selling Product</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className='products-container'>
        {products?.map((product) => <Product key={product._id} product={product} />)}
      </div>

      <Slider {...settings}>
        {
          bannerData.length !== 0 && bannerData.map((banner) => (
            <FooterBanner footerBanner={banner} />
          ))
        }
      </Slider>

      {/* <FooterBanner footerBanner={bannerData && bannerData[0]} /> */}
    </>

  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query)

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery)

  return {
    props: { products, bannerData }
  }
}

export default Home