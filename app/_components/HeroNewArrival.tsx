import HeroHeadLine from "./HeroHeadLine";
import NewArrivalFour from "./NewArrivalFour";
import NewArrivalItemOne from "./NewArrivalItemOne";
import NewArrivalItemTree from "./NewArrivalItemTree";
import NewArrivalTwo from "./NewArrivalTwo";

const HeroNewArrival = () => {
  return (
    <section className="relative w-full flex flex-col justify-between gap-4 md:gap-16 md:mt-16">
      <HeroHeadLine thumb={"Featured"} title={"New Arrival"} />
      {/* grid items */}
      <div className="w-full flex justify-center ">
        <div className="w-full md:w-[85%] grid grid-cols-4 grid-flow-col grid-rows-2 space-y-3 md:space-y-8">
          <div className="row-span-2 col-span-2">
            <NewArrivalItemOne />
          </div>
          <div className="row-span-1 col-span-2 ">
            <NewArrivalTwo />
          </div>
          <div className="row-span-1 col-span-1">
            <NewArrivalItemTree />
          </div>
          <div className="row-span-1 col-span-1">
            <NewArrivalFour />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroNewArrival;
