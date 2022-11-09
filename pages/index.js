import Image from 'next/image';
import Link from 'next/link';

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
      </Head>
      <div className="container mx-auto min-h-screen flex flex-col lg:flex-row items-center justify-center gap-3 md:gap-6 p-2 md:p-6">
        <div className="w-1/3 md:w-1/3  max-w-[200px]">
          <div className="rounded-full aspect-square leading-[0] shadow-lg">
            <Image
              src="/jeffery.jpeg"
              height="100%"
              width="100%"
              className="rounded-full"
              alt="jeffery"
              layout="responsive"
            ></Image>
          </div>
        </div>
        <div className="p-3 md:w-2/3 flex flex-col items-start gap-y-3">
          <h1 className="text-2xl lg:text-5xl text-center lg:text-start w-full">
            <span className="font-semibold">Jeffery</span> Chia-Chun Ho
          </h1>
          <p>
            I am researching Fake News Detection using deep learning and I also have experience with Frontend and
            Backend Web development (React, Next.js / Django). With excellent learning abilities, I am able to solve
            problems independently, as well as work well in a team.
          </p>
          <div className="flex flex-row gap-2 flex-wrap justify-center lg:justify-start">
            <LinkButton primaryColor="black" secondaryColor="white" icon="github" href="https://github.com/chiachunho">
              @chiachunho
            </LinkButton>
            <LinkButton
              primaryColor="teal-600"
              secondaryColor="white"
              icon="mailbox"
              href="mailto:chiachun2491@gmail.com"
            >
              Contact me
            </LinkButton>
            <LinkButton
              primaryColor="teal-600"
              secondaryColor="white"
              icon="person-circle"
              href="/resume_221109_public.pdf"
            >
              Resume
            </LinkButton>

            <LinkButton primaryColor="cyan-600" secondaryColor="white" icon="journal" href="https://blog.jefferyho.cc">
              Blog
            </LinkButton>
            <LinkButton
              primaryColor="cyan-600"
              secondaryColor="white"
              icon="file-slides"
              href="https://slides.jefferyho.cc"
            >
              Slides
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function LinkButton({ primaryColor = 'teal-600', secondaryColor = 'white', icon = 'github', children, href = '#' }) {
  return (
    <Link href={href}>
      <a target="_blank" rel="noreferrer noopenner">
        <div
          className={`py-2 px-3 cursor-pointer rounded-md text-md font-medium transition-all border-2 border-${primaryColor} bg-${secondaryColor} hover:bg-${primaryColor} text-${primaryColor} hover:text-${secondaryColor} `}
        >
          <i className={`bi bi-${icon} mr-1`}></i> {children}
        </div>
      </a>
    </Link>
  );
}
