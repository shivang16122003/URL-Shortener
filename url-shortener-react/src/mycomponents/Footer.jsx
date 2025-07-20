import {
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaFacebookF,
  FaInstagram,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-600 via-blue-500 to-gray-600 text-white shadow-inner">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold tracking-wide">LinkLynx</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Simplifying your URLs with precision and insights. Trusted by developers, marketers, and businesses worldwide.
          </p>
          <div className="mt-4 flex gap-4 text-xl">
            <a href="https://x.com" aria-label="Twitter" className="hover:text-blue-200">
              <FaTwitter />
            </a>
            <a href="https://github.com" aria-label="GitHub" className="hover:text-blue-200">
              <FaGithub />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-blue-200">
              <FaLinkedinIn />
            </a>
            <a href="https://facebook.com" aria-label="Facebook" className="hover:text-blue-200">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-blue-200">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Resources */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="https://example.com" className="hover:text-blue-200 transition">Docs</a></li>
            <li><a href="https://example.com" className="hover:text-blue-200 transition">API Reference</a></li>
            <li><a href="https://example.com" className="hover:text-blue-200 transition">Support</a></li>
            <li><a href="https://example.com" className="hover:text-blue-200 transition">Blog</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="https://example.com" className="hover:text-blue-200 transition">About</a></li>
            <li><a href="https://example.com" className="hover:text-blue-200 transition">Careers</a></li>
            <li><a href="https://example.com" className="hover:text-blue-200 transition">Contact</a></li>
            <li><a href="https://example.com" className="hover:text-blue-200 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Stay Updated</h3>
          <p className="mb-3 text-sm">Get product updates, tips, and special offers in your inbox.</p>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="rounded-md border-none px-4 py-2 text-slate-800 placeholder-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold hover:bg-purple-700 transition"

              onClick={() => {
                window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley';
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-blue-400 bg-blue-600 py-4 text-center text-sm tracking-wide">
        © 2025 LinkLynx. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
