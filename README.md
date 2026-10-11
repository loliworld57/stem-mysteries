# STEM Mysteries

**Deployed Application**: [stem.ecm.io.vn](https://stem.ecm.io.vn)

An interactive Vietnamese-language STEM learning application designed to help Grade 9 students investigate physics concepts, explain observations with evidence, and apply scientific understanding through engineering design.

The application combines browser-based simulations, reasoning questions, a structured design challenge, and reusable E-learning interface components for classroom and independent learning.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Learning Activities](#learning-activities)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Physics Models](#physics-models)
- [Data Storage & Privacy](#data-storage--privacy)
- [Deployment Architecture](#deployment-architecture)
- [Local Development](#local-development)
- [Content & Component Development](#content--component-development)
- [Current Scope & Future Enhancements](#current-scope--future-enhancements)
- [Quick Links](#quick-links)

---

## Project Overview

### Educational Problem

Students can memorize formulas for friction, kinetic energy, and gravitational potential energy without understanding how those relationships explain observable motion. Classroom instruction also needs accessible ways to connect scientific investigation with designing, testing, and improving a practical solution.

### Solution

STEM Mysteries provides two complementary learning experiences:

- **Scientific Investigations (Vấn đề khám phá)**: Observe a phenomenon, change simulation conditions, and answer reasoning questions using experimental evidence.
- **Engineering Challenges (Thử thách STEM)**: Define a design, make predictions, test it against constraints, analyze results, and justify a proposed solution.

The current learning content focuses on Grade 9 physics. The interface uses Vietnamese text, locally served fonts, readable layouts, and a classroom presentation mode.

### Target Users

| User               | Purpose                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------- |
| **Students**       | Explore physics relationships and check their understanding through interactive experiments |
| **Student Groups** | Collaborate on design trials, record evidence, and explain engineering decisions            |
| **Teachers**       | Present simulations and guide discussion, investigation, and physical prototype activities  |
| **Developers**     | Extend learning content and reuse the separate E-learning UI kit                            |

These describe intended audiences; the application currently has no accounts or role-based permissions.

### Value Proposition

- **Evidence-Based Learning**: Connect predictions and explanations to observable simulation results.
- **Engineering Practice**: Support repeated testing, analysis, improvement, and reflection.
- **Classroom Accessibility**: Provide large text, presentation controls, responsive layouts, and reduced-motion support.
- **Simple Setup**: Run the existing activities without a database, credentials, or external service configuration.
- **Extensible Content**: Organize investigations and challenges through typed catalogs and dedicated routes.

---

## Key Features

### Scientific Investigations

- **Friction & Braking**: Compare stopping distances across rubber, wood, and ice while changing initial speed.
- **Energy on a Ramp**: Change release height and observe gravitational potential energy converting into kinetic energy on a frictionless ramp.
- **Independent Activities**: Each investigation has its own simulation and three reasoning questions.
- **Submission-Based Assessment**: Students answer all questions before submitting; results show the score and incorrect questions without revealing correct answers or worked explanations.
- **Experiment Review**: Students return to the simulation to check their reasoning while retaining their answers during the current activity session.
- **Localized Measurements**: Display speed in km/h and energy in J, using Vietnamese number formatting.

### Safe Ramp Engineering Challenge

- **Design Controls**: Set ramp height from 20–60 cm, angle from 10–40°, and a smooth, medium, or rough surface.
- **Safety Constraint**: The vehicle must reach the ramp bottom and stop 10–30 cm beyond it; bottom speed is supporting evidence rather than a separate success criterion.
- **Prediction Before Testing**: Record a prediction and explanation before each official trial. Changing the design clears the previous prediction.
- **Five-Trial Cycle**: Analyze every trial and plan improvements before trials two through five. A successful design can still be tested again; there is no sixth trial.
- **Engineering Notebook**: Record designs, predictions, measurements, analysis, and improvement plans, with changed factors identified for comparison.
- **Comparable Results**: Plot stopping distances on a shared 0–60 cm scale, marking the safety zone and explicitly indicating overflow or failure to reach the ramp bottom.
- **Student-Selected Solution**: After five trials and their analyses, select any tested design and justify the choice with evidence, reasoning, and comparison.
- **Reflection & Completion**: Save five reflections and complete the online activity after submitting a proposal and all reflections. Editing reflections reopens that step for confirmation.
- **Physical Validation**: Optionally test a classroom prototype, record predictions and measurements, and explain differences from the selected simulated design.
- **Progress Recovery**: Restore saved progress after a reload, including a calculated result interrupted during animation, without consuming another trial.
- **Confirmed Reset**: Starting a new cycle clears its records after confirmation when trials exist; resetting is disabled during an experiment.

Written explanations and proposed solutions are not automatically graded. Physical validation is separate from the five simulation trials and is optional for online completion.

### Activity Catalogs

- **Separate Catalogs**: Browse scientific investigations and engineering challenges independently.
- **Search & Filters**: Search titles with Vietnamese accent normalization and filter by topic, grade, and subject.
- **Featured Activities**: Display selected catalog entries on the home page.
- **Related Learning**: Link the safe ramp challenge to both existing investigations.

### E-learning UI Kit

| Component                | Capability                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------- |
| **CourseCard**           | Course illustration, category, instructor, rating, learner count, and hover animation |
| **SkeletonCard**         | Matching loading layout with a CSS shimmer effect                                     |
| **InteractiveButton**    | Hover and press feedback, loading state, and disabled state                           |
| **SyllabusAccordion**    | Animated chapter expansion and lesson selection callbacks                             |
| **CourseNavigation**     | Scroll progress and active-section navigation                                         |
| **EmptyState**           | Empty-content presentation with a primary action                                      |
| **ThemeToggle**          | Persistent light/dark preference scoped to the UI demo                                |
| **Sonner Notifications** | Success, error, and informational feedback for demonstration actions                  |

The dashboard, instructors, ratings, and learner counts are demonstration data. The STEM learning area uses a fixed light theme independently of the UI kit theme.

### Accessibility & Presentation

- **Classroom Mode**: Presentation controls and readable text for group instruction.
- **Keyboard Access**: Visible focus indicators and accessible accordion state attributes.
- **Reduced Motion**: Animations respect the user's reduced-motion preference.
- **Stable Image Layouts**: Explicit image dimensions and responsive sizing reduce layout shifts.
- **Vietnamese Typography**: Be Vietnam Pro is served locally with its accompanying OFL license.

---

## Learning Activities

| Activity                       | Route                           | Learning Focus                                                                 |
| ------------------------------ | ------------------------------- | ------------------------------------------------------------------------------ |
| **Home**                       | `/`                             | Introduction, featured investigations, and STEM challenges                     |
| **Investigation Catalog**      | `/kham-pha`                     | Search and browse scientific investigations                                    |
| **Chiếc xe trượt xa**          | `/kham-pha/chiec-xe-truot-xa`   | Friction, kinetic energy, and braking distance                                 |
| **Năng lượng trên dốc**        | `/kham-pha/nang-luong-tren-doc` | Potential energy, kinetic energy, and mechanical energy conservation           |
| **Challenge Catalog**          | `/thu-thach`                    | Search and browse engineering challenges                                       |
| **Thiết kế đường dốc an toàn** | `/thu-thach/duong-doc-an-toan`  | Design iteration using friction, height, angle, and stopping-distance evidence |
| **E-learning Showcase**        | `/ui-kit`                       | Reusable UI components and an illustrative dashboard                           |
| **Catalog Layout Samples**     | `/kham-pha/mau`                 | Developer preview using repeated existing activity cards                       |

The layout sample page does not add new learning activities and is marked to discourage search engine indexing.

---

## System Architecture

### Web Application

**Framework**: Next.js 16.3.8 with App Router\
**Language**: TypeScript 5.x\
**UI Runtime**: React 19.2.8

Routes and layouts compose the interface. Client components and hooks manage interactive simulations, answers, and engineering challenge state. Physics functions, content definitions, state transitions, and storage validation live in separate library modules.

### Core Components

| Layer                    | Responsibility                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| **Routes & Layouts**     | Page composition, metadata, shared shell, and locally served fonts                       |
| **Learning Components**  | Investigation steps, controls, animations, quizzes, and result displays                  |
| **Challenge Components** | Design workflow, engineering notebook, proposal, reflections, and physical validation    |
| **Hooks**                | Simulation timing, interaction state, quiz state, and challenge persistence              |
| **Physics Modules**      | Unit conversion, braking calculations, energy calculations, and ramp dynamics            |
| **Content Catalogs**     | Typed activity definitions, academic metadata, featured ordering, and related activities |
| **Storage Modules**      | Browser storage access, challenge data validation, and schema migration                  |
| **UI Kit**               | Reusable E-learning interface components with scoped styles and providers                |

### Project Structure

```text
app/
  layout.tsx                       # Shared layout, fonts, and metadata
  page.tsx                         # Home page
  globals.css                      # Global styles and STEM theme
  kham-pha/                        # Investigation catalog and activity routes
  thu-thach/                       # Challenge catalog and safe ramp route
  ui-kit/                          # E-learning component showcase
components/
  layout/                          # Header, footer, and presentation controls
  home/                            # Home page sections
  catalog/                         # Catalog browsing and activity cards
  mystery/                         # Braking investigation
  energy/                          # Ramp energy investigation
  quiz/                            # Questions and submission results
  challenge/                       # Engineering design workflow
  ui-kit/                          # Reusable E-learning components
hooks/                             # Simulation and learning state
lib/                               # Physics, catalogs, quizzes, state, and storage
styles/                            # Scoped interface styles
public/
  fonts/                           # Be Vietnam Pro and OFL license
  ui-kit/                          # Local SVG illustrations
tests/                             # Node-based tests
docs/                              # STEM model and classroom guidance
```

### Learning Flow

```text
Home / Activity Catalogs
          |
          +--> Investigation --> Simulation --> Reasoning Questions --> Results
          |
          +--> Engineering Challenge
                 Design --> Prediction --> Experiment --> Analysis
                    ^                                       |
                    +----------- Improvement <--------------+

                 After Trial 5 and Analysis:
                 Notebook Review --> Proposal --> Reflections --> Completion
                                      |
                                      +--> Optional Physical Validation
```

---

## Technology Stack

| Category          | Technology           | Purpose                                                          |
| ----------------- | -------------------- | ---------------------------------------------------------------- |
| **Framework**     | Next.js 16.3.8       | App Router, page rendering, routing, and image handling          |
| **UI Library**    | React 19.2.8         | Components and interactive state                                 |
| **Language**      | TypeScript 5.x       | Typed interfaces, content, and simulation logic                  |
| **Styling**       | Tailwind CSS 4.x     | Utility styling and responsive layouts                           |
| **Animation**     | Framer Motion 13.x   | Interface transitions and interaction feedback                   |
| **Icons**         | Lucide React         | SVG interface icons                                              |
| **Notifications** | Sonner 2.x           | Toast feedback                                                   |
| **Demo Theme**    | next-themes 0.4.x    | UI kit light/dark preference                                     |
| **Code Quality**  | ESLint 9, Prettier 3 | Linting and formatting                                           |
| **Testing**       | Node.js test runner  | Physics, assessment, catalog, workflow, and storage verification |
| **Persistence**   | Browser localStorage | Engineering challenge progress and demo theme preference         |

---

## Physics Models

### Shared Conventions

- **Vehicle Mass**: 2 kg.
- **Gravity**: 10 m/s² for classroom calculations.
- **Speed Conversion**: Convert km/h to m/s by dividing by 3.6.
- **Kinetic Energy**: `Ek = ½mv²`.
- **Gravitational Potential Energy**: `Ep = mgh`.
- **Mechanical Energy**: `E = Ek + Ep`.

### Braking on a Horizontal Surface

The model assumes locked wheels and constant sliding friction, excluding driver reaction time and wheel rotation.

```text
a = μg
s = v² / (2a)
```

Illustrative friction coefficients are 0.65 for rubber, 0.35 for wood, and 0.10 for ice. At 14.4 km/h, the initial kinetic energy is 16 J and stopping distances are approximately 1.23 m, 2.29 m, and 8.00 m respectively.

### Frictionless Ramp Investigation

A vehicle starts from rest at a selected height of 1–4 m. The ramp has an 8 m horizontal projection. Potential energy converts into kinetic energy while total mechanical energy remains constant. At a release height of 2 m, total energy is 40 J.

### Safe Ramp Challenge

The challenge applies the selected friction coefficient to both the ramp and the horizontal stopping area. Height is converted from centimeters to meters before calculation.

```text
L = h / sin(θ)
a = g(sin(θ) − μcos(θ))
v² = 2aL                 when a > 0
s = v² / (2μg)
```

| Surface    | Illustrative Friction Coefficient |
| ---------- | --------------------------------- |
| **Smooth** | 0.10                              |
| **Medium** | 0.20                              |
| **Rough**  | 0.35                              |

If acceleration is nonpositive within numerical tolerance, the vehicle remains at rest and measurements at the ramp bottom are unavailable. Success classification uses unrounded measurements; displayed results use Vietnamese formatting with one decimal place.

These are teaching models. Friction coefficients are illustrative rather than measured material properties; ramp models exclude wheel rotation and air resistance, and the challenge also excludes transition losses at the ramp bottom. See [STEM Model & Classroom Guide](docs/stem-guide.md) for assumptions and teaching guidance.

---

## Data Storage & Privacy

### Persistence Behavior

| Data                       | Storage                  | Reload Behavior                                                                                               |
| -------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------- |
| **Investigation Progress** | In-memory activity state | Resets on reload; experiment notebook retains up to eight recent trials within the session                    |
| **Challenge Progress**     | localStorage             | Restores designs, predictions, trials, analyses, improvements, proposal, reflections, and physical validation |
| **UI Kit Theme**           | localStorage             | Restores the demo's theme preference                                                                          |
| **Demo Progress & Notes**  | In-memory state          | Resets on reload                                                                                              |

### Challenge Storage

- **Storage Key**: `stem-mysteries:safe-ramp:v1`.
- **Current Schema**: Version 2; version 1 data is migrated in place while retaining recorded trials.
- **Recovery**: Interrupted animations restore their calculated result for analysis without recording a duplicate trial.
- **Validation**: Invalid or unsupported data starts a clean cycle with user feedback.
- **Fallback**: If browser storage is unavailable, the activity continues in memory and reports the persistence limitation.
- **Reset**: Clears the complete challenge cycle, including proposal, reflections, and physical validation.

The current application has no backend API, database, authentication, or cloud synchronization. Challenge records remain in the current browser and are not uploaded to a server. Clearing browser storage removes saved progress.

---

## Deployment Architecture

### Runtime Structure

```text
Next.js Application (Node.js Server)
                |
                +--> Pages, Scripts, Styles, Fonts, and Illustrations
                                  |
                           Student Browser
                                  |
                         Interactive Simulations
                                  |
                         Local Challenge Storage
```

### Production Build

Run from the application directory:

```sh
npm ci
npm run build
npm start
```

`npm start` serves the production build on port 3000 by default. The current configuration uses the standard Next.js build and server; it does not configure static export or standalone output.

No application-specific environment variables or external service credentials are required for the existing features. The deployed application is available at [stem.ecm.io.vn](https://stem.ecm.io.vn).

---

## Local Development

### Prerequisites

- **Node.js**: 22.18 or later, supporting the project's direct TypeScript execution in tests.
- **Package Manager**: npm.

### Installation

From the `stem-mysteries` application directory:

```sh
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For classroom use, enable **Chế độ trình chiếu**; F11 can also activate browser fullscreen on supported systems.

### Build & Validation

| Command                | Purpose                                                        |
| ---------------------- | -------------------------------------------------------------- |
| `npm run dev`          | Start the development server                                   |
| `npm run lint`         | Check code with ESLint                                         |
| `npm test`             | Run Node-based tests with TypeScript stripping                 |
| `npm run format:check` | Check formatting across the configured source paths and README |
| `npm run format`       | Apply Prettier formatting                                      |
| `npm run build`        | Create the production build                                    |
| `npm start`            | Serve the production build                                     |

Tests cover physics calculations, independent investigations, quiz grading, catalog behavior, challenge design and experiment flows, completion, short responses, presentation logic, and browser persistence. Challenge verification includes all 3,813 allowed design combinations, safety-zone boundaries, motion, migration, and reset behavior.

---

## Content & Component Development

### Key Files

| File                                 | Responsibility                                          |
| ------------------------------------ | ------------------------------------------------------- |
| `lib/problem-catalog.ts`             | Investigation definitions and metadata                  |
| `lib/challenge-catalog.ts`           | Challenge definitions and related investigations        |
| `lib/catalog-types.ts`               | Separate investigation and challenge types              |
| `lib/investigation-questions.ts`     | Investigation question content                          |
| `lib/physics.ts`                     | Shared calculations and braking model                   |
| `lib/challenge-config.ts`            | Challenge constraints, surfaces, and reflection prompts |
| `lib/challenge-physics.ts`           | Safe ramp dynamics                                      |
| `lib/challenge-types.ts`             | Challenge data types                                    |
| `lib/challenge-state.ts`             | Challenge reducer and workflow transitions              |
| `lib/challenge-storage.ts`           | Storage key, codec, validation, and schema migration    |
| `lib/browser-state-storage.ts`       | Shared browser storage access and availability handling |
| `hooks/use-engineering-challenge.ts` | Challenge interaction, animation, and persistence       |

### Adding Learning Content

1. Add the activity ID and typed definition to the appropriate catalog and include it in display order.
2. Create a dedicated static route and compose its learning components.
3. Read route metadata from the activity definition.
4. Link challenges to relevant investigations through `relatedProblemIds`.
5. Add or update the explicitly selected illustrations used by activity cards and the home page.

Investigations and challenges remain separate content types. The safe ramp modules implement their specific workflow rather than a general-purpose challenge engine.

### Reusing the UI Kit

Reusable components are exported from `components/ui-kit`. When moving the kit to another application, include its UI dependencies, import `styles/ui-kit.css`, and wrap the demo area in `KitProviders`.

The provider uses `data-kit-theme`; preserve the scoped dark variant and HTML hydration handling when copying the theme integration. Supply real course links and lesson callbacks when integrating the kit into an actual learning workflow. Remote course images require an appropriate Next.js image configuration.

---

## Current Scope & Future Enhancements

### Current Scope

The application currently delivers **two scientific investigations**, **one engineering challenge**, activity catalogs, and an E-learning UI showcase. It does not implement course enrollment, a video player, payment processing, server-backed notes, or teacher analytics. No source-code license has been selected; the bundled font has its own license at [public/fonts/OFL.txt](public/fonts/OFL.txt).

### Possible Extensions

The following are potential directions, not implemented capabilities or committed delivery plans:

- **Additional Learning Content**: More investigations and engineering challenges across STEM topics.
- **Teacher Workflows**: Classroom activity assignment and review of student evidence and reflections.
- **Portable Records**: Export engineering notebooks and restore progress across devices.
- **Connected Learning Features**: Accounts, backend persistence, and real course enrollment.
- **Physical Experiment Support**: More structured comparison between simulated predictions and measured classroom results.

---

## Quick Links

- **Deployed Application**: [stem.ecm.io.vn](https://stem.ecm.io.vn)
- **Local Application**: [Home](http://localhost:3000)
- **Investigations**: [Activity Catalog](http://localhost:3000/kham-pha)
- **Engineering Challenges**: [Challenge Catalog](http://localhost:3000/thu-thach)
- **Safe Ramp Challenge**: [Thiết kế đường dốc an toàn](http://localhost:3000/thu-thach/duong-doc-an-toan)
- **E-learning Components**: [UI Kit Showcase](http://localhost:3000/ui-kit)
- **Model & Teaching Documentation**: [STEM Guide](docs/stem-guide.md)
- **Font License**: [Be Vietnam Pro OFL](public/fonts/OFL.txt)
