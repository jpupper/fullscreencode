// ===================================
// FULLSCREEN CODE SOLUTIONS - JAVASCRIPT
// ===================================

// ===================================
// GLOBAL VARIABLES FOR PROJECTS
// ===================================

let allProjects = [];
let filteredProjects = [];
let currentProjectIndex = 0;
let autoplayInterval = null;
let isAutoplayActive = false;
let selectedFilters = []; // Array to store multiple selected filters

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // NAVIGATION
    // ===================================
    
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // ===================================
    // SMOOTH SCROLL
    // ===================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===================================
    // ANIMATIONS ON SCROLL (AOS)
    // ===================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });
    
    // ===================================
    // COUNTER ANIMATION
    // ===================================
    
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
    
    // Trigger counter animation when about section is visible
    const aboutSection = document.querySelector('.about');
    let countersAnimated = false;
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                document.querySelectorAll('.stat-number').forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
            }
        });
    }, { threshold: 0.5 });
    
    if (aboutSection) {
        counterObserver.observe(aboutSection);
    }
    
    // ===================================
    // FORM HANDLING
    // ===================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Validate form
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showNotification('Por favor completa todos los campos', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showNotification('Por favor ingresa un email válido', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Mensaje enviado con éxito. Te contactaremos pronto!', 'success');
            contactForm.reset();
            
            // Here you would typically send the data to a server
            console.log('Form data:', formData);
        });
    }
    
    // ===================================
    // NOTIFICATION SYSTEM
    // ===================================
    
    function showNotification(message, type = 'success') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '1rem 2rem',
            borderRadius: '5px',
            backgroundColor: type === 'success' ? '#00D9FF' : '#ff4444',
            color: type === 'success' ? '#000' : '#fff',
            fontWeight: '600',
            zIndex: '10000',
            animation: 'slideIn 0.3s ease-out',
            boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)'
        });
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Add notification animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ===================================
    // CURSOR EFFECT (Optional - Advanced)
    // ===================================
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    Object.assign(cursor.style, {
        width: '20px',
        height: '20px',
        border: '2px solid #00D9FF',
        borderRadius: '50%',
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: '9999',
        transition: 'transform 0.2s ease',
        display: 'none'
    });
    document.body.appendChild(cursor);
    
    // Only show custom cursor on desktop
    if (window.innerWidth > 968) {
        cursor.style.display = 'block';
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });
        
        // Scale cursor on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .project-card');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.backgroundColor = 'rgba(0, 217, 255, 0.2)';
            });
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.backgroundColor = 'transparent';
            });
        });
    }
    
    // ===================================
    // PARALLAX EFFECT
    // ===================================
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-logo');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // ===================================
    // TYPING EFFECT (Optional)
    // ===================================
    
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // ===================================
    // PROJECT CARDS TILT EFFECT
    // ===================================
    
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
    
    // ===================================
    // LOADING ANIMATION
    // ===================================
    
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add fade-in animation to hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            setTimeout(() => {
                heroContent.style.transition = 'opacity 1s ease';
                heroContent.style.opacity = '1';
            }, 100);
        }
    });
    
    // ===================================
    // PERFORMANCE OPTIMIZATION
    // ===================================
    
    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debounce to scroll-heavy functions
    const debouncedScroll = debounce(function() {
        // Any heavy scroll operations can go here
    }, 10);
    
    window.addEventListener('scroll', debouncedScroll);
    
    // ===================================
    // PROJECTS API INTEGRATION
    // ===================================
    
    async function loadProjects() {
        try {
            const response = await fetch('https://vps-4455523-x.dattaweb.com/jpupper/api/projects');
            allProjects = await response.json();
            filteredProjects = [...allProjects];
            
            renderProjectsGrid();
            if (filteredProjects.length > 0) {
                displayProject(0);
            }
            updateProjectCounter();
        } catch (error) {
            console.error('Error loading projects:', error);
            document.getElementById('projectTitle').textContent = 'Error al cargar proyectos';
            document.getElementById('projectDescription').textContent = 'No se pudieron cargar los proyectos. Por favor intenta más tarde.';
        }
    }
    
    function renderProjectsGrid() {
        const grid = document.getElementById('projectsGrid');
        grid.innerHTML = '';
        
        filteredProjects.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.dataset.index = index;
            
            // Add tags as data attributes for filtering
            if (project.tags && Array.isArray(project.tags)) {
                card.dataset.tags = project.tags.join(',').toLowerCase();
            }
            
            const thumbnail = project.thumbnail || 'img/projects/default.png';
            const description = stripHtml(project.description).substring(0, 100) + '...';
            
            card.innerHTML = `
                <div class="project-image" style="background-image: url('https://vps-4455523-x.dattaweb.com/jpupper/${thumbnail}')">
                    <img src="https://vps-4455523-x.dattaweb.com/jpupper/${thumbnail}" alt="${project.title}" onerror="this.src='img/projects/default.png'">
                </div>
                <div class="project-overlay">
                    <h3>${project.title}</h3>
                    <p>${description}</p>
                </div>
            `;
            
            card.addEventListener('click', () => {
                currentProjectIndex = index;
                displayProject(index);
                updateProjectCounter();
                
                // Scroll carousel to show selected card
                const grid = document.getElementById('projectsGrid');
                const cardWidth = card.offsetWidth;
                const scrollPosition = index * (cardWidth + 24); // 24 = gap
                grid.scrollTo({ left: scrollPosition - (grid.offsetWidth / 2) + (cardWidth / 2), behavior: 'smooth' });
                
                // Scroll to selected project display
                document.getElementById('selectedProject').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
            
            grid.appendChild(card);
        });
    }
    
    function displayProject(index) {
        if (index < 0 || index >= filteredProjects.length) return;
        
        const project = filteredProjects[index];
        currentProjectIndex = index;
        
        // Update selected card highlight
        document.querySelectorAll('.project-card').forEach((card, i) => {
            card.classList.toggle('selected', i === index);
        });
        
        // Update title
        document.getElementById('projectTitle').textContent = project.title;
        
        // Update tags
        const tagsContainer = document.getElementById('projectTags');
        tagsContainer.innerHTML = '';
        if (project.tags && Array.isArray(project.tags)) {
            project.tags.forEach(tag => {
                const tagEl = document.createElement('span');
                tagEl.className = 'project-tag';
                tagEl.textContent = tag;
                tagsContainer.appendChild(tagEl);
            });
        }
        
        // Update description
        document.getElementById('projectDescription').innerHTML = project.description || 'Sin descripción disponible.';
        
        // Update media (YouTube iframe or image)
        const mediaContainer = document.getElementById('projectMedia');
        mediaContainer.innerHTML = '';
        
        if (project.videolink && isYouTubeUrl(project.videolink)) {
            const iframe = document.createElement('iframe');
            const videoId = extractYouTubeId(project.videolink);
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=${isAutoplayActive ? 1 : 0}&mute=1`;
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            mediaContainer.appendChild(iframe);
        } else if (project.thumbnail) {
            const img = document.createElement('img');
            img.src = `https://vps-4455523-x.dattaweb.com/jpupper/${project.thumbnail}`;
            img.alt = project.title;
            img.onerror = function() { this.src = 'img/projects/default.png'; };
            mediaContainer.appendChild(img);
        }
        
        // Update links
        const linksContainer = document.getElementById('projectLinks');
        linksContainer.innerHTML = '';
        if (project.url) {
            const link = document.createElement('a');
            link.href = project.url;
            link.target = '_blank';
            link.textContent = 'Ver Proyecto';
            linksContainer.appendChild(link);
        }
        if (project.videolink && project.videolink !== project.url) {
            const link = document.createElement('a');
            link.href = project.videolink;
            link.target = '_blank';
            link.textContent = 'Ver Video';
            linksContainer.appendChild(link);
        }
    }
    
    function isYouTubeUrl(url) {
        return url && (url.includes('youtube.com') || url.includes('youtu.be'));
    }
    
    function extractYouTubeId(url) {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?)|(shorts\/))(\??v?=?([^#&?]*)).*/;
        const match = url.match(regExp);
        return (match && match[9].length === 11) ? match[9] : null;
    }
    
    function stripHtml(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }
    
    function updateProjectCounter() {
        document.getElementById('currentProjectIndex').textContent = currentProjectIndex + 1;
        document.getElementById('totalProjects').textContent = filteredProjects.length;
    }
    
    // ===================================
    // FILTER FUNCTIONALITY (MULTI-SELECT WITH AND LOGIC)
    // ===================================
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter.toLowerCase();
            
            // Handle "all" button - clear all filters
            if (filter === 'all') {
                selectedFilters = [];
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            } else {
                // Remove "all" button active state
                filterButtons.forEach(btn => {
                    if (btn.dataset.filter === 'all') {
                        btn.classList.remove('active');
                    }
                });
                
                // Toggle filter selection
                const filterIndex = selectedFilters.indexOf(filter);
                if (filterIndex > -1) {
                    // Remove filter if already selected
                    selectedFilters.splice(filterIndex, 1);
                    this.classList.remove('active');
                } else {
                    // Add filter to selection
                    selectedFilters.push(filter);
                    this.classList.add('active');
                }
                
                // If no filters selected, activate "all"
                if (selectedFilters.length === 0) {
                    filterButtons.forEach(btn => {
                        if (btn.dataset.filter === 'all') {
                            btn.classList.add('active');
                        }
                    });
                }
            }
            
            // Apply filters
            applyFilters();
        });
    });
    
    function applyFilters() {
        // If no filters selected, show all projects
        if (selectedFilters.length === 0) {
            filteredProjects = [...allProjects];
        } else {
            // Filter projects that have ALL selected tags (AND logic)
            filteredProjects = allProjects.filter(project => {
                if (!project.tags || !Array.isArray(project.tags)) return false;
                
                // Check if project has ALL selected filters
                return selectedFilters.every(filter => {
                    return project.tags.some(tag => tag.toLowerCase().includes(filter));
                });
            });
        }
        
        // Reset to first project
        currentProjectIndex = 0;
        renderProjectsGrid();
        if (filteredProjects.length > 0) {
            displayProject(0);
        } else {
            document.getElementById('projectTitle').textContent = 'No hay proyectos';
            document.getElementById('projectDescription').textContent = 'No se encontraron proyectos con estos filtros.';
            document.getElementById('projectMedia').innerHTML = '';
            document.getElementById('projectTags').innerHTML = '';
            document.getElementById('projectLinks').innerHTML = '';
        }
        updateProjectCounter();
    }
    
    // ===================================
    // GALLERY CONTROLS
    // ===================================
    
    document.getElementById('prevProject').addEventListener('click', function() {
        if (filteredProjects.length === 0) return;
        currentProjectIndex = (currentProjectIndex - 1 + filteredProjects.length) % filteredProjects.length;
        displayProject(currentProjectIndex);
        updateProjectCounter();
    });
    
    document.getElementById('nextProject').addEventListener('click', function() {
        if (filteredProjects.length === 0) return;
        currentProjectIndex = (currentProjectIndex + 1) % filteredProjects.length;
        displayProject(currentProjectIndex);
        updateProjectCounter();
    });
    
    // Autoplay functionality
    document.getElementById('toggleAutoplay').addEventListener('click', function() {
        isAutoplayActive = !isAutoplayActive;
        const playIcon = document.getElementById('playIcon');
        const pauseIcon = document.getElementById('pauseIcon');
        
        if (isAutoplayActive) {
            this.classList.add('active');
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            
            // Start autoplay - change project every 8 seconds
            autoplayInterval = setInterval(() => {
                currentProjectIndex = (currentProjectIndex + 1) % filteredProjects.length;
                displayProject(currentProjectIndex);
                updateProjectCounter();
            }, 8000);
        } else {
            this.classList.remove('active');
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            
            // Stop autoplay
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
        }
    });
    
    // Load projects on page load
    loadProjects();
    
    // ===================================
    // TEAM MEMBER SELECTION
    // ===================================
    
    const teamMembers = [
        {
            name: 'Julian Puppo',
            role: 'Director/Programador Gráfico',
            image: 'img/profile/julian.jpg',
            bio: 'Julian Puppo, es artista multimedial, programador gráfico y director de Jeyder Multimedia. Programa en multiples plataformas y lenguajes : Unity,Unreal Engine,OpenFrameworks ,Touchdesigner,C++,Python,Javascript,Processing ,P5js. Su visión es las integración de todas las cosas, todas las herramientas son una herramienta para realizar el producto perfecto que salvara la humanidad. Impulsor de la generación de la comunidad de Arte Digital Argentino, creador de colaboraciones y no de competencias.'
        },
        {
            name: 'Tolch',
            role: 'Diseñador Interactivo',
            image: 'img/profile/tolch.jpg',
            bio: 'Tolch es diseñador y artista visual, enfocado en experiencias digitales y arte interactivo. Siempre sabe la ultima tecnologia del mercado, tiene una ambición de conocimiento y descubrir propia de un Leonardo Davinci moderno. Experto realizador de visuales en vivo, donde trabajo para grandes artistas internacionales como Miss Monique y Ritchie Hawking, Ademas de ser una persona tranquila como un monje siempre mas que dispuesta a ayudar en la comunidad. Referente universal de Touch Designer'
        },
        {
            name: 'Seb Zav',
            role: 'Experto Programador Backend',
            image: 'img/profile/seb.jpg',
            bio: 'Seb Zav es desarrollador backend senior, sabe una banda sobre VPS, sockets, bases de datos y mucho, mucho PHP con node.js. Es capaz de sacar andando desarrollos de back end extremadamente complejos en el lapso de muy poco tiempo, utilizando su maximo KI, pero para eso hay que tener un buen proyecto que garpe bien.'
        },
        {
            name: 'Erebus Angelo',
            role: 'Code Experience Designer',
            image: 'img/profile/erebus.jpg',
            bio: 'Erebus es desarrollador , capaz de solucionar cualquier cosa, el fiel reflejo de la filosofia de exito de Jeyder Multimedia, Erebus encarna la fe la capacidad de aprender a resolverlo todo. Erebus ha hecho significantes desarrollos web e instalaciones con Inteligencia Artificial. Aparte de que es una persona siempre dispuesta con una sonrisa a solucionarlo todo.'
        },
        {
            name: 'Nahuel Garcia',
            role: 'Generalista 3D y Experto AV',
            image: 'img/profile/nahuel.jpg',
            bio: 'Nahuel tiene una experiencia desbordante en Edición y creación de video y 3D con Premiere,After Effects,Cinema4D , blender. También una sana obesión por el orden de los cables, lo que permite que los montajes salgan impecables.'
        }
    ];
    
    const teamCards = document.querySelectorAll('.team-member-card');
    
    teamCards.forEach(card => {
        card.addEventListener('click', function() {
            const memberIndex = parseInt(this.dataset.member);
            const member = teamMembers[memberIndex];
            
            // Remove active class from all cards
            teamCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Update display
            document.getElementById('teamMemberImage').src = member.image;
            document.getElementById('teamMemberName').textContent = member.name;
            document.getElementById('teamMemberRole').textContent = member.role;
            document.getElementById('teamMemberBio').textContent = member.bio;
        });
    });
    
    // Set first member as active by default
    if (teamCards.length > 0) {
        teamCards[0].classList.add('active');
    }
    
    // ===================================
    // CONSOLE MESSAGE
    // ===================================
    
    console.log('%c FullScreen Code Solutions ', 'background: #00D9FF; color: #000; font-size: 20px; font-weight: bold; padding: 10px;');
    console.log('%c Desarrollado con ❤️ por FullScreen Code ', 'color: #00D9FF; font-size: 12px;');
    console.log('%c ¿Interesado en trabajar con nosotros? Contactanos! ', 'color: #fff; font-size: 12px;');
    
});

// ===================================
// SERVICE WORKER (Optional - PWA)
// ===================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js').then(
        //     function(registration) {
        //         console.log('ServiceWorker registration successful');
        //     },
        //     function(err) {
        //         console.log('ServiceWorker registration failed: ', err);
        //     }
        // );
    });
}
