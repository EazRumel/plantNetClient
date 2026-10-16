import { useState, useEffect, useRef } from "react";
import {
  Leaf,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  LogIn,
  LogOut,
  UserRound,
} from "lucide-react";

import { Link, useNavigate, useLocation } from "react-router-dom";

import logo from "../assets/img/plantLogo1.png";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

const NavHomeBar = () => {
  const { user, logOut } = useAuth();
  const [cart] = useCart();

  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const profileRef = useRef(null);

  // Close menus when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogOut = async () => {
    try {
      setLoggingOut(true);

      await logOut();

      setProfileOpen(false);
      setMobileMenuOpen(false);

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    } finally {
      setLoggingOut(false);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Plants", path: "/plants" },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  const linkStyle = (path) =>
    `relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300
    ${
      isActive(path)
        ? "text-green-700 bg-green-50"
        : "text-gray-600 hover:text-green-700 hover:bg-green-50/70"
    }`;

    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 40);
  };

  handleScroll();

  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  return (
  <header

  className={`fixed top-0 left-0 z-50 w-full px-3 sm:px-6 pt-3 transition-all duration-300 ${

    scrolled ? "pt-2" : "pt-3"

  }`}

>

  <nav
  className={`relative mx-auto max-w-7xl rounded-2xl border backdrop-blur-xl transition-all duration-500 ${
    scrolled
      ? "border-gray-200 bg-white shadow-xl"
      : "border-white/30 bg-white/10 shadow-none"
  }`}
>
        <div className="flex h-[76px] items-center justify-between px-4 sm:px-6">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0 group"
          >
            <div className="flex  items-center justify-center rounded-xl bg-green-50 border border-green-100 transition-all duration-300 group-hover:bg-green-100 group-hover:scale-105">
              <img
                src={logo}
                alt="Tree Planet logo"
                className="h-8 w-8 object-contain"
              />
            </div>

            {/* <div className="flex items-center text-xl sm:text-2xl tracking-tight">
              <span className="font-bold text-green-600">
                Tree
              </span>

              <span className="ml-1.5 font-light text-gray-800">
                Planet
              </span>
            </div> */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={linkStyle(link.path)}
              >
                {link.name}

                {isActive(link.path) && (
                  <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 translate-y-2 rounded-full bg-green-500" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Cart */}
            <Link
              to="/cart"
              aria-label={`Shopping cart with ${cart.length} items`}
              className={`relative flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
                isActive("/cart")
                  ? "border-green-200 bg-green-100 text-green-700"
                  : "border-gray-200/80 bg-white/60 text-gray-600 hover:border-green-200 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              <ShoppingCart size={20} strokeWidth={1.8} />

              {cart.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-green-600 px-1 text-[10px] font-bold text-white">
                  {cart.length > 99 ? "99+" : cart.length}
                </span>
              )}
            </Link>

            {/* Profile Dropdown */}
            <div className="relative hidden sm:block" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen((prev) => !prev)}
                aria-expanded={profileOpen}
                aria-label="Open profile menu"
                className={`flex items-center gap-2 rounded-full border p-1 pr-3 transition-all duration-300 ${
                  profileOpen
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200/80 bg-white/60 hover:border-green-200 hover:bg-green-50/70"
                }`}
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt=""
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-white"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <UserRound size={19} />
                  </div>
                )}

                <ChevronDown
                  size={15}
                  className={`text-gray-500 transition-transform duration-200 ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Panel */}
              {profileOpen && (
                <div className="absolute right-0 top-full mt-3 w-72 overflow-hidden rounded-2xl border border-gray-100 bg-white/95 shadow-[0_15px_50px_rgba(0,0,0,0.12)] backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">

                  {/* User Info */}
                  <div className="border-b border-gray-100 bg-green-50/60 px-5 py-4">
                    <div className="flex items-center gap-3">
                      {user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt=""
                          className="h-11 w-11 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-green-700">
                          <UserRound size={22} />
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-800">
                          {user?.displayName || "Welcome to Tree Planet"}
                        </p>

                        <p className="truncate text-xs text-gray-500 mt-1">
                          {user?.email || "Sign in to your account"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    {user ? (
                      <>
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-600 transition-colors hover:bg-green-50 hover:text-green-700"
                        >
                          <LayoutDashboard size={18} />
                          <span>Dashboard</span>
                        </Link>

                        <Link
                          to="/cart"
                          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-600 transition-colors hover:bg-green-50 hover:text-green-700"
                        >
                          <ShoppingCart size={18} />
                          <span>My Cart ({cart.length})</span>
                        </Link>

                        <div className="my-2 border-t border-gray-100" />

                        <button
                          type="button"
                          onClick={handleLogOut}
                          disabled={loggingOut}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                        >
                          <LogOut size={18} />

                          <span>
                            {loggingOut ? "Signing out..." : "Sign Out"}
                          </span>
                        </button>
                      </>
                    ) : (
                      <Link
                        to="/login"
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-green-700 transition-colors hover:bg-green-50"
                      >
                        <LogIn size={18} />
                        <span>Sign In</span>
                      </Link>
                    )}
                  </div>

                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200/80 bg-white/60 text-gray-700 transition-colors hover:bg-green-50 hover:text-green-700 md:hidden"
            >
              {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>

          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-100/80 px-4 py-4 md:hidden">
            <div className="flex flex-col gap-2">

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-green-50 text-green-700"
                      : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                to="/cart"
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive("/cart")
                    ? "bg-green-50 text-green-700"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                <span className="flex items-center gap-3">
                  <ShoppingCart size={18} />
                  Cart
                </span>

                <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                  {cart.length}
                </span>
              </Link>

              <div className="my-1 border-t border-gray-100" />

              {user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt=""
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">
                        <UserRound size={20} />
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-800">
                        {user.displayName || "User"}
                      </p>

                      <p className="truncate text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-600 hover:bg-green-50 hover:text-green-700"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogOut}
                    disabled={loggingOut}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    <LogOut size={18} />
                    {loggingOut ? "Signing out..." : "Sign Out"}
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-green-700 hover:bg-green-50"
                >
                  <LogIn size={18} />
                  Sign In
                </Link>
              )}

            </div>
          </div>
        )}

      </nav>
    </header>
  );
};

export default NavHomeBar;