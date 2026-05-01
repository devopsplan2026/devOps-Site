import React from 'react';

/**
 * Throttle function - limits how often a function can be called
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time in milliseconds between calls
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Debounce function - delays function execution until after delay has elapsed
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Intersection Observer hook for lazy loading
 * @param {React.RefObject} ref - Reference to element to observe
 * @param {object} options - Intersection Observer options
 * @returns {boolean} Whether element is visible
 */
export function useIntersectionObserver(ref, options = {}) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1,
      ...options
    });



  return isVisible;
}
