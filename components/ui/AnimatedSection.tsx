"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type FadeProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: keyof typeof motion;
};

const staggerContext = createContext(false);

const ease = [0.22, 1, 0.36, 1] as const;

function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}

/**
 * Slide into place when scrolled into view.
 * Opacity stays at 1 so failed hydration / strict whileInView can never
 * leave marketing sections blank (SSR and first paint are always readable).
 */
export function FadeInWhenVisible({
  children,
  className = "",
  delay = 0,
  y = 18,
}: FadeProps) {
  const reduce = useReducedMotion();
  const inStagger = useContext(staggerContext);
  const hydrated = useHydrated();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.08,
    margin: "120px 0px 120px 0px",
  });
  const show = !hydrated || inView;

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  if (inStagger) {
    return (
      <motion.div
        ref={ref}
        className={className}
        variants={{
          hidden: { opacity: 1, y },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.55, ease, delay: delay / 1000 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={{ opacity: 1, y: show ? 0 : y }}
      transition={{ duration: 0.55, ease, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  y = 18,
}: FadeProps) {
  return (
    <FadeInWhenVisible className={className} delay={delay} y={y}>
      {children}
    </FadeInWhenVisible>
  );
}

export function StaggerChildren({
  children,
  className = "",
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const hydrated = useHydrated();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.06,
    margin: "120px 0px 120px 0px",
  });
  const show = !hydrated || inView;

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <staggerContext.Provider value={true}>
      <motion.div
        ref={ref}
        className={className}
        initial={false}
        animate={show ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: stagger,
              delayChildren: delay / 1000,
            },
          },
        }}
      >
        {Children.map(children, (child) => child)}
      </motion.div>
    </staggerContext.Provider>
  );
}

export function MotionHover({
  children,
  className = "",
  scale = 1.02,
  y = -4,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  scale?: number;
  y?: number;
} & Omit<HTMLMotionProps<"div">, "children" | "className">) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileHover={{ scale, y }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
