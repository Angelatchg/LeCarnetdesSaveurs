document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const closeIcon = document.getElementById('close-icon');

    logo.addEventListener('click', function() {
        if (dropdownMenu.classList.contains('hidden')) {
            dropdownMenu.classList.remove('hidden');
            dropdownMenu.style.display = 'block';
            setTimeout(() => {
                dropdownMenu.style.height = '250px'; // Adjust height as needed
            }, 10); // Slight delay to trigger the transition
        }
    });

    closeIcon.addEventListener('click', function() {
        dropdownMenu.style.height = '0';
        setTimeout(() => {
            dropdownMenu.classList.add('hidden');
            dropdownMenu.style.display = 'none';
        }, 500); // Wait for transition to complete before hiding
    });
});
