"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fire, Leaf, Heart, TrendingUp, Clock, Users, CheckCircle, Apple, Fish, Droplets } from "lucide-react";
import { Section, Card, Grid } from "@/components/layout/Container";
import { Button, IconButton } from "@/components/ui/Button";
import { CircularProgress, LinearProgress } from "@/components/ui/ProgressBar";
import { cn, formatCalories, formatNumber } from "@/utils";
import { MEAL_PLANS, RECIPES, NUTRITION_CATEGORIES, ANIMATION } from "@/constants";

// Nutrition categories with icons
const nutritionCategoriesWithIcons = [
  { ...NUTRITION_CATEGORIES[0], icon: <Fire className="w-5 h-5" /> },
  { ...NUTRITION_CATEGORIES[1], icon: <Dumbbell className="w-5 h-5" /> },
  { ...NUTRITION_CATEGORIES[2], icon: <Apple className="w-5 h-5" /> },
  { ...NUTRITION_CATEGORIES[3], icon: <Fish className="w-5 h-5" /> },
];

// Meal plan icons
const mealPlanIcons: Record<string, React.ReactNode> = {
  "High Protein": <Dumbbell className="w-6 h-6" />,
  Ketogenic: <Fire className="w-6 h-6" />,
  Balanced: <Heart className="w-6 h-6" />,
  Vegan: <Leaf className="w-6 h-6" />,
};

// Recipe category icons
const recipeCategoryIcons: Record<string, React.ReactNode> = {
  Breakfast: <Fire className="w-4 h-4" />,
  Lunch: <Apple className="w-4 h-4" />,
  Dinner: <Fish className="w-4 h-4" />,
  Snack: <Droplets className="w-4 h-4" />,
};

/**
 * Nutrition Macro Chart
 */
const MacroChart = ({
  calories,
  protein,
  carbs,
  fats,
}: {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}) => {
  const total = protein + carbs + fats;
  const proteinPercent = (protein / total) * 100;
  const carbsPercent = (carbs / total) * 100;
  const fatsPercent = (fats / total) * 100;

  return (
    <motion.div
      className="relative w-40 h-40"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: ANIMATION.ease }}
    >
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="8"
        />

        {/* Protein arc */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#00E676"
          strokeWidth="8"
          strokeDasharray={`${2 * Math.PI * 45}`}
          strokeDashoffset={`${2 * Math.PI * 45 * (1 - proteinPercent / 100)`}
          strokeLinecap="round"
          initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
          animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - proteinPercent / 100) }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          transform="rotate(-90 50 50)"
        />

        {/* Carbs arc */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#FFD93D"
          strokeWidth="8"
          strokeDasharray={`${2 * Math.PI * 45}`}
          strokeDashoffset={`${2 * Math.PI * 45 * (1 - (proteinPercent + carbsPercent) / 100)`}
          strokeLinecap="round"
          initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
          animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - (proteinPercent + carbsPercent) / 100) }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          transform="rotate(-90 50 50)"
        />

        {/* Fats arc */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#FF6B6B"
          strokeWidth="8"
          strokeDasharray={`${2 * Math.PI * 45}`}
          strokeDashoffset={`${2 * Math.PI * 45 * (1 - (proteinPercent + carbsPercent + fatsPercent) / 100)`}
          strokeLinecap="round"
          initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
          animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - (proteinPercent + carbsPercent + fatsPercent) / 100) }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          transform="rotate(-90 50 50)"
        />
      </svg>

      {/* Center text */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <span className="text-xl font-bold text-white">{formatCalories(calories)}</span>
        <span className="text-xs text-white/60">kcal</span>
      </motion.div>
    </motion.div>
  );
};

/**
 * Meal Plan Card
 */
const MealPlanCard = ({
  plan,
  index,
}: {
  plan: (typeof MEAL_PLANS)[number];
  index: number;
}) => {
  const icon = mealPlanIcons[plan.title] || <Apple className="w-6 h-6" />;
  const proteinPercent = Math.round((plan.protein / (plan.protein + plan.carbs + plan.fats)) * 100);
  const carbsPercent = Math.round((plan.carbs / (plan.protein + plan.carbs + plan.fats)) * 100);
  const fatsPercent = Math.round((plan.fats / (plan.protein + plan.carbs + plan.fats)) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, threshold: 0.1 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: ANIMATION.ease }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card
        variant="glass"
        padding="lg"
        className="h-full border-0 relative overflow-hidden"
        hoverEffect
      >
        {/* Icon */}
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ background: `linear-gradient(135deg, ${plan.color}20, ${plan.color}10)` }}
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: ANIMATION.ease }}
        >
          <span className="text-xl" style={{ color: plan.color }}>{icon}</span>
        </motion.div>

        <h3 className="text-xl font-bold text-white mb-2">{plan.title}</h3>
        <p className="text-secondary-text mb-4 line-clamp-2">{plan.description}</p>

        {/* Macro Breakdown */}
        <div className="space-y-2 mb-4">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
          >
            <LinearProgress
              value={proteinPercent}
              max={100}
              height={6}
              indicatorColor="#00E676"
              rounded
              className="flex-1"
            />
            <span className="text-xs text-white/60 w-16 text-right">Protein</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
          >
            <LinearProgress
              value={carbsPercent}
              max={100}
              height={6}
              indicatorColor="#FFD93D"
              rounded
              className="flex-1"
            />
            <span className="text-xs text-white/60 w-16 text-right">Carbs</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.4, duration: 0.4 }}
          >
            <LinearProgress
              value={fatsPercent}
              max={100}
              height={6}
              indicatorColor="#FF6B6B"
              rounded
              className="flex-1"
            />
            <span className="text-xs text-white/60 w-16 text-right">Fats</span>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="flex items-center justify-between pt-4 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.4 }}
        >
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-accent">${plan.price}</span>
            <span className="text-xs text-white/60">/month</span>
          </div>
          <Button variant="outline" size="sm" rightIcon={<CheckCircle className="w-4 h-4" />}>
            Get Plan
          </Button>
        </motion.div>
      </Card>
    </motion.div>
  );
};

/**
 * Recipe Card
 */
const RecipeCard = ({
  recipe,
  index,
}: {
  recipe: (typeof RECIPES)[number];
  index: number;
}) => {
  const categoryIcon = recipeCategoryIcons[recipe.category] || <Apple className="w-4 h-4" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, threshold: 0.1 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: ANIMATION.ease }}
      whileHover={{ y: -8 }}
    >
      <Card
        variant="glass"
        padding="md"
        className="relative overflow-hidden"
        hoverEffect
      >
        {/* Difficulty Badge */}
        <motion.div
          className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium"
          style={{
            background: recipe.difficulty === "Easy" ? "rgba(0, 230, 118, 0.2)" :
                       recipe.difficulty === "Medium" ? "rgba(255, 217, 61, 0.2)" :
                       "rgba(255, 107, 107, 0.2)",
            color: recipe.difficulty === "Easy" ? "#00E676" :
                   recipe.difficulty === "Medium" ? "#FFD93D" :
                   "#FF6B6B",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
        >
          {recipe.difficulty}
        </motion.div>

        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.1, duration: 0.4 }}
        >
          {categoryIcon}
          <div>
            <h3 className="font-bold text-white">{recipe.title}</h3>
            <p className="text-xs text-white/60">{recipe.category}</p>
          </div>
        </motion.div>

        <motion.p
          className="text-secondary-text text-sm mt-3 mb-4 line-clamp-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
        >
          {recipe.description}
        </motion.p>

        <motion.div
          className="flex items-center justify-between pt-3 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
        >
          <div className="flex items-center gap-4 text-xs text-white/60">
            <span className="flex items-center gap-1">
              <Fire className="w-3 h-3" />
              {recipe.calories}kcal
            </span>
            <span className="flex items-center gap-1">
              <Dumbbell className="w-3 h-3" />
              {recipe.protein}g
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {recipe.preparationTime}min
            </span>
          </div>
          <IconButton variant="ghost" size="sm">
            <CheckCircle className="w-4 h-4" />
          </IconButton>
        </motion.div>
      </Card>
    </motion.div>
  );
};

/**
 * Nutrition Section
 * Comprehensive nutrition guidance and meal planning
 */
export function Nutrition() {
  const [activeTab, setActiveTab] = useState("meal-plans");

  const tabs = [
    { id: "meal-plans", label: "Meal Plans" },
    { id: "recipes", label: "Recipes" },
    { id: "tracking", label: "Macro Tracking" },
  ];

  return (
    <Section
      id="nutrition"
      title="Nutrition"
      subtitle="Fuel your body with science-backed nutrition plans and delicious recipes"
      tagline="Eat Smart. Train Hard."
    >
      {/* Tabs */}
      <motion.div
        className="flex items-center justify-center gap-2 mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: ANIMATION.ease }}
      >
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-6 py-3 rounded-2xl text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-accent text-black"
                : "bg-white/5 text-white/70 hover:bg-white/10"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "meal-plans" && (
          <motion.div
            key="meal-plans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Grid cols={4} gap="lg">
              {MEAL_PLANS.map((plan, index) => (
                <MealPlanCard key={plan.id} plan={plan} index={index} />
              ))}
            </Grid>
          </motion.div>
        )}

        {activeTab === "recipes" && (
          <motion.div
            key="recipes"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Grid cols={4} gap="md">
              {RECIPES.map((recipe, index) => (
                <RecipeCard key={recipe.id} recipe={recipe} index={index} />
              ))}
            </Grid>
          </motion.div>
        )}

        {activeTab === "tracking" && (
          <motion.div
            key="tracking"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            {/* Macro Tracking Dashboard */}
            <motion.div
              className={cn(
                "glass rounded-3xl p-8",
                "border border-white/10"
              )}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-white mb-2">Your Daily Macros</h3>
              <p className="text-secondary-text mb-8">Track your nutrition intake in real-time</p>

              <Grid cols={4} gap="lg" className="mb-8">
                {nutritionCategoriesWithIcons.map((category, index) => {
                  // Sample values for demonstration
                  const value = category.value === "calories" ? 2200 :
                                category.value === "protein" ? 180 :
                                category.value === "carbs" ? 200 : 60;
                  const max = category.value === "calories" ? 2500 :
                             category.value === "protein" ? 200 :
                             category.value === "carbs" ? 250 : 80;

                  return (
                    <motion.div
                      key={category.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      <Card variant="glass" padding="md" className="border-0 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <span className="text-accent">{category.icon}</span>
                          <span className="font-semibold text-white">{category.label}</span>
                        </div>
                        <CircularProgress
                          value={value}
                          max={max}
                          size={80}
                          strokeWidth={6}
                          indicatorColor={category.color}
                          trackColor="rgba(255, 255, 255, 0.05)"
                          showValue
                          valueFormatter={(v) => `${Math.round(v)}%`}
                        />
                        <div className="mt-2 text-sm">
                          <span className="text-white">{value}{category.unit}</span>
                          <span className="text-white/60"> / {max}{category.unit}</span>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </Grid>

              {/* Daily Summary */}
              <motion.div
                className={cn(
                  "glass rounded-2xl p-6",
                  "border border-white/10"
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Today\'s Summary</h4>
                    <p className="text-secondary-text text-sm">Keep track of your daily nutrition goals</p>
                  </div>
                  <MacroChart calories={2200} protein={180} carbs={200} fats={60} />
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <Button variant="outline" size="lg" rightIcon={<TrendingUp className="w-5 h-5" />}>
                View Full Nutrition Dashboard
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Button
          variant="primary"
          size="lg"
          rightIcon={<Apple className="w-5 h-5" />}
        >
          Start Your Nutrition Plan
        </Button>
      </motion.div>
    </Section>
  );
}

// Dumbbell icon for nutrition section
declare const Dumbbell: React.FC<{ className?: string }>;

export default Nutrition;
