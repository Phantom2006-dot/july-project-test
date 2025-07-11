"use client";
import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useGlobalContext } from "@/contexts/GlobalProvider";

const SCROLL_CLICK_AMOUNT = 300;
const SCROLL_HOLD_STEP = 1500;

const Rows = ({ title, items }) => {
  const { device } = useGlobalContext();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const animationRef = useRef(null);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  const scroll = (direction, amount = SCROLL_CLICK_AMOUNT) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const startAutoScroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;

    const step = () => {
      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth;

      if ((direction === "left" && atStart) || (direction === "right" && atEnd)) {
        cancelAnimationFrame(animationRef.current);
        return;
      }

      el.scrollLeft += direction === "left" ? -SCROLL_HOLD_STEP : SCROLL_HOLD_STEP;
      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);
  };

  const stopAutoScroll = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  return (
    <div className="w-full bg-white p-3 rounded-lg">
      <div className="flex px-2 items-center justify-between">
        <div className="font-bold text-lg">{title}</div>
        <div className="text-sm font-medium cursor-pointer hover:underline">See all</div>
      </div>

      <div className="relative w-full group overflow-hidden mt-2">
        <div
          ref={scrollRef}
          className="flex items-center space-x-4 overflow-x-auto px-4 scroll-smooth scrollbar-hide"
        >
          {items?.map((item, i) => (
            <Card key={i} item={item} index={i} device={device} />
          ))}
        </div>

        {device === "desktop" && canScrollLeft && (
          <div
            onClick={() => scroll("left")}
            onMouseDown={() => startAutoScroll("left")}
            onMouseUp={stopAutoScroll}
            onMouseLeave={stopAutoScroll}
            className="hidden group-hover:flex absolute z-10 top-1/2 -translate-y-1/2 text-white text-3xl -left-14 w-28 h-28 bg-black/65 items-center justify-end pr-4 rounded-r-full"
          >
            <FaChevronLeft />
          </div>
        )}

        {device === "desktop" && canScrollRight && (
          <div
            onClick={() => scroll("right")}
            onMouseDown={() => startAutoScroll("right")}
            onMouseUp={stopAutoScroll}
            onMouseLeave={stopAutoScroll}
            className="hidden group-hover:flex absolute z-10 top-1/2 -translate-y-1/2 text-white text-3xl -right-14 w-28 h-28 bg-black/65 items-center justify-start pl-4 rounded-l-full"
          >
            <FaChevronRight />
          </div>
        )}
      </div>
    </div>
  );
};

export default Rows;
