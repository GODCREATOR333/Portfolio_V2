export interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  readTime: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Building Galvanometers from Hard Drives: A ₹3k Precision Actuator",
    date: "2024-10-15",
    excerpt: "How I achieved sub-millimeter precision using salvaged HDD voice coil motors and careful system identification.",
    content: `
# Building Galvanometers from Hard Drives

When commercial galvanometer scanners proved too expensive (₹50k+), I turned to an unconventional source: salvaged hard disk drives. Here's how I converted HDD voice coil motors into precision scanning systems.

## The Physics

Commercial galvos are just voice coil motors with mirrors. HDDs contain exactly this mechanism—a high-bandwidth linear actuator with minimal friction. The challenge: can we characterize and control it precisely enough?

## Approach

**Mechanical Design:**
- Carefully extract VCM without damaging coil windings
- Design 3D-printed mounts for mirror attachment
- Minimize mechanical play and ensure rigid coupling

**System Identification:**
- Sweep frequency response to identify natural modes
- Characterize nonlinearities (magnetic saturation, friction)
- Build transfer function model for controller design

**Control Implementation:**
- Implement PID at 100Hz on microcontroller
- Compare against LQR and MPC strategies
- Integrate IMU feedback for vibration compensation

## Results

After dozens of calibration trials and controller tuning iterations, achieved **≤0.5mm positioning accuracy** at 50cm target distance. Key insight: consistency matters more than absolute accuracy—once nonlinearities are characterized, they can be compensated in software.

The system now tracks targets in real-time while rejecting vibrations from the platform motion. Total cost: **₹3,000** vs ₹50,000+ commercial solution.

## What I Learned

- System ID is your best friend when working with unknown hardware
- Kalman filters are magical for sensor fusion
- Control theory works—but only after you've modeled reality correctly
    `,
    tags: ["Mechatronics", "Control Theory", "DIY Engineering"],
    readTime: "10 min read"
  },
  {
    id: 2,
    title: "Why I Chose ROS2 Over ROS1 (And Regretted It Twice)",
    date: "2024-09-20",
    excerpt: "Real-time robotics requires more than just ROS—it demands understanding the full software stack.",
    content: `
# Why I Chose ROS2 Over ROS1 (And Regretted It Twice)

Building a real-time vision system for robotics taught me that choosing the right middleware is only half the battle.

## The Promise

ROS2 promised:
- Real-time capabilities with DDS
- Better reliability and QoS
- Modern C++ and Python APIs
- Native support for distributed systems

## The Reality

**Challenge 1: Latency Surprises**
Even with FastRTPS and real-time optimizations, achieving consistent <20ms latency required diving deep into:
- DDS QoS profiles (volatile vs transient_local)
- Executor tuning
- CPU affinity and thread priorities
- Linux Preempt_RT kernel patches

**Challenge 2: Debugging Hell**
When things break in ROS2, the error messages are... cryptic. DDS layer issues, middleware incompatibilities, and version mismatches ate days of debugging time.

## What Worked

1. **Preempt_RT Linux**: Absolute game-changer for deterministic timing
2. **Custom executors**: Fine control over callback execution
3. **CUDA optimization**: Offload vision processing to GPU
4. **WebRTC**: For low-latency video streaming

## Lessons

- Real-time performance requires system-level thinking beyond middleware choice
- Profile everything—intuition fails at microsecond timescales
- The documentation is incomplete; read the source code
- Sometimes simple is better than "modern"

Would I choose ROS2 again? Yes—but with much lower expectations and better planning.
    `,
    tags: ["ROS2", "Real-Time Systems", "Robotics"],
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "Fourier Transforms and Why They're Everywhere in Control",
    date: "2024-08-10",
    excerpt: "From frequency response analysis to signal processing—the unreasonable effectiveness of Fourier analysis.",
    content: `
# Fourier Transforms: The Swiss Army Knife of Control

Every time I analyze a control system, I end up in frequency domain. Here's why Fourier transforms are fundamental to real-world robotics.

## Frequency Response Analysis

When tuning PID controllers for my galvo scanner, time-domain simulation only got me so far. Switching to frequency domain revealed:
- Natural resonant frequencies (avoid them!)
- Phase margins (stability metrics)
- Bandwidth limitations (how fast can we go?)

## Vibration Analysis

My platform vibrates. A lot. Time-domain data looks like noise. FFT reveals:
- Dominant vibration modes at 15Hz, 47Hz (motor PWM artifacts)
- Resonances that coupling through structure
- Which frequencies to filter vs reject via control

## Signal Processing

Every sensor is noisy. Fourier analysis helps design filters:
- Lowpass for position feedback (remove high-freq noise)
- Bandpass for vibration detection (isolate specific modes)
- Notch filters for known interference sources

## The Math

The continuous Fourier transform might look scary:

F(ω) = ∫ f(t) e^(-iωt) dt

But it's just projecting your signal onto sinusoidal basis functions. Each frequency component tells you "how much of this frequency exists in my signal?"

## Practical Implementation

In practice, I use:
- NumPy's FFT for analysis
- SciPy's signal processing for filter design
- MATLAB for quick frequency response plots

The DFT approximation works great for sampled data, and modern FFT algorithms make it blazingly fast.

## Why It Matters

Understanding frequency domain isn't academic—it's the difference between:
- Stable vs oscillating control
- Clean vs noisy sensor data
- Fast vs sluggish response

Every control engineer should be comfortable flipping between time and frequency domains. It's like having X-ray vision for dynamic systems.
    `,
    tags: ["Control Theory", "Signal Processing", "Mathematics"],
    readTime: "12 min read"
  }
];