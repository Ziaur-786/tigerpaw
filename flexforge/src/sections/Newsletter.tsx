"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Check, Zap, Star, TrendingUp } from "lucide-react";
import { Section, Card } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils";
import { ANIMATION } from "@/constants";

/**
 * Newsletter Section
 * Email subscription with benefits and social proof
 */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const benefits = [
    { icon: <Zap className="w-5 h-5" />, text: "Weekly workout tips" },
    { icon: <TrendingUp className="w-5 h-5" />, text: "Exclusive content" },
    { icon: <Star className="w-5 h-5" />, text: "Early access to features" },
    { icon: <Check className="w-5 h-5" />, text: "No spam, ever" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (email && email.includes("@")) {
      setIsSubscribed(true);
    } else {
      setError("Please enter a valid email address");
    }

    setIsLoading(false);
  };

  if (isSubscribed) {
    return (
      <Section
        id="newsletter"
        title="Stay in the Loop"
        subtitle="Join our community of fitness enthusiasts"
        tagline="Never Miss an Update"
      >
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: ANIMATION.ease }}
        >
          <motion.div
            className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-[#4ECDC4] flex items-center justify-center mx-auto mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Check className="w-10 h-10 text-black" />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-black text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            You&apos;re Subscribed!
          </motion.h2>

          <motion.p
            className="text-lg text-secondary-text mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            Check your inbox for your welcome email. We&apos;re excited to have
            you on board!
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsSubscribed(false)}
            >
              Subscribe Another Email
            </Button>
            <Button variant="primary" size="lg" rightIcon={<TrendingUp className="w-5 h-5" />}>
              Start Your Journey
            </Button>
          </motion.div>
        </motion.div>
      </Section>
    );
  }

  return (
    <Section
      id="newsletter"
      title="Stay in the Loop"
      subtitle="Join our community of fitness enthusiasts"
      tagline="Never Miss an Update"
    >
      <Card
        variant="glass"
        padding="xl"
        className="max-w-4xl mx-auto border border-white/10"
      >
        <motion.div
          className="grid md:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: ANIMATION.ease }}
        >
          {/* Left Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-2xl md:text-3xl font-black text-white">
              Ready to Transform Your Fitness Journey?
            </h3>

            <p className="text-secondary-text">
              Subscribe to our newsletter and receive weekly workout tips,
              nutrition advice, and exclusive content delivered straight to your
              inbox. Join 10,000+ members who are already seeing results.
            </p>

            {/* Benefits */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
                >
                  <motion.span
                    className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0"
                    whileHover={{ scale: 1.1, background: "rgba(0, 230, 118, 0.1)" }}
                  >
                    <span className="text-accent">{benefit.icon}</span>
                  </motion.span>
                  <span className="text-sm text-white/80">{benefit.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex items-center gap-8 pt-4 border-t border-white/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">10000+</div>
                <div className="text-xs text-white/60">Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">500+</div>
                <div className="text-xs text-white/60">Transformations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">99%</div>
                <div className="text-xs text-white/60">Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40"
                  size={20}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all"
                  required
                />
              </motion.div>

              {error && (
                <motion.p
                  className="text-sm text-red-400"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  isLoading={isLoading}
                  rightIcon={!isLoading && <Send className="w-5 h-5" />}
                >
                  {isLoading ? "Subscribing..." : "Subscribe Now"}
                </Button>
              </motion.div>
            </form>

            <motion.p
              className="text-xs text-white/40 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from FlexForge. You can unsubscribe at any time.
            </motion.p>
          </motion.div>
        </motion.div>
      </Card>
    </Section>
  );
}

export default Newsletter;
