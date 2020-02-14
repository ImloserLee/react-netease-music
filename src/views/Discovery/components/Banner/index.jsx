import React, { useState, useEffect } from 'react';
import { Carousel } from 'antd';
import { getBanner } from 'api/discovery';
import './index.scss';

function Banner() {
    const [bannerList, setBannerList] = useState([]);
    const getBannerList = async () => {
        const banner = await getBanner(0);
        setBannerList(banner);
    };
    useEffect(() => {
        getBannerList();
        // eslint-disable-next-lin
    }, []);
    return (
        <Carousel className='banner-carousel'>
            {bannerList.length &&
                bannerList.map(banner => {
                    return (
                        <img
                            src={banner.imageUrl}
                            key={banner.targetId}
                            className='banner-img'
                            alt=''
                        />
                    );
                })}
        </Carousel>
    );
}

export default Banner;
