import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="pt-44 pb-24 bg-background-light-secondary relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(74,154,249,0.05)_0%,transparent_20%),radial-gradient(circle_at_80%_70%,rgba(42,90,156,0.07)_0%,transparent_20%)]"
        aria-hidden="true"
      ></div>
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-blue to-accent-blue bg-clip-text text-transparent leading-tight mb-5">
            Secure. Verify. Trust.
          </h1>
          <p className="text-lg text-text-gray mb-10 max-w-md">
            Hobpeg protects your internal communications and sensitive files with AI-driven verification and compliance control.
          </p>
          <div className="flex gap-5">
            <Link href="#">
              <a className="bg-gradient text-white font-semibold py-3 px-8 rounded-full hover:bg-gradient-to-r hover:from-highlight hover:to-accent-blue hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(74,154,249,0.3)] transition-all">
                Get Started
              </a>
            </Link>
            <Link href="#">
              <a className="border-2 border-light-blue text-light-blue font-semibold py-3 px-8 rounded-full hover:bg-light-blue hover:text-white transition-all">
                Learn More
              </a>
            </Link>
          </div>
        </div>
        <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 w-1/2 max-w-xl opacity-100">
          <Image
            src="/images/hero.svg"
            alt="Hero graphic"
            width={500}
            height={400}
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}