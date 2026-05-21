"use client";

import { motion } from "framer-motion";
import Title from "./Title";

/**
 * @param {{
 *   title: string;
 *   subtitle: string;
 *   width?: number;
 *   widthMobile?: number;
 *   subtitleWidth?: number;
 *   subtitleWidthMobile?: number;
 *   className?: string;
 *   sectionId?: string;
 * }} props
 */
export default function MotionTitleBlock({
  title,
  subtitle,
  width,
  widthMobile,
  subtitleWidth,
  subtitleWidthMobile,
  className,
  sectionId,
}) {
  return (
    <motion.div
      id={sectionId}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className={className}
    >
      <Title
        title={title}
        subtitle={subtitle}
        width={width}
        widthMobile={widthMobile}
        subtitleWidth={subtitleWidth}
        subtitleWidthMobile={subtitleWidthMobile}
      />
    </motion.div>
  );
}
