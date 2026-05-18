import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import stripeSvg from "../../assets/stripe.svg";
import CTAButtons from "./CTAButtons";
import HeroCardHeader from "./HeroCardHeader";
import ProgressBar from "./ProgressBar";
import styles from "./HeroCard.module.css";
import { motion } from "motion/react";

const DEFAULT_AVATAR =
  "https://picsum.photos/seed/digitl-hero-avatar/160/160?grayscale";

/** Full-viewport portfolio hero with floating `stripe.svg` tab and soft card. */
export default function HeroCard({
  name = "Alex Rivera",
  subtitle = "Web designer · Developer",
  headlineLines = [
    "Design that moves",
    "products forward",
  ],
  description =
    "I build designs that solve problems, inspire action, and drive success.",
  socialProofLabel = "50+ customers",
  progressActiveCount = 2,
  avatarSrc = DEFAULT_AVATAR,
  avatarAlt = "Profile photo",
  availabilitySlotsLabel = "2 open slots",
  availabilityPeriodLabel = "for December",
  location = "Berlin, Germany",
  templateHref = "#",
  templateLabel = "Praxis template →",
  primaryCtaHref = "/contact",
  primaryCtaLabel = "Book a call",
  secondaryCtaHref = "/projects",
  secondaryCtaLabel = "View work",
  socialLinks,
  className = "",
}) {
  return (
    <motion.div
    className={styles.shell}
    initial={{
      y: '0vh',
      rotate: 90,
      scale: 0,
      opacity: 0,
      filter: 'blur(10px)',
    }}
    animate={{
      y: 0,
      rotate: 0,
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
    }}
    transition={{
      type: 'spring',
      stiffness: 30,
      damping: 14,
    }}
  >
    <section className={`${styles.outer} ${className}`.trim()}>
      <div className={styles.floatingTab} aria-hidden>
        <Image
          src={stripeSvg}
          alt=""
          width={63}
          height={164}
          className={styles.stripeImg}
          priority
          unoptimized
        />
      </div>
      <div className={styles.inner}>
      <div className={styles.hole}></div>

      <div className={styles.card}>
        <ProgressBar activeCount={progressActiveCount} />
        <HeroCardHeader
          name={name}
          subtitle={subtitle}
          avatarSrc={avatarSrc}
          avatarAlt={avatarAlt}
          availabilitySlotsLabel={availabilitySlotsLabel}
          availabilityPeriodLabel={availabilityPeriodLabel}
          socialLinks={socialLinks}
        />

        <h1 className={styles.headline}>
          {headlineLines.map((line, i) => (
            <Fragment key={i}>
              {i > 0 ? <br /> : null}
              {line}
            </Fragment>
          ))}
        </h1>

        <div className={styles.socialProof}>
          <span className={styles.stars} aria-hidden>
            ★★★★★
          </span>
          <span className={styles.socialProofText}>{socialProofLabel}</span>
        </div>

        <p className={styles.description}>{description}</p>

        <CTAButtons
          primaryHref={primaryCtaHref}
          primaryLabel={primaryCtaLabel}
          secondaryHref={secondaryCtaHref}
          secondaryLabel={secondaryCtaLabel}
        />
        </div>
      </div>
    </section>
    </motion.div>
  );
}
