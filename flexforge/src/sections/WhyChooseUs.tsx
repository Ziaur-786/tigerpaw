"use client";

import { motion } from "framer-motion";
import { CheckCircle, ShieldCheck, Rocket, Heart, TrendingUp, Zap } from "lucide-react";
import { Section, Card, Grid } from "@/components/layout/Container";
import { cn, formatNumber } from "@/utils";
import { BRAND, COLORS, ANIMATION } from "@/constants";

// Why Choose Us Features Data
const features = [
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Science-Backed",
    description: "Programs designed by certified trainers and nutritionists using proven methods.",
    color: "#00E676",
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Fast Results",
    description: "See visible changes in as little as 4 weeks with our optimized training plans.",
    color: "#4ECDC4",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Personalized",
    description: "Custom plans tailored to your goals, fitness level, and lifestyle preferences.",
    color: "#FF6B9D",
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Progress Tracking",
    description: "Real-time analytics and insights to keep you motivated and on track.",
    color: "#FFD93D",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "24/7 Support",
    description: "Access to our community and coaches whenever you need guidance.",
    color: "#6B73FF",
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "Proven Success",
    description: "Thousands of transformations with verified results and testimonials.",
    color: "#FF9F43",
  },
];

// Stats Data
const stats = [
  { value: "10000", label: "Members", suffix: "+" },
  { value: "500", label: "Transformations" },
  { value: "99", label: "Satisfaction", suffix: "%" },
  { value: "24", label: "Coaches" },
];

/**
 * Icon Component with animated container
 */
const FeatureIcon = ({ icon, color }: { icon: React.ReactNode; color: string }) => (
  <motion.div
    className="w-16 h-16 rounded-2xl flex items-center justify-center"
    style={{ background: `linear-gradient(135deg, ${color}20, ${color}10)` }}
    initial={{ scale: 0, rotate: -180 }}
    whileInView={{ scale: 1, rotate: 0 }}
    viewport={{ once: true, threshold: 0.1 }}
    transition={{ duration: 0.6, ease: ANIMATION.ease }}
    whileHover={{ scale: 1.1, rotate: 5 }}
  >
    <motion.div
      className="text-2xl"
      style={{ color }}
      whileHover={{ scale: 1.2 }}
    >
      {icon}
    </motion.div>
  </motion.div>
);

/**
 * Feature Card Component
 */
const FeatureCard = ({
  icon,
  title,
  description,
  color,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, threshold: 0.1 }}
    transition={{ delay: index * 0.1, duration: 0.6, ease: ANIMATION.ease }}
    whileHover={{ y: -8 }}
    className="group cursor-pointer"
  >
    <Card
      variant="glass"
      padding="lg"
      className={cn(
        "h-full border-0 transition-all duration-300",
        "group-hover:border group-hover:border-white/20"
      )}
      hoverEffect
    >
      <div className="flex flex-col gap-4">
        <FeatureIcon icon={icon} color={color} />
        <h3
          className="text-xl font-bold text-white"
          style={{ color }}
        >
          {title}
        </h3>
        <p className="text-secondary-text leading-relaxed">{description}</p>
      </div>
    </Card>
  </motion.div>
);

/**
 * Animated Stat Counter
 */
const AnimatedStat = ({ value, label, suffix = "" }: { value: string; label: string; suffix?: string }) => (
  <motion.div
    className="text-center"
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, threshold: 0.5 }}
    transition={{ duration: 0.8, ease: ANIMATION.spring }}
    whileHover={{ scale: 1.05 }}
  >
    <motion.div
      className="text-4xl md:text-5xl font-black text-accent"
      initial={{ textContent: "0" }}
      whileInView={{ textContent: value }}
      viewport={{ once: true }}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      {formatNumber(parseInt(value))}{suffix}
    </motion.div>
    <p className="text-secondary-text mt-2 font-medium">{label}</p>
  </motion.div>
);

/**
 * Why Choose Us Section
 * Highlights the unique value propositions of FlexForge
 */
export function WhyChooseUs() {
  return (
    <Section
      id="why-choose-us"
      title="Why Choose Us"
      subtitle="Discover what makes FlexForge the ultimate fitness platform for achieving your goals"
      tagline="The FlexForge Difference"
      className="py-16 md:py-24"
    >
      {/* Features Grid */}
      <Grid cols={3} gap="lg" className="mb-16">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} index={index} />
        ))}
      </Grid>

      {/* Stats Section */}
      <motion.div
        className={cn(
          "glass rounded-3xl p-8 md:p-12",
          "border border-white/10"
        )}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, threshold: 0.2 }}
        transition={{ duration: 0.8, ease: ANIMATION.ease }}
      >
        <div className="text-center mb-8">
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Join Our Growing Community
          </motion.h3>
          <motion.p
            className="text-secondary-text max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Thousands of people have transformed their lives with FlexForge.
            Start your journey today and become part of our success story.
          </motion.p>
        </div>

        <Grid cols={4} gap="md" responsive>
          {stats.map((stat, index) => (
            <AnimatedStat key={index} {...stat} />
          ))}
        </Grid>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <motion.p
          className="text-lg text-secondary-text mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          We combine cutting-edge technology with expert knowledge to deliver
          personalized fitness experiences that actually work. No guesswork, just results.
        </motion.p>
      </motion.div>
    </Section>
  );
}

export default WhyChooseUs;
