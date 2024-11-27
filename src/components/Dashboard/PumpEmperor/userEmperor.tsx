import Image from "next/image";
import placeHodlerPumpEmpror from "../../../assets/placeHodlerPumpEmperor.png";
import placeHodlerRounded from "../../../assets/placeholderNavRounded.png";

export const UserEmperor = () => {
    return (
        <div className="flex md:gap-3 gap-1 mx-auto lg:px-4 px-1">
        <div className="flex-shrink-0">
          <Image src={placeHodlerPumpEmpror} alt="Pump Emperor" />
        </div>
        <div className="flex flex-col space-y-1 justify-center">
          <div className="flex items-center gap-4 ">
            <p className="text-xs font-normal">created by</p>
            <div className="flex items-center gap-2">
              <Image src={placeHodlerRounded} alt="placholder" />
              <p className="text-xs font-normal">GSD1ED</p>
            </div>
            <p className="text-xs">16mn ago</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs font-normal text-[#79FF62]">market cap: $12.5k</p>
            <p className="text-xs font-normal">replies: 12343</p>
          </div>
          <p className="text-gray-300 font-normal text-xs">
            $THICK: SUFO is the most memorable memecoin in existence. The dog and
            frog days are over, it's time for SUFO to take over. Let's build a
            global circle of crypto friends connected by SUFO! SUFO is a meme coin
            with no intrinsic value and no expectation of financial return. There
            is no official team or itinerary, the coin is completely useless and
            just for fun.
          </p>
        </div>
      </div>
    )
}