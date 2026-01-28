// script.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 HéricaHair - Site carregado');
    
    // Menu hamburguer para mobile
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            navbarToggle.innerHTML = navbarMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = navbarMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarMenu.classList.remove('active');
                navbarToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
    
    // Verificar se a logo carregou
    const logoImg = document.getElementById('logo-img');
    const logoFallback = document.getElementById('logo-fallback');
    
    if (logoImg) {
        logoImg.onload = function() {
            console.log('✅ Logo carregada com sucesso');
            if (logoFallback) logoFallback.style.display = 'none';
        };
        
        logoImg.onerror = function() {
            console.log('⚠️ Logo não encontrada, usando fallback');
            if (logoFallback) logoFallback.style.display = 'flex';
            // Tentar caminhos alternativos
            setTimeout(() => {
                const pathsToTry = [
                    'logoH.jpeg',
                    './logoH.jpeg',
                    'logoH.jpg',
                    './logoH.jpg',
                    'logo.jpeg',
                    './logo.jpeg'
                ];
                
                let currentIndex = 0;
                const tryNextPath = () => {
                    if (currentIndex < pathsToTry.length) {
                        console.log(`Tentando carregar: ${pathsToTry[currentIndex]}`);
                        logoImg.src = pathsToTry[currentIndex];
                        currentIndex++;
                        setTimeout(tryNextPath, 500);
                    }
                };
                
                tryNextPath();
            }, 1000);
        };
    }
    
    // Configurar animações de scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplicar animação às seções
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        observer.observe(section);
    });
    
    // Animar os cards quando aparecem
    const cards = document.querySelectorAll('.antes-depois-item, .sobre-texto');
    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s';
        observer.observe(card);
    });
    
    // Suavizar scroll para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efeito de hover nas imagens com zoom
    const imageContainers = document.querySelectorAll('.imagem-container');
    imageContainers.forEach(container => {
        container.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        container.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Instruções para o usuário
    console.log('📁 ESTRUTURA DE ARQUIVOS:');
    console.log('├── index.html');
    console.log('├── style.css');
    console.log('├── script.js');
    console.log('├── logoH.jpeg (sua logo - IMPORTANTE!)');
    console.log('├── minha-foto.png (sua foto)');
    console.log('├── antes1.jpg, depois1.jpg, etc.');
    console.log('');
    console.log('💡 DICA: Para a logo funcionar:');
    console.log('1. Nome exato: "logoH.jpeg" (case-sensitive)');
    console.log('2. Na mesma pasta do index.html');
    console.log('3. GitHub Pages pode levar 1-2 minutos para atualizar');
    console.log('');
    console.log('🔧 Funcionalidades:');
    console.log('- Navbar responsiva com menu hamburguer');
    console.log('- Lightbox para zoom nas imagens');
    console.log('- Scroll suave');
    console.log('- Animações ao rolar');
    console.log('- Design totalmente responsivo');
});

// Funções para o Lightbox
function abrirLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    // Tentar carregar imagem local primeiro
    const img = new Image();
    img.onload = function() {
        lightboxImage.src = src;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    img.onerror = function() {
        // Se a imagem local não carregar, usar fallback
        const fallbackSrc = src.includes('antes') 
            ? 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
            : 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
        
        lightboxImage.src = fallbackSrc;
        lightboxCaption.textContent = caption + ' (imagem ilustrativa)';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    img.src = src;
}

function fecharLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Fechar lightbox com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        fecharLightbox();
    }
});

// Fechar lightbox clicando fora da imagem
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) {
        fecharLightbox();
    }
});
