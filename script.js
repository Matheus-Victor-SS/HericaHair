// script.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 HéricaHair - Site carregado');
    
    // Verificar se a logo carregou
    const logoImg = document.getElementById('logo-img');
    const logoFallback = document.getElementById('logo-fallback');
    
    if (logoImg) {
        logoImg.onload = function() {
            console.log('✅ Logo carregada com sucesso');
            logoFallback.style.display = 'none';
        };
        
        logoImg.onerror = function() {
            console.log('⚠️ Logo não encontrada, usando fallback');
            logoFallback.style.display = 'flex';
            // Tentar com caminho relativo diferente
            setTimeout(() => {
                logoImg.src = './logoH.jpeg';
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
    
    // Efeito de hover nos itens antes/depois
    const antesDepoisItems = document.querySelectorAll('.antes-depois-item');
    antesDepoisItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    console.log('🔍 Verificando caminhos das imagens:');
    const images = document.querySelectorAll('img[src]');
    images.forEach(img => {
        console.log(`- ${img.src} -> ${img.alt}`);
    });
});