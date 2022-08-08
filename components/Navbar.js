// framework
import Image from "next/image";
import { useContext } from "react";
// icons
import { BsPerson } from "react-icons/bs";
import { TbGridDots } from "react-icons/tb";
// context
import { UberContext } from "@context/uberContext";
// asset
import avatar from "@temp/avatar.png";

const style = {
  wrapper: `h-16 w-full bg-black text-white flex justify-between md:justify-around items-center px-3 md:px-14 fixed z-20`,
  leftMenu: `flex gap-3`,
  logo: `text-3xl text-white flex cursor-pointer mr-16`,
  menuItem: `text-base text-white font-normal hidden md:flex items-center mx-4 cursor-pointer`,
  rightMenu: `flex gap-3 items-center`,
  productContainer: `flex gap-2 items-center`,
  userContainer: `flex gap-2 items-center`,
  userImage: `h-10 w-10 mr-4 rounded-full p-px object-cover cursor-pointer`,
  loginButton: `flex items-center cursor-pointer rounded-full hover:bg-[#333333] px-4 py-1 float-right`,
  loginText: `ml-2`,
};

const Navbar = () => {
  const { currentAccount, connectWallet, currentUser } =
    useContext(UberContext);
  return (
    <div className={style.wrapper}>
      <div className={style.leftMenu}>
        <div className={style.logo}>Uber</div>
        <div className={style.menuItem}>Company</div>
        <div className={style.menuItem}>Safety</div>
        <div className={style.menuItem}>Help</div>
      </div>
      <div className={style.rightMenu}>
        <div className={style.menuItem}>
          <div className={style.productContainer}>
            <TbGridDots />
            Product
          </div>
        </div>
        {currentAccount ? (
          <div className={style.userContainer}>
            <div className={style.menuItem}>
              {currentUser?.name?.split(" ")[0]}
            </div>
            <div>
              <Image
                className={style.userImage}
                src={avatar}
                width={40}
                height={40}
                alt=""
              />
            </div>
            <div>
              {currentAccount?.slice(0, 6)}...{currentAccount?.slice(39)}
            </div>
          </div>
        ) : (
          <div className={style.loginButton} onClick={() => connectWallet()}>
            <BsPerson />
            <div className={style.loginText}>Log in</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
