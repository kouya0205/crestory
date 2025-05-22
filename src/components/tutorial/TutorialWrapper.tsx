"use client";

import { useEffect, useState } from "react";
import DashboardTutorial from "./DashboardTutorial";
import { useTutorial } from "@/hooks/useTutorial";

interface TutorialWrapperProps {
  userId: string;
  hasSeen: boolean;
}

export default function TutorialWrapper({
  userId,
  hasSeen,
}: TutorialWrapperProps) {
  const { showTutorial, completeTutorial } = useTutorial({
    userId,
    hasSeen,
  });

  if (!showTutorial) return null;

  return <DashboardTutorial userId={userId} onComplete={completeTutorial} />;
}
