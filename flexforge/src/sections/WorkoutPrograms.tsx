"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Flame, Zap, Lotus, Trophy, Target, Clock, Users, Award, Filter } from "lucide-react";
import { Section, Card, Grid } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils";
import { WORKOUT_PROGRAMS, ANIMATION, COLORS } from "@/constants";

// Category filter options
const categories = ["All", "Muscle Building", "Weight Loss", "Cardio", "Flexibility", "Athletic"];

// Difficulty options
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

// Icon mapping for program categories
const categoryIcons: Record<string, React.ReactNode> = {
  "Muscle Building": <Dumbbell className="w-5 h-5" />,
  "Weight Loss": <Flame className="w-5 h-5" />,
  "Cardio": <Zap className="w-5 h-5" />,
  "Flexibility": <Lotus className="w-5 h-5" />,
  "Athletic": <Target className="w-5 h-5" />,
};

// Difficulty colors
const difficultyColors: Record<string, string> = {
  Beginner: "#4ECDC4",
  Intermediate: "#FFD93D",
  Advanced: "#FF6B6B",
};

/**
 * Program Card Component
 */
const ProgramCard = ({
  program,
  index,
}: {
  program: (typeof WORKOUT_PROGRAMS)[number];
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const categoryIcon = categoryIcons[program.category] || <Dumbbell className="w-5 h-5" />;
  const difficultyColor = difficultyColors[program.difficulty] || "#FFFFFF";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, threshold: 0.1 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: ANIMATION.ease }}
      whileHover={{ y: -12 }}
      className="group h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        variant="glass"
        padding="lg"
        className={cn(
          "h-full border-0 relative overflow-hidden",
          "transition-all duration-300"
        )}
        hoverEffect={false}
      >
        {/* Gradient Background */}
        <div
          className="absolute top-0 left-0 right-0 h-2"
          style={{
            background: `linear-gradient(90deg, ${program.color}40, transparent)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Category Badge */}
          <motion.div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-white/80 text-xs font-medium"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
          >
            {categoryIcon}
            <span>{program.category}</span>
          </motion.div>

          {/* Title */}
          <motion.h3
            className="text-2xl font-bold text-white mt-4 mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
          >
            {program.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-secondary-text mb-4 line-clamp-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.4, duration: 0.4 }}
          >
            {program.description}
          </motion.p>

          {/* Metadata */}
          <motion.div
            className="flex items-center gap-4 mb-4 text-sm text-white/60"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.5, duration: 0.4 }}
          >
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{program.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{program.sessionsPerWeek} sessions/week</span>
            </div>
            <div
              className="flex items-center gap-1"
              style={{ color: difficultyColor }}
            >
              <Award className="w-4 h-4" />
              <span>{program.difficulty}</span>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            className="flex flex-wrap gap-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.6, duration: 0.4 }}
          >
            {program.features.slice(0, 3).map((feature, featureIndex) => (
              <span
                key={featureIndex}
                className="px-2 py-1 rounded-lg bg-white/5 text-white/80 text-xs"
              >
                {feature}
              </span>
            ))}
          </motion.div>

          {/* Price & CTA */}
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.7, duration: 0.4 }}
          >
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-accent">${program.price}</span>
              {program.popular && (
                <motion.span
                  className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs font-semibold"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.8, duration: 0.3 }}
                >
                  Popular
                </motion.span>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="min-w-fit"
              rightIcon={<Zap className="w-4 h-4" />}
            >
              Learn More
            </Button>
          </motion.div>
        </div>

        {/* Hover Effect Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${program.color}20, transparent 70%)`,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  );
};

/**
 * Category Filter Chip
 */
const CategoryChip = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <motion.button
    onClick={onClick}
    className={cn(
      "px-4 py-2 rounded-full text-sm font-medium transition-all",
      isActive
        ? "bg-accent text-black"
        : "bg-white/5 text-white/70 hover:bg-white/10"
    )}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {label}
  </motion.button>
);

/**
 * Workout Programs Section
 * Showcases all available workout programs with filtering
 */
export function WorkoutPrograms() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDifficulty, setActiveDifficulty] = useState("All");

  // Filter programs
  const filteredPrograms = WORKOUT_PROGRAMS.filter((program) => {
    const categoryMatch = activeCategory === "All" || program.category === activeCategory;
    const difficultyMatch = activeDifficulty === "All" || program.difficulty === activeDifficulty;
    return categoryMatch && difficultyMatch;
  });

  return (
    <Section
      id="programs"
      title="Workout Programs"
      subtitle="Science-backed training programs designed for real results"
      tagline="Find Your Perfect Fit"
    >
      {/* Filters */}
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, threshold: 0.2 }}
        transition={{ duration: 0.6, ease: ANIMATION.ease }}
      >
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-white/60" />
          <span className="text-white/60 text-sm font-medium">Filter by:</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((category) => (
            <CategoryChip
              key={category}
              label={category}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {difficulties.map((difficulty) => (
            <CategoryChip
              key={difficulty}
              label={difficulty}
              isActive={activeDifficulty === difficulty}
              onClick={() => setActiveDifficulty(difficulty)}
            />
          ))}
        </div>
      </motion.div>

      {/* Programs Grid */}
      <Grid cols={3} gap="lg">
        {filteredPrograms.map((program, index) => (
          <ProgramCard key={program.id} program={program} index={index} />
        ))}
      </Grid>

      {/* Empty State */}
      <AnimatePresence>
        {filteredPrograms.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <Dumbbell className="w-8 h-8 text-white/60" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">No Programs Found</h3>
            <p className="text-secondary-text">
              Try adjusting your filters to see available programs.
            </p>
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
          rightIcon={<Zap className="w-5 h-5" />}
          className="min-w-fit"
        >
          View All Programs
        </Button>
      </motion.div>
    </Section>
  );
}

export default WorkoutPrograms;
