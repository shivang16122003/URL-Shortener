import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCustomContext } from '../ContextApi/contextApi';
import AddUrlPopup from './AddUrlPopup.jsx';
import { useState } from 'react';
import {
  FiExternalLink,
  FiSettings,
  FiLink,
  FiMapPin,
  FiGlobe,
  FiShield,
} from 'react-icons/fi';

/* Slide animations */
const leftSlide = {
  hidden: { x: '-100vw' },
  show: { x: 0, transition: { duration: 0.9, type: 'spring' } },
};
const rightSlide = {
  hidden: { x: '100vw' },
  show: { x: 0, transition: { duration: 0.9, type: 'spring' } },
};

 

const MotionLink = motion(Link);
const MotionSpan = motion.span;

const LandingPage = () => {
  
  const [popupOpen, setPopupOpen] = useState(false);
  const handlePopupOpen = () => setPopupOpen(true);
  const handlePopupClose = () => setPopupOpen(false);

  const handleUrlSubmit = (originalUrl) => {
    console.log('Submitted URL:', originalUrl);
  };




  const { token } = useCustomContext();
  console.log('Token from context:', token);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-red-50 pt-[4.5rem]"> {/* Assume navbar height ~72px */}

      {/* ---------- Hero Section ---------- */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="mb-6 flex flex-col md:flex-row justify-center gap-2 md:gap-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-center md:text-left">
            <MotionSpan variants={leftSlide} initial="hidden" animate="show" className="block">
              Short&nbsp;links,
            </MotionSpan>
            <MotionSpan variants={rightSlide} initial="hidden" animate="show" className="block text-blue-600">
              big&nbsp;insights.
            </MotionSpan>
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-base sm:text-lg text-gray-700 px-2">
            Instantly shorten URLs, share everywhere, and track real‑time clicks with advanced analytics.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">


           <MotionLink
    onClick={handlePopupOpen}
    variants={leftSlide}
    initial="hidden"
    animate="show"
    whileHover={{ scale: 1.05 }}
    className="inline-flex items-center justify-center rounded-full bg-purple-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-purple-700 hover:shadow-lg"
  >
    <FiExternalLink className="mr-2 text-xl" />
    Generate Short Link
  </MotionLink>

 
  <AddUrlPopup
    open={popupOpen}
    handleClose={handlePopupClose}
    handleSubmit={handleUrlSubmit}
  />


            <MotionLink
              to="/dashboard"
              variants={rightSlide}
              initial="hidden"
              animate="show"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600  to-purple-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-purple-700 hover:shadow-lg"
            >
              <FiSettings className="mr-2 text-xl" />
              Manage Links
            </MotionLink>
          </div>
        </div>
      </main>

      {/* ---------- Trusted By ---------- */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-10 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          <span className="text-red-600">Trusted </span>
          by developers, marketers & content creators.
        </h2>
        <p className="mt-3 text-gray-600 px-2">
          Whether you're launching a campaign or sharing code, LinkLynx keeps your links clean and insights clear.
        </p>
      </section>

      {/* ---------- Features Grid ---------- */}
      <section className="grid gap-8 px-6 pb-16 sm:grid-cols-2 lg:grid-cols-4">
        <FeatureCard
          icon={<FiLink className="text-red-600 text-3xl" />}
          title="Smart URL Shortening"
          text="Trim any long link into a clean, brand‑ready URL that never breaks in chat or email."
          color="red"
        />
        <FeatureCard
          icon={<FiMapPin className="text-blue-600 text-3xl" />}
          title="Real‑Time Click Analytics"
          text="Watch clicks populate a live graph and pinpoint exactly when your audience is most active."
          color="blue"
        />
        <FeatureCard
          icon={<FiGlobe className="text-purple-600 text-3xl" />}
          title="Custom Domains"
          text="Use your own branded domain to build trust and keep your links on‑brand."
          color="purple"
        />
        <FeatureCard
          icon={<FiShield className="text-indigo-600 text-3xl" />}
          title="Privacy‑First Analytics"
          text="All metrics are aggregated and anonymized, so you stay compliant while still learning what matters."
          color="indigo"
        />
      </section>

      {/* ---------- Footer ---------- */}
      <footer>
        <h1 className="pb-10 text-center text-4xl text-purple-500">...</h1>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, text, color }) => (
  <div className={`flex flex-col items-center rounded-2xl bg-${color}-100 p-6 shadow-md transition-shadow duration-300 hover:shadow-xl`}>
    {icon}
    <h3 className={`mb-1 text-xl font-bold text-${color}-700`}>{title}</h3>
    <p className={`text-center text-${color}-800`}>{text}</p>
  </div>
);

export default LandingPage;
