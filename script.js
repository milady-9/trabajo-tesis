document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');

    // Lógica para abrir/cerrar el menú Hamburguesa
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    // Lógica de Scroll Suave para anclajes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Cierra el menú móvil después de hacer clic en un enlace
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
            }

            const targetElement = document.querySelector(this.getAttribute('href'));
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efecto de scroll para el header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) { // Si se ha desplazado más de 50px
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});