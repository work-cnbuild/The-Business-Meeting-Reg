import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppContextType {
  isRegisterOpen: boolean;
  openRegister: () => void;
  closeRegister: () => void;
  customLogoUrl: string | null;
  setCustomLogoUrl: (url: string | null) => void;
  logoMode: 'brand' | 'event';
  setLogoMode: (mode: 'brand' | 'event') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_LOGO_KEY = 'tbm_custom_logo_url';
const LOCAL_STORAGE_LOGOMODE_KEY = 'tbm_logo_mode';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [customLogoUrl, setCustomLogoUrlState] = useState<string | null>(null);
  const [logoMode, setLogoModeState] = useState<'brand' | 'event'>('brand');

  useEffect(() => {
    try {
      const savedLogo = localStorage.getItem(LOCAL_STORAGE_LOGO_KEY);
      if (savedLogo) {
        setCustomLogoUrlState(savedLogo);
      }

      const savedLogoMode = localStorage.getItem(LOCAL_STORAGE_LOGOMODE_KEY) as 'brand' | 'event' | null;
      if (savedLogoMode) {
        setLogoModeState(savedLogoMode);
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
  }, []);

  const setCustomLogoUrl = (url: string | null) => {
    setCustomLogoUrlState(url);
    try {
      if (url) {
        localStorage.setItem(LOCAL_STORAGE_LOGO_KEY, url);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_LOGO_KEY);
      }
    } catch (e) {
      // ignore
    }
  };

  const setLogoMode = (mode: 'brand' | 'event') => {
    setLogoModeState(mode);
    try {
      localStorage.setItem(LOCAL_STORAGE_LOGOMODE_KEY, mode);
    } catch (e) {
      // ignore
    }
  };

  const openRegister = () => setIsRegisterOpen(true);
  const closeRegister = () => setIsRegisterOpen(false);

  return (
    <AppContext.Provider
      value={{
        isRegisterOpen,
        openRegister,
        closeRegister,
        customLogoUrl,
        setCustomLogoUrl,
        logoMode,
        setLogoMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

