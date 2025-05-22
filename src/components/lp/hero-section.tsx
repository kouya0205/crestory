import Image from "next/image";
import { ContainerScroll } from "@/components/lp/container-scroll-animation";

export default function HeroSection() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              地方の魅力を、
              <br />
              <span className="mt-1 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-4xl leading-none font-bold text-transparent md:text-[6rem]">
                Liveで届ける
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              生産者・職人の想いと、地域の魅力をライブ配信で可視化。
              <br />
              地方創生と地域産業の活性化を、PickBuyが支援します。
            </p>
          </>
        }
      >
        <Image
          src="/images/douglas-lopes-ehyV_XOZ4iA-unsplash.jpg"
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto h-full rounded-2xl object-cover object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
