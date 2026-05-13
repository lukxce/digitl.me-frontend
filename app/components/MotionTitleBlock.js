"use client";

import { motion } from "framer-motion";
import Title from "./Title";

/**
 * @param {{
 *   title: string;
 *   subtitle: string;
 *   width?: number;
 *   className?: string;
 *   sectionId?: string;
 * }} props
 */
export default function MotionTitleBlock({
  title,
  subtitle,
  width,
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
      <Title title={title} subtitle={subtitle} width={width} />
    </motion.div>
  );
}
