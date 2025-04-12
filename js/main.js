// Get the button element
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Show or hide the button based on scroll position
window.addEventListener('scroll', () => {
	if (window.scrollY > 300) {
		// Show button if scrolled more than 300px
		scrollToTopBtn.classList.add('show');
	} else {
		scrollToTopBtn.classList.remove('show');
	}
});

// Scroll to the top of the page when the button is clicked
scrollToTopBtn.addEventListener('click', () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* Quick Contact */
// Get elements
const quickContactBtn = document.getElementById('quickContactBtn');
const popupForm = document.getElementById('popupForm');
const closePopup = document.getElementById('closePopup');

// Show popup form
quickContactBtn.addEventListener('click', () => {
	popupForm.classList.add('show');
});

// Close popup form
closePopup.addEventListener('click', () => {
	popupForm.classList.remove('show');
});

// Close popup form when clicking outside
window.addEventListener('click', (event) => {
	if (event.target === popupForm) {
		popupForm.classList.remove('show');
	}
});

/* Dark Theme */
// Get the theme toggle button and current theme
const themeToggleBtn = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme');

// Apply the saved theme
if (currentTheme) {
	document.body.classList.add(currentTheme);
}

// Toggle theme on button click
themeToggleBtn.addEventListener('click', () => {
	if (document.body.classList.contains('dark-mode')) {
		document.body.classList.remove('dark-mode');
		localStorage.setItem('theme', 'light-mode');
	} else {
		document.body.classList.add('dark-mode');
		localStorage.setItem('theme', 'dark-mode');
	}
});

// Function to hide the loader and show the content
function hideLoader() {
	const loader = document.getElementById('loader');
	const content = document.getElementById('content');

	// Added Null Checks
	if (loader) {
		loader.style.display = 'none';
	}
	if (content) {
		content.classList.remove('hidden');
	}
	/* loader.style.display = 'none';
	content.classList.remove('hidden'); */
}

// Hide the loader and show the content after 1 second (simulate loading time)
window.addEventListener('load', () => {
	setTimeout(hideLoader, 1000);
});


// Scroll animation for steps
document.addEventListener('DOMContentLoaded', function () {
	const steps = document.querySelectorAll('.step');

	function checkScroll() {
		steps.forEach((step) => {
			const stepPosition = step.getBoundingClientRect().top;
			const windowHeight = window.innerHeight;

			if (stepPosition < windowHeight - 100) {
				step.classList.add('step-active');
			}
		});
	}

	// Trigger scroll animation on page load and scroll
	window.addEventListener('scroll', checkScroll);
	checkScroll();
});

/* Menu Toggle */
document.addEventListener('DOMContentLoaded', () => {
	const mobileMenuToggle = document.querySelector('.mobile-menu');
	const nav = document.querySelector('.nav');

	// Toggle the mobile menu visibility
	mobileMenuToggle.addEventListener('click', () => {
		nav.classList.toggle('open');
		mobileMenuToggle.classList.toggle('open');
	});

	// Handle dropdown submenu behavior
	nav.querySelectorAll('.nav__dropdown').forEach((dropdown) => {
		const link = dropdown.querySelector('.nav__link');
		link.addEventListener('click', (e) => {
			e.preventDefault(); // Prevent the default link behavior
			dropdown.classList.toggle('active');
		});
	});

	// Close mobile menu when a link is clicked (without a dropdown)
	nav.querySelectorAll('.nav__link').forEach((link) => {
		link.addEventListener('click', () => {
			if (!link.closest('.nav__dropdown')) {
				nav.classList.remove('open');
				mobileMenuToggle.classList.remove('open');
			}
		});
	});
});


/* JavaScript Email Validation (Optional) */
document
	.getElementById('contactForm')
	.addEventListener('submit', function (event) {
		var emailField = document.getElementById('email');
		var email = emailField.value;
		//var emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

		if (!emailPattern.test(email)) {
			alert('Please enter a valid email address.');
			event.preventDefault(); // Prevent the form from submitting
		}
	});