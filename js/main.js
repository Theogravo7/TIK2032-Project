document.addEventListener('DOMContentLoaded', function() {
    const loading = document.getElementById('loading');
    const pageContent = document.getElementById('page-content');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const modal = document.getElementById('image-modal');
    const modalClose = document.getElementById('modal-close');
    const exploreBtn = document.getElementById('explore-btn');
    const showSkillsBtn = document.getElementById('show-skills');
    const contactForm = document.getElementById('contact-form');
    
    function simulateLoading() {
        loading.style.display = 'flex';
        
        setTimeout(() => {
            loading.style.display = 'none';
            pageContent.style.display = 'block';
            
            setTimeout(() => {
                document.getElementById('home').classList.add('fade-in');
                
                setTimeout(() => {
                    document.getElementById('about').classList.add('fade-in');
                    
                    setTimeout(() => {
                        document.getElementById('skills').classList.add('fade-in');
                    }, 300);
                }, 300);
            }, 100);
        }, 1500);
    }
    
    simulateLoading();
    
    function showPage(pageId) {
        sections.forEach(section => {
            section.style.display = 'none';
            section.classList.remove('active-page');
        });
        
        const activePage = document.getElementById(pageId);
        activePage.style.display = 'block';
        
        setTimeout(() => {
            activePage.classList.add('active-page');
            if (pageId === 'gallery-section') {
                document.getElementById('gallery-section').classList.add('fade-in');
                populateGallery(); // Load gallery when showing gallery page
            } else if (pageId === 'blog-section') {
                document.getElementById('blog-section').classList.add('fade-in');
            } else if (pageId === 'contact-section') {
                document.getElementById('contact-section').classList.add('fade-in');
            }
        }, 100);
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId || 
                (link.getAttribute('data-page') === 'gallery' && pageId === 'gallery-section') ||
                (link.getAttribute('data-page') === 'blog' && pageId === 'blog-section') ||
                (link.getAttribute('data-page') === 'contact' && pageId === 'contact-section')) {
                link.classList.add('active');
            }
        });
        
        window.scrollTo(0, 0);
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            if (pageId === 'gallery') {
                showPage('gallery-section');
            } else if (pageId === 'blog') {
                showPage('blog-section');
            } else if (pageId === 'contact') {
                showPage('contact-section');
            } else {
                showPage(pageId);
            }
        });
    });
    
    exploreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    });
    
    showSkillsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
    });
    
    const galleryData = [
        {
            id: 1,
            title: "",
            description: ""
        },
        {
            id: 2,
            title: "",
            description: ""
        },
        {
            id: 3,
            title: "",
            description: ""
        },
        {
            id: 4,
            title: "",
            description: ""
        },
        {
            id: 5,
            title: "",
            description: ""
        },
        {
            id: 6,
            title: "",
            description: ""
        }
    ];
    
    function populateGallery() {
        const galleryContainer = document.getElementById('gallery-container');
        
        galleryContainer.innerHTML = '';
        
        galleryData.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-id', item.id);
            
            galleryItem.innerHTML = `
                <img src="images/gallery${item.id}.jpg" alt="${item.title}">
                <div class="overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            
            galleryContainer.appendChild(galleryItem);
            
            galleryItem.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                const title = item.title;
                const desc = item.description;
                
                modalImg.src = imgSrc;
                modalCaption.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
                modal.style.display = 'flex';
            });
        });
    }
    
    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    document.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        if (document.getElementById('home').classList.contains('active-page')) {
            const aboutOffset = document.getElementById('about').offsetTop - 300;
            const skillsOffset = document.getElementById('skills').offsetTop - 300;
            
            if (scrollPosition >= aboutOffset && !document.getElementById('about').classList.contains('fade-in')) {
                document.getElementById('about').classList.add('fade-in');
            }
            
            if (scrollPosition >= skillsOffset && !document.getElementById('skills').classList.contains('fade-in')) {
                document.getElementById('skills').classList.add('fade-in');
            }
        }
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        const formContainer = contactForm.parentElement;
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <h3>Thank you, ${name}!</h3>
            <p>Your message has been sent successfully. I'll get back to you soon at ${email}.</p>
        `;
        
        successMessage.style.backgroundColor = 'rgba(108, 92, 231, 0.1)';
        successMessage.style.padding = '1.5rem';
        successMessage.style.borderRadius = '10px';
        successMessage.style.marginTop = '1.5rem';
        successMessage.style.textAlign = 'center';
        successMessage.style.border = '1px solid var(--primary-color)';
        
        contactForm.style.display = 'none';
        formContainer.appendChild(successMessage);
        
        contactForm.reset();
        
        setTimeout(() => {
            contactForm.style.display = 'block';
            formContainer.removeChild(successMessage);
        }, 5000);
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    const sectionTitles = document.querySelectorAll('.section-title');
    
    function checkTitleVisibility() {
        sectionTitles.forEach(title => {
            const titlePosition = title.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;
            
            if (titlePosition < screenHeight * 0.8) {
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }
        });
    }
    
    sectionTitles.forEach(title => {
        title.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
    });
    
    window.addEventListener('scroll', checkTitleVisibility);
    
    checkTitleVisibility();
});