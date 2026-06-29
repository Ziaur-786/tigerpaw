"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Scale, Flame, Heart, Droplets, BarChart3, Activity, Zap, ChevronDown, ChevronUp } from "lucide-react";
import { Section, Card, Grid } from "@/components/layout/Container";
import { Button, IconButton } from "@/components/ui/Button";
import { LinearProgress, CircularProgress } from "@/components/ui/ProgressBar";
import { cn } from "@/utils";
import { FITNESS_CALCULATORS, ANIMATION, COLORS } from "@/constants";
import { calculateBMI, calculateBMR, calculateTDEE, calculateWaterIntake, calculateBodyFat, calculateMacros } from "@/utils/calculators";

// Calculator types
const calculatorTypes = [
  { id: "bmi", label: "BMI Calculator" },
  { id: "bmr", label: "BMR Calculator" },
  { id: "tdee", label: "TDEE Calculator" },
  { id: "water", label: "Water Intake" },
  { id: "body-fat", label: "Body Fat %" },
  { id: "macros", label: "Macros" },
];

/**
 * Calculator Card Component
 */
const CalculatorCard = ({
  calculator,
  index,
  onClick,
  isActive,
}: {
  calculator: (typeof FITNESS_CALCULATORS)[number];
  index: number;
  onClick: () => void;
  isActive: boolean;
}) => {
  // Map calculator ID to icon
  const iconMap: Record<string, React.ReactNode> = {
    bmi: <Scale className="w-8 h-8" />,
    calories: <Flame className="w-8 h-8" />,
    protein: <Dumbbell className="w-8 h-8" />,
    "body-fat": <BarChart3 className="w-8 h-8" />,
    water: <Droplets className="w-8 h-8" />,
    bmr: <Heart className="w-8 h-8" />,
    tdee: <Activity className="w-8 h-8" />,
  };

  const icon = iconMap[calculator.id] || <Calculator className="w-8 h-8" />;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, threshold: 0.1 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: ANIMATION.ease }}
      whileHover={{ y: -8 }}
      onClick={onClick}
    >
      <Card
        variant="glass"
        padding="lg"
        className={cn(
          "h-full border-0 cursor-pointer transition-all",
          isActive ? "ring-2 ring-accent bg-white/5" : "hover:bg-white/5"
        )}
        hoverEffect
      >
        <motion.div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: `linear-gradient(135deg, ${calculator.color}20, ${calculator.color}10)` }}
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: ANIMATION.ease }}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-2xl" style={{ color: calculator.color }}>{icon}</span>
        </motion.div>

        <h3 className="text-xl font-bold text-white mb-2">{calculator.title}</h3>
        <p className="text-secondary-text text-sm">{calculator.description}</p>

        {isActive && (
          <motion.div
            className="absolute right-4 top-4 w-6 h-6 rounded-full bg-accent flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Zap className="w-4 h-4 text-black" />
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

/**
 * BMI Calculator Form
 */
const BMICalculator = ({
  onBack,
}: {
  onBack: () => void;
}) => {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    unit: "metric",
  });
  const [result, setResult] = useState<null | {
    bmi: number;
    category: string;
    description: string;
    color: string;
  }>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculate = () => {
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      return;
    }

    let bmi: number;
    if (formData.unit === "metric") {
      // weight in kg, height in cm
      bmi = calculateBMI(weight, height / 100);
    } else {
      // weight in lbs, height in inches
      bmi = calculateBMI(weight * 0.453592, height * 0.0254);
    }

    let category, description, color;
    if (bmi < 18.5) {
      category = "Underweight";
      description = "Your BMI is below the healthy range. Consider consulting a nutritionist.";
      color = "#6B73FF";
    } else if (bmi < 25) {
      category = "Normal weight";
      description = "Your BMI is within the healthy range. Keep up the good work!";
      color = "#00E676";
    } else if (bmi < 30) {
      category = "Overweight";
      description = "Your BMI is above the healthy range. Consider lifestyle changes.";
      color = "#FFD93D";
    } else {
      category = "Obese";
      description = "Your BMI indicates obesity. Consult a healthcare professional.";
      color = "#FF6B6B";
    }

    setResult({ bmi, category, description, color });
  };

  const bmiValue = useMemo(() => {
    if (!result) return 0;
    return Math.min(Math.max(result.bmi, 10), 40);
  }, [result]);

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <IconButton variant="ghost" onClick={onBack} className="w-10 h-10">
          <ChevronDown className="w-5 h-5 transform -rotate-90" />
        </IconButton>
        <div>
          <h3 className="text-2xl font-bold text-white">BMI Calculator</h3>
          <p className="text-secondary-text">Calculate your Body Mass Index</p>
        </div>
      </motion.div>

      {/* Unit Toggle */}
      <motion.div
        className="flex gap-2 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <button
          className={cn(
            "flex-1 px-4 py-3 rounded-xl font-medium transition-all",
            formData.unit === "metric" ? "bg-accent text-black" : "bg-white/5 text-white/70"
          )}
          onClick={() => setFormData((prev) => ({ ...prev, unit: "metric" }))}
        >
          Metric (kg/cm)
        </button>
        <button
          className={cn(
            "flex-1 px-4 py-3 rounded-xl font-medium transition-all",
            formData.unit === "imperial" ? "bg-accent text-black" : "bg-white/5 text-white/70"
          )}
          onClick={() => setFormData((prev) => ({ ...prev, unit: "imperial" }))}
        >
          Imperial (lbs/in)
        </button>
      </motion.div>

      {/* Input Fields */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Weight {formData.unit === "metric" ? "(kg)" : "(lbs)"}
          </label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder={formData.unit === "metric" ? "70" : "154"}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-accent transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Height {formData.unit === "metric" ? "(cm)" : "(in)"}
          </label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder={formData.unit === "metric" ? "175" : "69"}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-accent transition-all"
          />
        </div>
      </motion.div>

      {/* Calculate Button */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={calculate}
          rightIcon={<Calculator className="w-5 h-5" />}
        >
          Calculate BMI
        </Button>
      </motion.div>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            className={cn("glass rounded-2xl p-6 border border-white/10")}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-6">
              <motion.div
                className="text-6xl font-black text-white mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {result.bmi.toFixed(1)}
              </motion.div>
              <motion.p
                className="text-lg text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {result.category}
              </motion.p>
            </div>

            {/* BMI Scale */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                <span>10</span>
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>40</span>
              </div>
              <LinearProgress
                value={bmiValue}
                max={40}
                height={8}
                indicatorColor={result.color}
                trackColor="rgba(255, 255, 255, 0.1)"
                rounded
              />
              <div className="flex items-center justify-between text-xs text-white/60 mt-2">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-secondary-text text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              {result.description}
            </motion.p>

            {/* Circular Progress */}
            <motion.div
              className="flex justify-center mt-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <CircularProgress
                value={result.bmi}
                max={40}
                size={120}
                strokeWidth={6}
                indicatorColor={result.color}
                trackColor="rgba(255, 255, 255, 0.05)"
                showValue={false}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/**
 * TDEE Calculator Form
 */
const TDEECalculator = ({
  onBack,
}: {
  onBack: () => void;
}) => {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    gender: "male",
    activity: "moderate",
    goal: "maintain",
    unit: "metric",
  });
  const [result, setResult] = useState<null | {
    bmr: number;
    tdee: number;
    macros: { protein: number; carbs: number; fats: number };
  }>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculate = () => {
    const age = parseInt(formData.age);
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);

    if (isNaN(age) || isNaN(weight) || isNaN(height) || age <= 0 || weight <= 0 || height <= 0) {
      return;
    }

    const weightKg = formData.unit === "metric" ? weight : weight * 0.453592;
    const heightCm = formData.unit === "metric" ? height : height * 2.54;

    const bmr = calculateBMR(age, weightKg, heightCm, formData.gender as "male" | "female");
    const tdee = calculateTDEE(bmr, formData.activity as any);

    // Calculate macros based on goal
    const macros = calculateMacros(tdee, formData.goal as any, weightKg);

    setResult({ bmr, tdee, macros });
  };

  const activityLevels = [
    { value: "sedentary", label: "Sedentary (little or no exercise)" },
    { value: "light", label: "Lightly active (1-3 workouts/week)" },
    { value: "moderate", label: "Moderately active (3-5 workouts/week)" },
    { value: "active", label: "Very active (6-7 workouts/week)" },
    { value: "extreme", label: "Extremely active (athlete, 2x training)" },
  ];

  const goals = [
    { value: "lose", label: "Lose Weight" },
    { value: "maintain", label: "Maintain Weight" },
    { value: "gain", label: "Gain Muscle" },
  ];

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <IconButton variant="ghost" onClick={onBack} className="w-10 h-10">
          <ChevronDown className="w-5 h-5 transform -rotate-90" />
        </IconButton>
        <div>
          <h3 className="text-2xl font-bold text-white">TDEE Calculator</h3>
          <p className="text-secondary-text">Calculate your Total Daily Energy Expenditure</p>
        </div>
      </motion.div>

      {/* Unit Toggle */}
      <motion.div
        className="flex gap-2 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <button
          className={cn(
            "flex-1 px-4 py-3 rounded-xl font-medium transition-all",
            formData.unit === "metric" ? "bg-accent text-black" : "bg-white/5 text-white/70"
          )}
          onClick={() => setFormData((prev) => ({ ...prev, unit: "metric" }))}
        >
          Metric
        </button>
        <button
          className={cn(
            "flex-1 px-4 py-3 rounded-xl font-medium transition-all",
            formData.unit === "imperial" ? "bg-accent text-black" : "bg-white/5 text-white/70"
          )}
          onClick={() => setFormData((prev) => ({ ...prev, unit: "imperial" }))}
        >
          Imperial
        </button>
      </motion.div>

      {/* Input Fields */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Age
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="25"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-accent transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-accent transition-all"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Weight {formData.unit === "metric" ? "(kg)" : "(lbs)"}
          </label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder={formData.unit === "metric" ? "70" : "154"}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-accent transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Height {formData.unit === "metric" ? "(cm)" : "(in)"}
          </label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder={formData.unit === "metric" ? "175" : "69"}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-accent transition-all"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-white/70 mb-2">
            Activity Level
          </label>
          <select
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-accent transition-all"
          >
            {activityLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-white/70 mb-2">
            Goal
          </label>
          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-accent transition-all"
          >
            {goals.map((goal) => (
              <option key={goal.value} value={goal.value}>
                {goal.label}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Calculate Button */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={calculate}
          rightIcon={<Activity className="w-5 h-5" />}
        >
          Calculate TDEE
        </Button>
      </motion.div>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            className={cn("glass rounded-2xl p-6 border border-white/10")}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <Card variant="glass" padding="md" className="border-0 text-center">
                <div className="text-sm text-white/60 mb-1">BMR</div>
                <div className="text-3xl font-bold text-accent mb-1">
                  {Math.round(result.bmr)}
                </div>
                <div className="text-xs text-white/60">calories/day</div>
              </Card>
              <Card variant="glass" padding="md" className="border-0 text-center">
                <div className="text-sm text-white/60 mb-1">TDEE</div>
                <div className="text-3xl font-bold text-white mb-1">
                  {Math.round(result.tdee)}
                </div>
                <div className="text-xs text-white/60">calories/day</div>
              </Card>
              <Card variant="glass" padding="md" className="border-0 text-center">
                <div className="text-sm text-white/60 mb-1">Goal</div>
                <div className="text-3xl font-bold text-[#4ECDC4] mb-1">
                  {formData.goal === "lose" ? "-" : formData.goal === "gain" ? "+" : ""}
                  {Math.round(
                    formData.goal === "lose" ? result.tdee * 0.85 :
                    formData.goal === "gain" ? result.tdee * 1.15 :
                    result.tdee
                  )}
                </div>
                <div className="text-xs text-white/60">calories/day</div>
              </Card>
            </motion.div>

            {/* Macros */}
            <motion.div
              className="mt-6 pt-6 border-t border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <h4 className="text-lg font-bold text-white mb-4">Recommended Macros</h4>
              <Grid cols={3} gap="md">
                <div>
                  <div className="text-sm text-white/60 mb-1">Protein</div>
                  <div className="text-xl font-bold text-accent">
                    {Math.round(result.macros.protein)}g
                  </div>
                  <LinearProgress
                    value={result.macros.protein}
                    max={Math.max(result.macros.protein, result.macros.carbs, result.macros.fats)}
                    height={4}
                    indicatorColor="#00E676"
                    trackColor="rgba(255, 255, 255, 0.1)"
                    rounded
                    className="mt-2"
                  />
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Carbs</div>
                  <div className="text-xl font-bold text-[#FFD93D]">
                    {Math.round(result.macros.carbs)}g
                  </div>
                  <LinearProgress
                    value={result.macros.carbs}
                    max={Math.max(result.macros.protein, result.macros.carbs, result.macros.fats)}
                    height={4}
                    indicatorColor="#FFD93D"
                    trackColor="rgba(255, 255, 255, 0.1)"
                    rounded
                    className="mt-2"
                  />
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Fats</div>
                  <div className="text-xl font-bold text-[#FF6B6B]">
                    {Math.round(result.macros.fats)}g
                  </div>
                  <LinearProgress
                    value={result.macros.fats}
                    max={Math.max(result.macros.protein, result.macros.carbs, result.macros.fats)}
                    height={4}
                    indicatorColor="#FF6B6B"
                    trackColor="rgba(255, 255, 255, 0.1)"
                    rounded
                    className="mt-2"
                  />
                </div>
              </Grid>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/**
 * Calculators Section
 * Collection of fitness and health calculators
 */
export function Calculators() {
  const [activeCalculator, setActiveCalculator] = useState<string | null>(null);

  // Map calculator ID to component
  const calculatorComponents: Record<string, React.ReactNode> = {
    bmi: <BMICalculator onBack={() => setActiveCalculator(null)} />,
    bmr: <TDEECalculator onBack={() => setActiveCalculator(null)} />,
    tdee: <TDEECalculator onBack={() => setActiveCalculator(null)} />,
  };

  return (
    <Section
      id="calculators"
      title="Fitness Calculators"
      subtitle="Powerful tools to track and optimize your health journey"
      tagline="Measure. Track. Improve."
    >
      <AnimatePresence mode="wait">
        {activeCalculator ? (
          <motion.div
            key={activeCalculator}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {calculatorComponents[activeCalculator]}
          </motion.div>
        ) : (
          <motion.div
            key="calculator-grid"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
          >
            <Grid cols={3} gap="lg">
              {FITNESS_CALCULATORS.map((calculator, index) => (
                <CalculatorCard
                  key={calculator.id}
                  calculator={calculator}
                  index={index}
                  onClick={() => setActiveCalculator(calculator.id)}
                  isActive={activeCalculator === calculator.id}
                />
              ))}
            </Grid>

            {/* CTA */}
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p className="text-lg text-secondary-text mb-8 max-w-3xl mx-auto">
                Our calculators use science-backed formulas to provide accurate
                insights into your health and fitness metrics.
              </p>
              <Button
                variant="outline"
                size="lg"
                rightIcon={<BarChart3 className="w-5 h-5" />}
              >
                View All Calculators
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

// Icons used in this file
declare const Dumbbell: React.FC<{ className?: string }>;

export default Calculators;
