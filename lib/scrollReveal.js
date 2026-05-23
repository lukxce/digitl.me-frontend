export const scrollRevealEase = [0.22, 1, 0.36, 1];

export const scrollRevealDistance = 56;

export const scrollRevealDuration = 1;

export const scrollRevealBaseDelay = 0.2;

export const scrollRevealStagger = 0.14;

export const scrollRevealStaggerDelay = 0.2;

export const scrollRevealViewport = { once: true, amount: 0.4 };

export const scrollRevealHidden = {
  opacity: 0,
  y: scrollRevealDistance,
};

export const scrollRevealVisible = {
  opacity: 1,
  y: 0,
};

export function getScrollRevealTransition(delay = 0, reduceMotion = false) {
  if (reduceMotion) {
    return { duration: 0 };
  }

  return {
    duration: scrollRevealDuration,
    ease: scrollRevealEase,
    delay: scrollRevealBaseDelay + delay,
  };
}
