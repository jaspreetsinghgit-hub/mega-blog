import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200/80 bg-slate-950">
      <section className="py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="mb-4 inline-flex items-center">
                <Logo width="112px" />
              </div>
              <p className="mt-6 text-sm leading-6 text-slate-400">
                &copy; Copyright 2023. All Rights Reserved by DevUI.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Company</h3>
              <ul className="space-y-3">
                <li><Link className="text-sm font-medium text-slate-400 transition hover:text-white" to="/">Features</Link></li>
                <li><Link className="text-sm font-medium text-slate-400 transition hover:text-white" to="/">Pricing</Link></li>
                <li><Link className="text-sm font-medium text-slate-400 transition hover:text-white" to="/">Affiliate Program</Link></li>
                <li><Link className="text-sm font-medium text-slate-400 transition hover:text-white" to="/">Press Kit</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Support</h3>
              <ul className="space-y-3">
                <li><Link className="text-sm font-medium text-slate-400 transition hover:text-white" to="/">Account</Link></li>
                <li><Link className="text-sm font-medium text-slate-400 transition hover:text-white" to="/">Help</Link></li>
                <li><Link className="text-sm font-medium text-slate-400 transition hover:text-white" to="/">Contact Us</Link></li>
                <li><Link className="text-sm font-medium text-slate-400 transition hover:text-white" to="/">Customer Support</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Legals</h3>
              <ul className="space-y-3">
                <li><Link className="text-sm font-medium text-slate-400 transition hover:text-white" to="/">Terms &amp; Conditions</Link></li>
                <li><Link className="text-sm font-medium text-slate-400 transition hover:text-white" to="/">Privacy Policy</Link></li>
                <li><Link className="text-sm font-medium text-slate-400 transition hover:text-white" to="/">Licensing</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
