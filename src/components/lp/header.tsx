"use client";

import {
  useScroll,
  motion,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowRightIcon } from "lucide-react";

export default function LpHeader() {
  const { scrollY } = useScroll();
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shouldHide, setShouldHide] = useState(false);

  // スクロール方向と表示制御を検出
  useMotionValueEvent(scrollY, "change", (latest) => {
    const isScrollingUp = latest < lastScrollY;
    setIsScrollingUp(isScrollingUp);
    setLastScrollY(latest);

    // スクロールダウン時かつ一定量以上スクロールした場合に非表示
    if (!isScrollingUp && latest > 1) {
      setShouldHide(true);
    } else {
      setShouldHide(false);
    }
  });

  return (
    <motion.header
      className="bg-background/60 sticky top-0 z-50 p-0 backdrop-blur"
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: shouldHide ? -100 : 0,
        opacity: shouldHide ? 0 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <div className="container mx-auto flex items-center justify-between p-2">
        <Link href="/">
          <Image src="/favicon.ico" alt="logo" width={50} height={50} />
        </Link>
        <Link href="/auth/signin">
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-[var(--pick-buy-creative-purple)] text-white hover:bg-[var(--pick-buy-creative-purple)]/80 hover:text-white"
          >
            <span>サインイン</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      <motion.hr
        className="absolute bottom-0 w-full"
        style={{
          opacity: scrollY.get() === 0 ? 0 : 1,
          willChange: "opacity",
        }}
        animate={{
          opacity: scrollY.get() === 0 ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      />
    </motion.header>
  );
}
