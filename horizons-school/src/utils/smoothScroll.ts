// Smooth scroll to an element by ID
export const scrollToId = (id: string, offset = 80) => {
  const element = document.getElementById(id);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Smooth scroll to the top of the page
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};

// Add smooth scrolling to all anchor links
export const initSmoothScrolling = () => {
  // Handle clicks on anchor links
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a[href^="#"]') as HTMLAnchorElement;
    
    if (link) {
      const href = link.getAttribute('href');
      
      // Only handle internal anchor links (not external links or # links)
      if (href && href !== '#' && href.startsWith('#')) {
        e.preventDefault();
        const id = href.substring(1);
        scrollToId(id);
      }
    }
  });

  // Handle browser back/forward navigation
  window.addEventListener('popstate', () => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      scrollToId(id);
    } else {
      scrollToTop();
    }
  });
};
