# STEM Mysteries

An interactive Vietnamese-language STEM learning application for Grade 9 students, combining physics simulations, scientific reasoning, and engineering design activities.

**Deployed Application**: [stem.ecm.io.vn](https://stem.ecm.io.vn)

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
- [Content Development](#content-development)
- [Current Scope & Future Enhancements](#current-scope--future-enhancements)
- [Quick Links](#quick-links)

---

## Project Overview

### Educational Problem

Students can memorize formulas for friction and energy without understanding how they explain motion. Classroom learning also needs opportunities to connect scientific observations with designing and improving practical solutions.

### Solution

STEM Mysteries brings two complementary experiences into a single application:

- **Scientific Investigations (Vấn đề khám phá)**: Observe phenomena, change simulation conditions, and answer reasoning questions using experimental evidence.
- **Engineering Challenges (Thử thách STEM)**: Design a solution, predict its behavior, test it against constraints, analyze evidence, and plan improvements.

The current activities focus on Grade 9 physics, with a Vietnamese interface, readable typography, and classroom presentation controls.

### Target Users

| User               | Purpose                                                                  |
| ------------------ | ------------------------------------------------------------------------ |
| **Students**       | Investigate physics concepts and check their understanding               |
| **Student Groups** | Test designs, record evidence, and justify engineering decisions         |
| **Teachers**       | Present experiments and guide classroom discussion and prototype testing |
| **Developers**     | Extend learning content and reuse the E-learning components              |

These are intended audiences. The application currently has no accounts or role-based permissions.

### Value Proposition

- **Evidence-Based Learning**: Relate predictions and explanations to simulation measurements.
- **Engineering Practice**: Support repeated design, testing, analysis, and reflection.
- **Classroom Accessibility**: Provide presentation mode, responsive layouts, and reduced-motion support.
- **Simple Setup**: Run learning activities without database or external service configuration.
- **Organized Content**: Separate investigations and challenges through typed catalogs and dedicated routes.

---

## Key Features

### Scientific Investigations

- **Friction & Braking**: Compare rubber, wood, and ice while adjusting initial speed.
- **Energy on a Ramp**: Change release height and observe potential energy converting into kinetic energy.
- **Independent Activities**: Each investigation includes one simulation and three reasoning questions.
- **Submission-Based Assessment**: Answer all questions before submitting to see a score and incorrect questions. Correct answers and worked solutions are not revealed.
- **Experiment Review**: Return to the simulation to check reasoning while retaining answers during the activity session.
- **Localized Measurements**: Display speed in km/h and energy in J with Vietnamese number formatting.

### Safe Ramp Engineering Challenge

- **Design Controls**: Choose height from 20–60 cm, angle from 10–40°, and a smooth, medium, or rough surface.
- **Safety Constraint**: Reach the ramp bottom and stop 10–30 cm beyond it. Bottom speed provides evidence rather than a separate success criterion.
- **Prediction Before Testing**: Record a prediction and explanation before each official trial. Changing the design clears the previous prediction.
- **Five-Trial Cycle**: Analyze results and plan improvements before subsequent trials. Early success allows further testing; there is no sixth trial.
- **Engineering Notebook**: Record designs, predictions, measurements, analyses, and improvement plans. Highlight changed factors without attributing a result to a single cause when multiple factors change.
- **Comparable Charts**: Plot stopping distance on a common 0–60 cm scale, mark the safety zone, and indicate overflow or failure to reach the ramp bottom.
- **Student-Selected Proposal**: After five trials and their analyses, select any tested design and justify it through evidence, reasoning, and comparison.
- **Reflection & Completion**: Complete the online activity by submitting a proposal and five reflections. Editing reflections reopens that step for confirmation.
- **Optional Physical Validation**: Predict and measure a classroom prototype's behavior and explain differences from the selected simulated design.
- **Progress Recovery**: Restore saved progress after reload, including calculated results interrupted during animation, without recording another trial.
- **Confirmed Reset**: Clear the complete cycle after confirmation when recorded trials exist. Reset is disabled during an experiment.

Written explanations are not automatically graded. Physical validation is independent of the five simulation trials and optional for online completion.

### Activity Catalogs

- **Separate Browsing**: Explore scientific investigations and engineering challenges independently.
- **Search & Filtering**: Search titles with Vietnamese accent normalization and filter by topic, grade, and subject.
- **Featured Content**: Display selected activities on the home page.
- **Related Learning**: Connect the safe ramp challenge with both investigations.

### E-learning UI Kit

| Component                | Capability                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------ |
| **CourseCard**           | Course illustration, category, instructor, rating, learner count, and hover feedback |
| **SkeletonCard**         | Matching loading layout with CSS shimmer                                             |
| **InteractiveButton**    | Hover and press feedback, loading state, and disabled state                          |
| **SyllabusAccordion**    | Animated chapter expansion and lesson selection                                      |
| **CourseNavigation**     | Scroll progress and active-section navigation                                        |
| **EmptyState**           | Empty-content layout with a primary action                                           |
| **ThemeToggle**          | Persistent light/dark preference scoped to the UI demo                               |
| **Sonner Notifications** | Success, error, and informational feedback                                           |

Dashboard content, instructors, ratings, and learner counts are demonstration data. The STEM area uses a fixed light theme independently of the demo theme.

### Accessibility & Presentation

- **Classroom Mode**: Presentation controls and readable text for group instruction.
- **Keyboard Access**: Visible focus indicators and accessible accordion state attributes.
- **Reduced Motion**: Respect the user's motion preferences.
- **Stable Images**: Explicit dimensions and responsive sizing reduce layout shifts.
- **Vietnamese Typography**: Locally served Be Vietnam Pro with its OFL license.

---

## Learning Activities

| Route                           | Purpose                                                   |
| ------------------------------- | --------------------------------------------------------- |
| `/`                             | Home page and featured activities                         |
| `/kham-pha`                     | Scientific investigation catalog                          |
| `/kham-pha/chiec-xe-truot-xa`   | Friction, kinetic energy, and braking distance            |
| `/kham-pha/nang-luong-tren-doc` | Potential energy, kinetic energy, and energy conservation |
| `/thu-thach`                    | Engineering challenge catalog                             |
| `/thu-thach/duong-doc-an-toan`  | Safe ramp design and testing workflow                     |
| `/ui-kit`                       | E-learning components and illustrative dashboard          |
| `/kham-pha/mau`                 | Catalog layout preview using repeated existing activities |

The layout preview does not introduce additional learning activities and is marked to discourage search engine indexing.

---

## System Architecture

### Web Application

**Framework**: Next.js 16.3.8 with App Router\
**Language**: TypeScript 5.x\
**UI Runtime**: React 19.2.8

Routes and layouts compose pages. Client components and hooks manage simulations and learning state. Library modules separate physics calculations, content definitions, state transitions, and storage validation.

### Core Components

| Layer                    | Responsibility                                                            |
| ------------------------ | ------------------------------------------------------------------------- |
| **Routes & Layouts**     | Page composition, metadata, shared shell, and fonts                       |
| **Learning Components**  | Investigation steps, simulations, controls, quizzes, and results          |
| **Challenge Components** | Design workflow, notebook, proposal, reflections, and physical validation |
| **Hooks**                | Simulation timing, interaction state, assessment, and persistence         |
| **Physics Modules**      | Unit conversions, braking calculations, and ramp dynamics                 |
| **Content Catalogs**     | Typed definitions, academic metadata, and related activities              |
| **Storage Modules**      | Browser storage access, validation, and migration                         |
| **UI Kit**               | Reusable E-learning components with scoped styles and providers           |

### Project Structure

```text
app/
  layout.tsx                       # Shared layout, fonts, and metadata
  page.tsx                         # Home page
  globals.css                      # Global styles and STEM theme
  kham-pha/                        # Investigation catalog and routes
  thu-thach/                       # Challenge catalog and safe ramp route
  ui-kit/                          # E-learning showcase
components/
  layout/                          # Shared shell and presentation controls
  home/                            # Home page sections
  catalog/                         # Browsing and activity cards
  mystery/                         # Braking investigation
  energy/                          # Ramp energy investigation
  quiz/                            # Questions and results
  challenge/                       # Engineering workflow
  ui-kit/                          # Reusable E-learning components
hooks/                             # Simulation and learning state
lib/                               # Physics, content, state, and storage
styles/                            # Scoped interface styles
public/
  fonts/                           # Be Vietnam Pro and OFL license
  ui-kit/                          # Local SVG illustrations
 tests/                            # Node-based tests
 docs/                             # STEM model and classroom guidance
```

### Engineering Workflow

```text
Design → Prediction → Experiment → Analysis → Improvement → Next Design

After Trial 5 and Analysis:
Notebook Review → Proposal → Five Reflections → Completion
                     |
                     +→ Optional Physical Validation
```

---

## Technology Stack

| Category          | Technology           | Purpose                                           |
| ----------------- | -------------------- | ------------------------------------------------- |
| **Framework**     | Next.js 16.3.8       | Routing, rendering, and image handling            |
| **UI Library**    | React 19.2.8         | Components and interactive state                  |
| **Language**      | TypeScript 5.x       | Typed content and simulation logic                |
| **Styling**       | Tailwind CSS 4.x     | Utility styling and responsive layouts            |
| **Animation**     | Framer Motion 13.x   | Interface transitions and interaction feedback    |
| **Icons**         | Lucide React         | SVG interface icons                               |
| **Notifications** | Sonner 2.x           | Toast feedback                                    |
| **Demo Theme**    | next-themes 0.4.x    | Scoped light/dark preference                      |
| **Code Quality**  | ESLint 9, Prettier 3 | Linting and formatting                            |
| **Testing**       | Node.js test runner  | Physics, workflow, assessment, and storage checks |
| **Persistence**   | localStorage         | Challenge progress and demo theme preference      |

---

## Physics Models

### Shared Conventions

- **Mass**: 2 kg.
- **Gravity**: 10 m/s² for classroom calculations.
- **Speed Conversion**: Divide km/h by 3.6 to obtain m/s.
- **Kinetic Energy**: `Ek = ½mv²`.
- **Potential Energy**: `Ep = mgh`.
- **Mechanical Energy**: `E = Ek + Ep`.

### Horizontal Braking

The model assumes locked wheels and constant sliding friction, excluding driver reaction time and wheel rotation.

```text
a = μg
s = v² / (2a)
```

Illustrative friction coefficients are 0.65 for rubber, 0.35 for wood, and 0.10 for ice. At 14.4 km/h, initial kinetic energy is 16 J; stopping distances are approximately 1.23 m, 2.29 m, and 8.00 m respectively.

### Frictionless Ramp Investigation

A vehicle starts from rest at a height of 1–4 m on a ramp with an 8 m horizontal projection. Potential energy converts into kinetic energy while total mechanical energy remains constant. At a release height of 2 m, total energy is 40 J.

### Safe Ramp Challenge

The selected friction coefficient applies to both the ramp and horizontal stopping area. Height is converted from centimeters to meters before calculation.

```text
L = h / sin(θ)
a = g(sin(θ) − μcos(θ))
v² = 2aL                  when a > 0
s = v² / (2μg)
```

| Surface    | Illustrative Friction Coefficient |
| ---------- | --------------------------------- |
| **Smooth** | 0.10                              |
| **Medium** | 0.20                              |
| **Rough**  | 0.35                              |

If acceleration is nonpositive within numerical tolerance, the vehicle remains at rest and ramp-bottom measurements are unavailable. Success classification uses unrounded values; challenge measurements display one decimal with Vietnamese formatting.

These are teaching models using illustrative coefficients rather than measured material properties. Ramp models exclude wheel rotation and air resistance; the challenge also excludes losses at the ramp-to-ground transition. See the [STEM Guide](docs/stem-guide.md) for assumptions and classroom guidance.

---

## Data Storage & Privacy

| Data                       | Storage         | Reload Behavior                                                                                               |
| -------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------- |
| **Investigation Progress** | In-memory state | Resets on reload; retains up to eight recent experiment records during the session                            |
| **Challenge Progress**     | localStorage    | Restores designs, predictions, trials, analyses, improvements, proposal, reflections, and physical validation |
| **UI Demo Theme**          | localStorage    | Restores theme preference                                                                                     |
| **Demo Progress & Notes**  | In-memory state | Resets on reload                                                                                              |

### Challenge Persistence

- **Storage Key**: `stem-mysteries:safe-ramp:v1`.
- **Schema**: Version 2, with in-place migration from version 1 retaining recorded trials.
- **Interrupted Animation**: Restore the calculated result without creating another trial.
- **Invalid Data**: Start a clean cycle and provide feedback when data is invalid or unsupported.
- **Unavailable Storage**: Continue in memory and report the saving limitation.
- **Reset**: Clear the full cycle, including proposal, reflections, and physical validation.

Challenge records remain in the current browser and are not uploaded to a backend. There is no database, authentication, or cloud synchronization. Clearing browser storage removes saved progress.

---

## Deployment Architecture

### Current Deployment

| Component           | URL                                      | Purpose                             |
| ------------------- | ---------------------------------------- | ----------------------------------- |
| **Web Application** | [stem.ecm.io.vn](https://stem.ecm.io.vn) | Deployed STEM Mysteries application |

### Runtime Structure

```text
Next.js Application
        |
        +→ Pages, Scripts, Styles, Fonts, and Illustrations
                            |
                       Student Browser
                            |
                  Interactive Simulations
                            |
                  Local Challenge Storage
```

### Production Build

From the application directory:

```sh
npm ci
npm run build
npm start
```

The standard Next.js production server uses port 3000 by default. The current configuration does not enable static export or standalone output. Existing features require no application-specific environment variables or external service credentials.

---

## Local Development

### Prerequisites

- **Node.js**: 22.18 or later to support direct TypeScript execution in the test suite.
- **Package Manager**: npm.

### Application Setup

From the `stem-mysteries` directory:

```sh
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Enable **Chế độ trình chiếu** for classroom use; F11 can also activate browser fullscreen where supported.

### Build & Validation

| Command                | Purpose                                             |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Start the development server                        |
| `npm run lint`         | Run ESLint                                          |
| `npm test`             | Run Node-based tests with TypeScript stripping      |
| `npm run format:check` | Check configured source files and README formatting |
| `npm run format`       | Apply formatting                                    |
| `npm run build`        | Create the production build                         |
| `npm start`            | Serve the production build                          |

Tests cover physics calculations, independent investigations, quiz grading, catalogs, challenge transitions, completion, presentation logic, and persistence. Challenge verification includes the 3,813 allowed design combinations, safety boundaries, motion, storage migration, and reset behavior.

---

## Content Development

### Key Files

| File                                 | Responsibility                                    |
| ------------------------------------ | ------------------------------------------------- |
| `lib/problem-catalog.ts`             | Investigation definitions and metadata            |
| `lib/challenge-catalog.ts`           | Challenge definitions and related investigations  |
| `lib/catalog-types.ts`               | Separate investigation and challenge types        |
| `lib/investigation-questions.ts`     | Investigation questions                           |
| `lib/physics.ts`                     | Shared calculations and braking model             |
| `lib/challenge-config.ts`            | Constraints, surfaces, and reflection prompts     |
| `lib/challenge-physics.ts`           | Safe ramp dynamics                                |
| `lib/challenge-types.ts`             | Challenge data types                              |
| `lib/challenge-state.ts`             | Reducer and workflow transitions                  |
| `lib/challenge-storage.ts`           | Storage key, validation, codec, and migration     |
| `lib/browser-state-storage.ts`       | Shared browser storage access                     |
| `hooks/use-engineering-challenge.ts` | Challenge interaction, animation, and persistence |

### Adding Learning Activities

1. Add a typed definition and ID to the appropriate catalog and include it in display order.
2. Create a dedicated static route and compose the learning components.
3. Read route metadata from the activity definition.
4. Link challenges to investigations through `relatedProblemIds`.
5. Update the explicitly selected illustrations used in activity cards and the home page.

The safe ramp remains a dedicated reference implementation rather than a generic challenge engine.

### Reusing E-learning Components

Components are exported from `components/ui-kit`. To copy the kit, include its UI dependencies, import `styles/ui-kit.css`, and wrap its area in `KitProviders`. Preserve the scoped dark variant, `data-kit-theme` integration, and HTML hydration handling.

Supply real course links and lesson-selection callbacks when integrating a learning workflow. Remote course images require appropriate Next.js image configuration.

---

## Current Scope & Future Enhancements

### Current Scope

The application includes **two scientific investigations**, **one engineering challenge**, searchable activity catalogs, and an E-learning showcase. Course enrollment, video playback, payment processing, server-backed notes, and teacher analytics are not implemented.

No source-code license has been selected. The bundled font has its own [OFL license](public/fonts/OFL.txt).

### Possible Extensions

These are potential directions rather than implemented features or committed plans:

- **Additional Content**: More investigations and challenges across STEM topics.
- **Teacher Workflows**: Assign activities and review student evidence and reflections.
- **Portable Records**: Export notebooks and restore progress across devices.
- **Connected Learning**: Introduce accounts, backend persistence, and course enrollment.
- **Physical Experiments**: Expand structured comparisons between predictions and classroom measurements.

---

## Quick Links

- **Deployed Application**: [stem.ecm.io.vn](https://stem.ecm.io.vn)
- **Investigations**: [Activity Catalog](https://stem.ecm.io.vn/kham-pha)
- **Engineering Challenges**: [Challenge Catalog](https://stem.ecm.io.vn/thu-thach)
- **Safe Ramp**: [Thiết kế đường dốc an toàn](https://stem.ecm.io.vn/thu-thach/duong-doc-an-toan)
- **E-learning Components**: [UI Kit Showcase](https://stem.ecm.io.vn/ui-kit)
- **Local Application**: [localhost:3000](http://localhost:3000)
- **Teaching Documentation**: [STEM Guide](docs/stem-guide.md)
- **Font License**: [Be Vietnam Pro OFL](public/fonts/OFL.txt)
