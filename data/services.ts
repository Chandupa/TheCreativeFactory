import type { Service, ServiceSummary } from "@/types/service";

/*
 * The studio's services. The original five come from the existing site (the
 * "What we do" cards plus Post Production from the footer); Videography,
 * Photography, SEO and Performance Marketing were confirmed by the owner.
 * Each one has a landing page at /services/[slug].
 *
 * REVIEW BEFORE LAUNCH: the capability lists, process steps and FAQ answers
 * describe the normal scope of each discipline. They avoid prices, timelines
 * and results, but please read every line and delete anything the studio
 * doesn't actually offer. Unverified services (branding as a standalone
 * offer, 3D animation, motion graphics) are folded into these pages rather
 * than given pages of their own. Videography (real events and people) and
 * Film Production (scripted work) are kept distinct so they don't compete.
 */
export const services: Service[] = [
  {
    slug: "design",
    name: "Design",
    icon: "palette",
    description: "Creative and innovative design solutions tailored to your brand vision",
    headline: "Graphic Design & Brand Design in Sri Lanka",
    metaTitle: "Graphic Design & Brand Design in Sri Lanka",
    metaDescription:
      "Graphic design for brands in Sri Lanka — visual identity, campaign artwork, social and print design — from The Creative Factory, a design-led studio since 2019.",
    summary:
      "Visual identities, campaign artwork and everyday brand design, built as systems that hold together in print, on screen and in motion.",
    intro: [
      "Most of our projects start with design. Before a frame is shot or a scene is animated, we work out how a brand should look and feel — then carry that visual language consistently across everything it touches.",
      "The Creative Factory is design-led: our founder is also our lead designer, so the eye that shapes a brand's look stays involved when that brand moves into film, animation or a game.",
    ],
    capabilities: [
      {
        name: "Visual identity",
        description: "Logos, colour, typography and the rules that tie them together, so a brand is recognisable at a glance.",
      },
      {
        name: "Campaign key visuals",
        description: "The hero artwork a campaign is built around, adapted for every placement it needs to run in.",
      },
      {
        name: "Social & digital design",
        description: "Post, story and banner designs that stay on-brand while being made for the feed they appear in.",
      },
      {
        name: "Print & packaging artwork",
        description: "Print-ready files for brochures, posters, signage and packaging, prepared to specification.",
      },
      {
        name: "Style frames & storyboards",
        description: "Design for motion: the frames that define how an animation or film will look before production begins.",
      },
    ],
    process: [
      { title: "Brief", description: "We agree what the work needs to achieve, who it's for and where it will appear." },
      { title: "Concepts", description: "Distinct creative routes, each with a clear rationale, so you choose a direction rather than a colour." },
      { title: "Refinement", description: "The chosen route is developed and tested across real applications, not just a single mock-up." },
      { title: "Delivery", description: "Final artwork in the formats each placement needs, with guidance on how to use it." },
    ],
    faqs: [
      {
        question: "What do you need from us to start a design project?",
        answer:
          "A short brief is enough: what the design is for, who it needs to reach, where it will be used and when you need it. If you already have brand guidelines, logos or past material, send those too.",
      },
      {
        question: "Can the same design carry into video and animation?",
        answer:
          "Yes. Animation, film and post production are handled in the same studio, so we design with motion in mind and hand the visual system straight to the team producing your video.",
      },
      {
        question: "What files will we receive at the end?",
        answer:
          "Deliverables are agreed at the brief stage, so you receive files in the formats each placement actually needs — print-ready artwork for print, and correctly sized files for digital and social.",
      },
    ],
    related: ["animation", "photography", "film-production"],
    cta: { title: "Need a brand that stands out?", accent: "Let's design it" },
  },
  {
    slug: "animation",
    name: "Animation",
    icon: "film",
    description: "Stunning animations that bring your ideas to life with fluid motion",
    headline: "Animation Studio in Sri Lanka",
    metaTitle: "Animation Studio in Sri Lanka",
    metaDescription:
      "Animation and motion design from a Sri Lankan studio — 2D, 3D and motion graphics for brands, products and stories, taken from script to final render.",
    summary:
      "2D, 3D and motion graphics that explain, sell and entertain — from script and storyboard through to final render and sound.",
    intro: [
      "Animation shows what a camera can't: the inside of a product, an idea that doesn't exist yet, a world built from nothing. We take animated work from script and storyboard through to the final render and sound mix.",
      "Because design, film and post production sit under the same roof, animation can be combined with live-action footage, built on a campaign's visual identity, and finished alongside the rest of a production.",
    ],
    capabilities: [
      {
        name: "Motion graphics",
        description: "Animated typography, icons and data that turn a message into something people watch to the end.",
      },
      {
        name: "2D animation",
        description: "Illustrated and character-led animation for explainers, advertising and storytelling.",
      },
      {
        name: "3D & product animation",
        description: "Products and environments modelled, lit and animated to show detail that photography can't reach.",
      },
      {
        name: "Logo & title animation",
        description: "Logo reveals, idents and title sequences that give a brand or film a signature opening.",
      },
      {
        name: "Animation with live action",
        description: "Graphics and animated elements composited into filmed footage.",
      },
    ],
    process: [
      { title: "Script & concept", description: "The story or message is written first, because every later decision follows from it." },
      { title: "Storyboard & style frames", description: "Key moments are drawn and designed so the look is agreed before animation starts." },
      { title: "Animatic", description: "A timed rough cut with sound, used to lock pacing before the expensive work begins." },
      { title: "Animation & rendering", description: "Scenes are animated, refined and rendered at full quality." },
      { title: "Sound & delivery", description: "Music, sound design and voice are mixed, and the film is delivered in every format you need." },
    ],
    faqs: [
      {
        question: "What is the difference between 2D and 3D animation?",
        answer:
          "2D animation is drawn or designed on a flat plane — it suits illustrated stories, explainers and motion graphics. 3D animation builds objects and scenes as models that can be lit and viewed from any angle, which suits products, architecture and anything that needs realistic depth. Many projects mix the two.",
      },
      {
        question: "How long does an animation project take?",
        answer:
          "It depends on the length, the style and how much has to be built from scratch. We give you a schedule with the quote, and the animatic stage is there so pacing and content are agreed before full production.",
      },
      {
        question: "What do you need from us to get started?",
        answer:
          "The message you want to communicate, who it's for, where it will be shown and the length you have in mind. Brand guidelines, product references and any existing scripts are useful too.",
      },
    ],
    related: ["design", "post-production", "film-production"],
    cta: { title: "Have an idea that needs to move?", accent: "Let's animate it" },
  },
  {
    slug: "film-production",
    name: "Film Production",
    icon: "video",
    description: "Professional film production from concept to final delivery",
    headline: "Film & Video Production in Sri Lanka",
    metaTitle: "Film & Video Production Company in Sri Lanka",
    metaDescription:
      "Film and video production in Sri Lanka — commercials, brand films, corporate and social video — handled from concept and pre-production to final delivery.",
    summary:
      "Commercials, brand films, corporate and social video — planned, shot and finished by one team, from the first concept to final delivery.",
    intro: [
      "Commercials, brand films, corporate video and content for social — we handle production from the first concept to final delivery. Every project starts with the idea: what the audience should feel and remember. The crew, locations and shots are planned back from there.",
      "Post production is part of the same studio, so editing, colour and sound are planned from day one rather than treated as an afterthought once the shoot is over.",
    ],
    capabilities: [
      {
        name: "Commercials & advertising",
        description: "Campaign films for broadcast and digital, built around a single idea that's easy to remember.",
      },
      {
        name: "Brand & corporate films",
        description: "Films that explain who a company is, what it does and why it matters — for websites, launches and events.",
      },
      {
        name: "Social-first video",
        description: "Content shot and cut for vertical and short-form formats, rather than resized from a landscape edit.",
      },
      {
        name: "Product films",
        description: "Controlled shoots that show a product's detail, texture and use.",
      },
    ],
    process: [
      { title: "Concept & script", description: "The idea, script and treatment that everything else is measured against." },
      { title: "Pre-production", description: "Casting, locations, schedules, shot lists and logistics — so the shoot days go to plan." },
      { title: "Production", description: "The shoot itself, directed to capture exactly what the edit needs." },
      { title: "Post production", description: "Editing, colour grading, sound and graphics, reviewed with you at agreed stages." },
      { title: "Delivery", description: "Final masters and cut-downs in every aspect ratio and format your channels require." },
    ],
    faqs: [
      {
        question: "How much does video production cost in Sri Lanka?",
        answer:
          "It depends on the number of shoot days, the size of the crew, locations, talent, equipment and how much post production the film needs. We quote each project individually after a brief, and can suggest where a budget is best spent.",
      },
      {
        question: "What happens in pre-production?",
        answer:
          "Pre-production turns an approved concept into a plan: script and storyboard sign-off, casting, location scouting, scheduling, shot lists and logistics. Most problems on a shoot are prevented at this stage.",
      },
      {
        question: "Do you handle editing and colour grading as well?",
        answer:
          "Yes. Post production — editing, colour grading, sound and graphics — is done in-house, so the same team carries the project from shoot to final delivery.",
      },
      {
        question: "What should we prepare before a shoot?",
        answer:
          "Clear sign-off on the script and storyboard, any products or props in final condition, brand guidelines, and a single point of contact who can approve decisions on the day.",
      },
    ],
    related: ["post-production", "videography", "photography"],
    cta: { title: "Planning a film or video?", accent: "Let's discuss your project" },
  },
  {
    slug: "videography",
    name: "Videography",
    icon: "clapperboard",
    description: "Events, interviews and real moments captured and edited into films people want to watch",
    headline: "Videography Services in Sri Lanka",
    metaTitle: "Videography Services in Sri Lanka",
    metaDescription:
      "Videography in Sri Lanka for events, conferences, interviews and brand content — filmed by a production studio and edited into highlight films and social cuts.",
    summary:
      "Events, conferences, interviews and behind-the-scenes content — captured as it happens and edited into highlight films and social cuts.",
    intro: [
      "Not every film is scripted. Videography is about capturing what's really happening — a launch, a conference, a team at work, a customer telling their own story — and shaping it into something worth watching afterwards.",
      "Where our film production work is planned shot by shot, videography is built around the moment. It's still handled by a production studio, though, so coverage is planned, sound is taken seriously and the edit is done by the same team that finishes our commercials.",
    ],
    capabilities: [
      {
        name: "Event videography",
        description: "Launches, activations and celebrations covered with enough angles to tell the full story in the edit.",
      },
      {
        name: "Corporate & conference coverage",
        description: "Keynotes, panels and sessions recorded cleanly, with the audio quality speeches need.",
      },
      {
        name: "Interviews & testimonials",
        description: "Lit, framed and recorded interviews that let real people speak for a brand.",
      },
      {
        name: "Behind-the-scenes & social content",
        description: "Candid footage of people, processes and places, cut for social channels.",
      },
      {
        name: "Highlight films",
        description: "Short, well-paced edits that capture the energy of a day in a couple of minutes.",
      },
    ],
    process: [
      { title: "Brief & run sheet", description: "We learn what's happening, who matters and which moments can't be missed." },
      { title: "Coverage plan", description: "Camera positions, audio, crew and timings are planned around the event." },
      { title: "Shoot", description: "The day is filmed as it unfolds, alongside any planned interviews or set-ups." },
      { title: "Edit", description: "Footage is shaped into the highlight film, full-length recordings and social cuts agreed at the brief." },
      { title: "Delivery", description: "Final files in every format and aspect ratio your channels need." },
    ],
    faqs: [
      {
        question: "What is the difference between videography and film production?",
        answer:
          "Film production is scripted and planned shot by shot — commercials and brand films, for example. Videography captures real events and people as they happen, such as conferences, launches and interviews. Many projects use both: a planned brand film with documentary-style footage inside it.",
      },
      {
        question: "What do you need from us before an event?",
        answer:
          "The run sheet or agenda, the key people and moments to capture, venue details and access times, and a contact on the day who can help us reach the right people.",
      },
      {
        question: "When will we receive the finished video?",
        answer:
          "Turnaround is agreed when you book, based on how many edits you need. If you need a quick social cut soon after the event, tell us at the brief so it can be planned in.",
      },
    ],
    related: ["film-production", "photography", "post-production"],
    cta: { title: "Have an event coming up?", accent: "Let's capture it" },
  },
  {
    slug: "photography",
    name: "Photography",
    icon: "camera",
    description: "Product, campaign and corporate photography, lit and retouched to a commercial standard",
    headline: "Commercial & Product Photography in Sri Lanka",
    metaTitle: "Commercial & Product Photography in Sri Lanka",
    metaDescription:
      "Commercial photography in Sri Lanka — product, campaign, corporate and event photography, lit, shot and retouched by The Creative Factory's production team.",
    summary:
      "Product, campaign, corporate and event photography — planned, lit and retouched so every image is ready for print, web and social.",
    intro: [
      "Good photography does a lot of quiet work for a brand: it sells the product on a website, carries a campaign on a billboard and shows the people behind a business. We plan, light, shoot and retouch images built for where they'll be used.",
      "Because photography sits alongside our design and film teams, shoots can be planned with the rest of a campaign — so stills and video share one look, and can often be captured in the same production.",
    ],
    capabilities: [
      {
        name: "Product photography",
        description: "Clean, accurate product shots for e-commerce, catalogues and packaging, plus styled images that show products in use.",
      },
      {
        name: "Campaign & advertising photography",
        description: "Key images for campaigns, art-directed to match the concept and the layouts they'll sit in.",
      },
      {
        name: "Corporate & portrait photography",
        description: "Leadership portraits, team photos and workplace images that feel professional and natural.",
      },
      {
        name: "Event photography",
        description: "Launches, conferences and activations covered from arrivals to the final moments.",
      },
      {
        name: "Retouching",
        description: "Colour correction, clean-up and retouching to a consistent commercial finish.",
      },
    ],
    process: [
      { title: "Brief & shot list", description: "Every image you need is listed, with where it will be used and in what format." },
      { title: "Pre-production", description: "Styling, props, locations, talent and lighting are planned before the shoot." },
      { title: "Shoot", description: "Images are captured and checked on set against the shot list." },
      { title: "Selection & retouching", description: "The best frames are selected and retouched to a consistent finish." },
      { title: "Delivery", description: "Final images exported at the right sizes for print, web and social." },
    ],
    faqs: [
      {
        question: "What should we prepare before a product shoot?",
        answer:
          "Products in perfect condition (with spares if possible), a list of every shot and angle you need, where the images will be used, and any brand guidelines or reference images for the look you want.",
      },
      {
        question: "Are the photos retouched?",
        answer:
          "Yes. Selected images are colour-corrected and retouched to a consistent finish. The level of retouching is agreed at the brief, as a product catalogue and a campaign key visual need different amounts of work.",
      },
      {
        question: "Can photos and video be shot in the same production?",
        answer:
          "Often, yes. Videography and film production are part of the same studio, so we can plan stills and video into one schedule when the project allows — saving a second set-up and keeping both looking consistent.",
      },
    ],
    related: ["videography", "design", "performance-marketing"],
    cta: { title: "Need images that sell?", accent: "Let's plan your shoot" },
  },
  {
    slug: "post-production",
    name: "Post Production",
    icon: "sliders",
    description: "Editing, colour grading and sound that turn raw footage into a finished film",
    headline: "Video Editing & Post Production in Sri Lanka",
    metaTitle: "Video Editing & Post Production in Sri Lanka",
    metaDescription:
      "Post production in Sri Lanka — video editing, colour grading, sound design and finishing for commercials, brand films and social content, in every format.",
    summary:
      "Editing, colour grading, sound and finishing — the stage where footage becomes a film, and where most of its feel is decided.",
    intro: [
      "Post production is where footage becomes a film. The edit sets the rhythm, colour grading sets the mood, and sound makes the whole thing feel real. Much of how a piece of video lands with its audience is decided here.",
      "We finish our own productions in-house, and bring the same care to editing, grading and delivery — including the many versions and aspect ratios that a modern campaign needs.",
    ],
    capabilities: [
      {
        name: "Editing",
        description: "Structuring footage into a story with the right pace, from first assembly to final cut.",
      },
      {
        name: "Colour grading",
        description: "Balancing shots and giving the film a consistent, deliberate look that matches the brand and the mood.",
      },
      {
        name: "Sound design & mixing",
        description: "Music, effects, voice-over and dialogue cleaned up and mixed so the film sounds as good as it looks.",
      },
      {
        name: "Titles & motion graphics",
        description: "On-screen text, supers, logos and graphics designed and animated to sit naturally in the edit.",
      },
      {
        name: "Versioning & delivery",
        description: "Cut-downs, subtitles and 16:9, 1:1 and 9:16 versions exported to each platform's specifications.",
      },
    ],
    process: [
      { title: "Assembly", description: "Footage is organised and a first cut built against the script." },
      { title: "Offline edit", description: "The story and pacing are refined through agreed review rounds." },
      { title: "Picture lock", description: "The edit is approved, so grading and sound can be finished without rework." },
      { title: "Finishing", description: "Colour grade, sound mix, titles and graphics are completed." },
      { title: "Delivery", description: "Masters and every required version are exported and checked." },
    ],
    faqs: [
      {
        question: "What is colour grading?",
        answer:
          "Colour grading is the process of adjusting the colour, contrast and exposure of every shot so they match each other and create a deliberate look. It's what gives a film a consistent mood — warm, cool, natural or stylised — instead of looking like a collection of separate clips.",
      },
      {
        question: "What is picture lock and why does it matter?",
        answer:
          "Picture lock is the point where the edit is approved and no further changes are made to timing. Colour and sound are finished after it, so changing the edit later means redoing that work.",
      },
      {
        question: "What formats can you deliver in?",
        answer:
          "Deliverables are agreed at the start of the project: typically a master file plus versions for each channel — landscape, square and vertical, with or without subtitles — exported to each platform's specifications.",
      },
    ],
    related: ["film-production", "videography", "animation"],
    cta: { title: "Have footage that needs finishing?", accent: "Let's talk post" },
  },
  {
    slug: "game-development",
    name: "Game Development",
    icon: "gamepad",
    description: "Engaging game experiences built with cutting-edge technology",
    headline: "Game Development Studio in Sri Lanka",
    metaTitle: "Game Development Studio in Sri Lanka",
    metaDescription:
      "Game development from a Sri Lankan creative studio — game concepts, art, animation and prototyping, with design and storytelling from the same team.",
    summary:
      "Game concepts, art and development that draw on the studio's design, animation and storytelling — interactive work built by one team.",
    intro: [
      "Games are the most interactive form of storytelling we work in. Our game development draws directly on the rest of the studio: art direction, characters, animation and sound come from the same team that builds the gameplay.",
      "That makes it easier to keep a game consistent with a brand or a story — and to produce the trailers, key art and promotional material that launch it.",
    ],
    capabilities: [
      {
        name: "Game concept & design",
        description: "Core idea, mechanics and player experience, worked out before production begins.",
      },
      {
        name: "Game art & art direction",
        description: "Characters, environments and interface designed as one coherent visual world.",
      },
      {
        name: "Animation for games",
        description: "Character and environment animation built for real-time use.",
      },
      {
        name: "Prototyping & development",
        description: "Playable prototypes to test the idea early, developed into the finished game.",
      },
      {
        name: "Trailers & launch material",
        description: "Game trailers, key art and promotional assets from the studio's film and design teams.",
      },
    ],
    process: [
      { title: "Concept", description: "The idea, audience and core gameplay loop are defined." },
      { title: "Prototype", description: "A playable version tests whether the idea is fun before full production." },
      { title: "Production", description: "Art, animation, sound and code are built out in milestones." },
      { title: "Testing & launch", description: "The game is tested, polished and prepared for release." },
    ],
    faqs: [
      {
        question: "What do you need to start a game project?",
        answer:
          "The idea or goal of the game, who it's for, the platforms you have in mind and any brand or story material it needs to reflect. From there we can scope a concept and prototype.",
      },
      {
        question: "Why build a prototype first?",
        answer:
          "A prototype answers the most important question — is it fun? — before significant time goes into art and content. It is much cheaper to change direction at this stage than later.",
      },
      {
        question: "Can you also produce the trailer and artwork?",
        answer:
          "Yes. Film, animation and design are part of the same studio, so trailers, key art and launch material can be produced alongside the game itself.",
      },
    ],
    related: ["animation", "design"],
    cta: { title: "Have a game in mind?", accent: "Let's build it" },
  },
  {
    slug: "seo",
    name: "SEO",
    icon: "searchChart",
    typingPhrase: "SEO STRATEGY",
    description: "Search engine optimisation that helps the right customers find your business on Google",
    headline: "SEO Services in Sri Lanka",
    metaTitle: "SEO Services in Sri Lanka",
    metaDescription:
      "SEO services in Sri Lanka — technical SEO, on-page optimisation, content and local search, from a studio that also makes the visuals and video you need.",
    summary:
      "Technical SEO, on-page optimisation, content and local search — so the people already looking for what you offer can find you.",
    intro: [
      "Search engine optimisation puts your business in front of people at the moment they are looking for what you offer. It combines a technically sound website, pages written around what customers actually search for, and a reputation that search engines trust.",
      "We approach SEO as a creative studio: alongside the technical and on-page work, we can produce the photography, video and design that make pages worth visiting — and help them appear in image and video results too.",
    ],
    capabilities: [
      {
        name: "SEO audit",
        description: "A review of how your site is crawled, indexed and ranked, with prioritised fixes.",
      },
      {
        name: "Technical SEO",
        description: "Site speed, mobile experience, structured data, sitemaps and indexing issues put right.",
      },
      {
        name: "Keyword research & on-page SEO",
        description: "Pages mapped to what customers search for, with titles, headings and copy written for people first.",
      },
      {
        name: "Local SEO",
        description: "Google Business Profile, consistent business details and local pages so nearby customers find you.",
      },
      {
        name: "Content & visual search",
        description: "Articles, images and video produced in-house and optimised to rank in web, image and video results.",
      },
      {
        name: "Reporting",
        description: "Clear reports on rankings, traffic and enquiries, and what we're doing next.",
      },
    ],
    process: [
      { title: "Audit", description: "We review your site, your competitors and how customers search in your market." },
      { title: "Strategy", description: "Priorities are agreed: which pages, topics and fixes will make the biggest difference." },
      { title: "Fix & optimise", description: "Technical issues are resolved and key pages optimised." },
      { title: "Create", description: "New content, imagery and video are produced for the topics you need to rank for." },
      { title: "Measure & refine", description: "Results are tracked in Search Console and analytics, and the plan adjusted." },
    ],
    faqs: [
      {
        question: "How long does SEO take to show results?",
        answer:
          "SEO is a long-term channel. Technical fixes can have an effect within weeks, but meaningful gains in rankings and traffic usually build over several months, depending on your site's starting point and how competitive your market is.",
      },
      {
        question: "Can you guarantee a first-page ranking on Google?",
        answer:
          "No — and you should be wary of anyone who does. Google decides rankings, and its algorithms change. What we can do is fix what holds your site back, create content that deserves to rank, and report honestly on progress.",
      },
      {
        question: "What is local SEO?",
        answer:
          "Local SEO helps your business appear when people search for a service in their area, including the map results. It relies on an accurate Google Business Profile, consistent business details across the web, reviews and relevant local pages.",
      },
    ],
    related: ["performance-marketing", "design", "photography"],
    cta: { title: "Want more customers to find you?", accent: "Let's talk SEO" },
  },
  {
    slug: "performance-marketing",
    name: "Performance Marketing",
    icon: "chartLine",
    typingPhrase: "PERFORMANCE CAMPAIGNS",
    description: "Paid search and social campaigns built, measured and optimised around real business results",
    headline: "Performance Marketing Agency in Sri Lanka",
    metaTitle: "Performance Marketing Agency in Sri Lanka",
    metaDescription:
      "Performance marketing in Sri Lanka — Google Ads, Meta ads and video campaigns, with ad creative made in-house and every campaign measured against clear goals.",
    summary:
      "Google, Meta and video ad campaigns measured against clear goals — with the ad creative produced by the same studio.",
    intro: [
      "Performance marketing is advertising you can measure: every campaign is tied to a goal — enquiries, sales, sign-ups — and budgets move towards whatever is working. We plan, launch and optimise paid campaigns across search, social and video.",
      "Most agencies buy media and ask someone else for the ads. We make both. Because design, photography and film are produced in-house, new creative can be made and tested quickly — often the biggest lever a campaign has.",
    ],
    capabilities: [
      {
        name: "Paid search",
        description: "Google Ads search campaigns that reach people actively looking for what you offer.",
      },
      {
        name: "Paid social",
        description: "Meta campaigns across Facebook and Instagram, targeted by audience, interest and behaviour.",
      },
      {
        name: "Video advertising",
        description: "YouTube and social video campaigns using films and cut-downs produced by our team.",
      },
      {
        name: "Ad creative",
        description: "Static, carousel and video ads designed and produced in-house, in every format each platform needs.",
      },
      {
        name: "Tracking & analytics",
        description: "Conversion tracking and analytics set up properly, so results are measured rather than guessed.",
      },
      {
        name: "Testing & optimisation",
        description: "Audiences, creative and budgets tested and adjusted continuously against your goals.",
      },
    ],
    process: [
      { title: "Goals & tracking", description: "We agree what success means and make sure it can be measured." },
      { title: "Strategy", description: "Channels, audiences, budget split and messaging are planned." },
      { title: "Creative", description: "Ads are designed, shot or animated for each platform and placement." },
      { title: "Launch", description: "Campaigns go live with tests built in from day one." },
      { title: "Optimise & report", description: "Results are reviewed regularly, budgets shifted to what works, and progress reported clearly." },
    ],
    faqs: [
      {
        question: "What budget do we need for performance marketing?",
        answer:
          "It depends on your goals, your market and the platforms that suit your audience. Ad spend is separate from management and creative costs. We recommend a starting budget after the brief, and it can scale once results are proven.",
      },
      {
        question: "How do you measure success?",
        answer:
          "Against goals agreed at the start — for example cost per enquiry, cost per sale or return on ad spend. Conversion tracking is set up before launch so results are measured rather than estimated.",
      },
      {
        question: "Do you create the ads as well as run them?",
        answer:
          "Yes. Design, photography, animation and video are all produced in-house, so we can create new ad variations quickly and test which messages and formats perform best.",
      },
    ],
    related: ["seo", "film-production", "design"],
    cta: { title: "Ready to grow with paid media?", accent: "Let's plan your campaign" },
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function servicePath(slug: string): string {
  return `/services/${slug}`;
}

/** What client components need — keeps page copy out of the JS bundle. */
export function toSummary({ slug, name, icon, description }: Service): ServiceSummary {
  return { slug, name, icon, description };
}

/** Hero "WE CREATE …" line: the service name unless it needs rewording to read as a noun phrase. */
export function typingPhrase(service: Service): string {
  return (service.typingPhrase ?? service.name).toUpperCase();
}

export function getRelatedServices(service: Service): Service[] {
  return service.related.map(getServiceBySlug).filter((s): s is Service => Boolean(s));
}
