export interface ReactionItem {
  id: number;
  message: string;
  subtext?: string;
  stageTag?: string;
  category: "gentle" | "persuasion" | "hero_comic" | "absurd";
  memeUrl?: string; // Integrated meme image endpoint
  audioCue?: string;
  isMajorComedicMoment?: boolean;
}

export const FINAL_PUNCHLINE_MEME = "/api/memes/last%20line%20ab%20apko%20ana%20hi%20pdega.jpg";

export const REJECTION_REACTIONS: ReactionItem[] = [
  // Phase 1: Confused / gentle disappointment (Attempts 1–4, LOCKED)
  {
    id: 1,
    message: "Kya aap sach mein reject karna chahte hain?",
    subtext: "Poore batch ne milkar ye invitation aapke liye banaya hai. Ek baar zaroor sochiye!",
    stageTag: "Polite Disappointment",
    category: "gentle",
    memeUrl: "/api/memes/attempt%201%20schmein.jpg",
  },
  {
    id: 2,
    message: "Ek baar phir soch lijiye... humne aapke liye jagah sambhal kar rakhi hai.",
    subtext: "Front row mein faculty desk ke paas vishesh sthan aapke liye nirdharit hai.",
    stageTag: "Reserved With Care",
    category: "gentle",
    memeUrl: "/api/memes/attempt%202%20ek%20bar%20phir%20sochlijiye.jpg",
  },
  {
    id: 3,
    message: "Lagta hai humein aapko manane ke liye thoda aur prayas karna padega.",
    subtext: "Academic guidance ki tarah, hum bhi seekh rahe hain ki haar nahi maante.",
    stageTag: "Gentle Persistence",
    category: "gentle",
    memeUrl: "/api/memes/attempt%203%20lagta%20hai%20humein%20manae%20ke%20liye%20prayas%20karna%20pdega.jpg",
  },
  {
    id: 4,
    message: "Aap reject karte rahiye... hum aapko manate rahenge.",
    subtext: "Aapki upasthiti ke bina ye aayojan poori tarah adhura rahega.",
    stageTag: "Affectionate Dedication",
    category: "gentle",
    memeUrl: "/api/memes/attempt%204%20aap%20reject%20krte%20rhiye%20hum%20apko%20manate%20rhege.jpg",
  },

  // Phase 2: Polite persuasion (Attempts 5–10)
  {
    id: 5,
    message: "Theek hai... ek aakhri baar pooch rahe hain.",
    subtext: "Ek chhota sa click 'Accept' par, aur hum sabki mehnat safal!",
    stageTag: "Polite Persuasion",
    category: "persuasion",
    memeUrl: "/api/memes/attempt%205%20theek%20h%20akhiri%20bar%20puch%20rhe.jpg",
  },
  {
    id: 6,
    message: "Humne \"aakhri baar\" thoda jaldi bol diya tha.",
    subtext: "Aakhir mentor ko manane mein koi jaldi thodi hoti hai?",
    stageTag: "Second Thoughts",
    category: "persuasion",
    memeUrl: "/api/memes/attempt%206%20humne%20akhiri%20bar%20thoda%20jaldi%20boldiya.jpg",
  },
  {
    id: 7,
    message: "Lekin shayad aapko ek baar aur sochna chahiye.",
    subtext: "Event ka schedule aapke convenience ko dhyan mein rakh kar hi banaya gaya hai.",
    stageTag: "Reconsideration",
    category: "persuasion",
    memeUrl: "/api/memes/attempt%207%20apko%20ek%20bar%20or%20sochna%20chahiye.jpg",
  },
  {
    id: 8,
    message: "Hum abhi bhi poori umeed ke saath yahin hain.",
    subtext: "Students ka utsah abhi bhi 100% barkarar hai.",
    stageTag: "Unfading Hope",
    category: "persuasion",
    memeUrl: "/api/memes/attempt%208%20hum%20bhi%20puri%20umeed%20ke%20sath%20yahi%20hai.jpg",
  },
  {
    id: 9,
    message: "Aapka jawab abhi bhi badla ja sakta hai.",
    subtext: "Accept button abhi bhi wahi hai, utni hi shaan se aapka intezaar kar raha hai.",
    stageTag: "Open Invitation",
    category: "persuasion",
    memeUrl: "/api/memes/attempt%209%20apka%20jawab%20abhi%20bhi%20badla%20ja%20skta%20h.jpg",
  },
  {
    id: 10,
    message: "Humne aapke liye jagah abhi tak sambhal kar rakhi hai.",
    subtext: "Aapka memento aur floral bouquet faculty lounge mein tayyar hai.",
    stageTag: "Safe Keeping",
    category: "persuasion",
    memeUrl: "/api/memes/attempt%2010%20humne%20apke%20lliye%20abhi%20tak%20jgh%20sambhal%20ke%20rkhi%20h.jpg",
  },

  // Phase 3: Comedic Climax & Absurdity (Attempts 11–15)
  // Attempt 11: Major comedic moment
  {
    id: 11,
    message: "Hum ye poora din kar sakte hain.",
    subtext: "Captain America style endurance, par poore aadar aur samman ke sath! 🛡️",
    stageTag: "I Can Do This All Day",
    category: "hero_comic",
    isMajorComedicMoment: true,
    memeUrl: "/api/memes/attempt%2011%20hum%20ye%20pura%20idn%20kar%20skate%20h.jpg",
  },
  {
    id: 12,
    message: "Ab lagta hai hum dono ko pata hai ki ye kahaan jaane wala hai.",
    subtext: "Aapka ungli Reject par hai, lekin aapke dil mein Accept ka vichaar chal raha hai.",
    stageTag: "Mutual Realization",
    category: "absurd",
    memeUrl: "/api/memes/attempt%2012%20abb%20lagta%20hai%20dono%20ko%20pta%20hai%20ki%20ye%20kaha%20ja%20rha%20h.jpg",
  },
  {
    id: 13,
    message: "Aapne kaafi baar mana kar liya... humne bhi kaafi baar pooch liya.",
    subtext: "Par tradition toh tradition hai! Manana humara kartavya hai.",
    stageTag: "Stalemate",
    category: "absurd",
    memeUrl: "/api/memes/attempt%2013%20apne%20kafi%20bar%20mana%20karliya.jpg",
  },
  {
    id: 14,
    message: "Lagta hai ab faisla hum dono se zyada invitation karega.",
    subtext: "Ye digital nimantran ab self-aware ho chuka hai.",
    stageTag: "Sentient Invitation",
    category: "absurd",
    memeUrl: "/api/memes/attempt%2014%20lagta%20hai%20ab%20faisla%20humdono%20se%20jyada%20invitation%20karega.jpg",
  },
  {
    id: 15,
    message: "Theek hai... ab ek chhota sa badlav karte hain.",
    subtext: "Kuch aisa jo shayad aapne expect nahi kiya hoga...",
    stageTag: "The Final Turning Point",
    category: "absurd",
  },
];
