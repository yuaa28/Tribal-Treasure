// Theme mode functionality
document.addEventListener('DOMContentLoaded', function() {
  // Check for saved theme preference or use default
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // Apply the theme class to the body
  document.body.classList.add(currentTheme);
  
  // Update toggle button state
  updateThemeToggle(currentTheme);
  
  // Add event listener to theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      // Toggle theme
      const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
      
      // Remove old theme class
      document.body.classList.remove('light', 'dark');
      
      // Add new theme class
      document.body.classList.add(newTheme);
      
      // Save preference to localStorage
      localStorage.setItem('theme', newTheme);
      
      // Update toggle button state
      updateThemeToggle(newTheme);
    });
  }
  
  function updateThemeToggle(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      if (theme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.title = 'Switch to light mode';
      } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.title = 'Switch to dark mode';
      }
    }
  }
}); 