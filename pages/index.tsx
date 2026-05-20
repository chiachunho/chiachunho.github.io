import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import customImageLoader from '../utils/loader';

type ButtonProps = {
  primaryColor?: string;
  secondaryColor?: string;
  icon?: string;
  children: ReactNode;
  href?: string;
};

export default function Home() {
  return (
    <div className="w-full">
      <Head>
        <title>Jeffery Chia-Chun Ho</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Jeffery Chia-Chun Ho" key="title" />
        <meta
          name="description"
          content="I am researching Fake News Detection using deep learning and I also have experience with Frontend and
            Backend Web development (React, Next.js / Django). With excellent learning abilities, I am able to solve
            problems independently, as well as work well in a team."
        />
        <meta
          property="og:description"
          content="I am researching Fake News Detection using deep learning and I also have experience with Frontend and
            Backend Web development (React, Next.js / Django). With excellent learning abilities, I am able to solve
            problems independently, as well as work well in a team."
        />
        <meta property="og:image" content="https://jefferyho.cc/images/jeffery.jpeg" />
        <meta property="og:image:alt" content="Jeffery Chia-Chun Ho" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="2300" />
        <meta property="og:image:height" content="2300" />
      </Head>
      <div className="container mx-auto flex min-h-screen flex-col gap-y-3 p-4 md:p-6">
        <div className="flex h-full grow flex-col items-center justify-center gap-3 md:flex-row md:gap-6">
          <div className="w-1/3 max-w-[200px] md:w-1/3">
            <div className="aspect-square rounded-full border-8 border-white leading-[0] shadow-lg">
              <Image
                src="/images/jeffery.jpeg"
                className="h-auto w-full rounded-full"
                alt="jeffery"
                width={0}
                height={0}
                sizes="100vw"
                loader={customImageLoader}
                unoptimized
              ></Image>
            </div>
          </div>
          <div className="flex flex-col items-start gap-y-3 p-3 md:w-2/3">
            <h1 className="w-full text-center text-2xl md:text-start lg:text-5xl">
              <span className="font-semibold">Jeffery</span> Chia-Chun Ho
            </h1>
            <p>
              I am primarily a frontend developer with extensive experience in backend development using C# .NET and
              Django. I specialize in React and Next.js for frontend development and have also researched Fake News
              Detection using machine learning techniques.
            </p>
            <div className="flex w-full flex-row flex-wrap justify-center gap-2 md:justify-start">
              <LinkButton
                primaryColor="teal-600"
                secondaryColor="white"
                icon="person-circle"
                href="/files/resume_240610_public.pdf"
              >
                Resume
              </LinkButton>
              <LinkButton
                primaryColor="teal-600"
                secondaryColor="white"
                icon="mailbox"
                href="mailto:chiachun2491@gmail.com"
              >
                Contact me
              </LinkButton>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-3">
          <div className="text-lg font-semibold md:text-xl">Quick Links</div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <QuickLinkButton
              primaryColor="black"
              secondaryColor="white"
              icon="github"
              href="https://github.com/chiachunho"
            >
              @chiachunho
            </QuickLinkButton>
            <QuickLinkButton
              primaryColor="cyan-600"
              secondaryColor="white"
              icon="journal"
              href="https://blog.jefferyho.cc"
            >
              Blog
            </QuickLinkButton>
            <QuickLinkButton
              primaryColor="cyan-600"
              secondaryColor="white"
              icon="file-slides"
              href="https://slides.jefferyho.cc"
            >
              Slides
            </QuickLinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function LinkButton({
  primaryColor = 'teal-600',
  secondaryColor = 'white',
  icon = 'github',
  children,
  href = '#',
}: ButtonProps) {
  return (
    <Link href={href} target="_blank" rel="noreferrer noopener">
      <div
        className={`cursor-pointer rounded-2xl border-2 px-3 py-1 text-sm font-medium transition-all border-${primaryColor} bg-${secondaryColor} hover:bg-${primaryColor} text-${primaryColor} hover:text-${secondaryColor} `}
      >
        <i className={`bi bi-${icon} mr-1`}></i> {children}
      </div>
    </Link>
  );
}

function QuickLinkButton({
  primaryColor = 'teal-600',
  secondaryColor = 'white',
  icon = 'github',
  children,
  href = '#',
}: ButtonProps) {
  return (
    <Link href={href} target="_blank" rel="noreferrer noopener">
      <div
        className={`text-md cursor-pointer rounded-md border-2 px-3 py-1 font-medium transition-all border-${primaryColor} bg-${secondaryColor} hover:bg-${primaryColor} text-${primaryColor} hover:text-${secondaryColor} `}
      >
        <i className={`bi bi-${icon} mr-1`}></i> {children}
      </div>
    </Link>
  );
}
