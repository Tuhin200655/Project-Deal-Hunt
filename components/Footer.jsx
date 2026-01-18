import Link from "next/link";
import { Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-violet-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-bold text-violet-600 mb-4">Deal Hunt</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Track prices, get alerts, and save money on your favorite products from any online store.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-violet-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-violet-600 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-violet-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-violet-600">Features</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-violet-600">Pricing</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-violet-600">Chrome Extension</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-violet-600">Mobile App</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-violet-600">Blog</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-violet-600">Help Center</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-violet-600">Community</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-violet-600">Status</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-violet-600">About</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-violet-600">Careers</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-violet-600">Privacy</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-violet-600">Terms</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Deal Hunt. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-violet-600">Privacy Policy</Link>
            <Link href="#" className="hover:text-violet-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
