"use client";

import React, { useState, useEffect } from "react";

// ============================================
// TYPES & INTERFACES
// ============================================

interface Link {
  label: string;
  url: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  year: string;
  links: Link[];
  highlight?: string;
  status?: string;
  videos?: string[]; // Added video support here
}

// ============================================
// DATA SECTION
// ============================================

const SITE_DATA = {
  name: "S Hari Preetham",
  title: "Robotics & Mechatronics Engineer",
  tagline: "Building precision systems from first principles.",
  degree: "B.Tech + M.Tech (Dual Degree) in Mechanical Engineering",
  specialization: "Advanced Manufacturing Systems",
  university: "JNTU Hyderabad (2021-2026)",
  email: "haripreetham.jntuh@gmail.com",
  phone: "+91 7013589964",
  github: "https://github.com/godcreator333",
  linkedin: "https://www.linkedin.com/in/hari-preetham-934789201/",
  location: "Hyderabad, India",
  bio: `I'm a mechanical engineer obsessed with building robots that work in the real world. My work spans precision mechatronics, real-time control systems, and computer vision—turning math and physics into machines that sense, adapt, and act reliably. I can combine mechanical engineering fundamentals with low-level software to model, control, or optimize real machinery.`,
  
  currently: {
    building: "Laser weeding robot (Active Vibration Compensation)",
    reading: "Forward/Inverse Kinematics, Coordinate tranformations",
    obsessed: "Control theory, Starship, Sub-mm precision",
  },

  skills: {
    hardware: ["SolidWorks", "Fusion 360", "PCB Design", "3D Printing", "Sensors & Actuators"],
    firmware: ["C/C++", "Arduino", "STM32", "ESP32", "Serial/I2C/SPI"],
    software: ["Python", "ROS2", "Linux (RT)", "OpenCV", "PyTorch/YOLO", "Docker"],
    theory: ["Control Systems (PID/LQR)", "Kinematics", "System ID", "Signal Processing"],
  },

  library: [
    { title: "Robotics,Vision and Control", author: "Peter Corke", type: "Textbook" },
    { title: "Kalman Filter", author: "Research Papers", type: "Current read" },
  ]
};

const FEATURED_PROJECT = {
  id: 0,
  title: "Laser-Based Precision Weeder",
  role: "Current Focus",
  description:
    "End-to-end mechatronics system with custom 2-axis galvanometer scanners built from salvaged HDD voice coil motors. Implements visual-inertial fusion and MPC for line-of-sight stabilization targeting ≤0.5mm accuracy.",
  tags: ["Mechatronics", "Comp Vision", "Control Theory", "C++"],
  videos: ["/videos/open_loop_slow.mp4", "/videos/Physics_engine.webm"],
  image: "/images/spectra.jpeg",
  year: "2024-Present",
  links: [
    { label: "GitHub", url: "https://github.com/godcreator333" },
    { label: "Paper (Draft)", url: "#" },
  ],
  highlight: "Sub-mm accuracy on ₹3k budget",
  status: "Active Development",
};

// 1. FREELANCE / CONSULTING PROJECTS
const FREELANCE_WORK: Project[] = [
  {
    id: 101,
    title: "Smart Vending Edge AI (O2 Labs)",
    description:
      "Freelance Machine Learning Engineer. Developed deployed a POC for smart vending machine application using YOLO & SAM2 for object detection,segmentation, and classification. Optimized Nvidia Jetson edge workflows with Preempt RT dual-kernel strategies, reducing inference latency.",
    tags: ["Freelance", "Nvidia Jetson","YOLOv8"],
    videos: ["/videos/Qwen2-VL-Vending.webm"],
    image: "/images/smart_vending.png",
    year: "Aug 2024",
    links: [],
    highlight: "Developed Commercial Solution",
  },
  {
    id: 102,
    title: "Healthcare CMS Platform (Healtour)",
    description:
      "Head of Development (Freelance). Built and deployed a CMS platform with advanced search/filter for treatments, doctors, and hospitals.Added features: keyword search, live chat, customizable webpages, automated confirmations, bulkupload/export.Developed a wellness e-commerce platform with Razorpay integration and heatmap analytics for userbehavior.",
    tags: ["Freelance", "System Design", "PHP/SQL", "Analytics"],
    image: "/images/healtour.jpeg",
    year: "May 2024",
    links: [{ label: "Live Site", url: "https://healtourin.com/" }],
    highlight: "Head of Development",
  },
];

// 2. PERSONAL & RESEARCH PROJECTS
const PERSONAL_PROJECTS: Project[] = [
  {
    id: 201,
    title: "Newsly - AI Verification Agent",
    description:
      "Newsly is a self-hosted, AI-powered news aggregation and verification platform designed to combat misinformation and promote accountability. By leveraging a multi-agent system, Newsly scrapes news from various sources, cross-verifies the information, and generates reliable articles and podcasts. The system is designed to ensure transparency in reporting by tracking statements from politicians, crime justice statuses, and other critical societal topics.",
    tags: ["Autogen", "LLMs", "RAG", "Docker", "Python"],
    image: "/images/newsly.png",
    year: "2024",
    links: [{ label: "Github", url: "https://github.com/GODCREATOR333/Newsly" }],
    highlight: "Multi-Agent System",
  },
  {
    id: 202,
    title: "Instagram Multimodal Search",
    description:
      "Vector search engine for saved social media content. Integrates SuperDuperDB with OpenAI CLIP to generate multimodal embeddings, allowing users to search their saved images/videos using natural language descriptions.",
    tags: ["OpenAI CLIP", "Vector DB", "MongoDB", "Python"],
    image: "/images/insta.png",
    year: "2024",
    links: [{ label: "Github", url: "https://github.com/GODCREATOR333/Instagram_Vector_Search" }],
    highlight: "Vector Search Engine",
  },
  {
    id: 203,
    title: "ROS2 Visual Processor",
    description:
      "Real-time vision stack for robotics. Integrated YOLOv8 with ROS2 and WebRTC for ~15ms inference latency for remote operated robots to transmit video feed and perform realtime object detection and segmentation.",
    tags: ["ROS2", "CUDA", "Real-Time Linux", "SLAM"],
    image: "/images/ros2_e2e.png",
    videos: ["/videos/ros2.mp4"], 
    year: "2024",
    links: [
      {
        label: "Github",
        url: "https://github.com/GODCREATOR333/ROS2_E2E_VisualProcessor",
      },
    ],
    highlight: "YOLO on ROS2",
  },
  {
    id: 204,
    title: "Simulation of Aero-theromodynamic parameters for Missile Applications (DRDO)",
    description:
      "Research Internship. Developed Python/SciPy/PyROOT models for reentry vehicle heating analysis. Analyzed 13,000+ data points to improve prediction accuracy over baseline MATLAB models.",
    tags: ["Python", "SciPy", "Aerospace", "PyROOT"],
    image: "/images/drdo.png",
    year: "2023",
    links: [{ label: "Github", url: "https://github.com/GODCREATOR333/Simulation_Aerodynamic_Heating" }],
    highlight: "Defense Research",
  },
  {
    id: 205,
    title: "DIY Motion Capture",
    description:
      "Indoor motion capture setup using high-speed PS3 Eye cameras. Performed intrinsic/extrinsic calibration and explored epipolar geometry for 3D reconstruction of robot dynamics.",
    tags: ["Computer Vision", "Calibration", "System ID"],
    image: "/images/mocap.png",
    year: "2023",
    links: [],
    highlight: "Research Tool",
  },
  {
  id: 206,
    title: "Quadruped Spider Robot",
    description:
      "This project involves the design and implementation of a quadruped spider robot controlled by a mobile phone using Bluetooth technology. The robot uses an Arduino Uno microcontroller, servo motors, and inverse kinematics to achieve stable locomotion through gait generation.",
    tags: ["Robotics", "Kinematics", "Arduino",],
    videos: ["/videos/robot.mp4"], 
    image: "/images/robot.png", 
    year: "2023",
    links: [],
    highlight: "Bluetooth controlled robot",
  },
  {
    id: 207,
    title: "Enhancement of 3D Printed PLA via Chemical Vapor Treatment",
    description:
      "Bachelor’s Thesis. Investigated acetone, Dichloromethane (DCM), and chloroform vapor treatments on FDM 3D-printed PLA. Achieved 40% improvement in surface finish and 15% increase in tensile strength (UTM). Simulated thermal and fluid flow conditions in ANSYS to optimize treatment uniformity.",
    tags: ["ANSYS", "Material Science", "3D Printing", "Research"],
    image: "/images/cvt.jpeg",
    year: "2024-2025",
    links: [],
    highlight: "Chemical Vapor Treatment",
  },
];

// ============================================
// SHARED UI COMPONENTS
// ============================================

const GridBackground = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)] opacity-20" />
  </div>
);

const SectionHeading = ({ title, icon }: { title: string; icon?: string }) => (
  <div className="flex items-center gap-3 mb-8 border-b border-zinc-200 pb-4">
    {icon && <span className="text-xl">{icon}</span>}
    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 font-sans">
      {title}
    </h2>
  </div>
);

// ============================================
// VIDEO MODAL COMPONENT
// ============================================

const VideoModal = ({ videos, onClose }: { videos: string[]; onClose: () => void }) => (
  <div 
    className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
    onClick={onClose}
  >
    <div 
      className="relative w-full max-w-5xl bg-zinc-900 rounded-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center p-4 border-b border-zinc-800 bg-zinc-900">
        <h3 className="text-white font-mono text-sm">Media Player</h3>
        <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
          ✕ Close
        </button>
      </div>
      
      <div className={`overflow-y-auto p-4 bg-black grid gap-4 ${videos.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
        {videos.map((vid, i) => (
          <div key={i} className="rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900">
             <video 
                src={vid} 
                controls 
                autoPlay={i === 0} 
                className="w-full h-auto"
             />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ============================================
// MAIN SECTIONS
// ============================================

const Navigation = ({
  activeSection,
  setActiveSection,
}: {
  activeSection: string;
  setActiveSection: (section: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const sections = ["About", "Projects", "Contact"];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <div 
          className="font-bold text-lg tracking-tight cursor-pointer z-50"
          onClick={() => {
            setActiveSection("about");
            setIsOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {SITE_DATA.name}
          <span className="hidden sm:inline text-zinc-400 font-normal mx-2">/</span>
          <span className="hidden sm:inline font-mono text-xs text-zinc-500 bg-zinc-100 px-2 py-1 rounded">
            SYS_ENG
          </span>
        </div>

        {/* Desktop Menu (Hidden on Mobile) */}
        <div className="hidden md:flex gap-6">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section.toLowerCase())}
              className={`text-sm font-medium transition-all ${
                activeSection === section.toLowerCase()
                  ? "text-black underline underline-offset-4 decoration-2 decoration-blue-600"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Mobile Hamburger Button (Visible on Mobile) */}
        <button 
            className="md:hidden p-2 text-zinc-600 hover:text-zinc-900 z-50"
            onClick={() => setIsOpen(!isOpen)}
        >
            {isOpen ? (
                // Close Icon (X)
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            ) : (
                // Hamburger Icon
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            )}
        </button>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
            <div className="absolute top-16 left-0 w-full bg-white border-b border-zinc-200 shadow-xl md:hidden flex flex-col animate-in slide-in-from-top-5 duration-200">
                {sections.map((section) => (
                    <button
                        key={section}
                        onClick={() => {
                            setActiveSection(section.toLowerCase());
                            setIsOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`text-left px-6 py-4 text-sm font-medium border-b border-zinc-50 transition-colors ${
                            activeSection === section.toLowerCase()
                                ? "bg-zinc-50 text-blue-600"
                                : "text-zinc-600 hover:bg-zinc-50"
                        }`}
                    >
                        {section}
                    </button>
                ))}
            </div>
        )}
      </div>
    </nav>
  );
};


const Hero = ({ onViewProjects }: { onViewProjects: () => void }) => (
  <section className="relative pt-12 md:pt-20 pb-16 max-w-5xl mx-auto px-6">
    <div className="grid md:grid-cols-3 gap-12 items-start">
      <div className="md:col-span-2 space-y-8">
        
        {/* Quick Badge Row */}
        <div className="flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full text-xs font-mono text-green-700">
                <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Open to Work
            </div>
            <div className="inline-flex items-center px-3 py-1 bg-zinc-50 border border-zinc-200 rounded-full text-xs font-mono text-zinc-600">
                📍 {SITE_DATA.location}
            </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 leading-[1.1]">
            <span className="block text-xl md:text-2xl font-medium text-zinc-500 mb-2 tracking-normal">
              Hi, I'm <span className="text-zinc-900">{SITE_DATA.name}</span>.
            </span>
            From Algorithms <br />
            <span className="bg-clip-text text-zinc-800">
            to Actuators.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-600 font-light max-w-lg leading-relaxed">
            {SITE_DATA.tagline}
          </p>
          
          {/* Degree Highlight */}
          <div className="flex flex-col gap-1 border-l-2 border-blue-200 pl-4 py-1">
            <span className="text-sm font-bold text-zinc-900">{SITE_DATA.degree}</span>
            <span className="text-xs text-zinc-500">{SITE_DATA.specialization} • {SITE_DATA.university}</span>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={onViewProjects}
            className="px-6 py-2.5 bg-zinc-900 text-white rounded-md text-sm font-semibold hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-200/50"
          >
            View Projects
          </button>
          <a
            href={SITE_DATA.linkedin}
            target="_blank" 
            rel="noreferrer"
            className="px-6 py-2.5 bg-white text-zinc-700 border border-zinc-200 rounded-md text-sm font-semibold hover:bg-zinc-50 hover:text-blue-600 transition-colors flex items-center gap-2"
          >
            LinkedIn ↗
          </a>
           <a
            href={SITE_DATA.github}
            target="_blank" 
            rel="noreferrer"
            className="px-6 py-2.5 bg-white text-zinc-700 border border-zinc-200 rounded-md text-sm font-semibold hover:bg-zinc-50 hover:text-black transition-colors flex items-center gap-2"
          >
            GitHub ↗
          </a>
        </div>
      </div>

      {/* Terminal / System Log */}
      <div className="relative hidden md:block mt-8">
        <div className="absolute -inset-1 bg-gradient-to-r from-zinc-600 to-zinc-800 rounded-lg blur opacity-20"></div>
        <div className="relative bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden shadow-2xl font-mono text-xs">
          <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
            <span className="text-zinc-500">root@sys-eng:~# /dev/ttyUSB0</span>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            </div>
          </div>
          <div className="p-6 text-zinc-300 space-y-1.5 leading-relaxed">
            <div className="flex gap-3">
              <span className="text-zinc-500">[0.0002]</span>
              <span>KERNEL: <span className="text-green-500">PREEMPT_RT</span> initialized</span>
            </div>
            <div className="flex gap-3">
              <span className="text-zinc-500">[0.0421]</span>
              <span>HAL: GPIO initialized. UART baud: <span className="text-blue-400">115200</span></span>
            </div>
            <div className="flex gap-3">
              <span className="text-zinc-500">[0.1550]</span>
              <span>IMU: BNO055 detected. Calibrating... <span className="text-green-500">OK</span></span>
            </div>
             <div className="flex gap-3">
              <span className="text-zinc-500">[0.1582]</span>
              <span>IMU: Sigma &lt; 1e-3 rad/s. Bias compensated.</span>
            </div>
            <div className="flex gap-3">
              <span className="text-zinc-500">[0.4020]</span>
              <span>ROS2: Nodes started: [perception, planner, control]</span>
            </div>
            <div className="flex gap-3">
              <span className="text-zinc-500">[0.8801]</span>
              <span>CONTROL: MPC Horizon: <span className="text-blue-400">20 steps</span>. Freq: <span className="text-blue-400">1kHz</span></span>
            </div>
            <div className="flex gap-3 border-t border-zinc-800 mt-2 pt-2 text-green-400">
              <span className="text-zinc-500">[1.0000]</span>
              <span>SYSTEM READY. WAITING FOR COMMAND...</span>
              <span className="animate-pulse block w-2 h-4 bg-green-500 ml-1"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const About = ({ onPlay }: { onPlay: (videos: string[]) => void }) => (
  <section className="max-w-5xl mx-auto px-6 py-12">
    <div className="grid md:grid-cols-12 gap-12">
      
      {/* Left Column: Bio & Skills */}
      <div className="md:col-span-8 space-y-12">
        
        {/* Bio Section */}
        <div>
            <SectionHeading title="About Me" />
            <div className="prose prose-zinc max-w-none text-zinc-600 leading-relaxed">
            <p className="text-lg">{SITE_DATA.bio}</p>
            </div>
        </div>

        {/* FEATURED PROJECT SECTION */}
        <div>
            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                <span>👨🏻‍💻</span> Currently Working on....
            </h3>
            <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                 <div className="grid md:grid-cols-2 gap-0">
                    <div className="bg-zinc-100 relative h-48 md:h-auto overflow-hidden border-b md:border-b-0 md:border-r border-zinc-200">
                        <img 
                            src={FEATURED_PROJECT.image} 
                            alt={FEATURED_PROJECT.title} 
                            className="w-full h-full object-cover" 
                        />
                        <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
                            In Progess
                        </div>
                    </div>
                    <div className="p-5 flex flex-col justify-between">
                        <div>
                            <h4 className="font-bold text-zinc-900 text-lg mb-2">{FEATURED_PROJECT.title}</h4>
                            <p className="text-xs text-zinc-600 leading-relaxed mb-4">{FEATURED_PROJECT.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {FEATURED_PROJECT.tags.map((t, i) => (
                                <span key={i} className="text-[10px] border border-zinc-200 px-1.5 py-0.5 rounded text-zinc-500">{t}</span>
                            ))}
                        </div>
                        
                        {/* LINKS SECTION WITH WATCH DEMO BUTTON */}
                        <div className="flex gap-4 items-center">
                            {FEATURED_PROJECT.videos && (
                                <button 
                                    onClick={() => onPlay(FEATURED_PROJECT.videos!)}
                                    className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 bg-white hover:bg-red-100 px-2 py-1 rounded transition-colors"
                                >
                                    ▶ Watch Demo
                                </button>
                            )}
                            
                            {FEATURED_PROJECT.links.map((link, i) => (
                                <a key={i} href={link.url} className="text-xs font-bold text-zinc-900 hover:text-blue-600 flex items-center gap-1">
                                    {link.label} ↗
                                </a>
                            ))}
                        </div>
                    </div>
                 </div>
            </div>
        </div>

        {/* The Technical skills */}
        <div>
            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                <span>⚡</span> Technical Skills
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-lg">
                    <h4 className="font-semibold text-zinc-900 text-sm mb-2">Hardware & Electronics</h4>
                    <div className="flex flex-wrap gap-1.5">
                        {SITE_DATA.skills.hardware.map((s,i) => (
                            <span key={i} className="text-xs bg-white px-2 py-1 rounded border border-zinc-200 text-zinc-600">{s}</span>
                        ))}
                    </div>
                </div>
                <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-lg">
                    <h4 className="font-semibold text-zinc-900 text-sm mb-2">Firmware & Embedded</h4>
                    <div className="flex flex-wrap gap-1.5">
                        {SITE_DATA.skills.firmware.map((s,i) => (
                            <span key={i} className="text-xs bg-white px-2 py-1 rounded border border-zinc-200 text-zinc-600">{s}</span>
                        ))}
                    </div>
                </div>
                 <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-lg">
                    <h4 className="font-semibold text-zinc-900 text-sm mb-2">Robotics Software</h4>
                    <div className="flex flex-wrap gap-1.5">
                        {SITE_DATA.skills.software.map((s,i) => (
                            <span key={i} className="text-xs bg-white px-2 py-1 rounded border border-zinc-200 text-zinc-600">{s}</span>
                        ))}
                    </div>
                </div>
                <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-lg">
                    <h4 className="font-semibold text-zinc-900 text-sm mb-2">Theory & Control</h4>
                    <div className="flex flex-wrap gap-1.5">
                        {SITE_DATA.skills.theory.map((s,i) => (
                            <span key={i} className="text-xs bg-white px-2 py-1 rounded border border-zinc-200 text-zinc-600">{s}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>

      </div>

      {/* Right Column: Sidebar Stats */}
      <div className="md:col-span-4 space-y-8">
        
        {/* Input/Output */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
           <h3 className="font-bold text-zinc-900 mb-4 border-b border-zinc-100 pb-2 flex items-center gap-2">
            <span>📚</span> Input / Output
           </h3>
           <p className="text-xs text-zinc-500 mb-4">Influences and current reading list.</p>
           <ul className="space-y-3">
             {SITE_DATA.library.map((book, i) => (
                <li key={i} className="flex justify-between items-start text-sm">
                    <div>
                        <span className="text-zinc-800 font-medium block">{book.title}</span>
                        <span className="text-zinc-500 text-xs">{book.author}</span>
                    </div>
                    <span className="text-[10px] bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-500 font-mono">{book.type}</span>
                </li>
             ))}
           </ul>
        </div>

        {/* Current Status */}
        <div className="bg-zinc-900 rounded-xl p-6 text-white shadow-lg">
             <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <span>🚀</span> Status
           </h3>
           <div className="space-y-4">
                <div>
                    <p className="text-xs text-zinc-400 font-mono mb-1">CURRENTLY BUILDING</p>
                    <p className="text-sm font-medium">{SITE_DATA.currently.building}</p>
                </div>
                <div>
                    <p className="text-xs text-zinc-400 font-mono mb-1">OBSESSED WITH</p>
                    <p className="text-sm font-medium">{SITE_DATA.currently.obsessed}</p>
                </div>
           </div>
        </div>

      </div>
    </div>
  </section>
);

const Projects = ({ onPlay }: { onPlay: (videos: string[]) => void }) => (
  <section className="max-w-5xl mx-auto px-6 py-12" id="projects">
    
    {/* SECTION 1: FREELANCE */}
    <div className="mb-16">
        <SectionHeading title="Freelance & Consulting Work" icon="💼" />
        <div className="grid gap-8">
            {FREELANCE_WORK.map((project) => (
                <ProjectCard key={project.id} project={project} onPlay={onPlay} />
            ))}
        </div>
    </div>

    {/* SECTION 2: PERSONAL / RESEARCH */}
    <div>
        <SectionHeading title="Research & Personal Engineering" icon="🔬" />
        <div className="grid gap-8">
            {PERSONAL_PROJECTS.map((project) => (
                <ProjectCard key={project.id} project={project} onPlay={onPlay} />
            ))}
        </div>
    </div>

  </section>
);

const ProjectCard = ({ project, onPlay }: { project: Project; onPlay: (videos: string[]) => void }) => (
    <div className="group relative bg-white border border-zinc-200 rounded-lg overflow-hidden hover:border-zinc-400 transition-all duration-200 hover:shadow-md">
        <div className="grid md:grid-cols-4 gap-0">
        {/* Image Section */}
        <div className="md:col-span-1 bg-zinc-100 relative h-56 md:h-auto overflow-hidden border-b md:border-b-0 md:border-r border-zinc-200 group-hover:bg-zinc-50 transition-colors">
            <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-contain transition-all duration-500"
            />
        </div>

        {/* Content Section */}
        <div className="md:col-span-3 p-6 flex flex-col justify-between">
            <div>
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-zinc-900 group-hover:text-blue-600 transition-colors">
                {project.title}
                </h3>
                <div className="flex gap-2 shrink-0">
                {project.highlight && (
                    <span className="hidden sm:inline-block px-2 py-0.5 bg-yellow-50 text-yellow-800 border border-yellow-200 text-[10px] font-mono rounded-full uppercase tracking-wider">
                        {project.highlight}
                    </span>
                )}
                <span className="text-xs font-mono text-zinc-400 border border-zinc-100 px-2 py-0.5 rounded">
                    {project.year}
                </span>
                </div>
            </div>
            
            <p className="text-zinc-600 mb-4 text-sm leading-relaxed">
                {project.description}
            </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-zinc-50">
            <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <span className={`w-2 h-2 rounded-full ${
                        tag.includes("Freelance") ? "bg-green-400" :
                        tag.includes("Vision") || tag.includes("AI") ? "bg-purple-400" :
                        tag.includes("Control") ? "bg-red-400" :
                        "bg-blue-400"
                    }`}></span>
                    {tag}
                </div>
                ))}
            </div>
            
            <div className="flex gap-4 text-sm font-medium">
                {/* Watch Demo Button - Added here */}
                {project.videos && project.videos.length > 0 && (
                    <button 
                        onClick={() => onPlay(project.videos!)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                    >
                        ▶ Watch Demo
                    </button>
                )}

                {project.links.map((link, idx) => (
                <a
                    key={idx}
                    href={link.url}
                    className="flex items-center gap-1 text-zinc-900 hover:text-blue-600 hover:underline underline-offset-2"
                >
                    {link.label}
                    <span className="text-xs">↗</span>
                </a>
                ))}
            </div>
            </div>
        </div>
        </div>
    </div>
);

const Contact = () => (
  <section className="max-w-3xl mx-auto px-6 py-16">
    <SectionHeading title="Get In Touch" />
    
    <div className="bg-white border border-zinc-200 rounded-lg p-8 shadow-sm">
      <p className="text-lg text-zinc-700 mb-8 leading-relaxed">
        I'm actively looking for full-time roles in <strong>Robotics, Control Systems, and Mechatronics</strong>. 
        If you are working on hard engineering problems—space robotics, precision manufacturing, or autonomous systems—I'd love to talk.
      </p>

      <div className="space-y-4 font-mono text-sm">
        <a href={`mailto:${SITE_DATA.email}`} className="flex items-center gap-4 p-3 rounded hover:bg-zinc-50 transition-colors border border-transparent hover:border-zinc-200 group">
          <span className="text-zinc-400 w-24">EMAIL</span>
          <span className="text-zinc-900 group-hover:text-blue-600 break-all">{SITE_DATA.email}</span>
        </a>
        <a href={SITE_DATA.github} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-3 rounded hover:bg-zinc-50 transition-colors border border-transparent hover:border-zinc-200 group">
          <span className="text-zinc-400 w-24">GITHUB</span>
          <span className="text-zinc-900 group-hover:text-blue-600">github.com/godcreator333</span>
        </a>
        <a href={SITE_DATA.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-3 rounded hover:bg-zinc-50 transition-colors border border-transparent hover:border-zinc-200 group">
          <span className="text-zinc-400 w-24">LINKEDIN</span>
          <span className="text-zinc-900 group-hover:text-blue-600">linkedin.com/in/hari-preetham</span>
        </a>
      </div>

      <div className="mt-8 pt-8 border-t border-zinc-100">
        <p className="text-xs text-zinc-500 font-mono">
            $ echo "Available for relocation: Yes"
        </p>
      </div>
    </div>
  </section>
);

export default function App() {
  const [activeSection, setActiveSection] = useState("about");
  // State for Video Modal
  const [playingVideos, setPlayingVideos] = useState<string[] | null>(null);

  // Handle browser back button or direct link state
  useEffect(() => {
    setActiveSection("about");
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-blue-100 selection:text-blue-900 relative isolate">
      <GridBackground />
      
      {/* Video Modal Renderer */}
      {playingVideos && (
        <VideoModal videos={playingVideos} onClose={() => setPlayingVideos(null)} />
      )}

      <Navigation
        activeSection={activeSection}
        setActiveSection={(section) => {
            setActiveSection(section);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      <main className="min-h-[calc(100vh-200px)]">
        {activeSection === "about" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Hero onViewProjects={() => {
                setActiveSection("projects");
                window.scrollTo({ top: 0, behavior: "smooth" });
            }} />
            <About onPlay={setPlayingVideos} />
          </div>
        )}
        
        {activeSection === "projects" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Projects onPlay={setPlayingVideos} />
          </div>
        )}

        {activeSection === "contact" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Contact />
            </div>
        )}
      </main>

      <footer className="border-t border-zinc-200 bg-white/50 backdrop-blur-sm mt-12">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-mono">
          <p>© {new Date().getFullYear()} S Hari Preetham. Built with React.</p>
          <p>System Status: <span className="text-green-600">Operational</span></p>
        </div>
      </footer>
    </div>
  );
}