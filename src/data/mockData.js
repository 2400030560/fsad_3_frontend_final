// src/data/mockData.js

export const careers = [
  {
    id: 1,
    title: "Software Engineer",
    category: "Technology",
    description: "Design, develop, and maintain software systems and applications.",
    salary: "$90,000 – $150,000",
    skills: ["Problem Solving", "Coding", "Teamwork", "Analytical Thinking"],
    outlook: "Excellent",
    icon: "💻",
    traits: ["logical", "detail-oriented", "creative"],
  },
  {
    id: 2,
    title: "Data Scientist",
    category: "Technology",
    description: "Analyze complex data to help organizations make informed decisions.",
    salary: "$95,000 – $160,000",
    skills: ["Statistics", "Machine Learning", "Python", "Communication"],
    outlook: "Excellent",
    icon: "📊",
    traits: ["analytical", "curious", "logical"],
  },
  {
    id: 3,
    title: "UX Designer",
    category: "Design",
    description: "Create intuitive and engaging user experiences for digital products.",
    salary: "$75,000 – $130,000",
    skills: ["Empathy", "Prototyping", "Research", "Visual Design"],
    outlook: "Good",
    icon: "🎨",
    traits: ["creative", "empathetic", "detail-oriented"],
  },
  {
    id: 4,
    title: "Psychologist",
    category: "Healthcare",
    description: "Study human behavior and mental processes to help individuals.",
    salary: "$70,000 – $120,000",
    skills: ["Empathy", "Research", "Communication", "Analysis"],
    outlook: "Good",
    icon: "🧠",
    traits: ["empathetic", "patient", "analytical"],
  },
  {
    id: 5,
    title: "Marketing Manager",
    category: "Business",
    description: "Plan and execute marketing strategies to promote products and brands.",
    salary: "$65,000 – $120,000",
    skills: ["Creativity", "Analytics", "Communication", "Strategy"],
    outlook: "Good",
    icon: "📣",
    traits: ["creative", "social", "strategic"],
  },
  {
    id: 6,
    title: "Civil Engineer",
    category: "Engineering",
    description: "Design and oversee construction of infrastructure projects.",
    salary: "$70,000 – $120,000",
    skills: ["Math", "Problem Solving", "Project Management", "CAD"],
    outlook: "Moderate",
    icon: "🏗️",
    traits: ["logical", "detail-oriented", "organized"],
  },
];

export const assessments = [
  {
    id: "personality",
    title: "Personality Assessment",
    description: "Discover your core personality traits and how they align with different careers.",
    duration: "10 min",
    icon: "🧩",
    careerId: null,
    questions: [
      {
        id: 1,
        text: "When faced with a problem, you prefer to:",
        options: [
          { label: "Analyze data and facts", trait: "logical" },
          { label: "Trust your gut feeling", trait: "creative" },
          { label: "Ask others for input", trait: "social" },
          { label: "Research thoroughly first", trait: "analytical" },
        ],
      },
      {
        id: 2,
        text: "In a group project, you naturally take on the role of:",
        options: [
          { label: "The organizer / planner", trait: "organized" },
          { label: "The idea generator", trait: "creative" },
          { label: "The mediator", trait: "empathetic" },
          { label: "The executor / doer", trait: "detail-oriented" },
        ],
      },
      {
        id: 3,
        text: "You find it most satisfying when you:",
        options: [
          { label: "Solve a complex puzzle", trait: "logical" },
          { label: "Help someone in need", trait: "empathetic" },
          { label: "Create something from scratch", trait: "creative" },
          { label: "Lead a team to success", trait: "strategic" },
        ],
      },
      {
        id: 4,
        text: "Your ideal work environment is:",
        options: [
          { label: "Quiet and focused", trait: "detail-oriented" },
          { label: "Collaborative and social", trait: "social" },
          { label: "Dynamic and fast-paced", trait: "strategic" },
          { label: "Creative and flexible", trait: "creative" },
        ],
      },
      {
        id: 5,
        text: "How do you prefer to learn new things?",
        options: [
          { label: "By doing / hands-on", trait: "detail-oriented" },
          { label: "By reading / researching", trait: "analytical" },
          { label: "By discussing with others", trait: "social" },
          { label: "By experimenting freely", trait: "creative" },
        ],
      },
    ],
  },
  {
    id: "skills",
    title: "Skills Evaluation",
    description: "Rate your proficiency across key skill areas to match your strengths with careers.",
    duration: "8 min",
    icon: "⚡",
    careerId: null,
    questions: [
      {
        id: 1,
        text: "How comfortable are you with mathematical or statistical concepts?",
        options: [
          { label: "Very comfortable", trait: "logical" },
          { label: "Somewhat comfortable", trait: "analytical" },
          { label: "A little uncomfortable", trait: "creative" },
          { label: "I prefer non-math work", trait: "empathetic" },
        ],
      },
      {
        id: 2,
        text: "How would you rate your written communication skills?",
        options: [
          { label: "Excellent – love writing", trait: "creative" },
          { label: "Good – can write clearly", trait: "analytical" },
          { label: "Average – it's okay", trait: "social" },
          { label: "Prefer speaking over writing", trait: "social" },
        ],
      },
      {
        id: 3,
        text: "How do you handle deadlines and time pressure?",
        options: [
          { label: "Thrive under pressure", trait: "strategic" },
          { label: "Plan ahead to avoid stress", trait: "organized" },
          { label: "Sometimes struggle, but manage", trait: "detail-oriented" },
          { label: "Prefer flexible timelines", trait: "creative" },
        ],
      },
      {
        id: 4,
        text: "How skilled are you with technology and digital tools?",
        options: [
          { label: "Very skilled – love tech", trait: "logical" },
          { label: "Comfortable with common tools", trait: "analytical" },
          { label: "Basic user", trait: "organized" },
          { label: "Prefer non-digital work", trait: "empathetic" },
        ],
      },
    ],
  },
  {
    id: "career-1",
    title: "Software Engineering Aptitude",
    description: "Specific assessment for Software Engineering career path.",
    duration: "12 min",
    icon: "💻",
    careerId: 1,
    questions: [
      {
        id: 1,
        text: "Do you enjoy breaking down complex problems into smaller steps?",
        options: [
          { label: "Yes, very much", trait: "logical" },
          { label: "Sometimes", trait: "analytical" },
          { label: "Not really", trait: "creative" },
          { label: "I prefer big-picture thinking", trait: "strategic" },
        ],
      },
      {
        id: 2,
        text: "How do you feel about writing and debugging code?",
        options: [
          { label: "Love it – it's like solving puzzles", trait: "logical" },
          { label: "It's interesting once I learn it", trait: "analytical" },
          { label: "It's okay but not my passion", trait: "creative" },
          { label: "Not my thing at all", trait: "empathetic" },
        ],
      },
      {
        id: 3,
        text: "Can you sit focused on a technical problem for hours?",
        options: [
          { label: "Absolutely yes", trait: "detail-oriented" },
          { label: "For a while, then I need breaks", trait: "analytical" },
          { label: "I prefer variety in tasks", trait: "creative" },
          { label: "I lose focus quickly", trait: "social" },
        ],
      },
    ],
  },
];

export const adminCredentials = { email: "admin@careerapp.com", password: "admin123" };
export const studentCredentials = [
  { id: "s001", name: "Alex Johnson", email: "alex@student.com", password: "pass123" },
  { id: "s002", name: "Priya Sharma", email: "priya@student.com", password: "pass123" },
];
