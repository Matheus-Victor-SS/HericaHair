// script.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 HéricaHair - Site carregado');
    
    // Menu hamburguer para mobile - ANIMAÇÃO MAIS FLUIDA
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    
    if (navbarToggle && navbarMenu) {
        let isAnimating = false;
        
        navbarToggle.addEventListener('click', function() {
            if (isAnimating) return;
            isAnimating = true;
            
            if (navbarMenu.classList.contains('active')) {
                // Fechar menu com animação
                navbarMenu.style.transform = 'translateY(0)';
                navbarMenu.style.opacity = '1';
                
                setTimeout(() => {
                    navbarMenu.style.transform = 'translateY(-100%)';
                    navbarMenu.style.opacity = '0';
                }, 10);
                
                setTimeout(() => {
                    navbarMenu.classList.remove('active');
                    navbarToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    navbarToggle.style.transform = 'rotate(0deg)';
                    isAnimating = false;
                }, 400);
            } else {
                // Abrir menu com animação
                navbarMenu.classList.add('active');
                navbarToggle.innerHTML = '<i class="fas fa-times"></i>';
                navbarToggle.style.transform = 'rotate(90deg)';
                
                setTimeout(() => {
                    navbarMenu.style.transform = 'translateY(0)';
                    navbarMenu.style.opacity = '1';
                    setTimeout(() => { isAnimating = false; }, 100);
                }, 10);
            }
        });
        
        // Fechar menu ao clicar fora (somente mobile)
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 768 && 
                navbarMenu.classList.contains('active') &&
                !navbarToggle.contains(event.target) &&
                !navbarMenu.contains(event.target)) {
                
                if (isAnimating) return;
                isAnimating = true;
                
                navbarMenu.style.transform = 'translateY(0)';
                navbarMenu.style.opacity = '1';
                
                setTimeout(() => {
                    navbarMenu.style.transform = 'translateY(-100%)';
                    navbarMenu.style.opacity = '0';
                }, 10);
                
                setTimeout(() => {
                    navbarMenu.classList.remove('active');
                    navbarToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    navbarToggle.style.transform = 'rotate(0deg)';
                    isAnimating = false;
                }, 400);
            }
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = navbarMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768 && navbarMenu.classList.contains('active')) {
                    if (isAnimating) return;
                    isAnimating = true;
                    
                    navbarMenu.style.transform = 'translateY(0)';
                    navbarMenu.style.opacity = '1';
                    
                    setTimeout(() => {
                        navbarMenu.style.transform = 'translateY(-100%)';
                        navbarMenu.style.opacity = '0';
                    }, 10);
                    
                    setTimeout(() => {
                        navbarMenu.classList.remove('active');
                        navbarToggle.innerHTML = '<i class="fas fa-bars"></i>';
                        navbarToggle.style.transform = 'rotate(0deg)';
                        isAnimating = false;
                    }, 400);
                }
            });
        });
    }
    
    // Verificar se a logo central carregou - ATUALIZADO PARA PNG
    const logoImgBig = document.getElementById('logo-img-big');
    const logoFallbackBig = document.getElementById('logo-fallback-big');
    
    if (logoImgBig) {
        logoImgBig.onload = function() {
            console.log('✅ Logo central carregada com sucesso');
            if (logoFallbackBig) logoFallbackBig.style.display = 'none';
        };
        
        logoImgBig.onerror = function() {
            console.log('⚠️ Logo central não encontrada, usando fallback');
            if (logoFallbackBig) logoFallbackBig.style.display = 'flex';
            
            // Tentar caminhos alternativos para PNG
            setTimeout(() => {
                const pathsToTry = [
                    'LogoH.png',
                    './LogoH.png',
                    'logoH.png',
                    './logoH.png',
                    'LogoH.PNG',
                    './LogoH.PNG',
                    'logo.png',
                    './logo.png',
                    'LogoH.jpg',
                    './LogoH.jpg',
                    'logoH.jpg',
                    './logoH.jpg'
                ];
                
                let currentIndex = 0;
                const tryNextPath = () => {
                    if (currentIndex < pathsToTry.length) {
                        console.log(`Tentando carregar logo central: ${pathsToTry[currentIndex]}`);
                        logoImgBig.src = pathsToTry[currentIndex];
                        currentIndex++;
                        setTimeout(tryNextPath, 500);
                    }
                };
                
                tryNextPath();
            }, 1000);
        };
    }
    
    // Verificar logo da navbar
    const navbarLogoImg = document.querySelector('.navbar-logo-img');
    if (navbarLogoImg) {
        navbarLogoImg.onload = function() {
            console.log('✅ Logo da navbar carregada com sucesso');
        };
        
        navbarLogoImg.onerror = function() {
            console.log('⚠️ Logo da navbar não encontrada');
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
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
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
            if (window.innerWidth > 768) { // Somente em desktop
                this.style.transform = 'scale(1.05)';
                this.style.borderColor = 'var(--gold1)';
            }
        });
        
        container.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) { // Somente em desktop
                this.style.transform = 'scale(1)';
                this.style.borderColor = 'transparent';
            }
        });
        
        // Adicionar evento de toque para mobile
        container.addEventListener('touchstart', function() {
            if (window.innerWidth <= 768) {
                this.style.transform = 'scale(1.02)';
                this.style.borderColor = 'var(--gold1)';
            }
        });
        
        container.addEventListener('touchend', function() {
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                    this.style.borderColor = 'transparent';
                }, 300);
            }
        });
    });
    
    // Instruções para o usuário
    console.log('📁 ESTRUTURA DE ARQUIVOS:');
    console.log('├── index.html');
    console.log('├── style.css');
    console.log('├── script.js');
    console.log('├── LogoH.png (sua logo - IMPORTANTE!)');
    console.log('├── minha-foto.png (sua foto)');
    console.log('├── antes1.jpg, depois1.jpg (exemplo 1)');
    console.log('├── antes2.jpg, depois2.jpg (exemplo 2)');
    console.log('├── antes3.jpg, depois3.jpg (exemplo 3)');
    console.log('└── antes4.jpg, depois4.jpg (exemplo 4)');
    console.log('');
    console.log('🎨 DETALHES ADICIONADOS:');
    console.log('- Logo maior (220px no centro, 60px na navbar)');
    console.log('- Fundo com elementos decorativos (tesouras, pentes, etc)');
    console.log('- Animações fluidas no menu mobile');
    console.log('- Lightbox corrigido para cada imagem individual');
    console.log('- Design mais rico e detalhado');
    console.log('');
    console.log('💡 DICA: Para a logo funcionar:');
    console.log('1. Nome exato: "LogoH.png" (case-sensitive)');
    console.log('2. Na mesma pasta do index.html');
    console.log('3. GitHub Pages pode levar 1-2 minutos para atualizar');
    console.log('');
    console.log('🔧 Funcionalidades:');
    console.log('- Navbar responsiva com menu hamburguer animado');
    console.log('- Lightbox para zoom nas imagens individuais');
    console.log('- Scroll suave');
    console.log('- Animações ao rolar');
    console.log('- Design totalmente responsivo');
});

// Funções para o Lightbox - CORRIGIDO PARA IMAGENS INDIVIDUAIS
function abrirLightbox(src, caption, element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    console.log(`Abrindo lightbox: ${src}`);
    console.log(`Elemento clicado:`, element);
    
    // Obter a imagem clicada
    const clickedImage = element.querySelector('img');
    console.log(`Imagem clicada src:`, clickedImage ? clickedImage.src : 'não encontrada');
    
    // Verificar se temos uma imagem válida
    let imageSrc = src;
    if (clickedImage && clickedImage.src && clickedImage.src !== window.location.href) {
        // Usar o src atual da imagem (pode ser o fallback)
        imageSrc = clickedImage.src;
        console.log(`Usando src da imagem clicada: ${imageSrc}`);
    }
    
    // Mostrar lightbox imediatamente com loading
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    lightboxImage.src = '';
    lightboxImage.classList.remove('loaded');
    lightboxCaption.textContent = 'Carregando...';
    
    // Carregar imagem
    const img = new Image();
    img.onload = function() {
        console.log(`✅ Imagem carregada com sucesso: ${imageSrc}`);
        lightboxImage.src = imageSrc;
        lightboxCaption.textContent = caption;
        
        // Adicionar classe para animação de entrada
        setTimeout(() => {
            lightboxImage.classList.add('loaded');
        }, 50);
    };
    
    img.onerror = function() {
        console.log(`❌ Erro ao carregar: ${imageSrc}`);
        
        // Fallback baseado no tipo de imagem (cada par tem fallback diferente)
        let fallbackSrc;
        if (src.includes('antes1')) {
            fallbackSrc = 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
        } else if (src.includes('depois1')) {
            fallbackSrc = 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
        } else if (src.includes('antes2')) {
            fallbackSrc = 'https://images.unsplash.com/photo-1526417501783-5d375490ad1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
        } else if (src.includes('depois2')) {
            fallbackSrc = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
        } else if (src.includes('antes3')) {
            fallbackSrc = 'https://images.unsplash.com/photo-1519690889869-e705e59f72e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
        } else if (src.includes('depois3')) {
            fallbackSrc = 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
        } else if (src.includes('antes4')) {
            fallbackSrc = 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
        } else if (src.includes('depois4')) {
            fallbackSrc = 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
        } else {
            fallbackSrc = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
        }
        
        console.log(`Usando fallback: ${fallbackSrc}`);
        lightboxImage.src = fallbackSrc;
        lightboxCaption.textContent = caption + ' (imagem ilustrativa)';
        
        setTimeout(() => {
            lightboxImage.classList.add('loaded');
        }, 50);
    };
    
    img.src = imageSrc;
}

function fecharLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Remover classe loaded para próxima abertura
    const lightboxImage = document.getElementById('lightbox-image');
    lightboxImage.classList.remove('loaded');
}

// Fechar lightbox com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        fecharLightbox();
    }
});

// Fechar lightbox clicando fora da imagem
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this || e.target.classList.contains('lightbox-close')) {
        fecharLightbox();
    }
});

// Prevenir comportamento padrão de arrastar imagens
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', function(e) {
        e.preventDefault();
    });
});

// Adicionar estilos CSS dinamicamente para melhorar experiência mobile
if (window.innerWidth <= 768) {
    const mobileStyles = `
        .imagem-container:active {
            transform: scale(0.98) !important;
            transition: transform 0.1s ease !important;
        }
        
        .btn-whatsapp:active, .btn-secondary:active {
            transform: scale(0.98) !important;
        }
        
        .whatsapp-float:active {
            transform: scale(0.95) !important;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = mobileStyles;
    document.head.appendChild(styleSheet);
}
