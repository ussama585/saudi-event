import {
  Globe2,
  TrendingUp,
  Sparkles,
  Handshake,
} from "lucide-react";

export const links = [
  ["About", "about"],
  ["Agenda", "agenda"],
  ["Speakers", "speakers"],
  ["Passes", "passes"],
  ["Venue", "venue"],
];

export const days = [
  {
    date: "15 OCT",
    title: "Growth & opportunity",
    theme: "Building a stronger economic future",
    sessions: [
      ["09:00", "Opening keynote", "The next chapter of Saudi business", "Main stage"],
      ["10:30", "Leadership panel", "New markets. New possibilities.", "Main stage"],
      ["13:00", "Strategic dialogue", "Investment & economic transformation", "Forum hall"],
      ["15:00", "Networking", "Connections that move business forward", "Delegate lounge"],
    ],
  },
  {
    date: "16 OCT",
    title: "Innovation & transformation",
    theme: "Ideas that create lasting impact",
    sessions: [
      ["09:00", "Innovation keynote", "Leading in an AI-powered economy", "Main stage"],
      ["10:30", "Expert panel", "The digital enterprise of tomorrow", "Main stage"],
      ["13:00", "Working session", "From bold ideas to business impact", "Forum hall"],
      ["15:00", "Founder dialogue", "Scaling the next generation of ventures", "Delegate lounge"],
    ],
  },
  {
    date: "17 OCT",
    title: "Partnerships & impact",
    theme: "Turning conversations into collaboration",
    sessions: [
      ["09:00", "Leadership keynote", "Partnerships beyond borders", "Main stage"],
      ["10:30", "Roundtable", "Connecting regional and global ambition", "Forum hall"],
      ["13:00", "Strategic dialogue", "Building resilient business ecosystems", "Main stage"],
      ["15:00", "Closing session", "A shared vision for tomorrow", "Main stage"],
    ],
  },
];

export const passes = [
  {
    name: "General Delegate",
    label: "Be part of the conversation",
    perks: [
      "All three days of summit access",
      "Keynotes & panel discussions",
      "Exhibition & networking areas",
      "Digital programme access",
    ],
  },
  {
    name: "Executive Pass",
    label: "Make every connection count",
    perks: [
      "Everything in General Delegate",
      "Executive networking sessions",
      "Dedicated delegate lounge",
      "Priority session access",
    ],
  },
  {
    name: "VIP",
    label: "An elevated summit experience",
    perks: [
      "Everything in Executive Pass",
      "VIP seating at main-stage sessions",
      "Exclusive leadership roundtables",
      "Dedicated event concierge",
    ],
  },
];

export const faqs = [
  [
    "When and where is the summit?",
    "Riyadh Business Summit 2026 takes place from 15 to 17 October 2026 in Riyadh, Saudi Arabia. The exact venue will be announced.",
  ],
  [
    "Who should attend?",
    "Business leaders, entrepreneurs, investors, innovators and professionals interested in economic growth and strategic partnerships.",
  ],
  [
    "What is included in each pass?",
    "Explore the proposed pass inclusions above. Final pricing and benefits will be confirmed when registration officially opens.",
  ],
  [
    "Can I register a group or corporate delegation?",
    "Group and corporate registration information will be published with the final registration details.",
  ],
  [
    "Are accommodation and travel included?",
    "Accommodation and travel are not currently included. Recommended hotels and any available delegate rates will be announced once the venue is confirmed.",
  ],
  [
    "Will the agenda and speakers be updated?",
    "Yes. The programme shown is a proposed outline. Confirmed keynote speakers, biographies and session details will be announced before the event.",
  ],
];

export const speakerItems = [
  {
    icon: Globe2,
    track: "ECONOMIC GROWTH",
    title: "The future of business",
    topic: "New opportunities in a changing economy",
  },
  {
    icon: Sparkles,
    track: "INNOVATION",
    title: "Beyond the next big idea",
    topic: "Technology, transformation & impact",
  },
  {
    icon: Handshake,
    track: "STRATEGIC PARTNERSHIPS",
    title: "Stronger, together",
    topic: "Collaboration on a global stage",
  },
];

export const pillars = [
  {
    icon: TrendingUp,
    number: "01",
    title: "Unlock economic growth",
    text: "Explore emerging markets, investment opportunities and the forces shaping a stronger economy.",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "Accelerate innovation",
    text: "Discover the ideas and technologies transforming industries and redefining what comes next.",
  },
  {
    icon: Handshake,
    number: "03",
    title: "Build strategic partnerships",
    text: "Meet the people who share your ambition. Turn meaningful conversations into future collaboration.",
  },
];
