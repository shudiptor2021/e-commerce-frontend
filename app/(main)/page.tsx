"use client";

import HeroAllProducts from "../_components/HeroAllProducts";
import HeroBanner from "../_components/HeroBanner";
import HeroCategoryBanner from "../_components/HeroCategoryBanner";
import HeroCategoryBoxs from "../_components/HeroCategoryBoxs";
import HeroDelivery from "../_components/HeroDelivery";
import HeroFlashsale from "../_components/HeroFlashsale";
import HeroNewArrival from "../_components/HeroNewArrival";
import HeroSelling from "../_components/HeroSelling";

export default function Home() {
  return (
    <section>
      <div className="container mx-auto px-2 md:px-14 bg-white">
        <HeroBanner />

        <HeroFlashsale />
        <HeroCategoryBoxs />
        <HeroSelling />
        <HeroCategoryBanner />
        <HeroAllProducts />
        <HeroNewArrival />
        <HeroDelivery />
      </div>
    </section>
  );
}
