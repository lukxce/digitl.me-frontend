/* To confirm (Luka): claims about how Digitl works that this page makes and
   that no approved source states, one per line, so Luka can confirm or cut
   them before the page goes live.
   - "For a local service in a town with little competition, search usually starts bringing in enquiries in earnest after about three months" (a general rule drawn from two .rs client projects; on .me it now stands without a named example)
   - "In the first month we check whether Google has read every page"; rankings are compared from the second and third month
   - After the first review the client gets a list of pages and fixes for the first three months
   - The exact monthly amount (from €250 upwards) is given after reviewing the site and the searches in the client's trade
   - On the Google Business Profile we enter the exact business category and add photos of finished jobs
   - We check that the site's settings don't block the bots AI tools use to read pages
   - We also do SEO on an existing site we didn't build, if it is fast and can be edited
   - The monthly report shows search visits per page, enquiries that came from search and the plan of pages and changes for next month
   - The client portal shows the list of pages and fixes done
   - If the client has no Google Search Console, we set it up at the start
   - Blog articles are part of the SEO service and their number goes into the price (from Luka's note on pricing, check the wording) */

const page = {
  slug: "seo",
  service: "seo",
  seo: {
    title: "SEO for Google and AI search | Digitl",
    description:
      "Website SEO for businesses: exactly what we do, how long it takes before search starts bringing in enquiries and what the price depends on. Book a call.",
  },
  label: "SEO",
  h1: "Search engine optimisation for your website",
  lead: "We write pages for the services you sell and optimise your site and Google Business Profile, so people looking for your service find you on Google and in AI search. We work with businesses from local trades and clinics to online shops. Every month you see rankings, visits and enquiries from search.",
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
  ],
  intro: {
    title: "What SEO is and what you get from it",
    body: [
      "SEO is writing pages and setting up a site technically so that Google shows you to people searching for what you sell, without paying per click. The name is short for search engine optimisation. The same pages and the same information about your business are now also read by AI assistants like ChatGPT when they recommend a service or a shop to someone.",
      "For us, a position on Google is a step along the way. We track which searches the site appears for and how many people come to the site from them, and in the end how many of them call or send a message. That last number is what matters to your business, so we use it to choose which page we write or fix next.",
      "Don't expect enquiries from SEO next week. If you need enquiries straight away, [paid advertising](/services/paid-advertising) will bring them faster, and you build SEO alongside it so that in a few months you depend less on ads. When you're not sure what your first step is, [the three-question plan](/#your-plan) recommends in half a minute whether to start with SEO or with something else.",
    ],
  },
  included: {
    title: "What's included",
    intro:
      "SEO has four parts. You can order all four or only the one your site is missing, and the price depends on that.",
    items: [
      {
        title: "Content writing",
        sub: "service pages and blog articles",
        text: "For every service we write a separate page with your prices and timescales. In blog articles we answer the questions people type into Google before they call, for example how much something costs or how long it takes.",
      },
      {
        title: "Technical SEO",
        sub: "speed and indexing",
        text: "We check whether Google sees every page and whether it has included it in search, which is called indexing. Then we optimise the page titles and descriptions and the site's speed on mobile.",
      },
      {
        title: "Local SEO",
        sub: "Google Business Profile and Maps",
        text: "We optimise your Google Business Profile and make sure the name, phone number and address are the same on the site and in business directories. That way people in your area find you more easily in search and on Google Maps.",
      },
      {
        title: "AEO, optimisation for AI search",
        sub: "ChatGPT and AI answers",
        text: "On the site we write clear answers to customers' questions and describe the business in the same words everywhere it is mentioned, so an AI assistant finds your site more easily and retells it accurately.",
      },
    ],
  },
  steps: {
    title: "How we work",
    intro:
      "The order is the same for a small service site and for an online shop with thousands of products. Only the number of pages differs.",
    items: [
      {
        title: "Search review",
        text: "We collect the searches customers use to look for you, for example the service with the name of your town or the word “price”, and see which ones your site already appears for.",
      },
      {
        title: "Technical check",
        text: "We measure the site's speed on mobile and read the errors Google reports in Search Console. Whatever slows down the whole site we fix before any new copy.",
      },
      {
        title: "One page per search",
        text: "We tie every service and every bigger customer question to one page. We write the pages that are missing and expand the ones that already exist.",
      },
      {
        title: "Report and plan",
        text: "In the monthly report you see what moved in search and where enquiries are coming from, with a plan of pages and changes for next month.",
      },
    ],
  },
  cases: [
    {
      slug: "pando-cleaning",
      title: "Pando Cleaning Solutions",
      text: "A one-page site for a cleaning company in Jacksonville, Florida, rebuilt as 44 pages: one for every service and city, a blog for the questions people ask before booking, and the technical SEO the old site never had.",
    },
  ],
  guide: [
    {
      title: "How long SEO takes to show results",
      body: [
        "For a local service in a town with little competition, search usually starts bringing in enquiries in earnest after about three months. In a large city or a busy trade, expect it to take longer.",
        "Three things move the timescale most:",
        {
          list: [
            "how many businesses in your area already do SEO for the same services",
            "the state the site is in at the start (an old site with errors needs fixing first)",
            "how many pages for your services already exist",
          ],
        },
        "They decide how long you wait for results, while the price is set by the number of pages and changes we make.",
        "In the first month we check whether Google has read every page and which searches the site appears for at all. We compare rankings for the main searches from the second and third month, when there is something to compare.",
        "An ad disappears from search the day you stop paying, while a page that has reached the first page of results usually stays there as long as the content is accurate and nobody writes a better answer.",
      ],
    },
    {
      title: "What the price of SEO depends on",
      body: [
        "SEO starts from €250 a month. The final amount depends on which of these items you order and how many there are:",
        {
          table: {
            head: ["What goes into the price", "What it means"],
            rows: [
              [
                "Service pages",
                "For every service we write a page with a description, the price and answers to customers' questions. More services means more pages.",
              ],
              [
                "Blog articles",
                "Articles answer the questions people type into Google before buying. The price follows the number of articles we write.",
              ],
              [
                "Technical optimisation",
                "What we optimise and fix on the site: speed on mobile, pages Google doesn't see, titles and descriptions in the search results.",
              ],
              [
                "Product catalogue",
                "For an online shop we write templates for product titles and descriptions that apply to the whole catalogue at once.",
              ],
              [
                "Google Business Profile and directories",
                "Whether the price includes local SEO, meaning your Google Business Profile and the same business details in business directories.",
              ],
            ],
          },
        },
        "The same package can't cover both a painter and decorator working in one town and an online shop with thousands of products, so we set the scope only once we have looked at the site and the searches in your trade.",
        "Before you pay anyone for SEO, ask for a list of pages and fixes for the first three months. Without it, after three months you have nothing to check what you got for your money against. With us, that list comes after the first review, together with the price.",
      ],
    },
    {
      title: "How local SEO works for a business in one town",
      body: [
        "People in your area look for you in Google search and on Google Maps, and in both places Google chooses between businesses it knows exactly what they do and where.",
        "So for local businesses we first prepare three things:",
        {
          list: [
            "a Google Business Profile with the exact business category and photos of finished jobs",
            "the same business name, phone number and address, written in the same order and the same words on the site, the profile and in every directory",
            "a separate page for every service, with a description of the service and the price",
          ],
        },
        "A price written on the site brings in people who add the word “price” to the service when they search on Google.",
        "If you work in several towns, don't make copies of the same page where only the town name changes. Google lists such pages as doorway pages in its [spam policies](https://developers.google.com/search/docs/essentials/spam-policies), and a site that has them can drop in the results or disappear from them entirely.",
        "A page for another town makes sense when it has something of its own, for example jobs done right there or different call-out times. The ten city pages we wrote for [Pando Cleaning](/projects/pando-cleaning) were each written around the homes and the jobs in that city.",
      ],
    },
    {
      title: "What helps ChatGPT and AI search find you",
      body: [
        "AI assistants like ChatGPT put an answer together from the pages they find, so it helps them to have a site with clear answers and a business described in the same words everywhere it is mentioned.",
        "That is why AEO (Answer Engine Optimisation) is mostly writing and editing copy. With us it comes down to four things:",
        {
          list: [
            "on a service page, right under the heading, a sentence that answers the customer's question, for example how much the service costs or how long it takes",
            "the same description of the business and its services on the site, the Google Business Profile, social media and in directories",
            "prices and opening hours written as text on the page, never only in an image",
            "site settings that don't block the bots AI tools use to read pages",
          ],
        },
        "Say your site says you work only in Manchester, while your Google Business Profile says the whole North West: the assistant then has no clear answer to the question of where you work. No tag in the code, structured data included, guarantees that ChatGPT will mention you, and we tell you that before you pay for anything.",
      ],
    },
  ],
  price: {
    from: 250,
    // kept as the Serbian literal: app/services/[slug]/page.js compares
    // price.per === "mesečno" to add the monthly unit to the JSON-LD offer
    per: "a month",
    note: "The price depends on how many pages and blog articles we write and what we optimise on the site and the Google Business Profile. Before we start you get a list of pages and fixes, so you know exactly what you are paying for.",
  },
  faq: [
    {
      q: "Can you guarantee first place on Google?",
      a: "We can't, because Google decides the order of the results, and in its [guide to hiring an SEO](https://developers.google.com/search/docs/fundamentals/do-i-need-seo) it says that no one can guarantee first place. We promise what depends on us: a plan of pages and changes for every month and a report that shows what has moved as a result. If someone guarantees you first place, ask them for which search and by when.",
    },
    {
      q: "Do you do SEO for businesses in other towns and countries?",
      a: "Yes, we work remotely. For local SEO we don't need to be in your town, because we optimise the site and the Google Business Profile in the same way for a business in Leeds, Bristol or Glasgow. Pando Cleaning, one of our projects, is a cleaning company in Jacksonville, Florida.",
    },
    {
      q: "Do you do SEO for online shops?",
      a: "We do, and SEO works differently there than on a site with a few services. When a shop has hundreds or thousands of products, we set the titles and descriptions in a template, so they apply to the whole catalogue at once.",
    },
    {
      q: "Do I need a new site for SEO?",
      a: "No, as long as the site loads quickly on mobile and we can change the copy and add pages. Then we work on the existing site, whoever built it. If it is slow or locked against changes, we will suggest [building a new site](/services/web-design), since on a site like that even good copy doesn't get far in search.",
    },
    {
      q: "How can you tell SEO is bringing in enquiries?",
      a: "By the numbers in the monthly report. It has rankings for the searches that bring you customers, visits from Google search per page and enquiries that came from search. You also see what we did that month in the client portal, with a list of the pages written and fixes made.",
    },
    {
      q: "What do you need from us to get started?",
      a: "Access to the site and to your Google Business Profile, if you have one, and a list of the services you want to sell, with prices or at least a price range. We also need Google Search Console, Google's free tool that shows how the site is doing in search. If you don't have it, we set it up at the start.",
    },
    {
      q: "Can a business owner do SEO themselves?",
      a: "The basics of optimising a site for Google, yes, and they are worth knowing even when you work with an agency. Write a separate page for every service, with the price wherever you can, and check in Search Console which pages Google hasn't included in search. An agency pays off when you don't have time left for it, or when many businesses in your area compete for the same searches.",
    },
  ],
  cta: {
    title: "Find out which searches customers still don't find you for",
    text: "Book a call, and we will look at which searches your site already appears for and which pages it is missing. If you only need a direction, answer three questions and get a recommendation for where to start.",
  },
};

export default page;
