const button = document.getElementById('myButton');
button.addEventListener('click', () => {
    alert('You clicked the button!');
});

document.addEventListener("DOMContentLoaded", () => {
    const slogan = document.querySelector('.slogan'); // Select the .slogan block

    // Function to check if the element is in the viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    };

    // Add an event listener for scrolling
    const handleScroll = () => {
        if (isInViewport(slogan)) {
            slogan.classList.add('fade-in'); // Add the fade-in class when visible
        }
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Trigger on page load in case the element is already in view
    handleScroll(); 
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('header');
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

