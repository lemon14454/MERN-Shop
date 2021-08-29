import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, EffectCoverflow } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchTopProducts, selectProduct } from "../redux/product";
import { useEffect } from "react";
import { importImages } from "../redux/api";

// Icons
import {
  SiBabel,
  SiMongodb,
  SiNodeDotJs,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiWebpack,
} from "react-icons/si";
import { Link } from "react-router-dom";

SwiperCore.use([Pagination, EffectCoverflow]);

const ProductCarousel = () => {
  const dispatch = useAppDispatch();
  const { topProducts } = useAppSelector(selectProduct);

  const images = importImages(
    require.context("../images", false, /\.(png|jpe?g)$/)
  );

  useEffect(() => {
    dispatch(fetchTopProducts());
  }, [dispatch]);

  console.log(topProducts);

  return (
    <div className="p-10 mb-[30px] w-full flex bg-white rounded-sm shadow items-center gap-[40px] flex-col-reverse md:flex-row">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        className="w-full md:w-[400px]"
      >
        {topProducts &&
          topProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <Link to={`/product/${product._id}`} className="w-full relative">
                <img
                  src={images[`${product.image}`]}
                  alt={product._id}
                  className="h-full w-full object-cover rounded"
                />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="w-full md:w-[400px]">
        <h2 className="font-bold text-2xl">歡迎來到 MERN SHOP</h2>
        <p className="text-md text-main">使用技術</p>
        <div className="grid grid-cols-2 gap-4 mt-[20px]">
          <div className="used-tech">
            <SiReact className="text-2xl text-[#61DAFB] mr-2" />
            React
          </div>
          <div className="used-tech">
            <SiRedux className="text-2xl text-[#764ABC] mr-2" />
            Redux
          </div>
          <div className="used-tech">
            <SiTypescript className="text-2xl text-[#3077C6] mr-2" />
            Typescript
          </div>
          <div className="used-tech">
            <SiWebpack className="text-2xl text-[#75AECC] mr-2" />
            wepback
          </div>
          <div className="used-tech">
            <SiBabel className="text-2xl text-[#F5DA55] mr-2" />
            babel
          </div>
          <div className="used-tech">
            <SiMongodb className="text-2xl text-[#12A950] mr-2" />
            mongoDB
          </div>
          <div className="used-tech">
            <SiNodeDotJs className="text-2xl text-[#6FA760] mr-2" />
            NodeJS
          </div>
          <div className="used-tech">
            <SiTailwindcss className="text-2xl text-[#05B6D3] mr-2" />
            TailwindCSS
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
