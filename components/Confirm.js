// framework
import { useContext, useState } from "react";
// components
import RideSelector from "@components/RideSelector";
// context
import { UberContext } from "@context/uberContext";
// lib
import { ethers } from "ethers";
// icon
import { CgSpinner } from "react-icons/cg";

const style = {
  wrapper: `flex-1 h-full flex flex-col justify-between scrollbar-hide`,
  rideSelectorContainer: `h-full flex flex-col overflow-scroll scrollbar-hide`,
  confirmButtonContainer: ` border-t-2 cursor-pointer z-10`,
  confirmButton: `bg-black text-white m-4 py-4 text-center text-xl`,
  spinnerIcon: `w-6 h-6 mx-auto animate-spin`,
};

const Confirm = () => {
  const {
    currentAccount,
    pickup,
    dropoff,
    price,
    selectedRide,
    pickupCoordinates,
    dropoffCoordinates,
    metamask,
  } = useContext(UberContext);
  const [isLoading, setIsLoading] = useState(false);

  const storeTripDetails = async (pickup, dropoff) => {
    setIsLoading(true);
    try {
      await metamask
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: process.env.NEXT_PUBLIC_UBER_ADDRESS,
              gas: "0x7EF40",
              value: ethers.utils.parseEther(price)._hex,
            },
          ],
        })
        .then(async (res) => {
          await fetch("/api/db/saveTrips", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              pickupLocation: pickup,
              dropoffLocation: dropoff,
              userWalletAddress: currentAccount,
              price: price,
              selectedRide: selectedRide,
            }),
          })
            .then((res) => {
              setIsLoading(false);
            })
            .catch((err) => {
              console.log(err);
              setIsLoading(false);
            });
        })
        .catch(async (err) => {
          console.log(err);
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  return (
    <div className={style.wrapper}>
      <div className={style.rideSelectorContainer}>
        {pickupCoordinates && dropoffCoordinates && <RideSelector />}
      </div>
      <div className={style.confirmButtonContainer}>
        <div className={style.confirmButtonContainer}>
          <div
            className={style.confirmButton}
            onClick={() => storeTripDetails(pickup, dropoff)}
            disabled={isLoading}
          >
            {isLoading ? (
              <CgSpinner className={style.spinnerIcon} />
            ) : (
              <span>Confirm {selectedRide.service || "UberX"}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
