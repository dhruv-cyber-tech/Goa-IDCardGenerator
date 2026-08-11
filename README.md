# Frame Goa Studio

I am building a production-ready web tool for the HH Goa 2026 / #FrameInGoa challenge.

IMPORTANT: I have supplied desktop and mobile reference screenshots for the website.

YOUR PRIMARY JOB IN THIS PROMPT IS TO RECREATE THE USER INTERFACE FROM MY PROVIDED REFERENCE IMAGES AS ACCURATELY AS POSSIBLE.

The screenshots I supplied are the visual source of truth.

Do NOT redesign the interface.

Do NOT reinterpret the interface.

Do NOT make it "better".

Do NOT modernize it.

Do NOT simplify it.

Do NOT replace elements with your preferred components.

Do NOT invent additional sections.

Do NOT change the visual hierarchy.

The final implementation must visually match the supplied screenshots as closely as possible.

==================================================

1. RESPONSIVE REFERENCE RULE

==================================================

I have supplied BOTH desktop and mobile screenshots.

Treat the desktop screenshots and mobile screenshots as separate explicit design references.

Desktop reference = exact specification for desktop/tablet-width presentation.

Mobile reference = exact specification for mobile presentation.

Do not simply shrink the desktop design to create mobile.

Instead, reproduce the mobile screenshot's actual layout.

If the mobile screenshot moves an element, stacks an element, changes spacing, changes typography, changes button width, changes image proportions, changes alignment, or hides/shows something, implement that behavior exactly as shown in the mobile reference.

The responsive behavior should interpolate between the supplied reference states without destroying either design.

Use CSS media queries / responsive layout rules rather than creating duplicate pages unnecessarily.

==================================================

2. PIXEL-ACCURATE VISUAL IMPLEMENTATION

==================================================

Carefully inspect every supplied screenshot and reproduce:

- page background

- background colors

- gradients

- typography

- font family

- font weights

- font sizes

- letter spacing

- line heights

- text wrapping

- text alignment

- button dimensions

- button radius

- borders

- shadows

- card dimensions

- card radius

- image dimensions

- image cropping

- icon dimensions

- icon positioning

- section spacing

- horizontal padding

- vertical spacing

- header height

- footer height

- navigation spacing

- decorative elements

- illustrations

- logos

- badges

- overlays

- visual separators

- hover states where visually implied

- active states where visually implied

Do not substitute approximate colors when exact values can be inferred from the assets or screenshots.

If the screenshots use custom fonts and I have supplied the font files, use the supplied fonts.

If I have supplied branding assets, use the original assets rather than recreating them with text, CSS, emoji, or generic icons.

==================================================

3. DO NOT CHANGE THE DESIGN WHILE IMPLEMENTING FUNCTIONALITY

==================================================

This rule is extremely important.

The application must be built UNDER the supplied design.

For example:

If the screenshot contains a button saying "Upload Photo", use that button and connect it to the upload functionality.

Do not replace it with a different upload component.

If the screenshot contains a specific card, use that card.

Do not replace it with a generic shadcn card.

If the screenshot contains a custom icon, use the provided icon.

Do not replace it with Lucide unless there is genuinely no supplied asset.

If a component needs additional functionality, preserve its visual appearance.

If a component needs a hidden input, keep the input visually hidden and trigger it from the existing designed control.

==================================================

4. ROUTING / PAGE STRUCTURE

==================================================

Create a clean application structure that supports the pages/states represented by my screenshots.

Do not create unnecessary routes.

Use the screenshots to determine which screens/states actually exist.

The experience should ultimately support:

HOME / LANDING

→ PHOTO UPLOAD

→ OPTIONAL BUILDER DETAILS

→ GENERATION

→ RESULT

→ DOWNLOAD

→ SHARE TO X

The exact visual presentation of these states must follow my screenshots.

==================================================

5. MOBILE-FIRST ENGINEERING WITHOUT MOBILE REDESIGN

==================================================

The application must work extremely well on phones.

However, "mobile-friendly" does NOT mean redesigning the provided mobile screenshot.

The supplied mobile screenshots are the design specification.

Pay special attention to:

- viewport width

- safe horizontal padding

- button tap targets

- image proportions

- text wrapping

- vertical scrolling

- bottom actions

- fixed/sticky controls if shown

- upload interaction

- generated image preview

- download/share buttons

- browser viewport height

- iPhone Safari behavior

Do not allow horizontal overflow.

Do not allow text to unexpectedly clip.

Do not allow buttons to overflow their containers.

Do not let generated graphics extend beyond the intended layout.

==================================================

6. DESKTOP ENGINEERING

==================================================

For desktop:

- reproduce the supplied desktop composition

- preserve max-widths shown in the screenshot

- preserve column proportions

- preserve spacing

- preserve alignment

- preserve image sizing

- preserve header/navigation positioning

- preserve the result card dimensions

Do not stretch the interface unnecessarily across very large screens if the screenshot clearly uses a constrained content width.

==================================================

7. COMPONENT ARCHITECTURE

==================================================

Build maintainable React components.

Prefer components such as:

- AppShell

- Header

- Hero

- UploadArea

- UploadButton

- PhotoPreview

- BuilderForm

- ResultPreview

- ActionButtons

- DownloadButton

- ShareToXButton

- Footer

However, component names are secondary to visual accuracy.

Do not abstract things so aggressively that visual control becomes difficult.

Keep the design tokens centralized where useful.

==================================================

8. STATE MODEL

==================================================

Set up application state for:

- initial

- uploading

- photo selected

- builder form

- generating

- generated

- download

- share

The initial implementation can use mocked/generated placeholders for the actual image-generation logic.

DO NOT spend this prompt implementing the complete image-processing engine yet.

The purpose of this prompt is to establish the exact visual shell and state structure.

==================================================

9. LOADING STATE

==================================================

If the screenshots contain a loading/generation state, reproduce it exactly.

If they do not, do not invent a large loading screen.

The final experience is supposed to feel near-instant.

Any eventual loading indicator should be subtle and integrated into the supplied design.

==================================================

10. ACCESSIBILITY

==================================================

Implement sensible accessibility without changing the appearance:

- semantic buttons

- labels for form controls

- keyboard interaction

- focus states that do not visually disrupt the supplied design

- alt text for meaningful images

- accessible names for icon buttons

Do not introduce visually intrusive accessibility UI.

==================================================

11. TECHNICAL QUALITY

==================================================

Use the existing Lovable project stack.

Prefer:

- React

- TypeScript

- CSS / Tailwind only where consistent with the supplied design

- browser-native APIs where appropriate

Keep the application modular.

Avoid unnecessary dependencies.

Do not install a large UI framework merely to recreate the screenshots.

==================================================

12. CRITICAL VISUAL QA

==================================================

After implementing the UI, compare your implementation against EVERY supplied screenshot.

Check separately:

DESKTOP:

- overall composition

- header

- typography

- spacing

- content width

- images

- buttons

- footer

MOBILE:

- exact stacking

- typography

- padding

- button widths

- image sizing

- vertical spacing

- viewport behavior

If something differs from the screenshots, fix the implementation.

Do not modify the screenshots' design to accommodate your implementation.

==================================================

13. DO NOT DO THESE THINGS

==================================================

Do NOT:

- invent a new color palette

- invent a new font

- redesign the navigation

- add a navbar that isn't in the screenshot

- add a footer that isn't in the screenshot

- add a login page

- add signup

- add authentication

- add a dashboard

- add unnecessary onboarding

- add a cookie wall

- add a subscription/paywall

- add a marketing page

- add unnecessary modals

- add unnecessary animations

- add generic stock images

- replace supplied images

- replace branding

- change button labels

- change copy

- change the visual hierarchy

The goal is to reproduce the supplied product, not redesign it.

==================================================

14. SUCCESS CRITERION

==================================================

At the end of this task I should have:

1. A functioning React web application.

2. All supplied screens represented.

3. Desktop matching the desktop references.

4. Mobile matching the mobile references.

5. Responsive behavior between the supplied breakpoints.

6. Correct visual assets loaded.

7. Correct basic navigation/state transitions.

8. No authentication or signup gate.

9. A clean foundation ready for the actual photo-generation engine.

Do not proceed to invent functionality that is not visually represented.

First get the visual foundation correct.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fa5161a5-c88e-4415-bf60-929f201be9f7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
