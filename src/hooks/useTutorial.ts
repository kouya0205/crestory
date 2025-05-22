"use client";

import { useState, useEffect } from "react";

interface UseTutorialProps {
  userId: string;
  hasSeen: boolean;
}

export function useTutorial({ userId, hasSeen }: UseTutorialProps) {
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    // ユーザーがチュートリアルをまだ見ていない場合に表示
    if (!hasSeen) {
      setShowTutorial(true);
    }
  }, [hasSeen]);

  const completeTutorial = async () => {
    try {
      const response = await fetch("/api/tutorial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("チュートリアル更新に失敗しました");
      }

      setShowTutorial(false);
      return true;
    } catch (error) {
      console.error("チュートリアル完了エラー:", error);
      return false;
    }
  };

  return { showTutorial, completeTutorial };
}
