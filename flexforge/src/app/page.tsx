import { motion } from "framer-motion";
import { Hero } from "@/sections/Hero";
import { WhyChooseUs } from "@/sections/WhyChooseUs";
import { WorkoutPrograms } from "@/sections/WorkoutPrograms";
import { Nutrition } from "@/sections/Nutrition";
import { Transformations } from "@/sections/Transformations";
import { Calculators } from "@/sections/Calculators";
import { MembershipPlans } from "@/sections/MembershipPlans";
import { Trainers } from "@/sections/Trainers";
import { BlogPreview } from "@/sections/BlogPreview";
import { Newsletter } from "@/sections/Newsletter";
import { Footer } from "@/sections/Footer";
import { FloatingNav } from "@/components/navigation/FloatingNav";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { BackToTop } from "@/components/ui/BackToTop";

// Animation variants for page sections
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function HomePage() {
  return (
    <main id="main-content" className="relative z-10">
      {/* Progress Bar */}
      <ProgressBar />

      {/* Floating Navigation */}
      <FloatingNav />

      {/* Hero Section */}
      <motion.section
        id="home"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, threshold: 0.1 }}
        variants={sectionVariants}
      >
        <Hero />
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section
        id="why-choose-us"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, threshold: 0.1 }}
        variants={sectionVariants}
      >
        <WhyChooseUs />
      </motion.section>

      {/* Workout Programs Section */}
      <motion.section
        id="programs"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, threshold: 0.1 }}
        variants={sectionVariants}
      >
        <WorkoutPrograms />
      </motion.section>

      {/* Nutrition Section */}
      <motion.section
        id="nutrition"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, threshold: 0.1 }}
        variants={sectionVariants}
      >
        <Nutrition />
      </motion.section>

      {/* Transformations Section */}
      <motion.section
        id="transformations"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, threshold: 0.1 }}
        variants={sectionVariants}
      >
        <Transformations />
      </motion.section>

      {/* Calculators Section */}
      <motion.section
        id="calculators"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, threshold: 0.1 }}
        variants={sectionVariants}
      >
        <Calculators />
      </motion.section>

      {/* Membership Plans Section */}
      <motion.section
        id="plans"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, threshold: 0.1 }}
        variants={sectionVariants}
      >
        <MembershipPlans />
      </motion.section>

      {/* Trainers Section */}
      <motion.section
        id="trainers"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, threshold: 0.1 }}
        variants={sectionVariants}
      >
        <Trainers />
      </motion.section>

      {/* Blog Preview Section */}
      <motion.section
        id="blog"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, threshold: 0.1 }}
        variants={sectionVariants}
      >
        <BlogPreview />
      </motion.section>

      {/* Newsletter Section */}
      <motion.section
        id="newsletter"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, threshold: 0.1 }}
        variants={sectionVariants}
      >
        <Newsletter />
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, threshold: 0.1 }}
        variants={sectionVariants}
      >
        <Footer />
      </motion.footer>

      {/* Back to Top Button */}
      <BackToTop />
    </main>
  );
}
