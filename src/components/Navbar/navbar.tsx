import Image from "next/image";
import { useState, useEffect } from "react";
import taraxafunlogo from "../../assets/logo/taraxafunLogo.png";
import xLogo from "../../assets/logo/xLogo.png";
import telegramLogo from "../../assets/logo/telegramLogo.png";
import instagramLogo from "../../assets/logo/instagramLogo.png";
import tiktokLogo from "../../assets/logo/tiktokLogo.png";
import placeholderNav from "../../assets/placeholderNav.png";
import placeholderNavRounded from "../../assets/placeholderNavRounded.png";
import { CustomBtnApp } from "../connect-btn";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  const handleClickOutside = (event: any) => {
    if (
      event.target.closest("#navbar-sticky") ||
      event.target.closest("#burger-menu-button")
    ) {
      return;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-[100] backdrop-blur-sm" />}

      {/* Desktop Navbar */}
      <nav className="absolute w-full lg:w-12/12 lg:mx-auto z-[101] lg:top-2 top-0 px-4 backdrop-blur-[10px] rounded-none lg:rounded-full">
  <div className="grid grid-cols-12 items-center mx-auto py-2">
    <div className="col-span-3 flex items-center gap-4">
      <a href="/" className="flex-shrink-0">
        <Image
          src={taraxafunlogo}
          alt="Taraxafun Logo"
          width={40}
          height={40}
        />
      </a>

      <div className="flex flex-col lg:flex-row items-start md:items-center lg:items-center gap-2">
        <div className="flex flex-col lg:flex-row gap-2">
          <p className="text-sm font-semibold">(how it works)</p>
          <p className="text-sm font-semibold">(support)</p>
        </div>

        <div className="flex items-center gap-1">
          <Image src={xLogo} alt="X Logo" width={18} height={18} />
          <Image src={telegramLogo} alt="Telegram Logo" width={18} height={18} />
          <Image src={instagramLogo} alt="Instagram Logo" width={18} height={18} />
          <Image src={tiktokLogo} alt="Tiktok Logo" width={18} height={18} />
        </div>
      </div>
    </div>

    <div className="sm:col-span-6 flex justify-center items-center space-x-4">
      <ul className="flex gap-4">
        <li className="hidden md:block lg:block">
          <a
            href=""
            target="_blank"
            className="flex items-center gap-2 px-2 py-2 rounded bg-[#79FF62] text-black font-normal text-sm"
          >
            <Image src={placeholderNav} alt="Placeholder Nav" />
            <span>1Ly231 bought 5.2k TARA of $MEME</span>
            <Image src={placeholderNavRounded} alt="Placeholder Nav" />
          </a>
        </li>
        <li className="hidden md:hidden lg:block">
          <a
            href=""
            target="_blank"
            className="flex items-center gap-2 px-2 py-2 rounded bg-[#FFE862] text-black font-normal text-sm"
          >
            <Image src={placeholderNav} alt="Placeholder Nav" />
            <span>1Ly231 created $TARA</span>
            <Image src={placeholderNavRounded} alt="Placeholder Nav" />
          </a>
        </li>
      </ul>
    </div>

    {/* Right section */}
    <div className="col-span-8 sm:col-span-3 flex justify-end">
      <CustomBtnApp className="text-sm font-semibold" />
    </div>
  </div>
</nav>


    </>
  );
};
