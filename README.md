
# 3D Target Selection Study (Three.js + Next.js)

Browser-based 3D target selection experiment to measure **speed** and **accuracy** across **mobile and desktop** devices. This project compares two common XR-style selection techniques in a reproducible, headset-free setup that runs in a standard web browser.

---

## Table of Contents
- [3D Target Selection Study (Three.js + Next.js)](#3d-target-selection-study-threejs--nextjs)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Study Goals](#study-goals)
  - [Interaction Techniques](#interaction-techniques)
    - [1) Reticle Raycast (Center Cursor)](#1-reticle-raycast-center-cursor)
    - [2) Touch-Point Raycast (Tap Location)](#2-touch-point-raycast-tap-location)
  - [Experimental Design](#experimental-design)
  - [Prototype \& Flow](#prototype--flow)
  - [Data Logging \& Export](#data-logging--export)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
  - [Project Deliverables](#project-deliverables)
  - [References](#references)
  - [Learn More](#learn-more)

---

## Overview

Target selection is a foundational interaction primitive across **AR/VR/XR** systems, yet it remains error-prone for **small**, **distant**, **dense**, or **occluded** targets. Small interaction design differences can significantly affect performance and workload.

This project implements a lightweight, browser-based 3D selection micro-benchmark to produce practical evidence for selection design decisions in:
- web-delivered 3D interfaces
- handheld AR-like interactions
- XR-inspired UI patterns without requiring headsets or lab setups

---

## Study Goals
- Compare how two selection techniques affect:
  - **selection time per trial**
  - **error rate**
  - **miss / overshoot rate** (taps/clicks that hit nothing or the wrong target)
- Support both **mobile** and **desktop** inputs
- Provide a **reproducible** experiment with consistent layouts and logging
- Export results in a **copy/paste-friendly JSON summary**

---

## Interaction Techniques

### 1) Reticle Raycast (Center Cursor)
A fixed reticle at the screen center casts a ray into the scene; selection occurs on tap/click.

**Intuition:** stable aiming reference, but requires camera alignment and can be slower for quick “tap” behaviors.

### 2) Touch-Point Raycast (Tap Location)
A ray is cast from the user’s tap/click location into the scene; the intersected object is selected.

**Intuition:** natural for touch screens, but may be noisier for dense scenes or ambiguous depth.

---

## Experimental Design

**Independent Variable**
- Selection technique: **Reticle Raycast** vs **Touch-Point Raycast**

**Dependent Variables**
- Selection time per trial
- Error rate
- Miss / overshoot rate

**Controls**
- Identical target layout and target sequence across conditions
- Practice trials before timed trials
- Logging of device/browser/screen/performance context to interpret variance

---

## Prototype & Flow

The demo is a single web page with:
- a 3D scene containing floating targets
- a task runner prompting the user to select targets in order
- two modes (A/B) representing the two selection techniques
- a results screen showing a summary + JSON export

**Typical session flow**
1. Consent / instructions
2. Practice block (Technique A)
3. Timed trials (Technique A)
4. Practice block (Technique B)
5. Timed trials (Technique B)
6. Results view + copy/paste JSON

---

## Data Logging & Export

At minimum, each trial should log:
- technique condition (reticle vs touch-point)
- target id / index
- start timestamp, end timestamp, duration (ms)
- hit/miss (and wrong-target if applicable)
- overshoot count (taps/clicks that hit nothing)
- device context (anonymized):
  - user agent
  - screen size / DPR
  - input type (touch/mouse)
  - basic performance stats if available (e.g., FPS estimate)

**Export format**
- Results screen displays a copy/paste JSON payload
- Optionally save to a file or upload to a backend later (future work)

> Note: Do not log personally identifying information (PII). Keep dataset anonymized.

---

## Tech Stack
- **Frontend:** TypeScript, React, Next.js, Three.js
- **Hosting:** Vercel

---

## Getting Started

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Run the dev server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open:

* [http://localhost:3000](http://localhost:3000)

Edit the main page here:

* `app/page.tsx`

---


## Project Deliverables

By end of semester, we aim to deliver:

* Deployed web prototype that runs on mobile + desktop
* Source repo with:

  * README (this file)
  * experimental settings + protocol
  * data schema + export format
* Experiment materials (consent / instructions / trial protocol)
* Collected anonymized dataset from participants
* Analysis summary including:

  * descriptive statistics
  * plots/tables comparing conditions
  * limitations + implications for 3D UI/XR selection design
* Demo video showing:

  * conditions (IV)
  * task runner
  * results screen + JSON export


---

## References

* **Amini et al. (2025)** — *A Systematic Review of Fitts’ Law in 3D Extended Reality.* CHI ’25.
  [https://doi.org/10.1145/3706598](https://doi.org/10.1145/3706598)

* **Asokan et al. (2020)** — *Assistance for target selection in mobile augmented reality.* Graphics Interface 2020.
  [https://ink.library.smu.edu.sg/sis_research/7958](https://ink.library.smu.edu.sg/sis_research/7958)

* **Hartmann & Vogel (2021)** — *An examination of mobile phone pointing in surface mapped spatial augmented reality.* IJHCS.
  [https://doi.org/10.1016/j.ijhcs.2021.102662](https://doi.org/10.1016/j.ijhcs.2021.102662)

* **Lu et al. (2020)** — *Investigating bubble mechanism for ray-casting to improve 3D target acquisition in virtual reality.* IEEE VR.
  [https://doi.org/10.1109/VR46266.2020.00-83](https://doi.org/10.1109/VR46266.2020.00-83)

---

## Learn More

* Next.js Docs: [https://nextjs.org/docs](https://nextjs.org/docs)
* Learn Next.js: [https://nextjs.org/learn](https://nextjs.org/learn)
* Three.js: [https://threejs.org/](https://threejs.org/)

