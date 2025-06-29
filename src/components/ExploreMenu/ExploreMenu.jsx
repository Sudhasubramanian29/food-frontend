import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";

function ExploreMenu({ category, setcategory }) {
  // Add "All" option manually in the menu
  const categories = [
    { menu_name: "All", menu_image: "/images/all.png" }, // you can add your own image
    ...menu_list,
  ];

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={3}
        breakpoints={{
          1024: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          640: { slidesPerView: 1 },
        }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="explore-menu-swiper"
      >
        {categories.map((item, index) => (
          <SwiperSlide key={index} className="explore-menu-slide">
            <div
              onClick={() => setcategory(item.menu_name)}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt={item.menu_name}
              />
              <p>{item.menu_name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <hr />
    </div>
  );
}

export default ExploreMenu;
