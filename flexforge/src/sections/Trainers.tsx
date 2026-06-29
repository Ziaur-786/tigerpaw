"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Users, Award, Clock, MessageSquare, Instagram, Youtube, Mail, Heart, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { Section, Card, Grid } from "@/components/layout/Container";
import { Button, IconButton } from "@/components/ui/Button";
import { CircularProgress } from "@/components/ui/ProgressBar";
import { cn } from "@/utils";
import { TRAINERS, ANIMATION, COLORS } from "@/constants";

// Specialty colors
const specialtyColors: Record<string, string> = {
  "Strength & Conditioning": "#00E676",
  "Sports Nutrition": "#4ECDC4",
  "Fat Loss": "#FF6B6B",
  "Flexibility & Recovery": "#6B73FF",
};

/**
 * Social Icon Component
 */
const SocialIcon = ({
  icon,
  href,
  label,
}: {
  icon: React.ReactNode;
  href: string;
  label: string;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.95 }}
    aria-label={label}
  >
    {icon}
  </motion.a>
);

/**
 * Trainer Card Component
 */
const TrainerCard = ({
  trainer,
  index,
}: {
  trainer: (typeof TRAINERS)[number];
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const color = specialtyColors[trainer.specialty] || "#00E676";

  return (
    <motion.div
      className="relative h-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, threshold: 0.1 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: ANIMATION.ease }}
      whileHover={{ y: -12 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        variant="glass"
        padding="lg"
        className="h-full border-0 relative overflow-hidden"
        hoverEffect={false}
      >
        {/* Gradient Background */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${color}15, ${color}08)`,
          }}
        />

        {/* Image Placeholder */}
        <div className="relative h-64 mb-6 rounded-2xl overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Avatar placeholder */}
            <motion.div
              className="absolute inset-4 rounded-xl"
              style={{
                background: `linear-gradient(135deg, ${color}30, ${color}20)`,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-white/20 to-white/10" />
            </motion.div>

            {/* Overlay with info */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              <div className="absolute bottom-4 left-4 right-4">
                <motion.div
                  className="flex items-center justify-between text-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-accent" />
                    <span className="text-white font-medium">{trainer.rating}/5.0</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-white/60" />
                    <span className="text-white/60">{trainer.clients}+ clients</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Specialty Badge */}
          <motion.div
            className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{
              background: color + "20",
              color,
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            {trainer.specialty}
          </motion.div>

          {/* Heart icon for hover */}
          {isHovered && (
            <motion.div
              className="absolute top-3 right-3"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <IconButton variant="ghost" className="w-8 h-8 p-1.5">
                <Heart className="w-4 h-4 text-white/60 hover:text-accent transition-colors" />
              </IconButton>
            </motion.div>
          )}
        </div>

        {/* Content */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <h3 className="text-xl font-bold text-white">{trainer.name}</h3>
          <p className="text-accent text-sm font-medium">{trainer.title}</p>
          <p className="text-secondary-text text-sm line-clamp-2">{trainer.bio}</p>

          {/* Experience */}
          <div className="flex items-center gap-2 text-sm text-white/60 mt-2">
            <Clock className="w-4 h-4" />
            <span>{trainer.experience} of experience</span>
          </div>

          {/* Social Links */}
          <motion.div
            className="flex items-center gap-2 pt-3 border-t border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <SocialIcon
              icon={<Instagram className="w-4 h-4" />}
              href={trainer.social.instagram}
              label="Instagram"
            />
            <SocialIcon
              icon={<Youtube className="w-4 h-4" />}
              href={`https://youtube.com/${trainer.social.youtube}`}
              label="YouTube"
            />
            <SocialIcon
              icon={<Mail className="w-4 h-4" />}
              href={`mailto:${trainer.social.email}`}
              label="Email"
            />
          </motion.div>

          {/* CTA */}
          <motion.div
            className="pt-3 border-t border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              rightIcon={<MessageSquare className="w-4 h-4" />}
            >
              Message {trainer.name.split(" ")[0]}
            </Button>
          </motion.div>
        </motion.div>

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${color}30, transparent 70%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  );
};

/**
 * Trainer Detail Modal
 */
const TrainerDetail = ({
  trainer,
  onClose,
}: {
  trainer: (typeof TRAINERS)[number];
  onClose: () => void;
}) => {
  const color = specialtyColors[trainer.specialty] || "#00E676";

  // Calculate stats
  const totalReviews = Math.floor(Math.random() * 200) + 100;
  const successRate = 95 + Math.floor(Math.random() * 6);
  const avgTransformation = 12 + Math.floor(Math.random() * 8);

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

          {/* Header with Image */}
          <motion.div
            className="relative h-80 mb-8 rounded-3xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${color}30, ${color}20)`,
              }}
            >
              <div className="absolute inset-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5" />
            </div>

            {/* Specialty Badge */}
            <motion.div
              className="absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-medium"
              style={{
                background: color + "20",
                color,
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {trainer.specialty}
            </motion.div>

            {/* Stats Badge */}
            <motion.div
              className="absolute top-4 right-4 flex items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <span className="px-3 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium">
                {trainer.rating}/5.0
              </span>
              <Star className="w-5 h-5 text-accent" />
            </motion.div>

            {/* Avatar */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-32 h-32 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${color}40, ${color}30)`,
                boxShadow: "0 0 40px rgba(0, 230, 118, 0.3)",
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-white/10" />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
              {trainer.name}
            </h2>
            <p className="text-accent text-lg font-medium">{trainer.title}</p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className={cn("grid grid-cols-1 md:grid-cols-4 gap-4 mb-8")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Card variant="glass" padding="md" className="border-0 text-center">
              <motion.div
                className="text-3xl font-bold text-accent"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                {trainer.clients}+n
              </motion.div>
              <p className="text-white/60 text-sm mt-1">Clients Trained</p>
            </Card>
            <Card variant="glass" padding="md" className="border-0 text-center">
              <motion.div
                className="text-3xl font-bold text-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.65, duration: 0.3 }}
              >
                {trainer.rating}
              </motion.div>
              <p className="text-white/60 text-sm mt-1">Rating</p>
            </Card>
            <Card variant="glass" padding="md" className="border-0 text-center">
              <motion.div
                className="text-3xl font-bold text-[#4ECDC4]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, duration: 0.3 }}
              >
                {successRate}%
              </motion.div>
              <p className="text-white/60 text-sm mt-1">Success Rate</p>
            </Card>
            <Card variant="glass" padding="md" className="border-0 text-center">
              <motion.div
                className="text-3xl font-bold text-[#FFD93D]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.75, duration: 0.3 }}
              >
                {avgTransformation}%
              </motion.div>
              <p className="text-white/60 text-sm mt-1">Avg Transformation</p>
            </Card>
          </motion.div>

          {/* Bio */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          >
            <h3 className="text-lg font-bold text-white mb-3">About {trainer.name.split(" ")[0]}</h3>
            <p className="text-secondary-text leading-relaxed">
              {trainer.bio} With {trainer.experience} of experience and certifications in
              {" "}
              {trainer.certifications.join(", ")}, {trainer.name.split(" ")[0]} has helped
              {" "}
              {trainer.clients}+ clients achieve their fitness goals.
            </p>
          </motion.div>

          {/* Certifications */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.3 }}
          >
            <h3 className="text-lg font-bold text-white mb-3">Certifications</h3>
            <div className="flex flex-wrap gap-2">
              {trainer.certifications.map((cert, index) => (
                <motion.span
                  key={index}
                  className="px-3 py-1.5 rounded-full bg-white/5 text-white text-sm"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.95 + index * 0.1, duration: 0.3 }}
                >
                  {cert}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.3 }}
          >
            <SocialIcon
              icon={<Instagram className="w-5 h-5" />}
              href={trainer.social.instagram}
              label="Instagram"
            />
            <SocialIcon
              icon={<Youtube className="w-5 h-5" />}
              href={`https://youtube.com/${trainer.social.youtube}`}
              label="YouTube"
            />
            <SocialIcon
              icon={<Mail className="w-5 h-5" />}
              href={`mailto:${trainer.social.email}`}
              label="Email"
            />
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.3 }}
          >
            <Button
              variant="primary"
              size="lg"
              className="min-w-64"
              rightIcon={<MessageSquare className="w-5 h-5" />}
            >
              Contact {trainer.name.split(" ")[0]}
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

/**
 * Trainers Section
 * Showcases the expert coaching team
 */
export function Trainers() {
  const [selectedTrainer, setSelectedTrainer] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectedItem = selectedTrainer !== null ? TRAINERS[selectedTrainer] : null;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : TRAINERS.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < TRAINERS.length - 1 ? prev + 1 : 0));
  };

  return (
    <Section
      id="trainers"
      title="Meet Our Trainers"
      subtitle="Expert coaches dedicated to your success"
      tagline="Train with the Best"
    >
      {/* Main Grid */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: ANIMATION.ease }}
      >
        <Grid cols={4} gap="lg">
          {TRAINERS.map((trainer, index) => (
            <TrainerCard
              key={trainer.id}
              trainer={trainer}
              index={index}
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

      {/* CTA */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <p className="text-lg text-secondary-text mb-8 max-w-3xl mx-auto">
          Our team of certified trainers brings decades of combined experience
          and expertise to help you achieve your fitness goals.
        </p>
        <Button
          variant="outline"
          size="lg"
          rightIcon={<TrendingUp className="w-5 h-5" />}
        >
          View All Trainers
        </Button>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <TrainerDetail
            trainer={selectedItem}
            onClose={() => setSelectedTrainer(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}

// Icons used in this file
declare const Dumbbell: React.FC<{ className?: string }>;
declare const ChevronRight: React.FC<{ className?: string }>;

export default Trainers;
