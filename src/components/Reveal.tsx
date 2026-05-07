"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right";

type RevealProps = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  amount?: number;
  as?: "div" | "section" | "article" | "header";
};

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  left: { x: -24, y: 0 },
  right: { x: 24, y: 0 },
};

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const buildVariants = (direction: Direction, delay: number): Variants => ({
  hidden: {
    opacity: 0,
    x: offset[direction].x,
    y: offset[direction].y,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.9,
      ease: EASE,
      delay,
    },
  },
});

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  amount = 0.12,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={buildVariants(direction, delay)}
    >
      {children}
    </MotionTag>
  );
}
