// ===== CONTACT PAGE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', () => {

    // ===== CONTACT FORM SUBMISSION =====
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic validation
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const subject = document.getElementById('contactSubject').value.trim();
            const message = document.getElementById('contactMessage').value.trim();

            if (!name || !email || !subject || !message) {
                // Shake empty required fields
                [contactForm.querySelector('#contactName'),
                contactForm.querySelector('#contactEmail'),
                contactForm.querySelector('#contactSubject'),
                contactForm.querySelector('#contactMessage')].forEach(field => {
                    if (!field.value.trim()) {
                        field.closest('.input-wrapper').classList.add('shake');
                        setTimeout(() => field.closest('.input-wrapper').classList.remove('shake'), 600);
                    }
                });
                return;
            }

            // Simulate sending
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';

            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> تم الإرسال!';
                submitBtn.style.background = '#27AE60';
                formSuccess.classList.add('show');
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> إرسال الرسالة';
                    submitBtn.style.background = '';
                    formSuccess.classList.remove('show');
                }, 5000);
            }, 1800);
        });
    }

    // ===== FAQ ACCORDION =====
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const isOpen = btn.getAttribute('aria-expanded') === 'true';
            const answer = btn.nextElementSibling;

            // Close all
            faqQuestions.forEach(q => {
                q.setAttribute('aria-expanded', 'false');
                q.nextElementSibling.classList.remove('open');
            });

            // Open clicked if it was closed
            if (!isOpen) {
                btn.setAttribute('aria-expanded', 'true');
                answer.classList.add('open');
            }
        });
    });

});
