"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Check, Zap, Fire, Clock, Users, Award, Star, Heart, TrendingUp } from "lucide-react";
import { Section, Card, Grid } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils";
import { MEMBERSHIP_PLANS, ANIMATION, COLORS } from "@/constants";

// Plan colors
const planColors = {
  basic: "#FFFFFF",
  premium: "#00E676",
  elite: "#FFD93D",
};

// Plan background gradients
const planGradients = {
  basic: "from-white/5 to-white/2",
  premium: "from-[#00E676]20 to-[#00E676]10",
  elite: "from-[#FFD93D]20 to-[#FFD93D]10",
};

// Billing toggle
const billingOptions = [
  { id: "monthly", label: "Monthly" },
  { id: "yearly", label: "Yearly (Save 20%)" },
];

/**
 * Feature List Component
 */
const FeatureList = ({
  features,
  included,
}: {
  features: string[];
  included: boolean;
}) => (
  <div className="space-y-3">
    {features.map((feature, index) => (
      <motion.div
        key={index}
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
      >
        <motion.div
          className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
            included ? "bg-accent/20" : "bg-white/5"
          )}
          whileHover={{ scale: 1.1 }}
        >
          {included ? (
            <Check className="w-4 h-4 text-accent" />
          ) : (
            <Zap className="w-4 h-4 text-white/30" />
          )}
        </motion.div>
        <span
          className={cn(
            "text-sm",
            included ? "text-white" : "text-white/30"
          )}
        >
          {feature}
        </span>
      </motion.div>
    ))}
  </div>
);

/**
 * Pricing Card Component
 */
const PricingCard = ({
  plan,
  index,
  billing,
  isPopular,
}: {
  plan: (typeof MEMBERSHIP_PLANS)[number];
  index: number;
  billing: "monthly" | "yearly";
  isPopular: boolean;
}) => {
  const price = billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
  const color = planColors[plan.id as keyof typeof planColors] || "#FFFFFF";
  const gradient = planGradients[plan.id as keyof typeof planGradients] || "from-white/5 to-white/2";

  return (
    <motion.div
      className="relative h-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, threshold: 0.1 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: ANIMATION.ease }}
      whileHover={{ y: -12 }}
    >
      {/* Popular Badge */}
      {isPopular && (
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: ANIMATION.ease }}
        >
          <span
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-accent to-[#4ECDC4] text-black text-sm font-bold"
            style={{ boxShadow: "0 0 20px rgba(0, 230, 118, 0.3)" }}
          >
            MOST POPULAR
          </span>
        </motion.div>
      )}

      <Card
        variant="glass"
        padding="xl"
        className={cn(
          "h-full border-0 relative overflow-hidden",
          isPopular ? "ring-2 ring-accent/50" : ""
        )}
        hoverEffect
      >
        {/* Gradient Background */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${color}10, ${color}05)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Plan Name */}
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3
              className="text-2xl font-bold text-white"
              style={{ color }}
            >
              {plan.title}
            </h3>
            <p className="text-white/60 text-sm mt-1">{plan.description}</p>
          </motion.div>

          {/* Price */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <div className="flex items-baseline justify-center gap-2">
              <span
                className="text-4xl md:text-5xl font-black"
                style={{ color }}
              >
                ${price}
              </span>
              <span className="text-white/60">
                /{billing === "monthly" ? "month" : "year"}
              </span>
            </div>
            {billing === "yearly" && (
              <p className="text-accent text-sm mt-2">Save ${plan.monthlyPrice * 12 - plan.yearlyPrice}!</p>
            )}
          </motion.div>

          {/* Features */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <FeatureList features={plan.features} included={true} />
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <Button
              variant={isPopular ? "primary" : "outline"}
              size="lg"
              className="w-full"
              rightIcon={isPopular ? <Crown className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
            >
              {isPopular ? "Get Started Now" : "Choose Plan"}
            </Button>
          </motion.div>
        </div>

        {/* Glow Effect */}
        {isPopular && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${color}30, transparent 70%)`,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          />
        )}
      </Card>
    </motion.div>
  );
};

/**
 * Comparison Table Component
 */
const ComparisonTable = ({
  plans,
  billing,
}: {
  plans: (typeof MEMBERSHIP_PLANS)[number][];
  billing: "monthly" | "yearly";
}) => {
  // Get all unique features across all plans
  const allFeatures = [
    ...new Set(plans.flatMap((plan) => plan.features)),
    "Personalized meal plans",
    "1-on-1 coaching",
    "24/7 support",
    "Progress analytics",
  ];

  return (
    <motion.div
      className={cn("glass rounded-3xl p-8 border border-white/10 overflow-x-auto")}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: ANIMATION.ease }}
    >
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        Compare Plans
      </h3>

      <table className="w-full min-w-[800px]">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-4 pr-6">
              <span className="text-white/60 text-sm font-medium">Features</span>
            </th>
            {plans.map((plan) => (
              <th key={plan.id} className="text-center py-4 px-4">
                <div className="text-white font-semibold">{plan.title}</div>
                <div className="text-white/60 text-sm">
                  ${billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                  /{billing === "monthly" ? "mo" : "yr"}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allFeatures.map((feature, index) => (
            <motion.tr
              key={index}
              className="border-b border-white/5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <td className="py-4 pr-6">
                <span className="text-white text-sm">{feature}</span>
              </td>
              {plans.map((plan) => {
                const included = plan.features.includes(feature);
                return (
                  <td key={plan.id} className="text-center py-4 px-4">
                    {included ? (
                      <Check className="w-5 h-5 text-accent mx-auto" />
                    ) : (
                      <Zap className="w-5 h-5 text-white/20 mx-auto" />
                    )}
                  </td>
                );
              })}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

/**
 * Membership Plans Section
 * Pricing and subscription options
 */
export function MembershipPlans() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [showComparison, setShowComparison] = useState(false);

  // Find popular plan
  const popularPlan = MEMBERSHIP_PLANS.find((p) => p.popular);

  return (
    <Section
      id="plans"
      title="Membership Plans"
      subtitle="Choose the perfect plan for your fitness journey"
      tagline="Your Path to Success"
    >
      {/* Billing Toggle */}
      <motion.div
        className="flex items-center justify-center gap-4 mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: ANIMATION.ease }}
      >
        {billingOptions.map((option) => (
          <motion.button
            key={option.id}
            onClick={() => setBilling(option.id as "monthly" | "yearly")}
            className={cn(
              "px-6 py-3 rounded-2xl text-sm font-medium transition-all",
              billing === option.id
                ? "bg-accent text-black"
                : "bg-white/5 text-white/70 hover:bg-white/10"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {option.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Plans Grid */}
      <Grid cols={3} gap="lg" className="mb-12">
        {MEMBERSHIP_PLANS.map((plan, index) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            index={index}
            billing={billing}
            isPopular={plan.popular}
          />
        ))}
      </Grid>

      {/* Comparison Toggle */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Button
          variant="ghost"
          size="lg"
          onClick={() => setShowComparison(!showComparison)}
          rightIcon={showComparison ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        >
          {showComparison ? "Hide Comparison" : "Compare All Plans"}
        </Button>
      </motion.div>

      {/* Comparison Table */}
      <AnimatePresence>
        {showComparison && (
          <ComparisonTable plans={MEMBERSHIP_PLANS} billing={billing} />
        )}
      </AnimatePresence>

      {/* Guarantee */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white/80 text-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <ShieldCheck className="w-4 h-4 text-accent" />
          <span>30-day money-back guarantee</span>
        </motion.div>

        <p className="text-lg text-secondary-text mb-8 mt-6 max-w-3xl mx-auto">
          Join thousands of satisfied members who have transformed their lives
          with FlexForge. Start your journey today and experience the difference.
        </p>

        <Button
          variant="primary"
          size="lg"
          rightIcon={<TrendingUp className="w-5 h-5" />}
        >
          Get Started Now
        </Button>
      </motion.div>
    </Section>
  );
}

// Icons used in this file
declare const Crown: React.FC<{ className?: string }>;
declare const Zap: React.FC<{ className?: string }>;
declare const ChevronUp: React.FC<{ className?: string }>;
declare const ChevronDown: React.FC<{ className?: string }>;

export default MembershipPlans;
