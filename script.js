document.addEventListener('DOMContentLoaded', function() {
    
    // =======================================================
    // 1. NAVEGACIÓN Y MENÚ HAMBURGUESA (SOLUCIÓN MÓVIL)
    // =======================================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('header');

    // Función para cerrar el menú
    function closeMenu() {
        navMenu.classList.remove('active');
        // Aquí puedes agregar la lógica para cambiar el icono de la hamburguesa si la tienes
    }

    // Lógica para abrir/cerrar el menú al hacer clic en el botón de hamburguesa
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Lógica para el botón, si necesitas cambiar su apariencia o atributos ARIA
            const isExpanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Cierra el menú cuando se hace clic en cualquier enlace interno (evita problemas al navegar)
    document.querySelectorAll('.nav-menu a').forEach(item => {
        item.addEventListener('click', function() {
            // Se usa un pequeño retraso para permitir la navegación antes de cerrar el menú
            setTimeout(closeMenu, 100); 
        });
    });

    // =======================================================
    // 2. EFECTO SCROLL EN HEADER
    // =======================================================
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Se ejecuta al cargar la página

    // =======================================================
    // 3. LIGHTBOX (VENTANA MODAL DE FOTOS)
    // =======================================================

    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-image');
    const modalCaption = document.getElementById('lightbox-caption');

    // Función global para abrir la imagen (llamada desde el HTML)
    window.openLightbox = function(src, caption) {
        // Asigna la fuente y la leyenda de la imagen
        modalImg.src = src;
        modalCaption.innerHTML = caption;
        
        // Habilita el modal y la transición de CSS
        modal.style.display = 'flex'; // Muestra el modal
        setTimeout(() => modal.classList.add('active'), 10); // Agrega 'active' para el fade-in
        
        document.body.style.overflow = 'hidden'; // Evita el scroll del fondo
    }

    // Función global para cerrar la imagen (llamada desde el HTML con onclick)
    window.closeLightbox = function(event) {
        // Verifica si el clic fue en el fondo o en el botón de cerrar
        const isBackdropClick = !event || event.target === modal || event.target.classList.contains('lightbox-close');

        if (isBackdropClick && modal.classList.contains('active')) {
            // Remueve 'active' para el fade-out de CSS
            modal.classList.remove('active');
            
            // Espera a que la transición termine (300ms) antes de ocultar completamente el modal
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Habilita el scroll del fondo
            }, 300); 
        }
    }

    // Cerrar al presionar la tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            // Llamamos a closeLightbox sin evento, lo que gatilla el cierre
            closeLightbox(); 
        }
    });

    // Inicialmente, asegura que el modal esté oculto por completo
    if (modal) {
        modal.style.display = 'none';
    }
});