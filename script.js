// Disable scroll restoration (must be before anything loads)
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Force top on hard reload
window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};

// Animate skill bars
const animateSkillBars = () => {
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  skillBars.forEach(bar => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          bar.style.transition = 'width 1.5s ease';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(bar);
  });
};

// On load scroll top + start animation
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  animateSkillBars();
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Smooth scrolling for nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });

      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
    }
  });
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Toggle Projects Section
function toggleProjects() {
  const more = document.getElementById('more-projects');
  const btn = document.getElementById('toggleProjectsBtn');
  const sectionTop = document.getElementById('projects');

  if (more && btn && sectionTop) {
    if (more.classList.contains('hidden')) {
      more.classList.remove('hidden');
      btn.textContent = 'Show Less';
      more.scrollIntoView({ behavior: 'smooth' });
    } else {
      more.classList.add('hidden');
      btn.textContent = 'View All Projects';
      sectionTop.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// Certificate Modal
function openCertificateModal(imageSrc) {
  const modal = document.getElementById('certificateModal');
  const modalContent = document.getElementById('certificateModalContent');
  const image = document.getElementById('certificateImage');

  if (modal && modalContent && image) {
    image.src = imageSrc;
    modal.classList.remove('hidden');
    requestAnimationFrame(() => {
      modal.classList.remove('opacity-0');
      modalContent.classList.remove('scale-95');
      modalContent.classList.add('scale-100');
    });
  }
}

function closeCertificateModal() {
  const modal = document.getElementById('certificateModal');
  const modalContent = document.getElementById('certificateModalContent');

  if (modal && modalContent) {
    modal.classList.add('opacity-0');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');

    setTimeout(() => {
      modal.classList.add('hidden');
    }, 300);
  }
}

// 🔔 Toast Notification
function showToast(message, success = true) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = `
    fixed top-[20%] right-6 px-4 py-2 rounded-xl shadow-lg text-sm font-medium
    z-[9999] transition-opacity duration-300
    ${success ? 'bg-black text-white' : 'bg-red-600 text-white'}
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('opacity-0');
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// ✉️ EmailJS Contact Form
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      emailjs.sendForm("service_ww1xb6i", "template_4xof8ho", this)
        .then(() => {
          showToast("✅ Message sent successfully!");
          form.reset();
        }, (error) => {
          showToast("❌ Failed to send message. Please try again.", false);
          console.error(error);
        });
    });
  }
});

// Footer intersection observer for back-to-top button
const footerTrigger = document.getElementById("footer-trigger");

if (footerTrigger && backToTopButton) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        backToTopButton.classList.add("bg-white", "text-black");
        backToTopButton.classList.remove("bg-black", "text-white");
      } else {
        backToTopButton.classList.add("bg-black", "text-white");
        backToTopButton.classList.remove("bg-white", "text-black");
      }
    },
    { threshold: 0.1 }
  );
  observer.observe(footerTrigger);
}

// 🌓 Theme Toggle (Desktop + Mobile)
const html = document.documentElement;
const toggleBtns = [document.getElementById("themeToggle"), document.getElementById("themeToggleMobile")];

function setIcon(isDark) {
  toggleBtns.forEach(btn => {
    if (btn) {
      btn.innerHTML = isDark
        ? '<img src="sun.png" alt="Light mode" class="w-5 h-5">'
        : '<i class="fas fa-moon text-lg"></i>';
    }
  });
}

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialDark = savedTheme === "dark" || (!savedTheme && prefersDark);

if (initialDark) {
  html.classList.add("dark");
  setIcon(true);
} else {
  html.classList.remove("dark");
  setIcon(false);
}

toggleBtns.forEach(btn => {
  if (btn) {
    btn.addEventListener("click", () => {
      const isDark = html.classList.toggle("dark");
      setIcon(isDark);
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }
});
