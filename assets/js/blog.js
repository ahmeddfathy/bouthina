// ===== BLOG PAGE FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', () => {

    // ===== Blog Filter & Search (Blog Index Page) =====
    const blogGrid = document.getElementById('blogGrid');
    const blogSearch = document.getElementById('blogSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const noResults = document.getElementById('noResults');

    if (blogGrid && filterBtns.length > 0) {
        let activeFilter = 'all';

        // Filter buttons
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeFilter = btn.dataset.filter;
                filterArticles();
            });
        });

        // Search input
        if (blogSearch) {
            blogSearch.addEventListener('input', () => {
                filterArticles();
            });
        }

        function filterArticles() {
            const searchTerm = blogSearch ? blogSearch.value.trim().toLowerCase() : '';
            const cards = blogGrid.querySelectorAll('.blog-page-card');
            let visibleCount = 0;

            cards.forEach(card => {
                const category = card.dataset.category || '';
                const title = card.querySelector('h3 a') ? card.querySelector('h3 a').textContent.toLowerCase() : '';
                const desc = card.querySelector('.blog-page-body > p') ? card.querySelector('.blog-page-body > p').textContent.toLowerCase() : '';
                const tags = card.querySelector('.blog-page-tags') ? card.querySelector('.blog-page-tags').textContent.toLowerCase() : '';

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

    // ===== Copy Link Button (Post Page) =====
    const copyLinkBtn = document.getElementById('copyLink');
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href).then(() => {
                const icon = copyLinkBtn.querySelector('i');
                icon.className = 'fas fa-check';
                copyLinkBtn.style.background = '#27AE60';

                setTimeout(() => {
                    icon.className = 'fas fa-link';
                    copyLinkBtn.style.background = '';
                }, 2000);
            });
        });
    }

    // ===== Social Share Links =====
    const shareLinks = document.querySelectorAll('.article-share-links a');
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
