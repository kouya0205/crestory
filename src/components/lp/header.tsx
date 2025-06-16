import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const LpHeader = () => {
  const pathname = usePathname() ?? "/";
  const headerItems = [
    {
      label: "機能",
      href: "/#features",
    },
    {
      label: "魅力",
      href: "/#appeal",
    },
    {
      label: "料金",
      href: "/pricing",
    },
    {
      label: "ヘルプ",
      href: "/help",
    },
  ];

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    // ヘルプページへの遷移の場合は通常の遷移を行う
    if (href === "/help") return;

    e.preventDefault();

    // 現在のページがルートでない場合は、まずルートに遷移
    if (pathname !== "/") {
      window.location.href = href;
      return;
    }

    // #以降のIDを取得
    const targetId = href.split("#")[1];
    if (!targetId) return "#";
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <motion.header
      className="fixed top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          <Link href="/">
            <span className="text-2xl font-bold">crestory</span>
          </Link>
        </motion.div>
        <nav className="hidden space-x-6 md:flex">
          {headerItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="text-gray-600 transition-colors hover:text-blue-600"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -2 }}
              onClick={(e) => handleScroll(e, item.href)}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>
        <motion.button
          className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 text-white transition-all hover:shadow-lg"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/auth/register">
            <span className="text-white">始める</span>
          </Link>
        </motion.button>
      </div>
    </motion.header>
  );
};
