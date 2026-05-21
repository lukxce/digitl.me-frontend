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
 *   marginTop?: number;
 *   align?: 'center' | 'left' | 'right';
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
  marginTop,
  align = 'center',
}) {
  return (
    <motion.div
      id={sectionId}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className={className}
      style={{ marginTop: marginTop ? `${marginTop}px` : undefined, textAlign: align, marginLeft: align === 'left' && '10px' }}
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
