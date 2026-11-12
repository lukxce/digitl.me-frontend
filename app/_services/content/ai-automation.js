/* To confirm (Luka): claims about how Digitl works that this page makes and
   that no approved source states, one per line, so Luka can confirm or cut
   them before the page goes live. Clients appear on the page without names;
   the name in brackets is for you only.
   Examples from our work (anonymous):
   - Online shop for heating and cooling equipment with thousands of products (ThermiQ): every morning the tool checks supplier and competitor prices and sets the price 4% below the lowest competitor price; a change of more than 15% waits for someone from the shop to look at it and confirm.
   - Same shop: gets new prices every morning through an API; goods sold by the metre have a per-metre price, so the tool compares like units.
   - Ceramics and bathroom shop (Ideal Keramika): price lists from many manufacturers, each in a different spreadsheet, enter the catalogue on their own, sorted into categories and attributes; every product gets a title and description for Google.
   - Customer quotes are built from the catalogue with current prices, and the salesperson only checks and sends them (in the text next to ceramics; the same applies to ThermiQ).
   - Toner shop (TonerPro): searching by printer model returns the toners that fit; prices follow the lowest market price down to a margin floor set by the owner.
   - One business (Praxis): a CRM, a program for keeping client records (no other details).
   How we work (new on this page):
   - Business review: we talk to the owner and to the people who do the tasks every day; we write down what is done by hand, how long it takes and where mistakes happen.
   - Concept: a proposal for which task goes first, where the tool takes its data from and what people decide, with a price and deadline for each part.
   - Build and maintenance: we connect the tool to the client's site and the software they use, monitor it and adapt it when a source changes; until it is adapted, the tool doesn't change prices on its own.
   - We introduce each part separately; a new tool runs alongside the manual process for a while until the results match.
   - Before the build we write down how long a task takes, and after the first weeks we compare; the client sees the result and changes in the client portal and the monthly report.
   - Every automation has a limit up to which it works on its own; everything beyond it waits for confirmation from a person in the business.
   - We put AI where a person can quickly check the result before it reaches the customer.
   - We don't propose automating a task that rarely repeats.
   - The "What a person decides" column in the table (margin floor, items the import can't sort, discounts for larger customers, checking amounts before booking and the rest) describes how we build such tools.
   - Services we offer that aren't among the finished examples: AI assistant on the site, site enquiries into a CRM with a reminder, reading data from invoices, sales from enquiries back into Google Ads (done for ThermiQ, but unnamed).
   - We connect the site to a till or point-of-sale system, stock or accounting software when that software has an API or a spreadsheet export; we check this before the quote.
   - The AI assistant answers only from the business's data, passes a question it can't answer to a person with the whole conversation, and before launch we test it on questions customers actually sent.
   - Data stays in the client's database and accounts; we send the AI model only the data needed for the task.
   - The client gets the exact cost of build and maintenance with the concept, after the first call. */

const page = {
  slug: "ai-automation",
  service: "ai",
  seo: {
    title: "AI and business automation for small businesses | Digitl",
    description:
      "Quotes that build themselves, prices that track the competition and supplier price lists without retyping. See what we automate and book a call.",
  },
  label: "AI and automation",
  h1: "AI and business automation",
  lead: "We build AI tools and automations that take tasks off your staff that repeat every week. Prices are matched to the competition every morning, a quote puts itself together, and a supplier's price list goes into the catalogue without retyping. Your people decide only what needs judgement, for example a large price change.",
  proof: [],
  intro: {
    title: "What business automation is and where AI helps",
    body: [
      "Business automation means that tasks repeated by fixed rules are no longer done by hand by your staff. These are retyping prices, entering supplier price lists, putting together quotes and chasing enquiries nobody has answered. That leaves people time for what needs judgement, such as talking to a customer or deciding on a price.",
      "AI (artificial intelligence) helps with tasks where the input isn't tidy, for example when every supplier names the columns in their price list differently, or when a product description has to be written from technical data. We measure the benefit in hours and mistakes, so before building we write down how long the task takes today.",
      "For an online shop selling heating and cooling equipment, with thousands of products, we built price tracking. Every morning the tool checks supplier and competitor prices and sets the price 4% below the lowest competitor price. A change of more than 15% waits for someone from the shop to look at it and confirm.",
      "A ceramics and bathroom shop gets price lists from many manufacturers, each in a different spreadsheet. The import now sorts them into the shop's categories and attributes on its own, and every product gets a title and description for Google. Customer quotes are built from the same catalogue with current prices, so the salesperson only checks the quote and sends it.",
      "A customer in a toner shop usually knows only their printer model. For that shop we built a search where they type the model and get the toners that fit, and prices follow the lowest market price down to a margin floor the owner sets.",
    ],
  },
  included: {
    title: "What you get from working with us",
    intro:
      "Before we build any tool, we learn how your business works today and where it loses time.",
    items: [
      {
        title: "Business review",
        sub: "where the time goes",
        text: "We talk to you and to the people who do the tasks every day. We write down what is done by hand, how long it takes and where mistakes happen, for example a price that lags behind or an enquiry nobody answered.",
      },
      {
        title: "Concept",
        sub: "what to automate and how",
        text: "You get a proposal for which task we automate first, where the tool takes its data from and what your people still decide. The proposal comes with a price and a deadline for each part.",
      },
      {
        title: "Build and maintenance",
        sub: "and after launch",
        text: "We build the tool and connect it to your site and the software you already use. After launch we monitor it and adapt it when a supplier changes their price list or a competitor changes their site.",
      },
    ],
  },
  steps: {
    title: "How we introduce automation",
    intro:
      "We introduce each part of the concept separately, so the first tool is running and checked before we start the second.",
    items: [
      {
        title: "Rules and limits",
        text: "With the person who does the task today we write down the rules, for example which price yours is calculated from. We agree what runs on its own and what waits for your confirmation.",
      },
      {
        title: "Trial alongside manual work",
        text: "For a while the tool runs alongside the manual process. We compare the results until they match.",
      },
      {
        title: "Going live",
        text: "The tool runs on its own, on a schedule or as soon as new data arrives. Changes beyond the agreed limit come to you for confirmation before a customer sees them.",
      },
      {
        title: "Comparison with before",
        text: "After the first weeks we compare how long the task takes now with what we wrote down at the start. You see the result and changes in the client portal and the monthly report.",
      },
    ],
  },
  cases: [],
  guide: [
    {
      title: "Which tasks in a business are worth automating",
      body: [
        "A task is worth automating when it repeats often by the same rules and its data already exists in a spreadsheet, a program or on a site.",
        "These are the tasks we automate, with what your people still decide afterwards:",
        {
          table: {
            head: ["Task", "What runs on its own", "What a person decides"],
            rows: [
              [
                "Prices against the competition",
                "Every morning competitor and supplier prices are checked, and yours change by the rule",
                "The rule, the margin floor and changes beyond the agreed limit",
              ],
              [
                "Supplier price lists",
                "Manufacturers' prices and data go into the catalogue, sorted by your categories and attributes",
                "Items the import can't sort on its own",
              ],
              [
                "Customer quotes",
                "The quote is built from the catalogue, with current prices",
                "Discounts and terms for larger customers",
              ],
              [
                "Enquiries from the site",
                "The enquiry goes into the CRM, with a reminder when to get back to the customer",
                "What you will offer the customer",
              ],
              [
                "Titles and descriptions for Google",
                "Every product and every category gets a title and description for search",
                "Checking samples before publishing",
              ],
              [
                "Customer questions",
                "An AI assistant on the site answers from your prices, lead times and terms",
                "Questions the assistant can't answer, so it passes them on",
              ],
              [
                "Invoices and documents",
                "Amounts and codes from a PDF go into a spreadsheet",
                "Checking amounts before they are booked",
              ],
              [
                "Sales from enquiries",
                "The sale goes back to Google Ads as a conversion, so you see which campaign brought the customer",
                "Budget per campaign, with [paid advertising](/services/paid-advertising)",
              ],
            ],
          },
        },
        "Product titles and descriptions are also part of [SEO](/services/seo). In a shop with thousands of items, writing them by hand never reaches the end of the catalogue, so automation takes over.",
      ],
    },
    {
      title: "When you need AI, and when plain automation will do",
      body: [
        "You need AI when a task requires understanding text, or a spreadsheet that looks different every time. For a task with clear rules, plain automation is enough, and it is cheaper and always gives the same result.",
        "Price tracking is a task with clear rules. The tool finds the lowest price for the same product, sets yours 4% below it and checks that it stays above the margin floor, and that doesn't need AI.",
        "AI makes sense where the input is messy or where text has to be written:",
        {
          list: [
            "supplier price lists where the same attribute has different names, ‘colour’ for one and ‘shade’ for another",
            "product descriptions and translations into other languages, written from technical data",
            "customer enquiries that need sorting by type and urgency",
            "invoices and documents from which amounts and codes have to be extracted",
            "answers to customer questions from your prices and terms",
          ],
        },
        "AI makes different mistakes from rule-based automation, because it writes even a wrong answer convincingly. That is why we put it where a person can quickly check the result before it reaches the customer, for example a product description before it is published.",
      ],
    },
    {
      title: "Where to start with automation",
      body: [
        "Start with a task that repeats often and where a mistake costs money, for example a price that lags behind your purchase cost or a quote that waits for days.",
        "Before you order automation from anyone, answer these questions for every task that comes to mind:",
        {
          list: [
            "how many times a week the task repeats and how long it takes each time",
            "whether the person who does it can write the rules down in a few sentences",
            "whether the data is already in a spreadsheet, a program or on a site, or arrives on paper",
            "what happens when the task is late or goes wrong",
          ],
        },
        "A task someone does once a month in a few minutes won't pay back either the build cost or the maintenance, so we don't propose such a task even when it is technically easy.",
        "In a shop we would start with prices or importing price lists, since there a wrong price immediately costs money, or a customer who saw a lower price in another shop. In a business that sells services, enquiries and quotes usually come first, because a customer who waits long for a reply calls someone else.",
      ],
    },
    {
      title: "What the price of automation depends on",
      body: [
        "The price is set mostly by how many programs and data sources need connecting and what state that data is in, more than by the number of products.",
        "An API is the way two programs exchange data without a person between them. One shop we work with gets new prices through an API every morning. When a program has no API, data goes through a spreadsheet export, which needs more checks.",
        "When we put together a quote, we look at these items:",
        {
          list: [
            "how many programs we connect and whether they have an API or only a spreadsheet export",
            "how many sources there are, for example suppliers or shops whose prices you track",
            "whether product codes match between you and the supplier or need pairing",
            "whether the task needs AI, which is paid for by the number of runs",
            "whether you need a screen where a person approves changes beyond the limit",
          ],
        },
        "After the build comes maintenance. A supplier changes the layout of their price list, or a shop you track changes its site, so the tool has to be adapted to the new shape of the data.",
      ],
    },
    {
      title: "How automation stays under your control",
      body: [
        "Every automation we build has a limit up to which it works on its own, and everything beyond it waits for confirmation from someone in your business.",
        "In price tracking the limit is a percentage change, so a large difference is always seen by a person before a customer. Such a difference often means two different products have been compared.",
        "Say another shop sells the same material by the roll, and you sell it by the metre. A tool that only compares numbers would then drop your price far below cost, so the heating equipment shop we work with also has a per-metre price for goods sold by the metre.",
        "Whoever builds your automation, check that it has this:",
        {
          list: [
            "a limit beyond which a change waits for a person to confirm it",
            "a preview before import, so you see what will change before it changes",
            "a log of every change, with the time and the source",
          ],
        },
        "Without a change log you can't find out why a product's price was different yesterday, and that is the first question when a customer complains.",
      ],
    },
  ],
  price: {
    from: 100,
    note: "The amount depends on how many programs we connect, how many data sources there are and what state they are in, and whether the task needs AI. You get the exact price for the build and maintenance with the concept, after the first call.",
  },
  faq: [
    {
      q: "Does AI replace staff?",
      a: "It takes over retyping and checking, and decisions stay with people. A salesperson who no longer retypes price lists has more time for customers, and a large price change or a quote for an important customer is still approved by someone in the business.",
    },
    {
      q: "Do we need a new site to introduce automation?",
      a: "Not necessarily. Price tracking, price list imports and reports can work with the site you already have, if the site can receive data from outside. When your current site is closed to changes or has no way to receive new prices, we will suggest [building a new site](/services/web-design), since prices on the old one would still be entered by hand.",
    },
    {
      q: "Can you connect the site to a till or accounting software?",
      a: "We can, when that software has an API or at least a spreadsheet export. Then you change stock levels and prices only in the program you already use, and the site picks them up on its own. On the first call tell us which program you use, and we will check what it allows before the quote.",
    },
    {
      q: "What happens when a supplier changes their price list or a competitor changes their site?",
      a: "The tool that reads that source then has to be adapted to the new shape of the data. We monitor errors and unusual results, for example a price that drops overnight far more than usual, and adapt the tool as part of maintenance. Until we do, the tool doesn't change prices on its own.",
    },
    {
      q: "Can an AI assistant answer customers on the site?",
      a: "It can, for questions whose answers already exist in your data, such as delivery times, warranty or opening hours. The assistant answers only from what you give it, and a question it can't answer or one that needs a quote it passes to a person, with the whole conversation. Before launch we test it on questions your customers actually sent you.",
    },
    {
      q: "Do you do automation for businesses that aren't online shops?",
      a: "We do. For one business we built a CRM, a program for keeping client records. For businesses that sell services, most time usually goes on enquiries, quotes and reminders to get back to customers, and those are tasks with clear rules.",
    },
    {
      q: "Where is the data kept and who sees it?",
      a: "The data stays in your database and in accounts registered to your business. When a task uses AI, we send the model only what it needs for that task, for example a product's technical data for a description, without customer data.",
    },
  ],
  cta: {
    title: "Show us the task that takes up most of your time",
    text: "Book a call and describe one task you do by hand today, for example quotes, prices or importing price lists. We will tell you whether it is worth automating, what would run on its own and what would wait for your confirmation.",
  },
};

export default page;
