"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, ArrowRight, BookOpen, Eye, Heart, Tag } from "lucide-react";
import { Section, Card, Grid } from "@/components/layout/Container";
import { Button, IconButton } from "@/components/ui/Button";
import { cn } from "@/utils";
import { BLOG_POSTS, BLOG_CATEGORIES, ANIMATION } from "@/constants";

// Category colors
const categoryColors: Record<string, string> = {
  workouts: "#00E676",
  nutrition: "#4ECDC4",
  supplements: "#FFD93D",
  mindset: "#FF6B9D",
  recovery: "#6B73FF",
  science: "#FF9F43",
};

/**
 * Blog Category Badge
 */
const CategoryBadge = ({
  category,
  index,
}: {
  category: (typeof BLOG_CATEGORIES)[number];
  index: number;
}) => (
  <motion.div
    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium"
    style={{
      background: categoryColors[category.value] + "20",
      color: categoryColors[category.value],
    }}
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05, duration: 0.4, ease: ANIMATION.ease }}
    whileHover={{ scale: 1.05 }}
  >
    {category.label}
  </motion.div>
);

/**
 * Featured Post Card
 */
const FeaturedPostCard = ({
  post,
  index,
}: {
  post: (typeof BLOG_POSTS)[number];
  index: number;
}) => {
  const category = BLOG_CATEGORIES.find((c) => c.value === post.category);
  const color = category ? categoryColors[category.value] : "#00E676";

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, threshold: 0.1 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: ANIMATION.ease }}
      whileHover={{ y: -8 }}
    >
      <Card
        variant="glass"
        padding="xl"
        className="relative overflow-hidden h-full"
        hoverEffect={false}
      >
        {/* Image Placeholder */}
        <div className="relative h-64 mb-6 rounded-2xl overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${color}40, ${color}20)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Pattern overlay */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
          </motion.div>

          {/* Category Badge */}
          <motion.div
            className="absolute top-3 left-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            {category && <CategoryBadge category={category} index={0} />}
          </motion.div>

          {/* Featured Badge */}
          {post.featured && (
            <motion.div
              className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-accent to-[#4ECDC4] text-black"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              Featured
            </motion.div>
          )}

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          />

          {/* Arrow icon */}
          <motion.div
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            <ArrowRight className="w-5 h-5 text-black" />
          </motion.div>
        </div>

        {/* Content */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">
            {post.title}
          </h3>
          <p className="text-secondary-text line-clamp-2">{post.excerpt}</p>

          {/* Meta */}
          <motion.div
            className="flex items-center gap-4 pt-3 border-t border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <div className="flex items-center gap-1.5 text-sm text-white/60">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-white/60">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-white/60">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${color}30, transparent 70%)`,
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  );
};

/**
 * Regular Blog Post Card
 */
const BlogPostCard = ({
  post,
  index,
}: {
  post: (typeof BLOG_POSTS)[number];
  index: number;
}) => {
  const category = BLOG_CATEGORIES.find((c) => c.value === post.category);
  const color = category ? categoryColors[category.value] : "#00E676";

  return (
    <motion.div
      className="relative group h-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, threshold: 0.1 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: ANIMATION.ease }}
      whileHover={{ y: -8 }}
    >
      <Card
        variant="glass"
        padding="lg"
        className="relative h-full border-0"
        hoverEffect
      >
        {/* Image Placeholder */}
        <div className="relative h-48 mb-4 rounded-2xl overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${color}30, ${color}15)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
          </motion.div>

          {/* Category Badge */}
          <motion.div
            className="absolute top-2 left-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            {category && <CategoryBadge category={category} index={0} />}
          </motion.div>
        </div>

        {/* Content */}
        <motion.div
          className="flex flex-col gap-3 flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors line-clamp-1">
            {post.title}
          </h3>
          <p className="text-secondary-text text-sm line-clamp-2">{post.excerpt}</p>

          {/* Meta */}
          <motion.div
            className="flex items-center justify-between pt-3 border-t border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <div className="flex items-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>
            <IconButton
              variant="ghost"
              className="w-8 h-8 p-1.5"
            >
              <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-accent transition-colors" />
            </IconButton>
          </motion.div>
        </motion.div>
      </Card>
    </motion.div>
  );
};

/**
 * Blog Preview Section
 * Showcases featured and recent blog posts
 */
export function BlogPreview() {
  const featuredPosts = BLOG_POSTS.filter((post) => post.featured);
  const regularPosts = BLOG_POSTS.filter((post) => !post.featured);

  return (
    <Section
      id="blog"
      title="Fitness Insights"
      subtitle="Expert articles and guides to help you train smarter and live healthier"
      tagline="Knowledge is Power"
    >
      {/* Featured Posts */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: ANIMATION.ease }}
      >
        <motion.h3
          className="text-2xl font-bold text-white mb-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Featured Articles
        </motion.h3>

        <Grid cols={2} gap="lg">
          {featuredPosts.map((post, index) => (
            <FeaturedPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </motion.div>

      {/* Recent Posts */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6, ease: ANIMATION.ease }}
      >
        <motion.h3
          className="text-2xl font-bold text-white mb-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Recent Posts
        </motion.h3>

        <Grid cols={3} gap="md">
          {regularPosts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </motion.div>

      {/* Categories */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6, ease: ANIMATION.ease }}
      >
        <motion.h3
          className="text-2xl font-bold text-white mb-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Browse by Category
        </motion.h3>

        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {BLOG_CATEGORIES.map((category, index) => {
            const color = categoryColors[category.value];
            return (
              <motion.button
                key={category.value}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: color + "15",
                  color,
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.05, background: color + "25" }}
                whileTap={{ scale: 0.95 }}
              >
                <Tag className="w-4 h-4" />
                <span>{category.label}</span>
              </motion.button>
            );
          })}
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
          Stay updated with the latest fitness trends, workout tips, and nutrition
          advice from our team of experts.
        </p>
        <Button
          variant="outline"
          size="lg"
          rightIcon={<BookOpen className="w-5 h-5" />}
        >
          Visit Our Blog
        </Button>
      </motion.div>
    </Section>
  );
}

export default BlogPreview;
