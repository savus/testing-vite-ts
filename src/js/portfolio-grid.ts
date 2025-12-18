import type { TPortfolioCards } from "../types";

export let currentIndex = 0;
export let prevIndex = 0;
export let nextIndex = 0;

export const clearSlides = (slides: TPortfolioCards) =>
  slides.forEach((slide) => slide.classList.remove("active", "prev", "next"));

export const updateIndexes = (num: number, slides: TPortfolioCards) => {
  currentIndex = num;
  prevIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
  nextIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
  clearSlides(slides);
  slides[prevIndex].classList.add("prev");
  slides[currentIndex].classList.add("active");
  slides[nextIndex].classList.add("next");
};

export const initCurrentIndex = (slides: TPortfolioCards) => {
  const randomNum = Math.floor(Math.random() * slides.length);
  updateIndexes(randomNum, slides);
};

export const goToNext = (slides: TPortfolioCards) =>
  currentIndex < slides.length - 1
    ? updateIndexes(currentIndex + 1, slides)
    : updateIndexes(0, slides);

export const goToPrev = (slides: TPortfolioCards) =>
  currentIndex > 0
    ? updateIndexes(currentIndex - 1, slides)
    : updateIndexes(slides.length - 1, slides);
