// Initialize AOS
AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: true, // only animate once
});



/*toggle button functionality*/
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', ()=> {
    menuToggle.classList.toggle('active'); 
    navLinks.classList.toggle('show');
});

document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        menuToggle.classList.remove('active');
    });
});


/*left and right side animation effect*/
const texts = ["Frontend Developer"];
let count = 0, index = 0;
const typingSpeed = 150; //ms per letter
const pause = 1500; //ms before next word

function type() {
    const textE1 = document.querySelector('.typing-text');
    const currentText = texts[count];
    textE1.textContent = currentText.slice(0, index++);
    if(index>currentText.length) {
        index = 0;
        count = (count + 1) % texts.length;
        setTimeout(type, pause);
    } else {
        setTimeout(type, typingSpeed);
    }
}
type();


/*Reume download functionality*/ 
document.getElementById("resume-btn").addEventListener("click", function(e) {
    e.preventDefault();
    if(confirm("your resume is ready to download.\nTap Ok to continue.")) {
        window.open(this.href, "_blank0");
    }
});

// Smooth scroll + nav link highlight
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Highlight active nav link
      document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
      this.classList.add('active');
    }
  });
});

// Intersection Observer for fade-in/fade-out
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active'); // fade in
    } else {
      entry.target.classList.remove('active'); // fade out when leaving view
    }
  });
}, { threshold: 0.3 }); // triggers when 30% visible

// Observe all sections
document.querySelectorAll('.section-animate').forEach(section => {
  observer.observe(section);
});


/*skill functionality */

// Select all skill pies
const skillPies = document.querySelectorAll(".skill-pie");

// Create % element for each pie
skillPies.forEach(pie => {
  const percentText = document.createElement("div");
  percentText.classList.add("skill-percent");
  percentText.textContent = "0%";
  pie.appendChild(percentText);
});


// Animate charts
function animatePieCharts() {
  skillPies.forEach(pie => {
    const percent = +pie.dataset.percent;
    const color = pie.dataset.color;
    const text = pie.querySelector(".skill-percent");
    let current = 0;

    // Reset before animation
    text.textContent = "0%";
    pie.style.background = `conic-gradient(#222 0deg, #222 360deg)`;

    const interval = setInterval(() => {
      if (current >= percent) {
        clearInterval(interval);
      } else {
        current++;
        text.textContent = `${current}%`;
        pie.style.background = `conic-gradient(${color} ${current * 3.6}deg, #222 ${current * 3.6}deg)`;
        pie.style.boxShadow = `0 0 20px ${color}55, 0 0 35px ${color}22`;
        text.style.color = color;
      }
    }, 15);
  });
}

// Check if section visible
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top < window.innerHeight - 100 &&
    rect.bottom > 100
  );
}

// Re-animate every time section visible
let lastVisible = false;

window.addEventListener("scroll", () => {
  const section = document.querySelector(".skills");
  const visible = isInViewport(section);

  if (visible && !lastVisible) {
    animatePieCharts();  // play when entering
    lastVisible = true;
  } else if (!visible && lastVisible) {
    lastVisible = false; // reset when leaving
  }
}); 

/*for eduaction section functionality*/
// AOS initialization with repeat animation
AOS.init({
  duration: 1000,
  once: false, // allows re-triggering on scroll
});

// Re-trigger animation on nav link click (smooth repeat)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: "smooth"
      });
      // Restart AOS animations
      setTimeout(() => {
        AOS.refreshHard();
      }, 800);
    }
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});



/*contact form functionality*/
document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault(); // stop the form from reloading the page

  // Get form data
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const formMsg = document.getElementById("formMsg");

  // Show loading text
  formMsg.textContent = "Sending message...";
  formMsg.style.color = "#00bfff";

  // Send using EmailJS
  emailjs.send("service_po29t6b", "template_xq3r0jd", {
    name: name,
    email: email,
    message: message
  })
  .then(function(response) {
    console.log("SUCCESS!", response.status, response.text);
    formMsg.textContent = `✅ Message sent successfully by {name} (${email})!`;
    formMsg.style.color = "#00ffcc";

    // Clear form
    document.getElementById("contactForm").reset();
  }, function(error) {
    console.error("FAILED...", error);
    formMsg.textContent = "❌ Failed to send message. Please try again.";
    formMsg.style.color = "#ff4d4d";
  });
});





