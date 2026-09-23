import Image from "next/image";
import portrait from "@/public/images/chandupa.png";
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/BrandIcons";

const socials = [
  { title: "LinkedIn", href: "https://www.linkedin.com/in/chandupa-weerakkody", Icon: LinkedinIcon },
  { title: "Instagram", href: "https://www.instagram.com/chandupa.mp4", Icon: InstagramIcon },
  { title: "Facebook", href: "https://www.facebook.com/profile.php?id=61556727893743", Icon: FacebookIcon },
  { title: "Twitter", href: "https://twitter.com", Icon: TwitterIcon },
];

export default function AboutHero() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 lg:mb-32">
      {/* Photo */}
      <div className="flex justify-center md:justify-start animate-in fade-in slide-in-from-left-8">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-blue-600 rounded-2xl blur-3xl opacity-30 group-hover:opacity-50 transition-all duration-500 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-300 to-transparent rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-500" />
          <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden border-2 border-blue-400/50 group-hover:border-blue-400 transition-all duration-500 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent z-10 group-hover:from-blue-300/10 transition-all duration-500" />
            <Image
              src={portrait}
              alt="Chandupa Weerakkody CEO"
              fill
              preload
              sizes="(min-width: 768px) 384px, 320px"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center space-y-8 animate-in fade-in slide-in-from-right-8">
        <div>
          <h1 className="text-6xl md:text-7xl font-bold mb-4 leading-tight md:leading-none">
            <span className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 bg-clip-text text-transparent animate-pulse">
              Chandupa
            </span>
            <br />
            <span className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
              Weerakkody
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-300 font-semibold mt-2 flex items-center gap-2">
            CEO &amp; Lead Designer
            <span className="inline-block w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-500 mt-6 rounded-full" />
        </div>

        {/* Philosophy */}
        <div className="space-y-4 bg-gradient-to-br from-blue-900/30 to-purple-900/20 p-6 rounded-xl border border-blue-400/20 backdrop-blur-xs hover:border-blue-400/50 transition-all duration-500">
          <p className="text-lg md:text-xl text-blue-100 leading-relaxed md:leading-7 font-semibold italic">
            &quot;See the unseen, tell the untold&quot;
          </p>
          <p className="text-sm text-blue-300/70">A guiding philosophy for creative excellence</p>
        </div>

        {/* Socials */}
        <div className="flex gap-4 pt-4">
          {socials.map(({ title, href, Icon }) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={title}
              aria-label={title}
              className="interactive p-3 rounded-lg bg-gradient-to-br from-blue-900/40 to-purple-900/20 border border-blue-400/30 text-blue-300 hover:text-white hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:scale-110 backdrop-blur-xs group"
            >
              <Icon className="w-6 h-6 group-hover:text-blue-200" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
