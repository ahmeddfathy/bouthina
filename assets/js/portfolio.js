// ===== PORTFOLIO PAGE FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', () => {

    // ===== Portfolio Filter & Search (Portfolio Index Page) =====
    const portfolioGrid = document.getElementById('portfolioGrid');
    const portfolioSearch = document.getElementById('portfolioSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const noResults = document.getElementById('noResults');

    if (portfolioGrid && filterBtns.length > 0) {
        let activeFilter = 'all';

        // Filter buttons
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeFilter = btn.dataset.filter;
                filterWorks();
            });
        });

        // Search input
        if (portfolioSearch) {
            portfolioSearch.addEventListener('input', () => {
                filterWorks();
            });
        }

        function filterWorks() {
            const searchTerm = portfolioSearch ? portfolioSearch.value.trim().toLowerCase() : '';
            const cards = portfolioGrid.querySelectorAll('.portfolio-page-card');
            let visibleCount = 0;

            cards.forEach(card => {
                const category = card.dataset.category || '';
                const title = card.querySelector('h3 a') ? card.querySelector('h3 a').textContent.toLowerCase() : '';
                const desc = card.querySelector('.portfolio-page-body > p') ? card.querySelector('.portfolio-page-body > p').textContent.toLowerCase() : '';
                const tags = card.querySelector('.portfolio-page-tags') ? card.querySelector('.portfolio-page-tags').textContent.toLowerCase() : '';

                const matchesFilter = activeFilter === 'all' || category === activeFilter;
                const matchesSearch = !searchTerm || title.includes(searchTerm) || desc.includes(searchTerm) || tags.includes(searchTerm);

                if (matchesFilter && matchesSearch) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Show/hide no results
            if (noResults) {
                noResults.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        }
    }

    // ===== Social Share Links (Project Page) =====
    const shareLinks = document.querySelectorAll('.project-share-links a');
    shareLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            let shareUrl = '';

            if (link.classList.contains('share-twitter')) {
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            } else if (link.classList.contains('share-facebook')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            } else if (link.classList.contains('share-linkedin')) {
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            } else if (link.classList.contains('share-whatsapp')) {
                shareUrl = `https://wa.me/?text=${title}%20${url}`;
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });

});
