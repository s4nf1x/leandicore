const header = document.querySelector('header');

if (header) {
  const toggleScrolledClass = () => {
    if (window.scrollY > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', toggleScrolledClass);
  toggleScrolledClass();
}

document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');

      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();

      const currentPath = window.location.pathname;
      const linkPath = this.pathname;

      if (linkPath !== '' && linkPath !== currentPath) {
        const url = linkPath + targetId;
        window.location.href = url;
      } else {
        const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
        const windowHeight = window.innerHeight;
        const elementHeight = targetElement.offsetHeight;

        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - (windowHeight / 2) + (elementHeight / 2);

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        history.pushState(null, null, targetId);
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      if (href === '#') return;

      const targetElement = document.querySelector(href);

      if (targetElement) {
        e.preventDefault();

        const offset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const menuItems = document.querySelectorAll('.menu-item-has-children');

  function setupAccordion() {
    const isMobile = window.innerWidth < 1024;

    menuItems.forEach(item => {
      const subMenu = item.querySelector('.sub-menu');
      item.classList.remove('accordion-active');
      if (subMenu) {
        subMenu.style.overflow = 'hidden';
        subMenu.style.transition = 'max-height 0.3s ease';
        if (isMobile) {
          subMenu.style.maxHeight = '0';
        } else {
          subMenu.style.cssText = '';
        }
      }
    });
  }

  function handleLinkClick(e) {
    const link = e.currentTarget;
    const item = link.closest('.menu-item-has-children');
    const subMenu = item.querySelector('.sub-menu');
    const isMobile = window.innerWidth < 1024;
    const href = link.getAttribute('href');

    if (!subMenu || !isMobile) return;

    const wasActive = item.classList.contains('accordion-active');

    if (wasActive) {
      if (href && href !== '#') {
        window.location.href = href;
      }
    } else {
      e.preventDefault();

      menuItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('accordion-active');
          const otherSub = other.querySelector('.sub-menu');
          if (otherSub) otherSub.style.maxHeight = '0';
        }
      });

      item.classList.add('accordion-active');
      subMenu.style.maxHeight = subMenu.scrollHeight + 'px';
    }
  }

  setupAccordion();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setupAccordion, 250);
  });

  menuItems.forEach(item => {
    const link = item.querySelector('a');
    if (link) {
      link.removeEventListener('click', handleLinkClick);
      link.addEventListener('click', handleLinkClick);
    }
  });

  document.addEventListener('click', function(e) {
    const isMobile = window.innerWidth < 1024;
    if (!isMobile) return;

    const isClickInsideMenu = e.target.closest('.main-menu');

    if (!isClickInsideMenu) {
      menuItems.forEach(item => {
        item.classList.remove('accordion-active');
        const subMenu = item.querySelector('.sub-menu');
        if (subMenu) {
          subMenu.style.maxHeight = '0';
        }
      });
    }
  });

  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const closeMenuButton = document.querySelector('.close-menu-button');
  const headerNav = document.querySelector('.header-nav');

  function isMobileView() {
    return window.innerWidth <= 1024;
  }

  function openMenu() {
    if (isMobileView()) {
      headerNav.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu() {
    headerNav.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', openMenu);
  }

  if (closeMenuButton) {
    closeMenuButton.addEventListener('click', closeMenu);
  }

  const menuLinks = document.querySelectorAll('.main-menu a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (isMobileView()) {
        const parentItem = link.closest('.menu-item-has-children');
        const isActive = parentItem && parentItem.classList.contains('accordion-active');

        if (!parentItem || !isActive) {
          closeMenu();
        }
      }
    });
  });

  window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
      closeMenu();
    }
  });
});
function checkVisibility() {
  const blocks = document.querySelectorAll('.animate-block');

  blocks.forEach(block => {
    if (block.hasAttribute('data-animated')) {
      return;
    }

    const rect = block.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const isInFooter = block.closest('footer');
    const offset = (isInFooter || window.innerWidth < 768) ? 0 : 0;

    const isVisible = rect.top <= windowHeight - offset && rect.bottom >= 0;

    if (isVisible) {
      const delay = block.getAttribute('data-delay') || 0;
      setTimeout(() => {
        block.classList.add('animated');
        block.setAttribute('data-animated', 'true');
      }, parseInt(delay));
    }
  });
}

function checkAllBlocks() {
  const blocks = document.querySelectorAll('.animate-block');

  blocks.forEach(block => {
    if (block.hasAttribute('data-animated')) {
      return;
    }

    const rect = block.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const isInFooter = block.closest('footer');
    const offset = (isInFooter || window.innerWidth < 768) ? 0 : 0;

    if (rect.top <= windowHeight - offset && rect.bottom >= 0) {
      const delay = block.getAttribute('data-delay') || 0;
      setTimeout(() => {
        block.classList.add('animated');
        block.setAttribute('data-animated', 'true');
      }, parseInt(delay));
    }
  });
}

window.addEventListener('load', function() {
  checkVisibility();
  setTimeout(checkAllBlocks, 500);
});

window.addEventListener('scroll', checkVisibility);

window.addEventListener('resize', function() {
  setTimeout(checkAllBlocks, 100);
});

document.addEventListener('DOMContentLoaded', function() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  if (accordionItems) {
    accordionItems.forEach(item => {
      const trigger = item.querySelector('.accordion-item-header');
      const content = item.querySelector('.accordion-item-content');

      trigger.addEventListener('click', function() {
        const parent = this.parentNode;

        if (parent.classList.contains('active')) {
          parent.classList.remove('active');
          content.style.height = '0';
        } else {
          document.querySelectorAll('.accordion-item').forEach(child => {
            child.classList.remove('active');
            child.querySelector('.accordion-item-content').style.height = '0';
          });
          parent.classList.add('active');
          content.style.height = content.scrollHeight + 'px';
        }
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const footerElements = document.querySelectorAll('.footer-copy p');
  const currentYear = new Date().getFullYear();

  footerElements.forEach(element => {
    element.innerHTML = `© LeanDI-Core, ${currentYear}`;
  });
});
