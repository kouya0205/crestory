import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { useEffect } from "react";

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-6xl font-bold text-transparent"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            crestory
          </motion.h1>
          <motion.p
            className="mb-8 text-xl text-gray-600"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            あなたの物語を、未来へ繋ぐ
          </motion.p>
        </motion.div>

        <motion.div
          className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-2xl"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
        >
          <BookOpen className="h-16 w-16 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
};
