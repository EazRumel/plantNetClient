import {
  Leaf,
  Sprout,
  Facebook,
  Instagram,
  Youtube,
  ArrowUpRight,
  Heart,
  Mail,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-green-100 bg-[#f5f9f3] text-gray-700">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-lime-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 pb-6 pt-14 sm:px-8 lg:pt-16">
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="group mb-5 inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-700 text-white shadow-lg shadow-green-800/20 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                <Sprout size={27} strokeWidth={1.8} />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-green-900">
                  Tree<span className="text-green-600">Planet</span>
                </h2>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-green-700">
                  Grow a greener life
                </p>
              </div>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-gray-600">
              Bring nature closer to home. Discover beautiful plants and create
              your own little green paradise, one leaf at a time.
            </p>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-green-100 bg-white text-green-800 transition-all duration-300 hover:-translate-y-1 hover:border-green-700 hover:bg-green-700 hover:text-white hover:shadow-lg hover:shadow-green-900/15"
              >
                <Facebook size={19} />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-green-100 bg-white text-green-800 transition-all duration-300 hover:-translate-y-1 hover:border-green-700 hover:bg-green-700 hover:text-white hover:shadow-lg hover:shadow-green-900/15"
              >
                <Instagram size={19} />
              </a>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-green-100 bg-white text-green-800 transition-all duration-300 hover:-translate-y-1 hover:border-green-700 hover:bg-green-700 hover:text-white hover:shadow-lg hover:shadow-green-900/15"
              >
                <Youtube size={19} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-green-900">
              Explore
            </h3>

            <ul className="space-y-3.5 text-sm">
              <li>
                <Link
                  to="/"
                  className="group inline-flex items-center gap-2 transition-colors hover:text-green-700"
                >
                  <Leaf size={15} className="text-green-600" />
                  Home
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </Link>
              </li>

              <li>
                <Link
                  to="/plants"
                  className="group inline-flex items-center gap-2 transition-colors hover:text-green-700"
                >
                  <Leaf size={15} className="text-green-600" />
                  Browse Plants
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="group inline-flex items-center gap-2 transition-colors hover:text-green-700"
                >
                  <Leaf size={15} className="text-green-600" />
                  Shopping Cart
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard"
                  className="group inline-flex items-center gap-2 transition-colors hover:text-green-700"
                >
                  <Leaf size={15} className="text-green-600" />
                  Dashboard
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </Link>
              </li>
            </ul>
          </div>

          {/* Plant categories */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-green-900">
              Plant Categories
            </h3>

            <ul className="space-y-3.5 text-sm">
              {["Indoor Plants", "Succulents", "Outdoor Plants", "Herbs"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="/plants"
                      className="group inline-flex items-center gap-2 transition-all hover:translate-x-1 hover:text-green-700"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 transition-transform group-hover:scale-150" />
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-green-900">
              Get in Touch
            </h3>

            <p className="mb-5 text-sm leading-6 text-gray-600">
              Have questions about plants or need help with your order? We'd
              love to hear from you.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-800">
                  <Mail size={17} />
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500">Email us</p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    Contact us through our website
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-800">
                  <MapPin size={17} />
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500">Our mission</p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    Making everyday life greener
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-green-200 to-transparent" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-xs leading-6 text-gray-500 sm:text-sm">
            © {currentYear}{" "}
            <span className="font-bold text-green-800">Tree Planet</span>. All
            rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-xs text-gray-500 sm:text-sm">
            Made with <Heart size={14} className="fill-green-600 text-green-600" />{" "}
            for a greener world
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;