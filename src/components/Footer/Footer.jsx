import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <p className="mt-6 text-sm text-slate-400">
                &copy; Copyright 2023. All Rights Reserved by DevUI.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Company
              </h3>
              <ul className="space-y-3">
                <li><Link className="text-sm font-medium text-slate-600 hover:text-slate-900" to="/">Features</Link></li>
                <li><Link className="text-sm font-medium text-slate-600 hover:text-slate-900" to="/">Pricing</Link></li>
                <li><Link className="text-sm font-medium text-slate-600 hover:text-slate-900" to="/">Affiliate Program</Link></li>
                <li><Link className="text-sm font-medium text-slate-600 hover:text-slate-900" to="/">Press Kit</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Support
              </h3>
              <ul className="space-y-3">
                <li><Link className="text-sm font-medium text-slate-600 hover:text-slate-900" to="/">Account</Link></li>
                <li><Link className="text-sm font-medium text-slate-600 hover:text-slate-900" to="/">Help</Link></li>
                <li><Link className="text-sm font-medium text-slate-600 hover:text-slate-900" to="/">Contact Us</Link></li>
                <li><Link className="text-sm font-medium text-slate-600 hover:text-slate-900" to="/">Customer Support</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Legals
              </h3>
              <ul className="space-y-3">
                <li><Link className="text-sm font-medium text-slate-600 hover:text-slate-900" to="/">Terms &amp; Conditions</Link></li>
                <li><Link className="text-sm font-medium text-slate-600 hover:text-slate-900" to="/">Privacy Policy</Link></li>
                <li><Link className="text-sm font-medium text-slate-600 hover:text-slate-900" to="/">Licensing</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
