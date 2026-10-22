// Редактируй только этот файл: проекты, скиллы, контакты.
// category: "personal" | "olympiad" | "team"
export const featured = {
  name: "SputnikSim",
  description:
    "Satellite simulation focused on telemetry, system behavior modeling and anomaly-oriented logic. Technical foundation for space-related experiments.",
  tags: ["Python", "Simulation", "Space Tech"],
  link: "https://github.com/SkillichSE/SputnikSim",
};

export const projects = [
  {
    name: "Lumi-bot",
    category: "personal",
    description:
      "Telegram bot with automation and smart behavior, built on Python Telegram libraries. Also has a userbot version.",
    tags: ["Python", "aiogram", "Telegram"],
    link: "https://github.com/SkillichSE/Lumi-bot",
  },
  // --- заглушки, замени на свои ---
  {
    name: "Olympiad project 1",
    category: "olympiad",
    description: "Что делал, для какой олимпиады, какой результат.",
    tags: ["Python"],
  },
  {
    name: "Olympiad project 2",
    category: "olympiad",
    description: "Что делал, для какой олимпиады, какой результат.",
    tags: ["Python"],
  },
  {
    name: "Team project",
    category: "team",
    description: "Твоя роль, размер команды, что получилось.",
    tags: ["Teamwork", "Git"],
  },
];

export const skills = [
  { group: "Languages", items: ["Python", "JavaScript"] },
  { group: "ML & Data", items: ["PyTorch", "NumPy"] },
  { group: "Bots", items: ["aiogram", "telethon"] },
  { group: "Tools", items: ["Git"] },
  { group: "Other", items: ["English B1", "Teamwork", "Fast learner"] },
];

export const contacts = [
  { label: "GitHub", value: "SkillichSE", href: "https://github.com/SkillichSE" },
  { label: "Telegram", value: "@Skillich", href: "https://t.me/Skillich" },
  { label: "Discord", value: "Ski's", href: "https://discordapp.com/users/1101053298351538236" },
];
