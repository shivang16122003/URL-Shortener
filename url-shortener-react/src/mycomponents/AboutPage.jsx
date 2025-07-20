import React from "react";

import { FiLink, FiActivity, FiBarChart2 } from 'react-icons/fi';
import {motion} from 'framer-motion';

const MotionH1= motion.h1;
const upside = {
  hidden: { y: '-100vw' },
  show:  { y: 0, transition: { duration: 0.7,type: 'spring'} },
};

const AboutPage = () => (
  <div className="mx-auto max-w-6xl px-4 py-12 mt-3">
    {/* Hero */}
    <section className="mb-16 text-center">
      <MotionH1 variants={upside} initial="hidden" animate="show" className="mb-4 text-4xl font-extrabold md:text-6xl">
        About <span className="text-blue-600">LinkLynx</span>
      </MotionH1>
      {/* Underlined blurb */}
      <p className="mx-auto max-w-3xl border-b-4 border-red-500 pb-4 text-lg text-gray-700">
        <strong>LinkLynx</strong> turns long links into short, shareable ones and tracks every click
        with real‑time location, device, and referrer analytics.
      </p>
    </section>

    {/* Feature cards */}
    <section className="grid gap-8 md:grid-cols-3">
      {[
        {
          icon: <FiLink className="mb-4 text-4xl text-red-600" />,
          title: 'Instant Short Links',
          text: 'Create clean, custom links in seconds.',
          bg: 'bg-red-100',
          txt: 'text-red-700',
        },
        {
          icon: <FiActivity className="mb-4 text-4xl text-blue-600" />,
          title: 'Live Click Tracking',
          text: 'Monitor clicks in real time—where, when, on what.',
          bg: 'bg-blue-100',
          txt: 'text-blue-700',
        },
        {
          icon: <FiBarChart2 className="mb-4 text-4xl text-purple-600" />,
          title: 'Advanced Analytics',
          text: 'Dig into geo, device, referrer trends, and exports.',
          bg: 'bg-purple-100',
          txt: 'text-purple-700',
        },
      ].map(({ icon, title, text, bg, txt }) => (
        <div
          key={title}
          className={`flex flex-col items-center rounded-2xl ${bg} p-6 shadow-md transition-shadow duration-300 hover:shadow-xl`}
        >
          {icon}
          <h3 className={`mb-2 text-xl font-bold ${txt}`}>{title}</h3>
          <p className={`text-center ${txt.replace('700', '800')}`}>{text}</p>
        </div>
      ))}
    </section>

    {/* Why section */}
    <section className="mt-20 rounded-2xl bg-slate-100 p-8 text-center shadow-inner transition-shadow duration-300 hover:shadow-xl">
      <h2 className="mb-4 text-3xl font-bold text-blue-500 ">Why Choose LinkLynx?</h2>
      <p className="mx-auto max-w-3xl text-lg text-slate-700">
        Shorten smarter, share easier, analyze deeper—LinkLynx is your all‑in‑one dashboard for link
        engagement.
      </p>
    </section>
  </div>
);

export default AboutPage;
