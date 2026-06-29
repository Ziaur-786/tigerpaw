"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star, Clock, Ruler, Weight, TrendingDown, TrendingUp } from "lucide-react";
import { Section, Card, Grid } from "@/components/layout/Container";
import { Button, IconButton } from "@/components/ui/Button";
import { CircularProgress } from "@/components/ui/ProgressBar";
import { cn } from "@/utils";
import { TRANSFORMATIONS, ANIMATION } from "@/constants";

/**
 * Transformation Card Component
 * Shows before/after comparison with hover effects
 */
const TransformationCard = ({
  transformation,
  index,
  isActive,
  onClick,
}: {
  transformation: (typeof TRANSFORMATIONS)[number];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) => {
  const weightLoss = transformation.before.weight - transformation.after.weight;
  const fatLoss = transformation.before.bodyFat - transformation.after.bodyFat;
  const waistLoss = transformation.before.waist - transformation.after.waist;

  // Calculate progress percentages
  const weightProgress = (weightLoss / transformation.before.weight) * 100;
  const fatProgress = (fatLoss / transformation.before.bodyFat) * 100;
  const waistProgress = (waistLoss / transformation.before.waist) * 100;

  return (
    <motion.div
      className={cn(
        "relative cursor-pointer",
        isActive ? "lg:scale-105 z-10" : "lg:scale-95 opacity-60 lg:opacity-100"
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, threshold: 0.2 }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: ANIMATION.ease }}
      whileHover={{ scale: isActive ? 1.05 : 1 }}
      onClick={onClick}
    >
      <Card
        variant="glass"
        padding="lg"
        className={cn(
          "h-full border-0 overflow-hidden",
          isActive ? "bg-white/5" : "bg-transparent"
        )}
        hoverEffect={false}
      >
        {/* Image Placeholder - Before/After split */}
        <div className="relative h-64 mb-6 rounded-2xl overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-900/50 to-green-900/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Before side - red tint */}
            <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-red-500/30 to-red-600/20" />

            {/* After side - green tint */}
            <div className="absolute inset-0 left-1/2 w-1/2 bg-gradient-to-r from-green-500/30 to-green-600/20" />

            {/* Divider with arrow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-32 bg-white/30" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-black" />
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-medium">Before</span>
            </div>
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">After</span>
            </div>
          </motion.div>

          {/* Stats overlay */}
          <motion.div
            className="absolute bottom-4 left-4 right-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <div className="glass rounded-xl p-3 backdrop-blur-sm">
              <div className="flex items-center justify-between text-sm">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{weightLoss}kg</div>
                  <div className="text-white/60 text-xs">Weight Loss</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{fatLoss}%</div>
                  <div className="text-white/60 text-xs">Fat Loss</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{waistLoss}cm</div>
                  <div className="text-white/60 text-xs">Waist Loss</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <h3 className="text-xl font-bold text-white">{transformation.name}</h3>
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Clock className="w-4 h-4" />
            <span>{transformation.duration}</span>
            <span className="text-white/30">|</span>
            <span>{transformation.program}</span>
          </div>
          <p className="text-secondary-text line-clamp-2">{transformation.testimonial}</p>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-4 h-4",
                  i < transformation.rating ? "text-accent fill-accent" : "text-white/30"
                )}
              />
            ))}
          </div>
        </motion.div>

        {/* Active indicator */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-2xl ring-2 ring-accent"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </Card>
    </motion.div>
  );
};

/**
 * Detailed Transformation View
 */
const TransformationDetail = ({
  transformation,
  onClose,
}: {
  transformation: (typeof TRANSFORMATIONS)[number];
  onClose: () => void;
}) => {
  const weightLoss = transformation.before.weight - transformation.after.weight;
  const fatLoss = transformation.before.bodyFat - transformation.after.bodyFat;
  const waistLoss = transformation.before.waist - transformation.after.waist;

  const stats = [
    {
      label: "Weight",
      before: `${transformation.before.weight}kg`,
      after: `${transformation.after.weight}kg`,
      change: `-${weightLoss}kg`,
      icon: <Weight className="w-5 h-5" />,
      color: "#00E676",
    },
    {
      label: "Body Fat",
      before: `${transformation.before.bodyFat}%`,
      after: `${transformation.after.bodyFat}%`,
      change: `-${fatLoss}%`,
      icon: <TrendingDown className="w-5 h-5" />,
      color: "#4ECDC4",
    },
    {
      label: "Waist",
      before: `${transformation.before.waist}cm`,
      after: `${transformation.after.waist}cm`,
      change: `-${waistLoss}cm`,
      icon: <Ruler className="w-5 h-5" />,
      color: "#FFD93D",
    },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        transition={{ duration: 0.3, ease: ANIMATION.ease }}
        onClick={(e) => e.stopPropagation()}
      >
        <Card
          variant="glass"
          className="border border-white/10 relative"
          padding="xl"
        >
          {/* Close Button */}
          <IconButton
            variant="ghost"
            className="absolute top-4 right-4 z-10"
            onClick={onClose}
          >
            <ChevronRight className="w-6 h-6" />
          </IconButton>

          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
              {transformation.name}'s Journey
            </h2>
            <p className="text-secondary-text">
              {transformation.duration} - {transformation.program}
            </p>
          </motion.div>

          {/* Before/After Images */}
          <motion.div
            className="relative h-96 mb-8 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 to-green-900/30" />
            <div className="absolute inset-0 w-1/2 bg-red-500/20" />
            <div className="absolute inset-0 left-1/2 w-1/2 bg-green-500/20" />

            {/* Divider */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/30" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-black" />
            </div>

            {/* Labels */}
            <div className="absolute top-6 left-6">
              <span className="px-4 py-2 rounded-full bg-red-500/20 text-red-400 font-bold">BEFORE</span>
            </div>
            <div className="absolute top-6 right-6">
              <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 font-bold">AFTER</span>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {stats.map((stat, index) => (
              <Card key={index} variant="glass" padding="md" className="border-0 text-center">
                <motion.div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)` }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                >
                  <span className="text-xl" style={{ color: stat.color }}>{stat.icon}</span>
                </motion.div>
                <div className="text-sm text-white/60 mb-1">{stat.label}</div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-bold text-white/60 line-through">{stat.before}</span>
                  <TrendingDown className="w-5 h-5 text-accent" />
                  <span className="text-2xl font-bold text-accent">{stat.after}</span>
                </div>
                <div className="text-sm text-accent font-medium mt-1">{stat.change}</div>
              </Card>
            ))}
          </motion.div>

          {/* Testimonial */}
          <motion.div
            className={cn(
              "glass rounded-2xl p-6",
              "border border-white/10"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <div className="flex items-start gap-4">
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-[#4ECDC4] flex items-center justify-center flex-shrink-0"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <Quote className="w-6 h-6 text-black" />
              </motion.div>
              <div>
                <blockquote className="text-lg text-white mb-4">
                  {transformation.testimonial}
                </blockquote>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-5 h-5",
                          i < transformation.rating ? "text-accent fill-accent" : "text-white/30"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-white/60">({transformation.rating}/5)</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            <Button
              variant="primary"
              size="lg"
              rightIcon={<TrendingUp className="w-5 h-5" />}
            >
              Start My Transformation
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

/**
 * Transformations Section
 * Showcases real user transformations with before/after comparisons
 */
export function Transformations() {
  const [selectedTransformation, setSelectedTransformation] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectedItem = selectedTransformation !== null ? TRANSFORMATIONS[selectedTransformation] : null;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : TRANSFORMATIONS.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < TRANSFORMATIONS.length - 1 ? prev + 1 : 0));
  };

  return (
    <Section
      id="transformations"
      title="Real Transformations"
      subtitle="See the incredible results our members have achieved"
      tagline="Inspiration Awaits"
    >
      {/* Main Grid */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: ANIMATION.ease }}
      >
        <Grid cols={3} gap="lg">
          {TRANSFORMATIONS.map((transformation, index) => (
            <TransformationCard
              key={transformation.id}
              transformation={transformation}
              index={index}
              isActive={currentIndex === index}
              onClick={() => {
                setCurrentIndex(index);
                setSelectedTransformation(index);
              }}
            />
          ))}
        </Grid>

        {/* Navigation Arrows */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-full flex items-center justify-between px-4 -mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <IconButton
            variant="glass"
            className="w-12 h-12 rounded-full"
            onClick={goToPrevious}
          >
            <ChevronLeft className="w-6 h-6" />
          </IconButton>
          <IconButton
            variant="glass"
            className="w-12 h-12 rounded-full"
            onClick={goToNext}
          >
            <ChevronRight className="w-6 h-6" />
          </IconButton>
        </motion.div>
      </motion.div>

      {/* Progress Indicators */}
      <motion.div
        className="flex items-center justify-center gap-2 mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        {TRANSFORMATIONS.map((_, index) => (
          <motion.div
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentIndex === index ? "bg-accent w-6" : "bg-white/30"
            )}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
          />
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <p className="text-lg text-secondary-text mb-8 max-w-3xl mx-auto">
          These are real people with real results. Our science-backed approach
          combined with personalized coaching makes transformations like these possible.
        </p>
        <Button
          variant="primary"
          size="lg"
          rightIcon={<TrendingUp className="w-5 h-5" />}
        >
          Begin Your Journey
        </Button>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <TransformationDetail
            transformation={selectedItem}
            onClose={() => setSelectedTransformation(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}

// Lucide icons used in this file
declare const Dumbbell: React.FC<{ className?: string }>;

export default Transformations;
