/**
 * ========================================
 * SCRIPT.JS - New Vision School
 * ========================================
 * This file contains the logic for:
 * 1. Notice Board updates
 * 2. Student Result search
 * 3. Gallery image loading
 * 4. Form submissions
 */

// --- 1. NOTICES DATA ---
// Edit this array to add or remove notices
const notices = [
    {
        title: "Admissions Open 2026-27",
        date: "March 15, 2026",
        description: "We are happy to announce that admissions for the academic year 2026-27 are now open from Nursery to Class X."
    },
    {
        title: "Summer Vacation Announcement",
        date: "April 10, 2026",
        description: "The school will remain closed for summer break from May 1st to June 10th. Enjoy your holidays!"
    },
    {
        title: "Annual Sports Day",
        date: "February 20, 2026",
        description: "Congratulations to all the winners of the Annual Sports Day held last week. Photos are uploaded in the gallery."
    }
];

// --- 2. STUDENT RESULTS DATA ---
// Edit this object to add student results
// Key is the Roll Number, Value is the student data
const results = {
    "101": { name: "Rahul Kumar", math: 92, science: 88, english: 85, total: 265 },
    "102": { name: "Priya Sharma", math: 78, science: 82, english: 90, total: 250 },
    "103": { name: "Anil Reddy", math: 95, science: 94, english: 88, total: 277 },
    "104": { name: "Sneha Lata", math: 85, science: 80, english: 82, total: 247 }
};

// --- 3. GALLERY IMAGES DATA ---
// Add your image paths here. 
// Note: Ensure images are placed in the 'images/' folder.
// Images stored locally in images folder
const galleryImages = [
    { src: "images/imagesschool-building.jpg", alt: "School Building" },
    { src: "images/classroom.png", alt: "Classroom" },
    { src: "images/lab.png", alt: "Science Lab" },
    { src: "images/library.jpg", alt: "Library" },
    { src: "images/Sports.png", alt: "Sports Event" },
    { src: "images/students.png", alt: "Students Playing" }
];

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    loadNotices();
    loadGallery();
    setupForms();
    setupNavigation();
});

// --- LOAD NOTICES ---
function loadNotices() {
    const noticeContainer = document.getElementById('notice-list');
    if (!noticeContainer) return;

    noticeContainer.innerHTML = ''; // Clear existing

    notices.forEach(notice => {
        const noticeElement = document.createElement('div');
        noticeElement.className = 'notice-item';
        noticeElement.innerHTML = `
            <h3>${notice.title}</h3>
            <p class="notice-date">${notice.date}</p>
            <p>${notice.description}</p>
        `;
        noticeContainer.appendChild(noticeElement);
    });
}

// --- LOAD GALLERY ---
function loadGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;

    galleryGrid.innerHTML = ''; // Clear existing

    galleryImages.forEach(image => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `<img src="${image.src}" alt="${image.alt}" loading="lazy">`;
        galleryGrid.appendChild(item);
    });
}

// --- SEARCH RESULTS ---
function searchResult() {
    const rollNo = document.getElementById('roll-number').value.trim();
    const display = document.getElementById('result-display');
    
    if (!rollNo) {
        alert("Please enter a roll number.");
        return;
    }

    const student = results[rollNo];

    if (student) {
        display.style.display = 'block';
        display.innerHTML = `
            <h3>Result for ${student.name}</h3>
            <table class="result-table">
                <tr><th>Subject</th><th>Marks</th></tr>
                <tr><td>Mathematics</td><td>${student.math}</td></tr>
                <tr><td>Science</td><td>${student.science}</td></tr>
                <tr><td>English</td><td>${student.english}</td></tr>
                <tr style="font-weight: bold; background: #fff;"><td>Total</td><td>${student.total}</td></tr>
            </table>
        `;
    } else {
        display.style.display = 'block';
        display.innerHTML = `<p style="color: red; text-align: center;">No result found for Roll Number: ${rollNo}</p>`;
    }
}

// --- FORM SUBMISSIONS ---
function setupForms() {
    // Admission Form
    const admissionForm = document.getElementById('admission-form');
    if (admissionForm) {
        admissionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = document.getElementById('admission-message');
            message.style.display = 'block';
            message.className = 'success';
            message.innerText = "Your admission request has been submitted successfully. Our team will contact you soon.";
            admissionForm.reset();
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = document.getElementById('contact-message');
            message.style.display = 'block';
            message.className = 'success';
            message.innerText = "Thank you for contacting us. We will get back to you shortly.";
            contactForm.reset();
        });
    }
}

// --- NAVIGATION LOGIC ---
function setupNavigation() {
    const links = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    // Smooth scrolling for navigation
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);
            if (targetId) {
                e.preventDefault();
                const targetSection = document.getElementById(targetId);
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active link
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Highlight active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}
