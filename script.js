document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 HéricaHair - Site carregado');
    
    // REMOVER OUTLINE DE TODOS OS ELEMENTOS INTERATIVOS AO CLICAR
    document.addEventListener('mousedown', function() {
        document.activeElement.blur();
    });
    
    // REMOVER OUTLINE ESPECÍFICO PARA MOBILE
    document.addEventListener('touchstart', function() {
        document.activeElement.blur();
    });
    
    // Menu hamburguer para mobile
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    
    if (navbarToggle && navbarMenu) {
        let isAnimating = false;
        
        // REMOVER OUTLINE DO BOTÃO DO MENU
        navbarToggle.addEventListener('mousedown', function() {
            this.blur();
        });
        
        navbarToggle.addEventListener('touchstart', function() {
            this.blur();
        });
        
        navbarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (isAnimating) return;
            isAnimating = true;
            
            // Remover foco do botão
            this.blur();
            
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
            // REMOVER OUTLINE DOS LINKS
            link.addEventListener('mousedown', function() {
                this.blur();
            });
            
            link.addEventListener('touchstart', function() {
                this.blur();
            });
            
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
    
    // Verificar se a logo carregou
    const logoImg = document.getElementById('logo-img');
    const logoFallback = document.getElementById('logo-fallback');
    
    if (logoImg) {
        // Primeiro tenta carregar a logo
        logoImg.onload = function() {
            console.log('✅ Logo central carregada com sucesso');
            if (logoFallback) {
                logoFallback.style.display = 'none';
                logoImg.style.display = 'block';
            }
        };
        
        logoImg.onerror = function() {
            console.log('⚠️ Logo central não encontrada, usando fallback');
            if (logoFallback) {
                logoFallback.style.display = 'flex';
                logoImg.style.display = 'none';
            }
            
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
                        console.log(`Tentando carregar: ${pathsToTry[currentIndex]}`);
                        logoImg.src = pathsToTry[currentIndex];
                        currentIndex++;
                        setTimeout(tryNextPath, 500);
                    }
                };
                
                tryNextPath();
            }, 1000);
        };
        
        // Forçar tentativa de carregamento
        logoImg.src = 'LogoH.png';
    }
    
    // Verificar logo da navbar também
    const navbarLogoImg = document.querySelector('.navbar-logo-img');
    if (navbarLogoImg) {
        navbarLogoImg.onload = function() {
            console.log('✅ Logo da navbar carregada com sucesso');
            document.querySelector('.navbar-logo-fallback').style.display = 'none';
            this.style.display = 'block';
        };
        
        navbarLogoImg.onerror = function() {
            console.log('⚠️ Logo da navbar não encontrada');
            document.querySelector('.navbar-logo-fallback').style.display = 'flex';
            this.style.display = 'none';
        };
        
        // Forçar tentativa de carregamento
        navbarLogoImg.src = 'LogoH.png';
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
        // REMOVER OUTLINE DOS LINKS DE ÂNCORA
        anchor.addEventListener('mousedown', function() {
            this.blur();
        });
        
        anchor.addEventListener('touchstart', function() {
            this.blur();
        });
        
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
        // REMOVER OUTLINE DAS IMAGENS
        container.addEventListener('mousedown', function() {
            this.blur();
        });
        
        container.addEventListener('touchstart', function() {
            this.blur();
        });
        
        container.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        container.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Para mobile
        container.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        container.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // REMOVER OUTLINE DOS BOTÕES DE WHATSAPP E INSTAGRAM
    document.querySelectorAll('.btn-whatsapp, .btn-secondary, .whatsapp-float, .rede-social').forEach(button => {
        button.addEventListener('mousedown', function() {
            this.blur();
        });
        
        button.addEventListener('touchstart', function() {
            this.blur();
        });
    });
});

// Funções para o Lightbox
function abrirLightbox(src, caption, element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    console.log(`Abrindo lightbox: ${src}`);
    
    // Obter a imagem clicada
    const clickedImage = element.querySelector('img');
    
    // Verificar se temos uma imagem válida
    let imageSrc = src;
    if (clickedImage && clickedImage.src && clickedImage.src !== window.location.href) {
        // Usar o src atual da imagem (pode ser o fallback)
        imageSrc = clickedImage.src;
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
        lightboxImage.src = imageSrc;
        lightboxCaption.textContent = caption;
        
        setTimeout(() => {
            lightboxImage.classList.add('loaded');
        }, 50);
    };
    
    img.onerror = function() {
        // Fallback baseado no tipo de imagem
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
    
    // Remover foco do botão de fechar
    document.querySelector('.lightbox-close').blur();
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

// Adicionar estilos para melhor visualização das imagens
const style = document.createElement('style');
style.textContent = `
    /* Dicas visuais para as imagens */
    .antes-depois-imagens img {
        transition: filter 0.3s ease;
    }
    
    .antes-depois-imagens img:hover {
        filter: brightness(1.1);
    }
    
    /* Indicador visual para imagens clicáveis */
    .imagem-container {
        position: relative;
    }
    
    .imagem-container::after {
        content: 'Clique para ampliar';
        position: absolute;
        bottom: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: var(--gold2);
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.7rem;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }
    
    .imagem-container:hover::after {
        opacity: 1;
    }
    
    /* Logos maiores e mais visíveis */
    .logo-img, .navbar-logo-img {
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    }
`;
document.head.appendChild(style);

