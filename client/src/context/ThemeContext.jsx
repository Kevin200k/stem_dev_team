import React, { createContext, useContext, useState, useEffect } from 'react';

const pallete = {
  isDark: {
    
  },
  isLight: {
    
  }
}

// 1. Create the Context
const DarkModeContext = createContext();

// Helper function to get initial theme from localStorage or system preference
const getInitialTheme = () => {
  // Check localStorage first
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    return true; // true for dark mode
  } else if (savedTheme === 'light') {
    return false; // false for light mode
  }

  // If no preference in localStorage, check system preference
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

// 2. Create the Provider Component
export const DarkModeProvider = ({ children }) => {
  // State to hold the current theme mode (true for dark, false for light)
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  // Effect to apply the 'dark' class to the <html> tag and save preference
  useEffect(() => {
    const html = document.documentElement; // Get the root HTML element
    if (isDarkMode) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]); // Re-run this effect whenever isDarkMode changes

  // Function to toggle the dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // The value provided to consumers of this context
  const contextValue = {
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
};

// 3. Create a Custom Hook for easy consumption
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};