import { useEffect } from "react";
import { CartButton } from "./CartButton";

type Props = {
  drawerIsOpen: boolean;
  setDrawerIsOpen: (isOpen: boolean) => void;
  title?: string;
  children: React.ReactNode;
};

export const Drawer = ({
  drawerIsOpen,
  setDrawerIsOpen,
  title,
  children,
}: Props) => {
  useEffect(() => {
    // Prevent scrolling when drawer is open
    if (drawerIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [drawerIsOpen]);

  return (
    <div
      className={`fixed top-0 right-0 z-50 h-full w-full shadow-lg ${
        drawerIsOpen ? "" : "pointer-events-none"
      }`}
    >
      <div
        className={`fixed top-0 right-0 w-full h-full bg-gray-900 opacity-0 transform transition-all duration-300 ${
          drawerIsOpen ? "opacity-50" : ""
        }`}
        onClick={() => setDrawerIsOpen(false)}
      />
      <div
        className={`relative z-10 w-full h-full overflow-y-auto bg-[#ebeaef] transform transition-transform duration-300 ${
          drawerIsOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="sticky w-full flex justify-between items-center font-bold text-xl px-5 py-4 z-50">
          <button onClick={() => setDrawerIsOpen(false)}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <h1>{title}</h1>
          <CartButton />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
