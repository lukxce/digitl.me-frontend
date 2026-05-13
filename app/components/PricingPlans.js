"use client";

import { useState } from "react";
import PricingPlanCard from "./PricingPlanCard";
import styles from "./PricingPlans.module.css";

const PLANS = [
  { id: "standard", label: "Standard" },
  { id: "pro", label: "Pro" },
  { id: "premium", label: "Premium" },
];

export default function PricingPlans() {
  const [active, setActive] = useState("standard");

  return (
    <div className={styles.root}>
      <div className={styles.wrap} role="tablist" aria-label="Pricing plan">
        {PLANS.map((plan) => {
          const isActive = active === plan.id;
          const isProStyle = isActive && plan.id === "premium";
          return (
            <button
              key={plan.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles.option} ${
                isActive
                  ? isProStyle
                    ? styles.optionActivePro
                    : styles.optionActive
                  : ""
              }`}
              onClick={() => setActive(plan.id)}
            >
              {plan.label}
            </button>
          );
        })}
      </div>
      <PricingPlanCard planId={active} />
    </div>
  );
}
