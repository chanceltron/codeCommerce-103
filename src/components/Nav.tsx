import { useState } from "react";
import { useUsers, useCurrentPage, useCart } from "../hooks/hooks";
import { Login } from "./Login";
import { Modal } from "./Modal";
import { SpeedDial } from "./SpeedDial";
import { ModalName } from "../helpers/types";
import { useNavigate } from "react-router-dom";
import { Drawer } from "./Drawer";
import { CheckoutProvider } from "../context/CheckoutContext";
import { Checkout } from "./Checkout";

export function Nav() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [currentModal, setCurrentModal] = useState<ModalName>("login");
  const [cartDrawerIsOpen, setCartDrawerIsOpen] = useState<boolean>(false);
  const { loggedInUser, logout } = useUsers();
  const { currentPage, setCurrentPage } = useCurrentPage();
  const { totalQuantity } = useCart();
  const navigate = useNavigate();

  const navItems = [
    { name: "home", label: "Home", nav: "", icon: "fa-solid fa-house" },
    { name: "store", label: "Store", nav: "store", icon: "fa-solid fa-shirt" },
    {
      name: "cart",
      label: "Cart",
      nav: "cart",
      icon: "fa-solid fa-shopping-cart",
    },
  ];

  const menuList = [
    {
      name: "welcomeUser",
      label: `Hi, ${loggedInUser?.firstName ?? ""}!`,
      icon: "fa-solid fa-user",
    },
    {
      name: "signup",
      label: "sign up",
      icon: "fa-solid fa-user-plus",
      onClick: () => setCurrentPage("signup"),
    },
    {
      name: "login",
      label: "sign in",
      icon: "fa-solid fa-sign-in",
      onClick: () => {
        setCurrentModal("login");
        setModalIsOpen(true);
      },
    },
    {
      name: "logout",
      label: "sign out",
      icon: "fa-solid fa-sign-out",
      onClick: () => logout(),
    },
  ];

  const filteredMenuList = menuList.filter((item) => {
    if (item.name === "signup" || item.name === "login") {
      return !loggedInUser;
    }
    if (item.name === "welcomeUser" || item.name === "logout") {
      return loggedInUser;
    }
    return true;
  });

  const menuPopout = () => {
    return (
      <div className="absolute bottom-0 left-0 w-full h-96 bg-code-olive-100">
        {filteredMenuList.map(({ name, label }) => (
          <button
            key={name}
            onClick={() => {
              if (name === "logout") {
                return logout();
              }
              setCurrentPage(name);
            }}
          >
            <div className="flex flex-col py-5 justify-center items-center">
              {label}
            </div>
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      <nav id="navbar" className="fixed max-w-md bottom-0 w-full">
        <div className="flex items-center justify-between pb-2 text-xl bg-code-gray-700">
          {navItems.map(({ name, label, nav, icon }) => (
            <button
              key={name}
              onClick={() => {
                if (name === "cart") {
                  return setCartDrawerIsOpen(true);
                }
                navigate(nav);
              }}
              className="w-full"
            >
              <div
                className={`group flex flex-col py-4 justify-center items-center`}
              >
                <i
                  className={`relative text-2xl  transition-all shadow-lg group-hover:text-white ${
                    currentPage === name ? "text-white" : "text-code-gray-400"
                  } ${icon}`}
                >
                  {name === "cart" && totalQuantity > 0 && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#E55986] flex justify-center items-center">
                      <p className="font-semibold text-xs text-white">
                        {totalQuantity}
                      </p>
                    </div>
                  )}
                </i>
                <p className="text-code-gray-200 text-sm group-hover:text-white">
                  {label}
                </p>
              </div>
            </button>
          ))}
          <SpeedDial actions={filteredMenuList} />
        </div>
      </nav>
      {modalIsOpen && (
        <Modal setModalIsOpen={setModalIsOpen}>
          <Login
            setModalIsOpen={setModalIsOpen}
            currentModal={currentModal}
            setCurrentModal={setCurrentModal}
          />
        </Modal>
      )}
      <Drawer
        drawerIsOpen={cartDrawerIsOpen}
        setDrawerIsOpen={setCartDrawerIsOpen}
        title={"Shopping Cart"}
      >
        <CheckoutProvider>
          <Checkout setDrawerIsOpen={setCartDrawerIsOpen} />
        </CheckoutProvider>
      </Drawer>
    </>
  );
}
