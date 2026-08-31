# Usability Rules for Generated UI and Content

Distilled from the NN/g corpus (1,719 articles, 1986-2026) by 12-agent
stratified synthesis (waves split6 + split_aa..al; ~1,819 articles read).
Apply to any page, view, component, flow, or user-facing copy you produce
or modify.

## 1. Writing for Scanning

- Users scan, they don't read. Target ≤50% of equivalent print word count.
- One idea per paragraph. Short sentences. Bold key phrases, not long runs.
- Inverted pyramid: start with the conclusion; the first 2 paragraphs must
  carry the value on their own.
- Format for scanning: meaningful (not cute) subheadings, bullets for lists,
  a table of contents with in-page links on long pages, short line lengths.
- Front-load every meaningful unit (title, heading, link, bullet, summary)
  with its information-carrying words — users only read the first 1-2.
- Objective, verifiable tone. No "marketese", hyperbole, adjectives-as-proof,
  exclamation marks, or puns in running text.
- Plain language over insider jargon. If a technical term must appear, explain
  it in-context; avoid acronyms wherever possible.
- For numbers, use numerals ("7"), not words, in body text. Write for the
  reader's search keywords (the words they'd type to find this page).
- Never split a linear article across multiple pages ("1 | 2 | 3"). Layered
  structure (summary → detail links) beats both walls of text and pagination.

## 2. Navigation & Information Architecture

- Purpose must be obvious in one glance: logo/name top-left, one-line tagline
  of what the product/site does, 1-4 high-priority tasks visually highest.
- Don't hide primary navigation behind a hamburger on desktop — there is
  space, and visible options outperform hidden (27% vs 50% usage; ~39%
  slower tasks; -20% discoverability). On mobile use visible nav for ≤4
  top-level items; hamburger is acceptable only with >4, and always pair
  hidden nav with in-page links to key content.
- Top horizontal navigation when you have ≤7 top-level categories; a left
  rail costs ~20% of content width and blocks the eye path.
- Labels are the interface. Category/link labels must be specific, mutually
  exclusive, in the users' vocabulary (not org chart, not audience segment,
  not content format). "Who We Are"/"What We Do"/"How We Do It" is failed.
- Support "where am I": breadcrumbs (single line, current page included but
  not clickable), distinct styling of the current section in global nav,
  local subnav for siblings, page-title matching link-label.
- Never use audience-based navigation ("For Students / For Faculty") as the
  primary IA — it fails ~82% of usability tests and fragments content.
- Utility navigation (Log In, My Account, Cart, Search) in the top-right.
- Every app/page state must have its own stable, human-readable URL so it
  can be bookmarked, refreshed, shared, and the browser Back button works.
- Don't bury prices, fees, shipping, sign-in requirements, or key info
  behind steps or commitment; surprise costs are the #1 cart-abandon cause.
- Card-sort or tree-test your IA before building.

## 3. Search, Findability & Filtering

- Search is not a substitute for navigation; most users can't formulate good
  queries. Treat search as one path among several.
- Search box must be exposed and prominent — a text input in the top-right,
  ~25-30 characters, with a visible "Search" button. Magnifying-glass-only
  search (icon that expands on click) measurably hurts findability by adding
  clicks and hiding the feature. Never two search boxes on one page.
- Support: autocomplete/typeahead, tolerant matching (typos, synonyms,
  variant spellings), scoped search, and faceted filters that fit the data
  (no one-size-fits-all facets).
- Scoped search defaults to ALL. Show scope on results; offer one-click
  expand-to-whole-site.
- Style typed vs. suggested characters differently in autocomplete.
- Faceted filters: show counts before filtering; users expect filters to
  reflect attributes they actually see on the items.
- Zero-results page must not dead-end: restate the query, offer spelling
  corrections, "did you mean X", similar queries, and browse paths. No
  mocking, no redirecting silently to home.
- Search results should be relevant & well-titled. A curated top-10 beats an
  exhaustive list of weak matches.
- Mine search logs for IA gaps, missing vocabulary, and query spikes.

## 4. Data Display & Visualization

- Dashboards must answer "so what" in 5 seconds at a glance, without
  scrolling. Long-scrolling dashboards = never-used dashboards.
- Strip chartjunk: no 3-D effects, no unnecessary gridlines/borders/shadows,
  no redundant legends (direct-label data), one accent color per data series
  - neutral grays elsewhere.
- Choose the chart for the question: line for trends over time, bar for
  comparisons across categories, dot plot for high-precision vs. benchmark,
  table when users need exact values. Avoid pie charts, gauges, dual axes.
- Tables: left-align text columns, right-align numerical columns with
  tabular lining figures (equal-width digits). Lock header row and first
  column on mobile scrolling. Zebra-stripe or visually group rows for
  long tables. Show only columns that fit without horizontal scrolling.
- Highlight the insight, not the visuals. Annotate takeaways on the chart.
- Dashboards are interactive: filter, drill, hover-detail, and make every
  dashboard state deep-linkable (URL captures filters/date ranges).
- Dashboards serve different roles — executive, analyst, operator. Don't
  force one default view on all; support role-appropriate saved views.

## 5. Feedback, Loading & Motion

- After every action: visible feedback within 100ms (loading indicator on
  action, completion toast/inline state, clear error state on failure).
  Nothing consequential happens silently.
- Skeleton screens (gray placeholders matching the content shape) over
  spinners for predictable content layouts — they reduce perceived wait.
  Use a spinner only for truly indeterminate short waits.
- Multi-step flows: visible progress indicator ("Step 2 of 4"), and the
  ability to go back without losing state.
- Empty states always show a next action ("No proposals yet — [Create]"),
  never a blank screen.
- Animation must earn its keep: it explains a state change or spatial
  relationship, responds in under 100ms, and doesn't trigger on every scroll
  pass. Scroll-triggered text animation = the worst offender: it reads as
  slow loading.
- Never auto-play video or audio. Never use a splash screen that repeats
  after first launch.
- Accidental-dism isal prevention: don't replace global state with an
  ephemeral state unless the path back is obvious.

## 6. Forms, Input & Validation

- Label above fields, not as placeholder (placeholders vanish; no persistent
  label = recall burden). For number fields, use steppers or segmented
  typed input for known formats (dates), not calendar widgets.
- Choose the control to fit the data: radio ≤5 mutually exclusive visible
  choices; dropdown >7; checkbox for independent toggles; toggle switch
  for instant-effect on/off (and show current state + what will change).
- Predictable, conventional inputs; don't invent widgets when standard ones
  exist. Single-column layout; group related fields.
- Mark optional fields, not required ("(optional)"). Avoid red-asterisk-only
  indicators.
- Inline validation after the user leaves each field; never clear what they
  typed on error. Error message in plain words states what went wrong and
  what to do ("Use MM/YY for expiry", not "Invalid input").
- On mobile, use keyboard-appropriate input types (`type=email`, `tel`,
  `number`) so the right keyboard appears. Allow paste; show-password toggle.
- Password rules visible before typing. Don't reject strong passwords
  for arbitrary reasons; allow password managers.
- Don't ask for the same info twice (checkout remembers earlier fields).
- Forms for data already known (username, saved card) should pre-fill.

## 7. User Control & Errors

- Confirm destructive or hard-to-reverse actions with a dialog — but only
  those: overused confirmations become reflexive (users click OK without
  reading). The dialog must be specific (name what's being destroyed),
  consistent in icon, and offer Cancel as the visually prominent safe button.
- Undo for any action not overtly destructive. There is always a clearly
  labeled emergency exit (Cancel, Back, Undo); no hidden dead end.
- Prefer error prevention over error recovery: constraints, good defaults,
  inline validation as the user leaves fields, disable-at-rest with reason.
- Never lose the user's work. Draft/autosave input through errors, navigation
  changes, tab reloads, and app backgrounding.
- Accelerators for power users (keyboard shortcuts, command palette,
  quick actions) exist but stay out of the novice's way.
- Don't put system-level risk behind accidental taps: require confirmation
  for actions with broad scope (delete-all, permanent send, public share).

## 8. Interstitials & Interruptive Patterns

- Popups / modals are for true interrupts only: destructive confirmation,
  strict login-wall, ambiguity resolution. Never a newsletter signup on
  first paint (~95% negative ratings, trust destroyed).
- Never stack overlays: cookie banner + newsletter + app-install + chat
  bubble on one page is forbidden.
- App-install prompts: use native banner patterns only (Apple Smart Banner,
  browser install prompt), never full-screen interstitials.
- Every modal needs an obvious Close (top-right X), click-on-scrim-to-dismiss
  for non-essential modals, and ESC-to-dismiss. Never trap focus ambiguously.
- No auto-play audio/video. No blinking, floating, or screen-filling ads —
  these are the #1 most-hated ad patterns and they destroy trust in your
  actual content.
- Don't cover content a user is about to read. Ads and newsletter CTAs must
  wait for natural break points, not arrival or first scroll.
- Design content so important things aren't in conventional ad slots (notably
  the right rail) — users reflexively ignore anything that resembles ads.

## 9. Mobile

- Mobile content carries an ~2x comprehension penalty vs desktop on complex
  material. Rewrite for mobile: single-inferiority first screen, defer
  secondary content to secondary screens (progressive disclosure), provide
  an in-page mini-IA.
- Prioritize content above all chrome: header thin, no stacked banners/app-
  install/newsletter/cookie bars at the top. Article title + first
  meaningful content must be visible on load.
- Primary actions in thumb-reach zone (lower half), not top corners. Design
  one-hand-reachable UI.
- Touch targets minimum 1 cm × 1 cm (~44 px at common densities) with at
  least 2 mm spacing between adjacent targets. Primary CTAs larger.
- No hover for any information or action. No hover-only affordances on
  mobile. All interactive gestures need visible signifiers.
- Every interactive gesture also needs a discoverable visual alternative —
  a button, a menu item, or an explicit path — because users can't see
  what isn't shown.
- Carousels on mobile don't auto-advance: frames read as ads, users miss
  later frames anyway. ≤5 frames, large dot indicators (>20px), controls
  inside, no auto-advance.

## 10. Ecommerce & Checkout

- Show ALL costs (shipping, handling, fees, taxes) before the user invests
  time; surprise costs are the #1 abandonment driver.
- Guest checkout; offer to save details POST-purchase, never required
  pre-payment.
- Product page: big primary image + gallery + zoom, price, availability,
  variant pickers, shipping ETA + cost, return policy, social proof/reviews,
  persistent Add-to-Cart.
- Adding to cart confirms visibly (mini-cart/toast) with clear next-step
  options ([Continue shopping] / [Go to cart]).
- Cart state persists; cart shows total + contents as the user continues
  shopping. Never lose cart on error/navigation.
- Delivery status: order confirmation page + email, delivery-status live
  tracker, push updates for key states, easy retrieval of tracking number.
- Search an ecommerce catalog: autosuggest with product thumbnails, scope
  indicators, typo tolerance; top-100 queries curated to best-bets.
- CTA labels describe the concrete action ("Place order", "Pay $XX"), never
  generic "Submit".

## 11. Visual Design & Layout

- One focal point per view. If everything is emphasized, nothing is.
- Visual hierarchy via scale (≤3 sizes), color contrast (reserve saturated
  red for errors), and whitespace/grouping, not decoration.
- Whitespace is a tool: group related items tighter, unrelated items
  further. Cramped walls of text are unreadable.
- Use real imagery — screenshots, examples, photos of the actual product —
  not decorative stock. Users go blind to stock.
- Content-to-chrome ratio high: the content the user came for must dominate
  the initial viewport on every platform.
- Never create false floors: layout breaks, HRs, or ad-like blocks that
  visually signal "end of page" when content continues. Cue continuation.
- Never style content or links to look like ads. Conversely, don't put
  essential content in ad-shaped slots (right-rail is the classic).
- Icon-with-label whenever comprehension isn't immediate; no hover-only
  tooltips for essential meaning. State-switch controls (mute, play/pause)
  show both the current state and the available action.
- Typography: left-align body text; avoid all-caps and tiny (<10pt) runs;
  use padding, contrast, and scale, not stray styling to convey hierarchy.

## 12. AI-Interaction & Conversational UI

- Lead AI features with the user benefit, not the model or "AI-powered" badge
  ("summarizes 100 PDFs" not "1M-token context").
- Discoverability is the first failure mode: state capabilities & limits near
  the input; surface starter prompts / suggested prompts contextually so
  users don't have to formulate from nothing. Support both open text and
  guided choices.
- Claim-level sources and citations on any factual AI output; mark uncertain
  or speculative responses; expose regenerate / edit-and-rerun as first-class
  action.
- Persist chat context within the user's scope; never auto-scroll history;
  prompt input stays visible and dominant.
- Chatbots offer immediate human handoff when asked, and escalate proactively
  when the bot is failing; never gatekeep the human.
- Don't jam AI into existing widgets/icons at the cost of the original
  function (don't replace search with a chat icon). AI isn't the default
  answer for navigation; semantic HTML & ARIA serve screens and agents alike.
- Bad AI execution is worse than no AI. If an assistant's launch forces
  opt-in or blocks core flows, it can permanently damage brand trust.

## 13. Trust, Credibility & Progressive Disclosure

- Match the ask to the trust stage: don't request sign-up, email, or payment
  details before users see concrete value. Idle users flee nosy forms.
- Show price, shipping cost, taxes, fees, and return policy before the user
  invests effort. Surprise costs are the #1 cart-abandonment driver.
- Answer three questions on or linked from the homepage: what do you do, how
  is my money/data used, can I trust you. Use real people/products, not
  stock. Never a fake endorsement.
- Trust decays with deceptive patterns: manipulative UI (dark patterns,
  forced continuity, false scarcity) erodes trust even when it spikes
  short-term metrics.

## 14. Accessibility as Design Constraint

- Accessibility is staged by impact: critical blocking rules first, then
  high-traffic/critical-path pages, then the rest. Stage by traffic and
  criticality, not all-at-once rewrite.
- Design for the real populations: lower-literacy users (~40%) and seniors
  are the two largest under-served groups; simplified language, short
  pathways, one idea per chunk, larger tap targets are for them, not
  edge cases.
- Don't rely on color alone for any state, error, or link affordance —
  pair with shape/text/iconography. Same for screen-reader-only meaning.
- Semantic HTML, functional alt text (action words, not descriptions),
  visible focus states, relative font sizes, transcripts for any audio/
  video: these make content usable by screen readers, crawlers, and AI
  agents alike.
- Never gate a feature behind motion or pointer-only interaction;
  everything must be keyboard-operable.

## 15. Long-form & Content Patterns

- Long articles: summary/box at top (bold heading + bordered summary), then
  bullets, then detail. In-page TOC with jump links. Bold lead-words in
  bullets if items run long. Highlight ≤30% of a paragraph — more is noise.
- FAQs only from real users' actual questions in their vocabulary; never
  made-up ones. Chunk by topic, link/accordion from a top index, keep
  updated, don't hide in footer.
- Footer: consistent on every page, legible, utility links + doormat nav,
  ≤2 levels; sticky mini-footer for infinite-scroll pages.
- URLs are permanent. Never break a link — redirect moved pages; don't let
  old addresses die. Every app state needs its own stable URL so Back,
  refresh, and bookmark all work.
- Login walls before value demonstration repel users: they must sample the
  benefit (a counter, a preview, a few records) before being asked to
  commit. Long sales cycles (5% buy only after many visits) mean design
  for the returning researcher, not just first-time converters.

## 16. Journey & Service-Design

- One actor, one scenario per journey map; scope creep kills the exercise.
- Journey success = outcomes across touchpoints, not shipping features.
  Map cross-functionally with the people whose support you'll need.
- Discovery phases before build correlate with project success (83% vs
  52%); time-box them but don't skip them.
- Design for the full journey including post-conversion (order trackers,
  transactional emails, return visits, re-engagement) — the relationship
  doesn't end at the button click.

## 17. Research & Validation (Artifact-Adjacent)

- 5 users for qualitative problem-discovery; ~20+ users for quantitative
  metrics with reasonable confidence intervals. Don't blend the two rules.
- Pilot every study once with materials exactly as you'll run them. Don't
  count pilot data unless nothing changed.
- Bad but real user testing beats no testing; iterate on small findings.
- Observe behavior over self-report: what users say is often different from
  what they do. Recruit and run studies without leading the witness.
- Quant findings need a comparison point (benchmark, prior release,
  competitor) to be meaningful; statistical significance is not practical
  significance.
- Screening: hide the study's true purpose, use distractor questions to
  catch gaming, require consent (parental + assent for minors), overrecruit
  with screened backups. Budget ~$171+/user historical, now $80-250.
- Bugs corrupt mental models: users develop superstitions and workarounds
  on top of a broken system. Robustness > features.

## 18. Performance & Responsiveness

- Target: 0.1s feels instantaneous, 1s keeps flow, 10s is the limit before
  losing attention (Nielsen, stable since 1994).
- Show dynamic progress for anything over ~2s (percent-done, current-stage);
  users wait longer and rate the experience better when uncertainty is cut.
- Standard cross-zone signal: high contrast ≥4.5:1, legibility ≥10pt, touch
  ≥1cm — NN/g holds on older audiences (~-11% reading speed / 20 years).

## 19. Onboarding & Coach-Marks

- Front-loaded tutorials are skipped: teach just-in-time, with single-point
  coach marks on first encounter, visually distinct from real UI. No tip
  chains.
- Never force a wizard on users who already know the product — provide a
  quick-start route (e.g., skip, sample data, single optional step).
- Splash screens don't return after the first launch.

## 20. Transactional Messaging

- Transactional/notification email: subject line states the fact plainly
  enough that the user may not need to open; unsubscribe is ONE click with
  no hurdles, visible, mobile-tappable; per-channel opt-outs; SMS vs push
  chosen by context. Bad unsubscribes send users to "report spam" and kill
  deliverability.

## 21. Deceptive & Anti-Patterns

- Deceptive UI (dark patterns) is not clever persuasion — false scarcity,
  guilt-tripping dialogs, forced continuity, sludge (extra steps between
  user and their goal), sneaking fees, misdirection. They spike metrics
  briefly then destroy trust permanently.
- Deliberate-ambiguity tactics (hide-the-cancel-button, hard-to-find-delete,
  confirm-shaming) fail both ethics and long-run business.
- Aggressive monetization interrupts at first paint, first scroll, first
  interaction: ~95% negative ratings, trust violation.

## Enforcement order

When two rules collide: (1) don't lose the user's work, (2) tell the user
what's happening, (3) don't make users think/hunt, (4) reduce words and
chrome (but not information density), (5) consistency, (6) guard content's
independence from ad-like appearance.
