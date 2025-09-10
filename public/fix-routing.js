// Fix for Next.js static export client-side routing
(function() {
  'use strict';
  
  // Wait for DOM to be ready
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }
  
  // Fix client-side routing for static export
  function fixClientSideRouting() {
    // Find all links that should be handled by Next.js router
    const links = document.querySelectorAll('a[href^="/"]');
    
    links.forEach(link => {
      // Skip external links and special links
      if (link.href.startsWith('http') || 
          link.href.includes('mailto:') || 
          link.href.includes('tel:') ||
          link.target === '_blank' ||
          link.hasAttribute('download')) {
        return;
      }
      
      // Add click handler for client-side routing
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        if (href && href !== window.location.pathname) {
          // Use browser history API for navigation
          window.history.pushState({}, '', href);
          
          // Dispatch a popstate event to trigger Next.js router
          window.dispatchEvent(new PopStateEvent('popstate', {
            state: {},
            url: href
          }));
          
          // Scroll to top
          window.scrollTo(0, 0);
        }
      });
    });
  }
  
  // Initialize when DOM is ready
  ready(fixClientSideRouting);
  
  // Re-run when new content is added (for dynamic content)
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        setTimeout(fixClientSideRouting, 100);
      }
    });
  });
  
  ready(function() {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
})();
