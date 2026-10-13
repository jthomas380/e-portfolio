const caseStudies = {
  "that-doggone-cart": {
    title: "That Doggone Cart",
    image: "thatdoggonecart-customer-facing.png",
    imageAlt: "That Doggone Cart customer-facing ordering website",
    imageCaption: "Customer menu and ordering experience",
    category: "Food ordering · Kitchen operations · Order tracking",
    role: "Project contribution · Live project",
    summary:
      "A customer ordering experience connected to checkout, kitchen preparation, private order tracking, and back-office operations.",
    overview:
      "That Doggone Cart is an active point-of-sale and pickup-ordering website. Customers build an order, while staff use separate operational screens to prepare and track it.",
    problem:
      "Pickup orders need a clear path from menu selection through checkout and kitchen preparation, with inventory and customer status kept in step.",
    solution:
      "The customer storefront connects to a PHP API and MySQL-backed order flow, with separate kitchen, back-office, and private order-tracking views. Checkout currently uses a test-payment flow; real payment processing is not enabled.",
    responsibilities: [
      "Built the customer-facing menu, persistent cart, combo selection, and checkout flow.",
      "Implemented the kitchen display, back-office screens, and customer order-status experience.",
      "Connected front-end workflows to server-backed order, inventory, and status operations.",
    ],
    features: [
      "Order items and combos retain their quantities and pricing through checkout.",
      "Kitchen staff can move orders through New, Preparing, and Ready states.",
      "Customers can follow private order status and estimated wait updates.",
      "Back-office tools cover inventory, selling sessions, and recorded sales.",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    screenshots: [
      {
        src: "./assets/thatdoggonecart-back-offine.png",
        alt: "That Doggone Cart private back-office sales and inventory screen",
        caption: "Back-office sales and inventory view",
      },
      {
        src: "./assets/thatdoggonecart-kitchen.png",
        alt: "That Doggone Cart kitchen order board with New, Preparing, and Ready columns",
        caption: "Kitchen order board",
      },
    ],
    live: "https://thatdoggonecart.com/",
    source: "https://github.com/jthomas380/thatdoggonecart",
  },
  nfpru: {
    title: "North Florida Property Repair & Upgrades",
    image: "nfprullc-web-page.png",
    imageAlt: "North Florida Property Repair & Upgrades home page",
    imageCaption: "Service information and customer contact entry points",
    category: "Local services · Business website",
    role: "Project contribution · Live project",
    summary:
      "A responsive service website presenting home repair, property upgrades, and water-treatment services across North Florida.",
    overview:
      "The site introduces North Florida Property Repair & Upgrades, organizes its service information, and gives homeowners clear ways to learn more and get in touch.",
    problem:
      "Homeowners need to understand which repair and water-treatment services are offered and how to contact the business about a specific need.",
    solution:
      "A responsive static front end organizes service descriptions, regional information, and contact paths. Related water-treatment workflows use a separate API service.",
    responsibilities: [
      "Built responsive service pages and navigation for the business website.",
      "Organized repair, upgrade, and water-treatment information for mobile and desktop screens.",
      "Connected customer-facing actions to the site's existing contact and service flows.",
    ],
    features: [
      "Responsive service information and service-area content.",
      "Direct contact actions for prospective customers.",
      "Related water-treatment learning and package workflows.",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript"],
    screenshots: [],
    live: "https://nfprullc.com/",
    source: "https://github.com/jthomas380/nfpru",
  },
  blacktop: {
    title: "Blacktop Mobile Detailing",
    image: "mobile-detailing-landing-page.png",
    imageAlt: "Blacktop Mobile Detailing project landing page",
    imageCaption: "Responsive booking-demo entry page",
    category: "Service booking · Interactive demo",
    role: "Front-end project · Demonstration",
    summary:
      "A mobile-detailing booking demo with configurable service packages, vehicle sizes, add-ons, and appointment selection.",
    overview:
      "Blacktop is a fictional mobile-detailing business concept used to demonstrate a complete front-end booking and checkout flow.",
    problem:
      "A booking interface needs to show how service choices and vehicle options affect a customer's estimate before they choose an appointment.",
    solution:
      "The interface combines package selection, vehicle-size adjustments, priced add-ons, date and time selection, a live order summary, and a simulated deposit checkout.",
    responsibilities: [
      "Built the responsive marketing and package-selection experience.",
      "Implemented interactive vehicle, add-on, date, and time controls.",
      "Calculated the order summary from the visitor's selections and created a clearly labeled demo checkout.",
    ],
    features: [
      "Three service packages with selectable vehicle sizes.",
      "Priced add-ons update the running estimate.",
      "Appointment selection feeds a live order summary.",
      "Checkout is a demonstration only; no payment is processed.",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript"],
    screenshots: [],
    live: "https://detailing.jet380.com/",
    source: "https://github.com/jthomas380/blacktop-mobile-detailing",
  },
  "north-and-loom": {
    title: "North & Loom",
    image: "north-and-loom web-page.png",
    imageAlt: "North & Loom fictional apparel storefront",
    imageCaption: "Fictional storefront demonstration",
    category: "E-commerce · Fictional storefront",
    role: "Front-end project · Demonstration",
    summary:
      "A fictional apparel storefront with product discovery, selectable product options, a cart, and a simulated checkout.",
    overview:
      "North & Loom is a fictional direct-to-consumer apparel brand built as an interactive storefront demonstration.",
    problem:
      "The project explores how a focused product catalog can support discovery and a coherent cart-to-checkout experience without a real commerce backend.",
    solution:
      "A responsive storefront combines category filters, search and sort controls, product details, option selection, cart management, and a multi-step demo checkout.",
    responsibilities: [
      "Built the storefront layout and responsive product catalog.",
      "Implemented product search, category filtering, sorting, and product-option selection.",
      "Created cart and demonstration checkout interactions without transmitting or charging for orders.",
    ],
    features: [
      "Search, category filters, and sorting for the product catalog.",
      "Product detail views with color and size options.",
      "Cart quantities, a demonstration promo code, and checkout steps.",
      "The products and transactions are fictional demonstration content.",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript"],
    screenshots: [],
    live: "https://shop.jet380.com/",
    source: "https://github.com/jthomas380/shop-demo",
  },
  "mortgage-lender": {
    title: "Mortgage Lender",
    image: "mortage-company-demo-site.png",
    imageAlt: "Mortgage lender project website",
    imageCaption: "Fictional mortgage guidance demonstration",
    category: "Financial tools · Fictional service demo",
    role: "Front-end project · Demonstration",
    summary:
      "A fictional mortgage-guidance website with an adjustable payment estimate and a multi-step consultation-request demonstration.",
    overview:
      "This portfolio project explores a consumer-facing mortgage information experience. The loan officer, testimonials, rates, and contact details are fictional.",
    problem:
      "Visitors need a clear way to explore loan topics and understand how basic home-price assumptions affect an estimated monthly payment.",
    solution:
      "The site pairs loan-option information with an interactive estimate and a guided inquiry prototype. Its estimate is educational and does not represent an offer or approval.",
    responsibilities: [
      "Built the responsive information layout and loan-option navigation.",
      "Implemented an adjustable payment calculator with principal, interest, estimated taxes, and insurance lines.",
      "Created a multi-step consultation-request flow that is explicitly a demonstration and does not submit the entered information.",
    ],
    features: [
      "Home price, down payment, rate, and term inputs recalculate an estimate.",
      "Payment details are separated into principal/interest, taxes, and insurance.",
      "A guided inquiry prototype demonstrates a multi-step form workflow.",
      "All profile and lending information is fictional; no application is submitted.",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript"],
    screenshots: [],
    live: "https://mortage.jet380.com/",
    source: "https://github.com/jthomas380/mortgage-lender",
  },
  reelfinder: {
    title: "ReelFinder Movie Database",
    image: "reel-finder-movie-carousel.png",
    imageAlt: "ReelFinder movie search results and carousel",
    imageCaption: "Search results, ratings, and responsive movie carousel",
    category: "Movie discovery · API integration",
    role: "Front-end project · Personal project",
    summary:
      "A responsive movie search experience that enriches results with detail requests, sorting, and carousel navigation.",
    overview:
      "ReelFinder uses movie data to let visitors search titles, compare ratings, and browse a responsive carousel of results.",
    problem:
      "Movie searches return brief records, while visitors need enough detail to compare options without leaving the results view.",
    solution:
      "The front end requests search results and additional movie details from OMDb, then renders ratings, posters, plots, sorting, loading and error states, and responsive carousel controls.",
    responsibilities: [
      "Built the responsive search and movie-results interface.",
      "Integrated asynchronous OMDb requests for search results and additional title details.",
      "Implemented sorting, carousel controls, loading feedback, and error messaging.",
    ],
    features: [
      "Movie-title search with poster, rating, plot, and year details.",
      "Sort by rating, title, or release year.",
      "Responsive carousel controls, page indicators, and loading/error states.",
      "Live search requires a configured OMDb API key; the repository documents moving that key behind a server-side proxy before production use.",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "OMDb API"],
    screenshots: [],
    live: "https://movie.jet380.com/#movies",
    source: "https://github.com/jthomas380/movie-database",
  },
};

const content = document.querySelector("#case-study-content");
const notFound = document.querySelector("#case-not-found");
const project =
  caseStudies[new URLSearchParams(window.location.search).get("project")];

function makeElement(tagName, className, value) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (value) element.textContent = value;
  return element;
}

function addListSection(container, title, items) {
  const section = makeElement("section", "case-study-section");
  section.append(makeElement("h2", "", title));
  const list = makeElement("ul");
  items.forEach((item) => list.append(makeElement("li", "", item)));
  section.append(list);
  container.append(section);
}

function addTextSection(container, title, copy) {
  const section = makeElement("section", "case-study-section");
  section.append(makeElement("h2", "", title));
  section.append(makeElement("p", "", copy));
  container.append(section);
}

if (!project) {
  notFound.hidden = false;
} else {
  content.hidden = false;
  document.title = `${project.title} Case Study | Jason E. Thomas`;
  document.querySelector("#case-category").textContent = project.category;
  document.querySelector("#case-title").textContent = project.title;
  document.querySelector("#case-summary").textContent = project.summary;

  const meta = document.querySelector("#case-meta");
  meta.append(makeElement("span", "", project.role));
  const image = document.querySelector("#case-image");
  image.src = `./assets/${project.image}`;
  image.alt = project.imageAlt;
  document.querySelector("#case-image-caption").textContent =
    project.imageCaption;

  if (project.screenshots.length) {
    const gallerySection = document.querySelector("#case-gallery-section");
    const gallery = document.querySelector("#case-gallery");
    gallerySection.hidden = false;
    project.screenshots.forEach((screenshot) => {
      const figure = makeElement("figure");
      const screenshotImage = makeElement("img", "case-study-screenshot");
      screenshotImage.src = screenshot.src;
      screenshotImage.alt = screenshot.alt;
      figure.append(
        screenshotImage,
        makeElement("figcaption", "", screenshot.caption),
      );
      gallery.append(figure);
    });
  }

  const sections = document.querySelector("#case-sections");
  addTextSection(sections, "Overview", project.overview);
  addTextSection(sections, "Business problem", project.problem);
  addTextSection(sections, "Solution", project.solution);
  addListSection(sections, "My responsibilities", project.responsibilities);
  addListSection(sections, "Technical features", project.features);

  const technologies = document.querySelector("#case-technologies");
  project.technologies.forEach((technology) => {
    technologies.append(makeElement("span", "", technology));
  });

  const links = document.querySelector("#case-links");
  [
    ["Visit live site", project.live],
    ["View source code", project.source],
  ].forEach(([label, href]) => {
    if (!href) return;
    const link = makeElement("a", "", `${label} ↗`);
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    links.append(link);
  });
}
