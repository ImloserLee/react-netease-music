import React, { useState, useEffect, memo } from 'react';
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
    }, []);
    return (
        <Carousel autoplay className='banner-carousel'>
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

export default memo(Banner);
