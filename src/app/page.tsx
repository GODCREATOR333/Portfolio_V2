"use client";

import { BLOG_POSTS } from "./blog/blogData";
import { BlogList } from "./blog/BlogList";
import { BlogPost as BlogPostComponent } from "./blog/BlogPost";
import React, { useState, useEffect, useRef } from "react";

// ============================================
// DATA SECTION - S Hari Preetham
// ============================================

const SITE_DATA = {
  name: "S Hari Preetham",
  title: "Robotics & Mechatronics Engineer",
  tagline:
    "Building precision systems from first principles—where control theory meets hardware reality",
  email: "haripreetham.jntuh@gmail.com",
  phone: "+91 7013589964",
  github: "https://github.com/godcreator333",
  linkedin: "https://www.linkedin.com/in/hari-preetham-934789201/",
  location: "Hyderabad, India",
  bio: `I'm a mechanical engineer obsessed with building robots that work in the real world. My work spans precision mechatronics, real-time control systems, and computer vision—turning math and physics into machines that sense, adapt, and act reliably. Currently developing a laser-based weeding system with sub-millimeter accuracy using salvaged hard drive actuators.`,

  currently: {
    building: "Laser weeding robot with active vibration compensation",
    reading: "Papers on visual-inertial odometry and MPC",
    obsessed: "Fourier transforms, SpaceX Starship, and sub-mm precision",
  },

  research_interests: [
    "Human-Robot Collaboration",
    "Precision Mechatronics & Optical Systems",
    "Real-Time Control (PID, LQR, MPC)",
    "Visual-Inertial Sensor Fusion",
    "Space Robotics & Aerospace Manufacturing",
    "System Identification & Modeling",
  ],

  beliefs: [
    "Hardware is hard—that's exactly why it's worth doing",
    "The best engineering is invisible until it breaks",
    "Sub-millimeter precision or bust",
    "If SpaceX can catch rockets, I can debug this sensor",
    "When tools don't exist, build them. When expertise is lacking, acquire it.",
    "Math doesn't lie, but sensors do—always verify",
  ],
};

const PROJECTS = [
  {
    id: 1,
    title: "Laser-Based Precision Weeding System",
    description:
      "Developing a full-stack mechatronics system with custom 2-axis galvanometer scanners built from salvaged HDD voice coil motors (₹3k budget). Implementing visual-inertial fusion (Kalman filtering), YOLOv8-based weed detection, and comparative control (PID vs LQR vs MPC) for real-time line-of-sight stabilization targeting ≤0.5mm accuracy at 50cm.",
    tags: [
      "Mechatronics",
      "Computer Vision",
      "Control Theory",
      "Sensor Fusion",
      "Real-Time Systems",
    ],
    image: "/images/spectra.jpeg",
    year: "2024-Present",
    links: [
      { label: "GitHub", url: "https://github.com/godcreator333" },
      { label: "Paper (In Progress)", url: "#" },
    ],
    highlight: "Sub-mm precision on ₹3k budget",
    status: "Active Development",
  },
  {
    id: 2,
    title: "ROS2_E2E Visual Processor",
    description:
      "Open-source real-time vision stack for robotics. Integrated YOLOv8 with ROS2, CUDA optimization, and WebRTC for ~15ms inference latency on Jetson. Implemented EKF-SLAM for navigation. Tuned for deterministic performance using Linux Preempt_RT kernel.",
    tags: ["ROS2", "Computer Vision", "CUDA", "Real-Time Linux", "SLAM"],
    image: "/images/ros2_e2e.png",
    year: "2024",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/godcreator333/ROS2_E2E_visual_processor",
      },
    ],
    highlight: "15ms latency on edge hardware",
  },
  {
    id: 3,
    title: "DIY Motion Capture System",
    description:
      "Built outdoor motion capture setup using high-speed PS3 Eye cameras for system identification of laser weeding robot. Performed intrinsic/extrinsic calibration and explored epipolar geometry for 3D reconstruction. Enables precise measurement of galvo and platform dynamics for control tuning.",
    tags: ["Computer Vision", "Calibration", "3D Reconstruction", "System ID"],
    image: "/images/mocap.png",
    year: "2024",
    links: [{ label: "Details", url: "#" }],
    highlight: "Research-grade tracking on student budget",
  },
  {
    id: 4,
    title: "MIRV Aerodynamic Heating (DRDO-DRDL)",
    description:
      "Developed Python/SciPy/PyROOT models for reentry vehicle heating analysis. Analyzed 13,000+ data points across 25+ parameters. Improved accuracy vs baseline MATLAB code and generated new insights into transient heat behavior for defense applications.",
    tags: ["Python", "Scientific Computing", "Aerospace", "PyROOT"],
    image: "/images/drdo.png",
    year: "2023",
    links: [{ label: "GitHub", url: "https://github.com/godcreator333" }],
    highlight: "13k+ data points analyzed",
  },
];

// ============================================
// ANIMATED BACKGROUND COMPONENTS
// ============================================

const MathEquations = () => {
  const equations = [
    "X(ω) = ∫ x(t)e^(-iωt)dt",
    "ẋ = Ax + Bu",
    "J = ∫(x^T Qx + u^T Ru)dt",
    "K_p e(t) + K_i ∫e(τ)dτ + K_d de/dt",
    "||x - x*|| → 0 as t → ∞",
  ];

  const [currentEq, setCurrentEq] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEq((prev) => (prev + 1) % equations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-20 right-8 text-slate-400 font-mono text-sm opacity-20 transition-opacity duration-1000">
      {equations[currentEq]}
    </div>
  );
};

// ============================================
// COMPONENTS
// ============================================

const Navigation = ({
  activeSection,
  setActiveSection,
}: {
  activeSection: string;
  setActiveSection: (section: string) => void;
}) => {
  const sections = ["About", "Projects", "Blog", "Contact"];

  return (
    <nav className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              {SITE_DATA.name}
            </h1>
            <p className="text-xs text-slate-500 font-mono">
              Building things that actually work
            </p>
          </div>
          <div className="flex gap-8">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section.toLowerCase())}
                className={`text-sm font-medium transition-colors relative ${
                  activeSection === section.toLowerCase()
                    ? "text-slate-900"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {section}
                {activeSection === section.toLowerCase() && (
                  <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-slate-900" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="relative max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center z-10">
    {/* Left: Text */}
    <div>
      <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
        {SITE_DATA.name}
      </h1>
      <p className="text-2xl text-slate-700 font-medium mb-4">
        {SITE_DATA.title}
      </p>
      <p className="text-lg text-slate-500 mb-6 italic">{SITE_DATA.tagline}</p>

      <div className="flex flex-wrap gap-4">
        <a
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("projects")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-5 py-3 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-700 transition-colors"
        >
          View Projects
        </a>
        <a
          href={`mailto:${SITE_DATA.email}`}
          className="px-5 py-3 border border-slate-900 text-slate-900 rounded-full text-sm font-medium hover:bg-slate-900 hover:text-white transition-colors"
        >
          Contact Me
        </a>
      </div>
      <div className="mb-12 mt-5">
        {/* Status Bar */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-gray-500 rounded-full text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-700 font-medium">System Nominal</span>
        </div>
      </div>
    </div>

    {/* Right: Image */}
    <div className="relative">
      <div className=" w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200">
        <img
          src="/images/art2.jpg"
          alt="art-image-retro-futurism"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Subtle overlay equation or label */}
      <div className="absolute bottom-4 right-4 text-xs text-white bg-slate-900/60 px-3 py-1.5 rounded-full font-mono">
        ẋ = Ax + Bu
      </div>
    </div>
  </section>
);

const About = () => (
  <section className="max-w-5xl mx-auto px-6 py-20 relative z-10">
    <MathEquations />
    {/* Bio */}
    <div className="prose prose-lg prose-slate max-w-none mb-12">
      <p className="text-lg text-slate-700 leading-relaxed">{SITE_DATA.bio}</p>
    </div>

    {/* Currently Section */}
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-xl border border-slate-200 mb-12">
      <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
        <span className="text-2xl">⚡</span> Currently
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">
            Building
          </p>
          <p className="text-sm text-slate-700 font-medium">
            {SITE_DATA.currently.building}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">
            Reading
          </p>
          <p className="text-sm text-slate-700 font-medium">
            {SITE_DATA.currently.reading}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">
            Obsessed With
          </p>
          <p className="text-sm text-slate-700 font-medium">
            {SITE_DATA.currently.obsessed}
          </p>
        </div>
      </div>
    </div>

    {/* Two Column Layout */}
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      {/* Research Interests */}
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">🔬</span> Research Interests
        </h3>
        <div className="flex flex-wrap gap-2">
          {SITE_DATA.research_interests.map((interest, idx) => (
            <span
              key={idx}
              className="px-3 py-2 bg-slate-50 text-slate-700 text-sm rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Engineering Philosophy */}
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">💡</span> Things I Believe
        </h3>
        <ul className="space-y-3">
          {SITE_DATA.beliefs.slice(0, 4).map((belief, idx) => (
            <li
              key={idx}
              className="text-sm text-slate-700 flex items-start gap-2"
            >
              <span className="text-slate-400 mt-0.5">→</span>
              <span>{belief}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Education */}
    <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm mb-12">
      <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
        <span className="text-2xl">🎓</span> Education
      </h3>
      <div>
        <p className="font-semibold text-slate-900">
          JNTU Hyderabad - University College of Engineering
        </p>
        <p className="text-sm text-slate-600">
          Integrated Dual Degree (B.Tech + M.Tech) in Mechanical Engineering
        </p>
        <p className="text-sm text-slate-500">
          Specialization: Advanced Manufacturing Systems | 2021 - 2026
        </p>
        <p className="text-sm text-slate-500 mt-1">
          GPA: 7.5 | Top 20% of cohort
        </p>
      </div>
    </div>

    {/* Contact Links */}
    <div className="flex flex-wrap gap-6">
      <a
        href={`mailto:${SITE_DATA.email}`}
        className="text-sm text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-2"
      >
        <span>📧</span> Email
      </a>
      <a
        href={SITE_DATA.github}
        className="text-sm text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-2"
      >
        <span>💻</span> GitHub
      </a>
      <a
        href={SITE_DATA.linkedin}
        className="text-sm text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-2"
      >
        <span>💼</span> LinkedIn
      </a>
      <span className="text-sm text-slate-500 flex items-center gap-2">
        <span>📍</span> {SITE_DATA.location}
      </span>
    </div>
  </section>
);

const Projects = () => (
  <section className="max-w-6xl mx-auto px-6 py-16 relative z-10">
    <div className="mb-12">
      <h2 className="text-4xl font-bold text-slate-900 mb-3">Projects</h2>
      <p className="text-lg text-slate-600">
        End-to-end systems that work in the real world
      </p>
    </div>

    <div className="space-y-8">
      {PROJECTS.map((project) => (
        <div
          key={project.id}
          className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
        >
          <div className="grid md:grid-cols-5 gap-0">
            <div className="md:col-span-2 relative overflow-hidden bg-slate-100 aspect-[3/2] max-h-[400px]">
  <img
    src={project.image}
    alt={project.title}
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
  />
  {project.highlight && (
    <div className="absolute top-4 left-4 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-full font-medium">
      {project.highlight}
    </div>
  )}
  {project.status && (
    <div className="absolute bottom-4 left-4 bg-green-500 text-white text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-2">
      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
      {project.status}
    </div>
  )}
</div>


            <div className="md:col-span-3 p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-2 group-hover:text-slate-600 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-sm text-slate-500 font-mono">
                    {project.year}
                  </span>
                </div>
              </div>

              <p className="text-slate-700 mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-slate-50 text-slate-700 text-xs rounded-full border border-slate-200 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                {project.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    className="text-sm text-slate-900 hover:text-slate-600 font-semibold transition-colors flex items-center gap-1 group/link"
                  >
                    {link.label}
                    <span className="group-hover/link:translate-x-1 transition-transform">
                      →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Additional Projects Summary */}
    <div className="mt-12 grid md:grid-cols-3 gap-6">
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h4 className="font-semibold text-slate-900 mb-2">
          Quadruped Spider Robot
        </h4>
        <p className="text-sm text-slate-600 mb-3">
          Arduino-based quadruped with inverse kinematics for gait generation.
          Bluetooth control via mobile app.
        </p>
        <span className="text-xs text-slate-500">
          Arduino • Kinematics • 2023
        </span>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h4 className="font-semibold text-slate-900 mb-2">
          Newsly - AI Fact Checker
        </h4>
        <p className="text-sm text-slate-600 mb-3">
          Multi-agent LLM system for misinformation detection using RAG pipeline
          and vector databases.
        </p>
        <span className="text-xs text-slate-500">
          LLMs • RAG • Docker • 2024
        </span>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h4 className="font-semibold text-slate-900 mb-2">
          Smart Vending System
        </h4>
        <p className="text-sm text-slate-600 mb-3">
          Edge AI system with custom YOLO models on Jetson for real-time product
          detection.
        </p>
        <span className="text-xs text-slate-500">
          Computer Vision • CUDA • 2024
        </span>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section className="max-w-4xl mx-auto px-6 py-16 relative z-10">
    <div className="mb-12">
      <h2 className="text-4xl font-bold text-slate-900 mb-3">
        Let's Build Something
      </h2>
      <p className="text-lg text-slate-600">
        Interested in robotics, control systems, or precision mechatronics?
        Let's talk.
      </p>
    </div>

    <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-10 mb-8">
      <p className="text-slate-700 mb-8 leading-relaxed text-lg">
        I'm always interested in discussing research collaborations, robotics
        projects, or opportunities in human-robot interaction, aerospace
        manufacturing, and precision systems. Whether you're working on space
        robotics, want to chat about Fourier transforms, or just watched the
        latest Starship launch—reach out.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <span>🤝</span> Work with me if...
          </h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>You think precision matters</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>You've debugged code at 3am and loved it</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>You believe hardware beats slides</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>You watched the Starship catch live</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <span>🚀</span> Dream companies
          </h3>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded">
              SpaceX
            </span>
            <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded">
              Relativity Space
            </span>
            <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded">
              Boston Dynamics
            </span>
            <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded">
              Tesla
            </span>
            <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded">
              Machina Labs
            </span>
            <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded">
              Rocket Lab
            </span>
            <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded">
              Formlabs
            </span>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white border border-slate-200 rounded-xl p-8">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">
        Contact Information
      </h3>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-slate-500 w-32 text-sm font-medium">Email</span>
          <a
            href={`mailto:${SITE_DATA.email}`}
            className="text-slate-900 hover:text-slate-600 transition-colors font-mono text-sm"
          >
            {SITE_DATA.email}
          </a>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-slate-500 w-32 text-sm font-medium">Phone</span>
          <a
            href={`tel:${SITE_DATA.phone}`}
            className="text-slate-900 hover:text-slate-600 transition-colors font-mono text-sm"
          >
            {SITE_DATA.phone}
          </a>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-slate-500 w-32 text-sm font-medium">
            GitHub
          </span>
          <a
            href={SITE_DATA.github}
            className="text-slate-900 hover:text-slate-600 transition-colors text-sm"
          >
            {SITE_DATA.github.replace("https://", "")}
          </a>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-slate-500 w-32 text-sm font-medium">
            LinkedIn
          </span>
          <a
            href={SITE_DATA.linkedin}
            className="text-slate-900 hover:text-slate-600 transition-colors text-sm"
          >
            {SITE_DATA.linkedin.replace("https://", "")}
          </a>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-slate-500 w-32 text-sm font-medium">
            Location
          </span>
          <span className="text-slate-700 text-sm">{SITE_DATA.location}</span>
        </div>
      </div>
    </div>

    <div className="mt-8 p-6 bg-slate-900 text-white rounded-xl">
      <p className="text-sm font-mono mb-2">$ status --current</p>
      <p className="text-slate-300 text-sm">
        Available for internships and research collaborations | Open to
        relocation | Graduating May 2026
      </p>
    </div>
  </section>
);

// Main App

type BlogPost = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  year: string;
  links: { label: string; url: string }[];
  highlight?: string;
  status?: string;
};


export default function App() {
  const [activeSection, setActiveSection] = useState("about");
  
  const [activePost, setActivePost] = useState<BlogPost | null>(null);


  return (
    <div className="min-h-screen bg-slate-50 relative">
      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {activeSection === "about" && (
        <>
          <Hero />
          <About />
        </>
      )}
      {activeSection === "projects" && <Projects />}
      {activeSection === "blog" &&
  (activePost ? (
    <BlogPostComponent
    // @ts-ignore
      post={activePost}
      onBack={() => setActivePost(null)}
    />
  ) : (
    <BlogList
  posts={BLOG_POSTS}
  // @ts-ignore
  onPostClick={setActivePost}
/>
  ))}

      <footer className="border-t border-slate-200 mt-20 relative z-10 bg-white/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-slate-900 font-semibold mb-1">
                {SITE_DATA.name}
              </p>
              <p className="text-xs text-slate-500">
                © {new Date().getFullYear()} · Built with React · Fourier
                transforms not included
              </p>
            </div>
            <div className="flex gap-6 text-xs text-slate-500">
              <a
                href={SITE_DATA.github}
                className="hover:text-slate-900 transition-colors"
              >
                GitHub
              </a>
              <a
                href={SITE_DATA.linkedin}
                className="hover:text-slate-900 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${SITE_DATA.email}`}
                className="hover:text-slate-900 transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
