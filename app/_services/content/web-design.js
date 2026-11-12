/* To confirm (Luka): claims about how Digitl works that this page makes and
   that no approved source states, one per line, so Luka can confirm or cut
   them before the page goes live.
   - We build custom sites in Next.js, with the Sanity content editor where the client changes copy, prices and images themselves.
   - A build starts with a conversation about the business, its customers and what the site is for (sales, enquiries or presenting the business), and only then design.
   - We draw up the page list from the words customers use to search for what the client offers.
   - We design the site for the phone screen first.
   - We write the page copy, and the client reads and corrects it before launch.
   - The client sees and approves the design before development starts; the review happens over a video call.
   - During the build we ask the client for prices and photos, design approval and reading the copy; we do everything else.
   - Before launch we check the site on Google's PageSpeed test for mobile.
   - After launch we change first the pages people leave without an enquiry or a call.
   - When the client has an old site, we redirect its addresses to the new ones; before a redesign we look in Search Console at which pages already bring visits.
   - The exact timescale goes into the quote, and the quote is broken down by item; a link to the till, payments or stock is a separate item.
   - We connect the site to the till, card payments and stock or accounting software (Luka listed them as price items); we also do links and automations as a separate service (AI and automation).
   - Card payments are tied to the bank or payment provider the client has a contract with, and before launch we check that the order and payment go through end to end; we also connect the shop to the till in the store.
   - Custom site pages are prepared in advance, the site has little third-party code and rarely needs updates; the same site can later get a shop or another language without moving to a new system (the WordPress paragraph and table).
   - We build WordPress when the client wants it (Luka).
   - We set up hosting and the https certificate for our sites; earlier versions are kept and a change that breaks something is rolled back.
   - Maintenance covers speed and error checks, updates, new pages and changes to layout and features; it is optional, changes can be ordered one at a time.
   - Clients on site maintenance see the work in the client portal and get a monthly report on speed and enquiries.
   - Who pays for and manages the domain and hosting is agreed in the quote.
   - The domain is in the client's business name; the site, copy, photos and code (for a custom site) belong to the client.
   - If the client changes provider, they get all the access along with the site.
   - Basic SEO is part of the build: a Google title and description on every page, a sitemap, speed; ongoing SEO is a separate service.
   - A change saved in the editor appears on the site by itself, without a developer.
   - We also build sites for lawyers, restaurants and estate agents. */

const page = {
  slug: "web-design",
  service: "web",
  seo: {
    title: "Website and online shop design for your business | Digitl",
    description:
      "A fast custom website or online shop, for businesses from sole traders to distributors. See what the price of a website depends on and book a call.",
  },
  label: "Web design",
  h1: "Website and online shop design",
  lead: "We build websites and online shops for businesses of every size, from a tradesperson working alone to a distributor with thousands of products. We build every site to be fast, because a customer on a phone won't wait for a slow page, they go back to Google and call the next business. From day one we measure how many visitors call you or buy, so you see in numbers how many new customers the site brings you.",
  proof: [
    {
      value: "44",
      label: "pages, rebuilt from a single-page site",
      href: "/projects/pando-cleaning",
    },
    {
      value: "10",
      label: "city pages, each written by hand",
      href: "/projects/pando-cleaning",
    },
    { value: "50+", label: "companies we've helped grow", href: "/projects" },
  ],
  intro: {
    title: "Building a website starts with your business",
    body: [
      "What kind of site you need depends on why the customer comes to it. Some want to buy a product straight away, some are looking for a business to do a job they need, and some have already heard of you and want to see who you are before the first meeting.",
      "An online shop has to lead the customer to the product, the price and payment without a single phone call. A service business's site has to bring an enquiry or a call, so the price, the area you cover and the phone number sit where they are easy to see. Distributors and businesses that work through referrals often want a company showcase, a site that neatly shows what they do and who they have worked with.",
      "That is why a build with us starts with a conversation about your business and your customers, and design comes only once we know what the site is for. The page list and the tools the site must have depend on that, and so does the price you see in the quote.",
      "After launch, [search](/services/seo) and [ads](/services/paid-advertising) bring people to the site, so we plan them together with the site, from day one.",
    ],
  },
  included: {
    title: "What's included",
    intro:
      "You can order the build, custom tools and maintenance together or separately, with or without SEO and ads.",
    items: [
      {
        title: "Website or online shop design and build",
        sub: "from plan to launch",
        text: "From the page list to launch on your domain, we do the copy, design and code. With the site you get a content editor where you change prices, copy and images yourself.",
      },
      {
        title: "Custom tools and integrations",
        sub: "calculator, till, payments",
        text: "A calculator for the question a customer asks before buying, for example which air conditioner they need. We also connect the site to your till, card payments or stock software.",
      },
      {
        title: "Maintenance and hosting",
        sub: "after launch",
        text: "Hosting and the https certificate are on us. After every change we check that the site is still fast and working properly, and we add new pages and features when you need them.",
      },
    ],
  },
  steps: {
    title: "How we work",
    intro:
      "From you we need prices and photos, and during the build you approve the design and read the copy before launch. Everything else, from the page plan to tracking, we do.",
    items: [
      {
        title: "Conversation and page list",
        text: "We go through what you sell and to whom, then look at the words people use to search for it. From that we draw up the page list and what each page must say.",
      },
      {
        title: "Copy and design",
        text: "We write the copy for every page and design it, for the phone screen first. You see and approve the design before development starts.",
      },
      {
        title: "Development",
        text: "We build the site to measure and connect it to the content editor, and where needed to the till or payments. Before launch we check its speed on Google's PageSpeed test for mobile.",
      },
      {
        title: "Launch",
        text: "We put the site on your domain. If you had an old site, we redirect its addresses to the new ones, so you don't lose the visits already coming from search.",
      },
      {
        title: "Tracking and changes",
        text: "After launch we track speed and how many visitors send an enquiry or buy. The pages people leave without calling are the ones we change first.",
      },
    ],
  },
  cases: [
    {
      slug: "pando-cleaning",
      title: "Pando Cleaning Solutions",
      text: "A one-page site for a cleaning company in Jacksonville, Florida, rebuilt as 44 pages, with full price tables visible on load and a content editor where the owner changes prices without touching code.",
    },
  ],
  guide: [
    {
      title: "What does the price of a website depend on?",
      body: [
        "The price of a website is moved most by the type of site and its links to other software, much more than by the number of pages alone.",
        "When we put a quote together, we look at these items:",
        {
          list: [
            "type of site: a company showcase, a service site or an online shop",
            "a link to the till, card payments on the site or a link to stock and accounting software, so prices and stock levels update themselves",
            "a calculator, a booking form or another tool that is built separately",
            "how many different page layouts are needed, for example home, service, price list and project",
            "whether we write the copy or you already have it",
            "for a shop, the number of products and the state their data is in",
            "whether you already have a logo and colours or we make them before the site",
            "moving from the old site, with redirects for the old addresses",
          ],
        },
        "The biggest jump in price is between a site and a shop. A shop with thousands of items costs more because of the data, which has to be imported from a spreadsheet and sorted into categories. Add to that a template that writes the Google title and description for every product by itself.",
        "Every link to other software is built for the system your business already uses, so it is a separate item in the quote. We also do links and automations like these, which work behind the site, as a service of their own, [AI and business automation](/services/ai-automation).",
        "Six service pages that share one layout are quicker to build than three pages that each look different, since the layout is designed and built once.",
        "If money needs to be saved, we would rather cut the number of custom designs than the number of service pages. Every service page catches its own search, while a custom design for the about page brings nobody in from Google.",
      ],
    },
    {
      title: "How long does a website take, and what do you prepare?",
      body: [
        "We usually start the build 1 to 2 weeks after we agree. The exact timescale goes into the quote, once we know the page list and whether we are building a shop.",
        "The timescale depends most on the content. Development runs to plan, but we don't launch the site until your prices and photos arrive.",
        "So it is a good idea to gather these before we start:",
        {
          list: [
            "a list of services or products, with the prices you want to publish",
            "photos of real jobs, premises or people, even if taken on a phone",
            "your logo and colours, if you have them; if you don't, we make [the logo and visual identity](/services/branding) before the site",
            "the area you cover and your opening hours",
            "access to the domain and the old site, if they exist",
            "for a shop, a product spreadsheet with codes, prices and stock levels",
          ],
        },
        "You don't have to write the copy yourself, since we write it from our conversations with you. Read it line by line before launch, because only you know whether every price is correct and whether you really do that service the way it is described.",
        "Phone photos that show your real work tell a customer more than a nicer image taken from the internet, which the customer may already have seen on other sites.",
      ],
    },
    {
      title: "WordPress or a custom site: which should you choose?",
      body: [
        "We build sites to measure, with modern technology, because a site like that opens faster and is harder to attack. If you prefer WordPress, we build that too.",
        "WordPress is a free content management system, with thousands of ready-made themes and plugins that someone who doesn't code can install. We build a custom site in Next.js and connect it to the Sanity content editor, so every page has exactly the fields your business needs.",
        "The pages of a custom site are prepared in advance, so on a phone they open without waiting for a theme and plugins to load. Sites we build are checked on Google's PageSpeed test for mobile before launch.",
        "Security is the second difference. According to [a Patchstack report](https://patchstack.com/whitepaper/state-of-wordpress-security-in-2026/), 91% of the new security vulnerabilities found in WordPress during 2025 were in plugins. A custom site has much less third-party code, so it has fewer places to attack and fewer updates after which something stops working.",
        "When you need a calculator, a link to the till or a new type of page, we build it for your site specifically. That way the site grows with the business, so it can later get a shop or another language without moving to a new system.",
        {
          table: {
            head: ["What you look at", "Custom site", "WordPress"],
            rows: [
              [
                "Speed on mobile",
                "Pages are prepared in advance and open straight away",
                "Depends on the theme and the number of plugins",
              ],
              [
                "Security",
                "Little third-party code, so few places to attack",
                "Plugins are the most common point of attack and need constant updates",
              ],
              [
                "A new feature",
                "We build it for your site",
                "You install a plugin, if there is one that does exactly that",
              ],
              [
                "Maintenance",
                "Fewer third-party parts to keep track of",
                "Regular updates to the system, theme and plugins",
              ],
              [
                "Editing copy",
                "An editor with fields made for your site",
                "A familiar admin panel",
              ],
              [
                "Getting started",
                "Slower, every page is designed for you",
                "Quick, with a ready-made theme",
              ],
              [
                "Who can take the site over",
                "A developer who works in Next.js, of whom there are fewer",
                "Almost any web developer",
              ],
            ],
          },
        },
        "The smaller number of developers who work in Next.js is a real drawback of a custom site, and you should know about it before you sign a contract for a website with anyone, us included.",
        "We build WordPress when you want it, for example when your team already works in it. Then count on regular updates to the system and plugins for as long as the site runs.",
      ],
    },
    {
      title: "What do website maintenance and hosting cover?",
      body: [
        "Hosting is the server the site sits on and is served to visitors from. Maintenance covers the checks and changes after launch, everything you can't do yourself in the editor.",
        "We set up hosting for the sites we build. The site gets an https certificate, the padlock next to the address without which Chrome and other browsers tell the visitor the page is not secure. Earlier versions of the site are kept, so a change that breaks something is rolled back to the previous version.",
        "Site maintenance includes:",
        {
          list: [
            "a speed and error check after every change",
            "updates to the parts of the site that need them",
            "a new page when you introduce a new service or start working in a new city",
            "changes to layout and new features, which you can't make yourself in the editor",
            "a monthly report on the site's speed and the enquiries that came in, and you see every change in the client portal too",
          ],
        },
        "Maintenance is optional. If you change the site rarely, you don't need ongoing maintenance, and you can order each change separately, only when you need it.",
        "The domain and hosting are costs that last as long as the site runs, and the domain is usually paid once a year. Who pays for and manages them we agree in the quote, so nothing surprises you after handover.",
      ],
    },
    {
      title: "What do you get when the site is finished, and who owns it?",
      body: [
        "You get a site on a domain registered to your business, an account in the content editor and access to the visit data. The copy and photos stay yours even when we stop working together.",
        "Whoever builds your site, check before signing that these will be in your name:",
        {
          list: [
            "the domain, registered to your business",
            "the Google Search Console and Google Analytics account, where searches and visits are shown",
            "admin access to the content editor",
            "the site's code, if it is custom built",
          ],
        },
        "If one day you decide to change provider, you get all the access along with the site, so the new developer carries on where we left off.",
      ],
    },
  ],
  price: {
    from: null,
    note: "A simple site that presents the business costs the least. The price goes up with a shop, custom calculators and links to the till, payments or stock software. It also moves with the number of different page types and whether we write the copy. The quote lists the items and the timescale.",
  },
  faq: [
    {
      q: "Do you build websites for businesses in other cities and countries?",
      a: "Yes, we work with businesses remotely. We don't need to meet in person to build a site, since we go through the design together on a video call and send you the copy to read. Pando Cleaning, one of our projects, is a cleaning company in Jacksonville, Florida.",
    },
    {
      q: "Is SEO included in the website build?",
      a: "The basics are. Every page gets a title and description for Google, the site has a sitemap for search engines and it opens quickly on mobile. New copy and local SEO month after month belong to [SEO](/services/seo), a separate service you can add straight away or once the site is live and getting its first visits.",
    },
    {
      q: "Can I change the copy, prices and images on the site myself?",
      a: "You can, and you don't need a developer for it. With the site you get an account in the Sanity content editor, where every page has its own fields for the heading, copy, price and photos. When you save a change, the site shows it by itself. Page layout and new features are changed by us, as part of maintenance or as a one-off change.",
    },
    {
      q: "What is different about building an online shop?",
      a: "In a shop the product page needs the most attention, more than the homepage. A customer who types in an exact model should land on that very product, with the price, stock and a buy button.",
    },
    {
      q: "Can an online shop take card payments?",
      a: "It can. Card payments go through the bank or payment provider your business signs a contract with. We build that link into the shop and check before launch that the order and payment go through end to end. If you also sell in a store, we can connect the shop to your till as well.",
    },
    {
      q: "Do you build websites for lawyers, restaurants and estate agents?",
      a: "Yes, and the trade mostly changes the page list. A lawyer needs a page for every area of law people search for, and a restaurant needs a menu the staff can change easily and an address that is visible straight away. An estate agent needs a listings search by price and location. On the first call we go through the searches in your trade and build the list from them.",
    },
    {
      q: "Can you redesign an existing site instead of building a new one?",
      a: "We can, and Pando Cleaning is an example of a rebuild like that. The old site was one long page, and every service, every city and the pricing got pages of their own. Before a redesign we look in Search Console at which pages already bring visits, so we keep them or redirect them to the new addresses.",
    },
  ],
  cta: {
    title: "Book a call and find out what kind of site your business needs",
    text: "Send us the address of your current site or write what you sell and to whom. On the call we will tell you what kind of site you need, what it should connect to and what sets the price of the build most in your case. If you are not sure a site is the first step, [answer three questions](/#your-plan) and get a recommendation for where to start.",
  },
};

export default page;
