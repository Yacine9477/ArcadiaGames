document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const requirementsList = document.querySelector('.requirements-list');
    
    if (!passwordInput || !requirementsList) return;
    
    // Fonction de validation en temps réel
    function validatePasswordRealTime() {
        const password = passwordInput.value;
        const requirements = [
            {
                regex: /.{8,}/,
                element: requirementsList.children[0]
            },
            {
                regex: /[a-z]/,
                element: requirementsList.children[1]
            },
            {
                regex: /[A-Z]/,
                element: requirementsList.children[2]
            },
            {
                regex: /[0-9]/,
                element: requirementsList.children[3]
            },
            {
                regex: /[^a-zA-Z0-9]/,
                element: requirementsList.children[4]
            }
        ];
        
        requirements.forEach(req => {
            if (req.regex.test(password)) {
                req.element.style.color = '#2ecc71';
                req.element.style.fontWeight = 'bold';
                req.element.innerHTML = '✓ ' + req.element.textContent.replace('✓ ', '').replace('✗ ', '');
            } else {
                req.element.style.color = '#e74c3c';
                req.element.style.fontWeight = 'normal';
                req.element.innerHTML = '✗ ' + req.element.textContent.replace('✓ ', '').replace('✗ ', '');
            }
        });
    }
    
    // Écouter les changements du mot de passe
    passwordInput.addEventListener('input', validatePasswordRealTime);
    passwordInput.addEventListener('keyup', validatePasswordRealTime);
});