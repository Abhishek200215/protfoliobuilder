// Initialize with default items
window.onload = function() {
  // Add first items if containers are empty
  if (document.querySelectorAll('#services-container .array-item').length === 0) addService();
  if (document.querySelectorAll('#projects-container .array-item').length === 0) addProject();
  if (document.querySelectorAll('#experience-container .array-item').length === 0) addExperience();
  if (document.querySelectorAll('#education-container .array-item').length === 0) addEducation();
  if (document.querySelectorAll('#testimonials-container .array-item').length === 0) addTestimonial();
  
  // Load from local storage if available
  if (localStorage.getItem('portfolioBuilderData')) {
    loadFromLocalStorage();
  }
};

// Add dynamic form fields
function addService() {
  const container = document.querySelector('#services-container .form-array');
  const div = document.createElement('div');
  div.className = 'array-item';
  div.innerHTML = `
    <button class="remove-btn" onclick="removeItem(this, 'services')"><i class="fas fa-times"></i></button>
    <label>Service Title</label>
    <input type="text" class="service-title" placeholder="Web Development">
    
    <label>Description</label>
    <textarea class="service-desc" placeholder="I create beautiful, responsive websites"></textarea>
    
    <label>Icon (Font Awesome class)</label>
    <input type="text" class="service-icon" placeholder="fas fa-code">
  `;
  container.appendChild(div);
}

function addProject() {
  const container = document.querySelector('#projects-container .form-array');
  const div = document.createElement('div');
  div.className = 'array-item';
  div.innerHTML = `
    <button class="remove-btn" onclick="removeItem(this, 'projects')"><i class="fas fa-times"></i></button>
    <label>Project Name</label>
    <input type="text" class="project-name" placeholder="E-commerce Website">
    
    <label>Description</label>
    <textarea class="project-desc" placeholder="A fully responsive online store"></textarea>
    
    <label>Tags (comma separated)</label>
    <input type="text" class="project-tags" placeholder="React, Node.js, MongoDB">
    
    <label>Image URL</label>
    <input type="text" class="project-image" placeholder="https://example.com/project.jpg">
    
    <label>Live URL (optional)</label>
    <input type="text" class="project-url" placeholder="https://example.com">
  `;
  container.appendChild(div);
}

function addExperience() {
  const container = document.querySelector('#experience-container .form-array');
  const div = document.createElement('div');
  div.className = 'array-item';
  div.innerHTML = `
    <button class="remove-btn" onclick="removeItem(this, 'experience')"><i class="fas fa-times"></i></button>
    <label>Job Title</label>
    <input type="text" class="exp-title" placeholder="Frontend Developer">
    
    <label>Company</label>
    <input type="text" class="exp-company" placeholder="Tech Corp">
    
    <label>Duration</label>
    <input type="text" class="exp-duration" placeholder="Jan 2020 - Present">
    
    <label>Description</label>
    <textarea class="exp-desc" placeholder="Developed web applications using React..."></textarea>
  `;
  container.appendChild(div);
}

function addEducation() {
  const container = document.querySelector('#education-container .form-array');
  const div = document.createElement('div');
  div.className = 'array-item';
  div.innerHTML = `
    <button class="remove-btn" onclick="removeItem(this, 'education')"><i class="fas fa-times"></i></button>
    <label>Degree</label>
    <input type="text" class="edu-degree" placeholder="B.Sc Computer Science">
    
    <label>Institution</label>
    <input type="text" class="edu-institution" placeholder="State University">
    
    <label>Year</label>
    <input type="text" class="edu-year" placeholder="2016-2020">
  `;
  container.appendChild(div);
}

function addTestimonial() {
  const container = document.querySelector('#testimonials-container .form-array');
  const div = document.createElement('div');
  div.className = 'array-item';
  div.innerHTML = `
    <button class="remove-btn" onclick="removeItem(this, 'testimonials')"><i class="fas fa-times"></i></button>
    <label>Client Name</label>
    <input type="text" class="testimonial-name" placeholder="John Smith">
    
    <label>Client Position</label>
    <input type="text" class="testimonial-position" placeholder="CEO, ABC Company">
    
    <label>Client Image URL</label>
    <input type="text" class="testimonial-image" placeholder="https://example.com/client.jpg">
    
    <label>Testimonial Content</label>
    <textarea class="testimonial-content" placeholder="Great work! Professional and delivered on time."></textarea>
  `;
  container.appendChild(div);
}

function removeItem(btn, type) {
  const container = document.querySelector(`#${type}-container .form-array`);
  const item = btn.closest('.array-item');
  if (container.children.length > 1) {
    item.remove();
    showToast(`${type.slice(0, -1)} removed`);
  } else {
    showToast(`You need to have at least one ${type.slice(0, -1)} item`, 'error');
  }
}

// Show toast notification
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Save data to local storage
function saveToLocalStorage() {
  const data = {
    // Basic Info
    name: document.getElementById('name').value,
    title: document.getElementById('title').value,
    bio: document.getElementById('bio').value,
    profileImage: document.getElementById('profileImage').value,
    logo: document.getElementById('logo').value,
    themeColor: document.getElementById('themeColor').value,
    
    // Skills
    skills: document.getElementById('skills').value,
    
    // Services
    services: Array.from(document.querySelectorAll('#services-container .array-item')).map(item => ({
      title: item.querySelector('.service-title').value,
      desc: item.querySelector('.service-desc').value,
      icon: item.querySelector('.service-icon').value
    })),
    
    // Projects
    projects: Array.from(document.querySelectorAll('#projects-container .array-item')).map(item => ({
      name: item.querySelector('.project-name').value,
      desc: item.querySelector('.project-desc').value,
      tags: item.querySelector('.project-tags').value,
      image: item.querySelector('.project-image').value,
      url: item.querySelector('.project-url').value
    })),
    
    // Experience
    experience: Array.from(document.querySelectorAll('#experience-container .array-item')).map(item => ({
      title: item.querySelector('.exp-title').value,
      company: item.querySelector('.exp-company').value,
      duration: item.querySelector('.exp-duration').value,
      desc: item.querySelector('.exp-desc').value
    })),
    
    // Education
    education: Array.from(document.querySelectorAll('#education-container .array-item')).map(item => ({
      degree: item.querySelector('.edu-degree').value,
      institution: item.querySelector('.edu-institution').value,
      year: item.querySelector('.edu-year').value
    })),
    
    // Testimonials
    testimonials: Array.from(document.querySelectorAll('#testimonials-container .array-item')).map(item => ({
      name: item.querySelector('.testimonial-name').value,
      position: item.querySelector('.testimonial-position').value,
      image: item.querySelector('.testimonial-image').value,
      content: item.querySelector('.testimonial-content').value
    })),
    
    // Contact
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    address: document.getElementById('address').value,
    social: document.getElementById('social').value
  };
  
  localStorage.setItem('portfolioBuilderData', JSON.stringify(data));
  showToast('Progress saved successfully!');
}

// Load data from local storage
function loadFromLocalStorage() {
  const savedData = localStorage.getItem('portfolioBuilderData');
  if (!savedData) {
    showToast('No saved data found', 'error');
    return;
  }
  
  const data = JSON.parse(savedData);
  
  // Basic Info
  document.getElementById('name').value = data.name || '';
  document.getElementById('title').value = data.title || '';
  document.getElementById('bio').value = data.bio || '';
  document.getElementById('profileImage').value = data.profileImage || '';
  document.getElementById('logo').value = data.logo || '';
  document.getElementById('themeColor').value = data.themeColor || '#3b82f6';
  
  // Skills
  document.getElementById('skills').value = data.skills || '';
  
  // Clear existing items
  ['services', 'projects', 'experience', 'education', 'testimonials'].forEach(type => {
    const container = document.querySelector(`#${type}-container .form-array`);
    container.innerHTML = '';
  });
  
  // Services
  if (data.services && data.services.length > 0) {
    data.services.forEach(service => {
      addService();
      const container = document.querySelector('#services-container .form-array');
      const lastItem = container.lastElementChild;
      lastItem.querySelector('.service-title').value = service.title || '';
      lastItem.querySelector('.service-desc').value = service.desc || '';
      lastItem.querySelector('.service-icon').value = service.icon || '';
    });
  } else {
    addService();
  }
  
  // Projects
  if (data.projects && data.projects.length > 0) {
    data.projects.forEach(project => {
      addProject();
      const container = document.querySelector('#projects-container .form-array');
      const lastItem = container.lastElementChild;
      lastItem.querySelector('.project-name').value = project.name || '';
      lastItem.querySelector('.project-desc').value = project.desc || '';
      lastItem.querySelector('.project-tags').value = project.tags || '';
      lastItem.querySelector('.project-image').value = project.image || '';
      lastItem.querySelector('.project-url').value = project.url || '';
    });
  } else {
    addProject();
  }
  
  // Experience
  if (data.experience && data.experience.length > 0) {
    data.experience.forEach(exp => {
      addExperience();
      const container = document.querySelector('#experience-container .form-array');
      const lastItem = container.lastElementChild;
      lastItem.querySelector('.exp-title').value = exp.title || '';
      lastItem.querySelector('.exp-company').value = exp.company || '';
      lastItem.querySelector('.exp-duration').value = exp.duration || '';
      lastItem.querySelector('.exp-desc').value = exp.desc || '';
    });
  } else {
    addExperience();
  }
  
  // Education
  if (data.education && data.education.length > 0) {
    data.education.forEach(edu => {
      addEducation();
      const container = document.querySelector('#education-container .form-array');
      const lastItem = container.lastElementChild;
      lastItem.querySelector('.edu-degree').value = edu.degree || '';
      lastItem.querySelector('.edu-institution').value = edu.institution || '';
      lastItem.querySelector('.edu-year').value = edu.year || '';
    });
  } else {
    addEducation();
  }
  
  // Testimonials
  if (data.testimonials && data.testimonials.length > 0) {
    data.testimonials.forEach(testimonial => {
      addTestimonial();
      const container = document.querySelector('#testimonials-container .form-array');
      const lastItem = container.lastElementChild;
      lastItem.querySelector('.testimonial-name').value = testimonial.name || '';
      lastItem.querySelector('.testimonial-position').value = testimonial.position || '';
      lastItem.querySelector('.testimonial-image').value = testimonial.image || '';
      lastItem.querySelector('.testimonial-content').value = testimonial.content || '';
    });
  } else {
    addTestimonial();
  }
  
  // Contact
  document.getElementById('email').value = data.email || '';
  document.getElementById('phone').value = data.phone || '';
  document.getElementById('address').value = data.address || '';
  document.getElementById('social').value = data.social || '';
  
  showToast('Saved data loaded successfully!');
}

// Generate portfolio preview
function generatePortfolio() {
  // Basic Info
  const name = document.getElementById('name').value || 'Your Name';
  const title = document.getElementById('title').value || 'Your Profession';
  const bio = document.getElementById('bio').value || 'A brief introduction about yourself';
  const profileImage = document.getElementById('profileImage').value || 'https://via.placeholder.com/400x400';
  const logo = document.getElementById('logo').value;
  const themeColor = document.getElementById('themeColor').value || '#3b82f6';
  
  // Convert hex color to RGB for CSS variables
  const hexToRgb = hex => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };
  
  const rgbColor = hexToRgb(themeColor);
  const darkerColor = `rgba(${rgbColor}, 0.8)`;
  
  // Skills
  const skills = document.getElementById('skills').value.split(',').map(s => s.trim()).filter(s => s) || ['HTML', 'CSS', 'JavaScript'];
  
  // Services
  const services = [];
  document.querySelectorAll('#services-container .array-item').forEach(item => {
    services.push({
      title: item.querySelector('.service-title').value || 'Service Title',
      desc: item.querySelector('.service-desc').value || 'Service description',
      icon: item.querySelector('.service-icon').value || 'fas fa-code'
    });
  });
  
  // Projects
  const projects = [];
  document.querySelectorAll('#projects-container .array-item').forEach(item => {
    projects.push({
      name: item.querySelector('.project-name').value || 'Project Name',
      desc: item.querySelector('.project-desc').value || 'Project description',
      tags: item.querySelector('.project-tags').value.split(',').map(t => t.trim()).filter(t => t) || ['Tag1', 'Tag2'],
      image: item.querySelector('.project-image').value || 'https://via.placeholder.com/600x400',
      url: item.querySelector('.project-url').value || '#'
    });
  });
  
  // Experience
  const experience = [];
  document.querySelectorAll('#experience-container .array-item').forEach(item => {
    experience.push({
      title: item.querySelector('.exp-title').value || 'Job Title',
      company: item.querySelector('.exp-company').value || 'Company',
      duration: item.querySelector('.exp-duration').value || 'Duration',
      desc: item.querySelector('.exp-desc').value || 'Job description'
    });
  });
  
  // Education
  const education = [];
  document.querySelectorAll('#education-container .array-item').forEach(item => {
    education.push({
      degree: item.querySelector('.edu-degree').value || 'Degree',
      institution: item.querySelector('.edu-institution').value || 'Institution',
      year: item.querySelector('.edu-year').value || 'Year'
    });
  });
  
  // Testimonials
  const testimonials = [];
  document.querySelectorAll('#testimonials-container .array-item').forEach(item => {
    testimonials.push({
      name: item.querySelector('.testimonial-name').value || 'Client Name',
      position: item.querySelector('.testimonial-position').value || 'Client Position',
      image: item.querySelector('.testimonial-image').value || 'https://randomuser.me/api/portraits/men/32.jpg',
      content: item.querySelector('.testimonial-content').value || 'Testimonial content'
    });
  });
  
  // Contact
  const email = document.getElementById('email').value || 'your@email.com';
  const phone = document.getElementById('phone').value || '+1 234 567 890';
  const address = document.getElementById('address').value || 'City, Country';
  const socialLinks = document.getElementById('social').value.split('\n').filter(link => link.trim()) || ['https://linkedin.com', 'https://github.com'];
  
  // Generate HTML
  const portfolioHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} - Portfolio</title>
  <style>
    :root {
      --primary: {{themeColor}};
      --primary-rgb: {{rgbColor}};
      --primary-dark: {{darkerColor}};
      --secondary: #6b7280;
      --light: #f9fafb;
      --dark: #111827;
      --accent: #10b981;
      --text: #374151;
      --text-light: #6b7280;
      --border: #e5e7eb;
    }

    :root {
  --primary: #3b82f6;
  --primary-rgb: 59, 130, 246;
  --primary-dark: rgba(var(--primary-rgb), 0.8);
  --secondary: #64748b;
  --light: #f9fafb;
  --dark: #1e293b;
  --accent: #10b981;
  --text: #334155;
  --text-light: #64748b;
  --border: #e2e8f0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  color: var(--text);
  background-color: var(--light);
  overflow-x: hidden;
}

/* Typography */
h1, h2, h3, h4 {
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--dark);
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }
h4 { font-size: 1.25rem; }

p {
  margin-bottom: 1rem;
  color: var(--text-light);
}

a {
  text-decoration: none;
  color: var(--primary);
  transition: all 0.3s ease;
}

a:hover {
  color: var(--primary-dark);
}

.section-title span {
  color: var(--primary);
}

/* Layout */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

section {
  padding: 5rem 0;
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary);
  color: white;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-outline {
  background-color: transparent;
  border: 1px solid var(--primary);
  color: var(--primary);
}

.btn-outline:hover {
  background-color: var(--primary);
  color: white;
}

/* Header */
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem 0;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: all 0.3s ease;
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo img {
  height: 2.5rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: var(--dark);
  font-weight: 500;
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary);
  transition: width 0.3s ease;
}

.nav-links a:hover::after {
  width: 100%;
}

.hamburger {
  display: none;
  cursor: pointer;
  background: none;
  border: none;
}

.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background-color: var(--dark);
  margin: 5px 0;
  transition: all 0.3s ease;
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 5rem;
  background: linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%);
}

.hero-content {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.hero-text {
  flex: 1;
}

.hero-image {
  flex: 1;
  position: relative;
}

.hero-image img {
  width: 100%;
  max-width: 400px;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  animation: float 6s ease-in-out infinite;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

/* About Section */
.about {
  background-color: white;
}

.about-content {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.about-image {
  flex: 1;
}

.about-image img {
  width: 100%;
  border-radius: 1rem;
}

.about-text {
  flex: 1;
}

/* Skills Section */
.skills {
  background-color: var(--light);
}

.skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.skill {
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease;
}

.skill:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

/* Services Section */
.services {
  background-color: white;
}

.services-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.service {
  background-color: var(--light);
  padding: 2rem;
  border-radius: 1rem;
  transition: all 0.3s ease;
}

.service:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.service-icon {
  font-size: 2.5rem;
  color: var(--primary);
  margin-bottom: 1rem;
}

/* Projects Section */
.projects {
  background-color: var(--light);
}

.projects-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.project {
  background-color: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.project:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.project-image {
  height: 200px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project:hover .project-image img {
  transform: scale(1.1);
}

.project-info {
  padding: 1.5rem;
}

.project-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 1rem 0;
}

.project-tag {
  background-color: var(--light);
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  color: var(--text-light);
}

/* Experience Section */
.experience {
  background-color: white;
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 3rem auto 0;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background-color: var(--border);
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
}

.timeline-item:nth-child(odd) {
  padding-right: calc(50% + 2rem);
  text-align: right;
}

.timeline-item:nth-child(even) {
  padding-left: calc(50% + 2rem);
}

.timeline-dot {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
}

.timeline-content {
  background-color: var(--light);
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

/* Testimonials Section */
.testimonials {
  background-color: var(--light);
}

.testimonials-container {
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding: 1rem 0;
  scroll-snap-type: x mandatory;
}

.testimonial {
  min-width: 300px;
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  scroll-snap-align: start;
}

.testimonial-content {
  margin-bottom: 1rem;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.testimonial-author img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

/* Contact Section */
.contact {
  background-color: white;
}

.contact-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 2rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.contact-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: var(--light);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  font-size: 1.25rem;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  font-family: inherit;
}

.contact-form textarea {
  min-height: 150px;
}

/* Footer */
footer {
  background-color: var(--dark);
  color: white;
  padding: 3rem 0;
  text-align: center;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin: 2rem 0;
}

.social-link {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.social-link:hover {
  background-color: var(--primary);
  transform: translateY(-3px);
}

/* Animations */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 1s ease forwards;
}

/* Responsive Styles */
@media (max-width: 992px) {
  .hero-content,
  .about-content {
    flex-direction: column;
    text-align: center;
  }

  .hero-buttons {
    justify-content: center;
  }

  .timeline::before {
    left: 2rem;
  }

  .timeline-item:nth-child(odd),
  .timeline-item:nth-child(even) {
    padding-left: 5rem;
    padding-right: 2rem;
    text-align: left;
  }

  .timeline-dot {
    left: 2rem;
  }
}

@media (max-width: 768px) {
  .nav-links {
    position: fixed;
    top: 80px;
    left: -100%;
    width: 100%;
    height: calc(100vh - 80px);
    background-color: white;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    transition: all 0.3s ease;
  }

  .nav-links.active {
    left: 0;
  }

  .hamburger {
    display: block;
  }

  .hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .hamburger.active span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }

  section {
    padding: 3rem 0;
  }

  .skills-container,
  .services-container,
  .projects-container {
    grid-template-columns: 1fr;
  }
}


    /* Include all the CSS from style.css here */
    ${document.querySelector('link[href="style.css"]').outerHTML}
  </style>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
</head>
<body>
  <!-- Header -->
  <header id="header">
    <div class="container header-inner">
      <a href="#" class="logo">
        ${logo ? `<img src="${logo}" alt="${name}" height="40">` : `<span>${name.split(' ')[0]}</span>`}
      </a>
      <nav class="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#services">Services</a>
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="#contact">Contact</a>
      </nav>
      <button class="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>

  <!-- Hero Section -->
  <section id="home" class="hero">
    <div class="container">
      <div class="hero-content">
        <div class="hero-text fade-in" style="animation-delay: 0.1s;">
          <h1>Hi, I'm ${name}</h1>
          <h2>${title}</h2>
          <p>${bio}</p>
          <div class="hero-buttons">
            <a href="#contact" class="btn">Hire Me</a>
            <a href="#projects" class="btn btn-outline">View Work</a>
          </div>
        </div>
        <div class="hero-image fade-in" style="animation-delay: 0.3s;">
          <img src="${profileImage}" alt="${name}">
        </div>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section id="about" class="about">
    <div class="container">
      <h2 class="section-title">About <span>Me</span></h2>
      <div class="about-content">
        <div class="about-image fade-in" style="animation-delay: 0.1s;">
          <img src="${profileImage}" alt="${name}">
        </div>
        <div class="about-text fade-in" style="animation-delay: 0.3s;">
          <h3>Professional Profile</h3>
          <p>${bio}</p>
          <div class="skills-container">
            ${skills.map(skill => `<div class="skill">${skill}</div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Skills Section -->
  <section id="skills" class="skills">
    <div class="container">
      <h2 class="section-title">My <span>Skills</span></h2>
      <div class="skills-container">
        ${skills.map(skill => `<div class="skill">${skill}</div>`).join('')}
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section id="services" class="services">
    <div class="container">
      <h2 class="section-title">My <span>Services</span></h2>
      <div class="services-container">
        ${services.map(service => `
          <div class="service">
            <div class="service-icon">
              <i class="${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Projects Section -->
  <section id="projects" class="projects">
    <div class="container">
      <h2 class="section-title">Featured <span>Projects</span></h2>
      <div class="projects-container">
        ${projects.map(project => `
          <div class="project">
            <div class="project-image">
              <img src="${project.image}" alt="${project.name}">
            </div>
            <div class="project-info">
              <h3>${project.name}</h3>
              <p>${project.desc}</p>
              <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
              </div>
              <a href="${project.url}" class="btn" target="_blank">View Project</a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Experience Section -->
  <section id="experience" class="experience">
    <div class="container">
      <h2 class="section-title">Work <span>Experience</span></h2>
      <div class="timeline">
        ${experience.map((exp, index) => `
          <div class="timeline-item">
            <div class="timeline-dot">${index + 1}</div>
            <div class="timeline-content">
              <h3>${exp.title}</h3>
              <h4>${exp.company} | ${exp.duration}</h4>
              <p>${exp.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section id="testimonials" class="testimonials">
    <div class="container">
      <h2 class="section-title">Client <span>Testimonials</span></h2>
      <div class="testimonials-container">
        ${testimonials.map(testimonial => `
          <div class="testimonial">
            <div class="testimonial-content">
              "${testimonial.content}"
            </div>
            <div class="testimonial-author">
              <img src="${testimonial.image}" alt="${testimonial.name}">
              <div>
                <h4>${testimonial.name}</h4>
                <p>${testimonial.position}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="contact">
    <div class="container">
      <h2 class="section-title">Get In <span>Touch</span></h2>
      <div class="contact-container">
        <div class="contact-info">
          <h3>Contact Information</h3>
          <div class="contact-item">
            <div class="contact-icon">
              <i class="fas fa-envelope"></i>
            </div>
            <div>
              <h4>Email</h4>
              <p>${email}</p>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">
              <i class="fas fa-phone"></i>
            </div>
            <div>
              <h4>Phone</h4>
              <p>${phone}</p>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <div>
              <h4>Location</h4>
              <p>${address}</p>
            </div>
          </div>
        </div>
        <div class="contact-form">
          <form id="form">
            <input type="text" placeholder="Your Name" required>
            <input type="email" placeholder="Your Email" required>
            <input type="text" placeholder="Subject">
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit" class="btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer>
    <div class="container">
      <div class="logo">
        ${logo ? `<img src="${logo}" alt="${name}" height="40">` : `<span>${name.split(' ')[0]}</span>`}
      </div>
      <div class="social-links">
        ${socialLinks.map(link => {
          const domain = link.includes('linkedin') ? 'linkedin-in' : 
                         link.includes('github') ? 'github' :
                         link.includes('twitter') ? 'twitter' :
                         link.includes('instagram') ? 'instagram' : 'share';
          return `<a href="${link}" class="social-link" target="_blank"><i class="fab fa-${domain}"></i></a>`;
        }).join('')}
      </div>
      <p>&copy; ${new Date().getFullYear()} ${name}. All Rights Reserved.</p>
    </div>
  </footer>

  <script>
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
      const header = document.getElementById('header');
      if (window.scrollY > 50) {
        header.style.padding = '1rem 0';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.padding = '1.5rem 0';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      }
    });

    // Form submission
    document.getElementById('form').addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your message! I will get back to you soon.');
      e.target.reset();
    });

    // Animation on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'all 0.6s ease';
      observer.observe(el);
    });
  </script>
</body>
</html>`;
  
  // Update preview
  document.getElementById('previewFrame').srcdoc = portfolioHTML;
  showToast('Portfolio preview updated!');
}




async function downloadPortfolio() {
  try {
    // Generate the portfolio HTML
    generatePortfolio();
    const portfolioHTML = document.getElementById('previewFrame').srcdoc;
    
    // Create a new DOM parser to extract the CSS
    const parser = new DOMParser();
    const doc = parser.parseFromString(portfolioHTML, 'text/html');
    
    // Get all style content
    const styleTags = doc.querySelectorAll('style');
    let cssContent = '';
    styleTags.forEach(tag => {
      cssContent += tag.textContent + '\n';
    });

    // Create the final HTML with external CSS reference
    const finalHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${doc.title}</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
  <style>
    ${cssContent}
  </style>
</head>
<body>
  ${doc.body.innerHTML}
</body>
</html>`;

    // Create zip file
    const zip = new JSZip();
    zip.file("index.html", finalHTML);
    zip.file("style.css", cssContent);
    
    // Generate and download the zip
    const content = await zip.generateAsync({type:"blob"});
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Portfolio downloaded successfully!');
  } catch (error) {
    console.error('Error downloading portfolio:', error);
    showToast('Error downloading portfolio', 'error');
  }
}