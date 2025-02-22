import { useEffect, useRef } from "react";
import { SlideInTextProps } from "../types/globalContextTypes";

//SlideInText component takes {children, delay} arguments
export const SlideInText = ({ children, delay = 0 }: SlideInTextProps) => {
  //Note: order of operation - elementRef defined > paint JSX > run useEffect
  const elementRef = useRef<HTMLDivElement>(null); //initialize a null elementRef (happens BEFORE useEffect and BEFORE render)

  // useEffect happens AFTER JSX renders
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          //if HTML elem intersects screen (with threshold of 0.1):
          if (entry.isIntersecting) {
            //remove the opacity-0, -translate-y-full, add translate-y-0 and opacity-100 classes
            setTimeout(() => {
              entry.target.classList.remove("-translate-y-full", "opacity-0");
              entry.target.classList.add("translate-y-0", "opacity-100");
            }, delay);
            //remove from observation
            observer.unobserve(entry.target);
          }
        });
      },
      {
        //set intersection threshold of 0.1 before observer acts
        threshold: 0.1,
      }
    );

    //currentElement is assigned to the newly painted JSX elementRef
    const currentElement = elementRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [delay]);

  return (
    <div
      ref={elementRef}
      className="transform -translate-y-full opacity-0 transition-all duration-1000 ease-out"
    >
      {children}
    </div>
  );
};
