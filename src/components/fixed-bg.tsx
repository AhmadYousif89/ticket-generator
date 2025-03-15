import bgLines from "../assets/images/pattern-lines.svg";
import circles from "../assets/images/pattern-circle.svg";
import squigglyLine from "../assets/images/pattern-squiggly-line-top.svg";
import squigglyLines from "../assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg";
import squigglyLinesDesktop from "../assets/images/pattern-squiggly-line-bottom-desktop.svg";

export default function FixedBackgrounds() {
  return (
    <>
      <img
        src={bgLines}
        alt="line pattern"
        className="absolute top-0 -z-10 mx-auto size-full max-w-[1440px] object-cover object-left"
      />

      <img
        src={squigglyLine}
        alt="squiggly line pattern"
        className="absolute -top-4 right-0 -z-10 size-32 lg:size-52 xl:size-80"
      />
      <img
        src={circles}
        alt="circle pattern"
        className="absolute -top-8 -left-5 -z-10 size-28 lg:size-44"
      />
      <img
        src={circles}
        alt="circle pattern"
        className="fixed top-1/2 -right-10 -z-10 size-32 lg:absolute lg:right-0 lg:size-44 xl:size-56"
      />
      <img
        src={squigglyLines}
        srcSet={`${squigglyLines} 768w, ${squigglyLinesDesktop} 1024w`}
        sizes="(max-width: 1023px) 768px, 1024px"
        alt="squiggly line bottom pattern"
        className="absolute -bottom-0 -z-10"
      />
    </>
  );
}
