"use client";

import { motion } from "framer-motion";
import {
  Dumbbell,
  Heart,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Facebook,
  Instagram,
  LinkedIn,
  YouTube,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import { Section, Card } from "@/components/layout/Container";
import { Button, IconButton } from "@/components/ui/Button";
import { cn } from "@/utils";
import { ANIMATION, BRAND, NAVIGATION, FOOTER_LINKS, SOCIAL_MEDIA, CONTACT } from "@/constants";

/**
 * Social Media Icons Component
 */
const SocialIcons = ({ className }: { className?: string }) => (
  <motion.div
    className={cn("flex gap-4", className)}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.4, duration: 0.4 }}
  >
    {SOCIAL_MEDIA.map((social, index) => (
      <motion.a
        key={social.name}
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-accent/10 transition-all"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 + index * 0.05, duration: 0.3 }}
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.9 }}
      >
        <social.icon className="w-5 h-5 text-white/80" />
      </motion.a>
    ))}
  </motion.div>
);

/**
 * Footer Link Column Component
 */
const FooterColumn = ({
  title,
  links,
  index,
}: {
  title: string;
  links: typeof FOOTER_LINKS[number]["links"];
  index: number;
}) => (
  <motion.div
    className="space-y-4"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.4 }}
  >
    <h4 className="text-sm font-bold text-white uppercase tracking-wider">
      {title}
    </h4>
    <ul className="space-y-3">
      {links.map((link, linkIndex) => (
        <motion.li
          key={link.href}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + linkIndex * 0.03, duration: 0.3 }}
        >
          <a
            href={link.href}
            className="text-sm text-white/60 hover:text-accent transition-colors flex items-center gap-1 group"
          >
            {link.label}
            {link.external && (
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </a>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

/**
 * Contact Info Component
 */
const ContactInfo = () => (
  <motion.div
    className="space-y-6"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
  >
    <motion.div
      className="flex items-start gap-4"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1, duration: 0.3 }}
    >
      <Mail className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
      <div>
        <div className="text-sm font-medium text-white">Email</div>
        <a
          href={`mailto:${CONTACT.email}`}
          className="text-sm text-white/60 hover:text-accent transition-colors"
        >
          {CONTACT.email}
        </a>
      </div>
    </motion.div>

    <motion.div
      className="flex items-start gap-4"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.3 }}
    >
      <Phone className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
      <div>
        <div className="text-sm font-medium text-white">Phone</div>
        <a
          href={`tel:${CONTACT.phone}`}
          className="text-sm text-white/60 hover:text-accent transition-colors"
        >
          {CONTACT.phone}
        </a>
      </div>
    </motion.div>

    <motion.div
      className="flex items-start gap-4"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.3 }}
    >
      <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
      <div>
        <div className="text-sm font-medium text-white">Address</div>
        <p className="text-sm text-white/60">{CONTACT.address}</p>
      </div>
    </motion.div>
  </motion.div>
);

/**
 * Footer Section
 * Comprehensive footer with navigation, contact info, and brand
 */
export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Glow effect at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-[#4ECDC4] opacity-30" />

      <Section
        id="footer"
        className="pt-16 pb-8"
      >
        {/* Main Footer Content */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: ANIMATION.ease }}
        >
          {/* Brand Column */}
          <motion.div
            className="space-y-6 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-[#4ECDC4] flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Dumbbell className="w-5 h-5 text-black" />
              </motion.div>
              <div>
                <h3 className="text-xl font-black text-white">{BRAND.name}</h3>
                <p className="text-sm text-white/60">{BRAND.tagline}</p>
              </div>
            </motion.div>

            <motion.p
              className="text-sm text-white/60"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {BRAND.description}
            </motion.p>

            <SocialIcons />
          </motion.div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            {FOOTER_LINKS.map((column, index) => (
              <FooterColumn
                key={column.title}
                title={column.title}
                links={column.links}
                index={index}
              />
            ))}
          </div>

          {/* Contact Column */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Contact Us
            </h4>
            <ContactInfo />

            <motion.div
              className="mt-6 pt-4 border-t border-white/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <h5 className="text-sm font-medium text-white mb-3">
                Business Hours
              </h5>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Monday - Friday</span>
                  <span className="text-white">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Saturday</span>
                  <span className="text-white">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Sunday</span>
                  <span className="text-white">Closed</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/5 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <motion.div
              className="flex items-center gap-4 text-sm text-white/60"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              <span>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</span>
              <span className="hidden md:inline">|</span>
              <span className="hidden md:inline">
                Made with <Heart className="w-4 h-4 text-red-500 inline" /> in
                Bangladesh
              </span>
            </motion.div>

            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.3 }}
            >
              <a
                href="/privacy"
                className="text-sm text-white/60 hover:text-accent transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-sm text-white/60 hover:text-accent transition-colors"
              >
                Terms of Service
              </a>
              <IconButton
                variant="ghost"
                className="w-10 h-10 rounded-full"
                onClick={scrollToTop}
              >
                <ChevronUp className="w-5 h-5" />
              </IconButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </Section>

      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 20% 100%, rgba(0, 230, 118, 0.1) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 80% 100%, rgba(78, 205, 196, 0.1) 0%, transparent 50%)",
          }}
        />
      </motion.div>
    </footer>
  );
}

export default Footer;
