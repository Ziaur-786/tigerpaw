// FlexForge Constants
// Brand Identity
export const BRAND = {
  name: "FlexForge",
  tagline: "Train Smarter. Live Stronger.",
  description: "Premium fitness & health platform with personalized workouts, nutrition plans, and science-backed coaching.",
};

// Color Palette
export const COLORS = {
  background: "#050505",
  secondaryBackground: "#101010",
  card: "#161616",
  accent: "#00E676",
  text: "#FFFFFF",
  secondaryText: "#9E9E9E",
  border: "rgba(255, 255, 255, 0.08)",
  glass: "rgba(255, 255, 255, 0.04)",
  overlay: "rgba(5, 5, 5, 0.8)",
};

// Typography
export const TYPOGRAPHY = {
  fontFamily: {
    sans: "var(--font-space-grotesk), system-ui, sans-serif",
    display: "var(--font-space-grotesk), system-ui, sans-serif",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeight: {
    tight: 1.1,
    normal: 1.6,
    relaxed: 1.8,
  },
};

// Animation Durations
export const ANIMATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.9,
  slower: 1.2,
  spring: {
    type: "spring",
    damping: 25,
    stiffness: 500,
  } as const,
  ease: [0.4, 0, 0.2, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
};

// Spacing
export const SPACING = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "4rem",
  "4xl": "6rem",
  "5xl": "8rem",
};

// Border Radius
export const BORDER_RADIUS = {
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  "3xl": "2rem",
  full: "9999px",
};

// Shadows
export const SHADOWS = {
  glass: "0 8px 32px rgba(0, 0, 0, 0.3)",
  glassSm: "0 4px 16px rgba(0, 0, 0, 0.2)",
  glow: "0 0 40px rgba(0, 230, 118, 0.2)",
  glowLg: "0 0 60px rgba(0, 230, 118, 0.3)",
  innerGlow: "inset 0 0 30px rgba(0, 230, 118, 0.1)",
};

// Breakpoints
export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

// Z-Index
export const Z_INDEX = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modal: 400,
  popup: 500,
  tooltip: 600,
  notification: 700,
  loading: 800,
  max: 9999,
};

// 3D Background Configuration
export const BACKGROUND_3D = {
  particleCount: 500,
  sphereCount: 5,
  lineCount: 20,
  gridSize: 50,
  mouseInteraction: true,
  cameraMovement: true,
  bloomIntensity: 0.5,
  bloomThreshold: 0.1,
  fogDensity: 0.01,
  fogColor: "#050505",
};

// Scroll Configuration
export const SCROLL = {
  smooth: true,
  inertia: 0.8,
  parallaxIntensity: 0.3,
  snap: false,
  progressBar: true,
};

// SEO Configuration
export const SEO = {
  title: "FlexForge - Train Smarter. Live Stronger.",
  description: "Premium fitness & health platform with personalized workouts, nutrition plans, and science-backed coaching.",
  keywords: [
    "fitness",
    "workout",
    "nutrition",
    "health",
    "personal training",
    "gym",
    "muscle building",
    "weight loss",
    "fitness coaching",
    "healthy lifestyle",
  ],
  author: "FlexForge",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://flexforge.com",
    siteName: "FlexForge",
    images: [
      {
        url: "https://flexforge.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "FlexForge - Premium Fitness Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@flexforge",
    creator: "@flexforge",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};

// Navigation Links
export const NAVIGATION = {
  links: [
    { label: "Home", href: "/" },
    { label: "Programs", href: "#programs" },
    { label: "Nutrition", href: "#nutrition" },
    { label: "Transformations", href: "#transformations" },
    { label: "Calculators", href: "#calculators" },
    { label: "Plans", href: "#plans" },
    { label: "Trainers", href: "#trainers" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ],
};

// Workout Programs
export const WORKOUT_PROGRAMS = [
  {
    id: "strength",
    title: "Strength Training",
    description: "Build raw power and muscle mass with progressive overload programs.",
    category: "Muscle Building",
    difficulty: "Intermediate",
    duration: "8-12 weeks",
    sessionsPerWeek: 4,
    icon: "Dumbbell",
    color: "#00E676",
    image: "/images/strength.jpg",
    features: ["Barbell lifts", "Compound movements", "Progressive overload", "Strength tracking"],
    price: 99,
    popular: true,
  },
  {
    id: "fat-loss",
    title: "Fat Loss Accelerator",
    description: "Burn fat efficiently while preserving muscle with metabolic conditioning.",
    category: "Weight Loss",
    difficulty: "Beginner",
    duration: "12 weeks",
    sessionsPerWeek: 5,
    icon: "Flame",
    color: "#FF6B6B",
    image: "/images/fat-loss.jpg",
    features: ["HIIT workouts", "Cardio circuits", "Fat-burning zones", "Nutrition sync"],
    price: 89,
    popular: true,
  },
  {
    id: "hiit",
    title: "HIIT Shred",
    description: "High-intensity interval training for maximum calorie burn in minimal time.",
    category: "Cardio",
    difficulty: "Advanced",
    duration: "6 weeks",
    sessionsPerWeek: 4,
    icon: "Zap",
    color: "#FFD93D",
    image: "/images/hiit.jpg",
    features: ["Tabata protocol", "EMOM workouts", "AMRAP challenges", "Fast results"],
    price: 79,
    popular: false,
  },
  {
    id: "yoga",
    title: "Yoga Flow",
    description: "Improve flexibility, mobility, and mindfulness with guided yoga sequences.",
    category: "Flexibility",
    difficulty: "All Levels",
    duration: "Ongoing",
    sessionsPerWeek: 3,
    icon: "Lotus",
    color: "#6B73FF",
    image: "/images/yoga.jpg",
    features: ["Vinyasa flows", "Restorative poses", "Breathwork", "Meditation"],
    price: 69,
    popular: false,
  },
  {
    id: "bodybuilding",
    title: "Bodybuilding Blueprint",
    description: "Sculpt your physique with hypertrophy-focused training and posing practice.",
    category: "Muscle Building",
    difficulty: "Advanced",
    duration: "16 weeks",
    sessionsPerWeek: 6,
    icon: "Trophy",
    color: "#FF6B9D",
    image: "/images/bodybuilding.jpg",
    features: ["Split routines", "Isolation exercises", "Posing drills", "Contest prep"],
    price: 129,
    popular: true,
  },
  {
    id: "functional",
    title: "Functional Fitness",
    description: "Train for real-life movements and athletic performance.",
    category: "Athletic",
    difficulty: "Intermediate",
    duration: "12 weeks",
    sessionsPerWeek: 4,
    icon: "Target",
    color: "#4ECDC4",
    image: "/images/functional.jpg",
    features: ["Kettlebell work", "Bodyweight skills", "Plyometrics", "Core stability"],
    price: 89,
    popular: false,
  },
];

// Nutrition Data
export const NUTRITION_CATEGORIES = [
  { label: "Calories", value: "calories", unit: "kcal", color: "#00E676" },
  { label: "Protein", value: "protein", unit: "g", color: "#4ECDC4" },
  { label: "Carbohydrates", value: "carbs", unit: "g", color: "#FFD93D" },
  { label: "Fats", value: "fats", unit: "g", color: "#FF6B6B" },
];

// Sample Meal Plans
export const MEAL_PLANS = [
  {
    id: "high-protein",
    title: "High Protein",
    description: "Maximize muscle growth with protein-rich meals.",
    calories: 2500,
    protein: 200,
    carbs: 200,
    fats: 70,
    meals: 5,
    price: 49,
  },
  {
    id: "keto",
    title: "Ketogenic",
    description: "Burn fat for fuel with low-carb, high-fat meals.",
    calories: 2200,
    protein: 120,
    carbs: 30,
    fats: 180,
    meals: 4,
    price: 59,
  },
  {
    id: "balanced",
    title: "Balanced",
    description: "Perfect macronutrient balance for overall health.",
    calories: 2400,
    protein: 150,
    carbs: 250,
    fats: 80,
    meals: 5,
    price: 39,
  },
  {
    id: "vegan",
    title: "Vegan",
    description: "Plant-based nutrition for ethical and healthy living.",
    calories: 2300,
    protein: 130,
    carbs: 280,
    fats: 60,
    meals: 5,
    price: 45,
  },
];

// Sample Recipes
export const RECIPES = [
  {
    id: "chicken-breast",
    title: "Grilled Chicken Breast",
    description: "Simple and delicious high-protein meal.",
    calories: 350,
    protein: 45,
    carbs: 5,
    fats: 15,
    preparationTime: 20,
    difficulty: "Easy",
    category: "Dinner",
    image: "/images/chicken-breast.jpg",
  },
  {
    id: "oatmeal",
    title: "Protein Oatmeal",
    description: "Perfect breakfast to start your day.",
    calories: 400,
    protein: 30,
    carbs: 50,
    fats: 8,
    preparationTime: 10,
    difficulty: "Easy",
    category: "Breakfast",
    image: "/images/oatmeal.jpg",
  },
  {
    id: "salmon",
    title: "Baked Salmon",
    description: "Rich in omega-3 fatty acids and protein.",
    calories: 450,
    protein: 40,
    carbs: 10,
    fats: 28,
    preparationTime: 25,
    difficulty: "Medium",
    category: "Dinner",
    image: "/images/salmon.jpg",
  },
  {
    id: "smoothie",
    title: "Green Protein Smoothie",
    description: "Quick and nutritious post-workout shake.",
    calories: 300,
    protein: 25,
    carbs: 35,
    fats: 5,
    preparationTime: 5,
    difficulty: "Easy",
    category: "Snack",
    image: "/images/smoothie.jpg",
  },
];

// Transformation Data
export const TRANSFORMATIONS = [
  {
    id: "john-doe",
    name: "John Doe",
    before: {
      weight: 95,
      bodyFat: 25,
      waist: 95,
      image: "/images/before-john.jpg",
    },
    after: {
      weight: 78,
      bodyFat: 12,
      waist: 82,
      image: "/images/after-john.jpg",
    },
    duration: "16 weeks",
    program: "Fat Loss Accelerator",
    testimonial: "FlexForge completely transformed my life. The personalized approach made all the difference.",
    rating: 5,
  },
  {
    id: "jane-smith",
    name: "Jane Smith",
    before: {
      weight: 62,
      bodyFat: 22,
      waist: 75,
      image: "/images/before-jane.jpg",
    },
    after: {
      weight: 65,
      bodyFat: 18,
      waist: 70,
      image: "/images/after-jane.jpg",
    },
    duration: "12 weeks",
    program: "Bodybuilding Blueprint",
    testimonial: "I gained muscle and lost fat at the same time. The nutrition guidance was spot on.",
    rating: 5,
  },
  {
    id: "mike-johnson",
    name: "Mike Johnson",
    before: {
      weight: 85,
      bodyFat: 20,
      waist: 88,
      image: "/images/before-mike.jpg",
    },
    after: {
      weight: 82,
      bodyFat: 14,
      waist: 80,
      image: "/images/after-mike.jpg",
    },
    duration: "14 weeks",
    program: "Strength Training",
    testimonial: "My strength gains have been incredible. I'm lifting weights I never thought possible.",
    rating: 5,
  },
];

// Membership Plans
export const MEMBERSHIP_PLANS = [
  {
    id: "basic",
    title: "Basic",
    description: "Access to basic workout programs and nutrition guidance.",
    monthlyPrice: 29,
    yearlyPrice: 299,
    features: [
      "Access to 5 workout programs",
      "Basic nutrition tracking",
      "Community support",
      "Email support",
    ],
    recommended: false,
    popular: false,
  },
  {
    id: "premium",
    title: "Premium",
    description: "Full access to all features including personalized coaching.",
    monthlyPrice: 79,
    yearlyPrice: 799,
    features: [
      "All workout programs",
      "Advanced nutrition tracking",
      "Personalized meal plans",
      "Priority support",
      "Progress analytics",
      "Exclusive content",
    ],
    recommended: true,
    popular: true,
  },
  {
    id: "elite",
    title: "Elite",
    description: "One-on-one coaching with certified trainers.",
    monthlyPrice: 199,
    yearlyPrice: 1999,
    features: [
      "Everything in Premium",
      "1-on-1 coaching sessions",
      "Custom workout programs",
      "Personalized nutrition plans",
      "24/7 support",
      "Weekly check-ins",
    ],
    recommended: false,
    popular: false,
  },
];

// Fitness Calculators
export const FITNESS_CALCULATORS = [
  {
    id: "bmi",
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index to assess your weight category.",
    icon: "Scale",
    color: "#00E676",
  },
  {
    id: "calories",
    title: "Calorie Calculator",
    description: "Determine your daily caloric needs based on your goals.",
    icon: "Flame",
    color: "#FFD93D",
  },
  {
    id: "protein",
    title: "Protein Intake",
    description: "Calculate your optimal protein intake for muscle growth.",
    icon: "Dumbbell",
    color: "#4ECDC4",
  },
  {
    id: "body-fat",
    title: "Body Fat Calculator",
    description: "Estimate your body fat percentage using various methods.",
    icon: "BarChart3",
    color: "#FF6B6B",
  },
  {
    id: "water",
    title: "Water Intake",
    description: "Calculate your daily water requirements.",
    icon: "Droplets",
    color: "#6B73FF",
  },
  {
    id: "bmr",
    title: "BMR Calculator",
    description: "Calculate your Basal Metabolic Rate - calories burned at rest.",
    icon: "Heart",
    color: "#FF6B9D",
  },
  {
    id: "tdee",
    title: "TDEE Calculator",
    description: "Calculate your Total Daily Energy Expenditure.",
    icon: "Activity",
    color: "#FF9F43",
  },
];

// Trainers
export const TRAINERS = [
  {
    id: "alex-carter",
    name: "Alex Carter",
    title: "Head Coach",
    specialty: "Strength & Conditioning",
    experience: "10+ years",
    certifications: ["CSCS", "NASM", "precision Nutrition"],
    image: "/images/trainer-alex.jpg",
    bio: "Former competitive powerlifter turned coach, specializing in strength development and athletic performance.",
    social: {
      instagram: "@alexcarterfit",
      youtube: "AlexCarterFitness",
      email: "alex@flexforge.com",
    },
    rating: 4.9,
    clients: 500,
  },
  {
    id: "sarah-mitchell",
    name: "Sarah Mitchell",
    title: "Nutrition Expert",
    specialty: "Sports Nutrition",
    experience: "8+ years",
    certifications: ["RD", "CSSD", "ISSN"],
    image: "/images/trainer-sarah.jpg",
    bio: "Registered dietitian and sports nutritionist helping athletes fuel for performance.",
    social: {
      instagram: "@sarahmitchellrd",
      youtube: "NutritionWithSarah",
      email: "sarah@flexforge.com",
    },
    rating: 4.8,
    clients: 400,
  },
  {
    id: "mike-rodriguez",
    name: "Mike Rodriguez",
    title: "Transformation Specialist",
    specialty: "Fat Loss",
    experience: "7+ years",
    certifications: ["ACE", "NASM", "FMS"],
    image: "/images/trainer-mike.jpg",
    bio: "Helped hundreds of clients achieve dramatic body transformations through science-based methods.",
    social: {
      instagram: "@mikerodriguezfit",
      youtube: "MikeRodriguezFitness",
      email: "mike@flexforge.com",
    },
    rating: 4.9,
    clients: 600,
  },
  {
    id: "emily-davis",
    name: "Emily Davis",
    title: "Yoga & Mobility Coach",
    specialty: "Flexibility & Recovery",
    experience: "6+ years",
    certifications: ["RYT-500", "YACEP", "FRC"],
    image: "/images/trainer-emily.jpg",
    bio: "Yoga instructor and mobility specialist helping clients improve flexibility and prevent injuries.",
    social: {
      instagram: "@emilydavisyoga",
      youtube: "EmilyDavisYoga",
      email: "emily@flexforge.com",
    },
    rating: 4.7,
    clients: 300,
  },
];

// Blog Categories
export const BLOG_CATEGORIES = [
  { label: "Workouts", value: "workouts", color: "#00E676" },
  { label: "Nutrition", value: "nutrition", color: "#4ECDC4" },
  { label: "Supplements", value: "supplements", color: "#FFD93D" },
  { label: "Mindset", value: "mindset", color: "#FF6B9D" },
  { label: "Recovery", value: "recovery", color: "#6B73FF" },
  { label: "Science", value: "science", color: "#FF9F43" },
];

// Sample Blog Posts
export const BLOG_POSTS = [
  {
    id: "progressive-overload",
    title: "The Science of Progressive Overload",
    excerpt: "How to continuously challenge your muscles for maximum growth.",
    category: "workouts",
    author: "Alex Carter",
    date: "2026-06-26",
    readTime: "8 min",
    image: "/images/blog-progressive-overload.jpg",
    featured: true,
  },
  {
    id: "protein-timing",
    title: "Protein Timing: Does It Matter?",
    excerpt: "The truth about protein timing and muscle protein synthesis.",
    category: "nutrition",
    author: "Sarah Mitchell",
    date: "2026-06-25",
    readTime: "12 min",
    image: "/images/blog-protein-timing.jpg",
    featured: true,
  },
  {
    id: "fat-loss-myths",
    title: "5 Fat Loss Myths Debunked",
    excerpt: "Common misconceptions that are holding you back from losing fat.",
    category: "mindset",
    author: "Mike Rodriguez",
    date: "2026-06-24",
    readTime: "10 min",
    image: "/images/blog-fat-loss-myths.jpg",
    featured: false,
  },
  {
    id: "recovery-strategies",
    title: "Recovery Strategies for Faster Results",
    excerpt: "How proper recovery can accelerate your fitness progress.",
    category: "recovery",
    author: "Emily Davis",
    date: "2026-06-23",
    readTime: "7 min",
    image: "/images/blog-recovery-strategies.jpg",
    featured: false,
  },
];

// FAQ Items
export const FAQ_ITEMS = [
  {
    id: "how-does-it-work",
    question: "How does FlexForge work?",
    answer: "FlexForge provides personalized workout programs, nutrition plans, and coaching based on your goals, fitness level, and preferences. Our AI-powered platform adapts to your progress and provides real-time feedback.",
    category: "General",
  },
  {
    id: "free-trial",
    question: "Do you offer a free trial?",
    answer: "Yes! We offer a 7-day free trial for all new members. You can explore our platform, try sample workouts, and access basic nutrition guidance without any commitment.",
    category: "Pricing",
  },
  {
    id: "cancel-anytime",
    question: "Can I cancel my subscription anytime?",
    answer: "Absolutely. You can cancel your subscription at any time from your account settings. No questions asked, no cancellation fees.",
    category: "Pricing",
  },
  {
    id: "equipment-needed",
    question: "What equipment do I need?",
    answer: "Our programs range from bodyweight-only workouts to gym-based programs. We have options for all equipment levels, from minimal home setups to full commercial gyms.",
    category: "Workouts",
  },
  {
    id: "nutrition-plans",
    question: "Are the nutrition plans customized?",
    answer: "Yes, our nutrition plans are fully personalized based on your goals, dietary preferences, allergies, and lifestyle. We also offer vegetarian, vegan, and other specialized options.",
    category: "Nutrition",
  },
  {
    id: "coach-access",
    question: "How do I communicate with my coach?",
    answer: "Depending on your plan, you can communicate with your coach through our platform's messaging system, video calls, or email. Elite members get 24/7 priority support.",
    category: "Coaching",
  },
];

// Social Media Links
export const SOCIAL_MEDIA = {
  instagram: "https://instagram.com/flexforge",
  facebook: "https://facebook.com/flexforge",
  twitter: "https://twitter.com/flexforge",
  youtube: "https://youtube.com/flexforge",
  linkedin: "https://linkedin.com/company/flexforge",
  tiktok: "https://tiktok.com/@flexforge",
};

// Contact Information
export const CONTACT = {
  email: "hello@flexforge.com",
  support: "support@flexforge.com",
  sales: "sales@flexforge.com",
  phone: "+1 (555) 123-4567",
  address: {
    street: "123 Fitness Way",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
    country: "USA",
  },
};

// Footer Links
export const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Help Center", href: "/help" },
    { label: "Tutorials", href: "/tutorials" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
  connect: [
    { label: "Instagram", href: "https://instagram.com/flexforge" },
    { label: "Facebook", href: "https://facebook.com/flexforge" },
    { label: "Twitter", href: "https://twitter.com/flexforge" },
    { label: "YouTube", href: "https://youtube.com/flexforge" },
  ],
};

export default {
  BRAND,
  COLORS,
  TYPOGRAPHY,
  ANIMATION,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  BREAKPOINTS,
  Z_INDEX,
  BACKGROUND_3D,
  SCROLL,
  SEO,
  NAVIGATION,
  WORKOUT_PROGRAMS,
  NUTRITION_CATEGORIES,
  MEAL_PLANS,
  RECIPES,
  TRANSFORMATIONS,
  MEMBERSHIP_PLANS,
  FITNESS_CALCULATORS,
  TRAINERS,
  BLOG_CATEGORIES,
  BLOG_POSTS,
  FAQ_ITEMS,
  SOCIAL_MEDIA,
  CONTACT,
  FOOTER_LINKS,
};
