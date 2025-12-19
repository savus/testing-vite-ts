import { portfolioCards } from "./index.ts";

const dataSlide = "[data-slide]";
const sliderClass = "carousel-btns";
const carouselSlider = document.querySelector(`.${sliderClass}`)!;

let currentIndex = 0;
let prevIndex = 0;
let nextIndex = 0;

export const clearSlides = () =>
  portfolioCards.forEach((slide) =>
    slide.classList.remove("active", "prev", "next")
  );

export const updateIndexes = (num: number) => {
  currentIndex = num;
  prevIndex = currentIndex > 0 ? currentIndex - 1 : portfolioCards.length - 1;
  nextIndex = currentIndex < portfolioCards.length - 1 ? currentIndex + 1 : 0;
  clearSlides();
  portfolioCards[prevIndex].classList.add("prev");
  portfolioCards[currentIndex].classList.add("active");
  portfolioCards[nextIndex].classList.add("next");
};

export const initCurrentIndex = () => {
  const randomNum = Math.floor(Math.random() * portfolioCards.length);
  updateIndexes(randomNum);
};

export const goToNext = () =>
  currentIndex < portfolioCards.length - 1
    ? updateIndexes(currentIndex + 1)
    : updateIndexes(0);

export const goToPrev = () =>
  currentIndex > 0
    ? updateIndexes(currentIndex - 1)
    : updateIndexes(portfolioCards.length - 1);

carouselSlider.addEventListener("click", (e: Event) => {
  const button = e.target as HTMLButtonElement;
  const isSliderBtn = button.matches(dataSlide);
  if (isSliderBtn) button.dataset.slide === "prev" ? goToPrev() : goToNext();
});
