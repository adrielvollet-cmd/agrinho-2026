// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. EFEITO REVELAR CARDS AO ROLAR A PÁGINA (SCROLL REVEAL) ---
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150; // Distância do fundo da tela para ativar
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('visible');
            } else {
                // Opcional: remove a classe se quiser que esconda novamente ao subir
                // element.classList.remove('visible');
            }
        });
    }
    
    // Ativa no carregamento
    checkReveal();
    // Ativa durante o scroll
    window.addEventListener('scroll', checkReveal);

    // --- 2. CONTADOR ANIMADO DAS ESTATÍSTICAS ---
    // Só ativa quando o banner de estatísticas entrar na tela pela primeira vez
    const statBanner = document.querySelector('.stats-banner');
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false; // Garante que a animação rode apenas uma vez
    
    function animateStats() {
        if (!statBanner || animated) return;
        
        const bannerPosition = statBanner.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Se o banner está visível na tela
        if (bannerPosition < windowHeight - 100) {
            animated = true;
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const increment = target / 30; // Divide por 30 passos para suavidade
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target;
                    }
                };
                
                updateCounter();
            });
        }
    }
    
    // Verifica no scroll e no load
    window.addEventListener('scroll', animateStats);
    // Verifica imediatamente caso o banner já esteja visível ao carregar
    animateStats();

    // --- 3. INTERATIVIDADE DO BOTÃO PRINCIPAL (APENAS EXEMPLO) ---
    const btnPrimary = document.querySelector('.btn-primary');
    if (btnPrimary) {
        btnPrimary.addEventListener('click', () => {
            // Rola suavemente até a seção de práticas
            const sectionPraticas = document.getElementById('praticas');
            if (sectionPraticas) {
                sectionPraticas.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Efeito visual no botão
            btnPrimary.textContent = 'Conheça! 🌾';
            setTimeout(() => {
                btnPrimary.textContent = 'Conheça Nossas Ações';
            }, 2000);
        });
    }

    // --- 4. EFEITO DE TROCA DE TÍTULO NO HERO (DETALHE SUTIL) ---
    const heroTitle = document.querySelector('.hero-content h2');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        
        heroTitle.addEventListener('mouseenter', () => {
            heroTitle.innerHTML = 'Agro Forte, <br><span class="highlight">Futuro Sustentável</span>';
        });
        
        heroTitle.addEventListener('mouseleave', () => {
            heroTitle.innerHTML = originalText;
        });
    }

});