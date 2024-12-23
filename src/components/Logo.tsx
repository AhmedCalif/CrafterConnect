import * as React from "react";
import Image from "next/image";

interface LogoProps {
  imageSrc: string;
  imageAlt: string;
}

export const Logo: React.FC<LogoProps> = ({ imageSrc, imageAlt }) => {
  return (
    <div
      className="flex flex-col items-start px-16 pb-1.5 max-w-[382px]"
      role="banner"
    >
      <Image
        loading="lazy"
        src={imageSrc}
        alt={imageAlt}
        width={100}
        height={100}
        className="ml-5 w-full aspect-[9.09]"
      />
    </div>
  );
};





// import * as React from "react";
// import { Banner } from "./Banner";

// export const BannerContainer: React.FC = () => {
//   return (
//     <main>
//       <section>
//         <Banner
//           imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/c3862e30369faecea8fbf0e83e61751b288fb65505e99c33361a626c6b08e4c3?placeholderIfAbsent=true&apiKey=43882fedecf6460998ef8240965c4e1d"
//           imageAlt="Banner image"
//         />
//       </section>
//     </main>
//   );
// };
