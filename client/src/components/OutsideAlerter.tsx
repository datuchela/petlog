import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>, action: any) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (e.target instanceof HTMLElement && ref.current && !ref.current.contains(e.target)) {
        action();
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */

type Props = {
  action: () => void;
  className: string;
  children: React.ReactNode;
};

export default function OutsideAlerter(props: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(wrapperRef, props.action);

  return (
    <div ref={wrapperRef} className={props.className}>
      {props.children}
    </div>
  );
}
