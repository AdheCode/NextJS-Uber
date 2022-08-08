// framework
import { useRef } from "react";
// components
import LocationSelector from "@components/LocationSelector";
import Confirm from "@components/Confirm";
import Maps from "@components/Maps";
import Navbar from "@components/Navbar";
import { MenuToggle } from "@components/MenuToggle";
// lib
import { motion, useCycle } from "framer-motion";
// util
import { useDimensions } from "@utils/use-dimensions";

const style = {
  wrapper: `h-screen w-screen flex flex-col`,
  main: `h-full w-screen flex-1 z-10`,
  mapContainer: `flex-1 w-full h-full`,
  rideRequestContainer: `h-full w-full md:w-[400px] md:ml-[1rem] py-[3rem] absolute top-0 left-0 flex flex-col justify-end z-20`,
  rideRequest: `h-full max-h-[700px] bg-white rounded-lg flex flex-col overflow-scroll scrollbar-hide`,
  background: `absolute top-20 left-0 bottom-8 w-full md:w-[420px] bg-white z-40 md:rounded-r-lg`,
};

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export default function Home() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <div className={style.wrapper}>
        <Navbar />
        <div className={style.main}>
          <Maps />
        </div>
        <MenuToggle toggle={() => toggleOpen()} />
        <motion.div className={style.background} variants={sidebar}>
          <div className={style.rideRequestContainer}>
            <div className={style.rideRequest}>
              <LocationSelector />
              <Confirm />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
