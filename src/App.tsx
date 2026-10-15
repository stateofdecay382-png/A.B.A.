import React, { useState, useEffect } from 'react';
import { ScreenType, UserProfile } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/screens/HomeScreen';
import { MathScreen } from './components/screens/MathScreen';
import { LanguageScreen } from './components/screens/LanguageScreen';
import { BiologyScreen } from './components/screens/BiologyScreen';
import { EnglishScreen } from './components/screens/EnglishScreen';
import { VideosScreen } from './components/screens/VideosScreen';
import { ChallengesScreen } from './components/screens/ChallengesScreen';
import { ExploreScreen } from './components/screens/ExploreScreen';
import { AccountModal } from './components/AccountModal';
import { AuthModal } from './components/AuthModal';
import { ParentModal } from './components/ParentModal';
import { sound } from './utils/audio';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [user, setUser] = useState<UserProfile>(() => {
    return {
      name: 'Astro Sofi',
      avatar: '🧑‍🚀',
      level: 1,
      xp: 150,
      nextLevelXp: 400,
      starGems: 12,
      streakDays: 5,
      soundEnabled: true,
      completedActivities: ['math_intro'],
    };
  });

  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login',
  });
  const [supportModal, setSupportModal] = useState<{ isOpen: boolean; topic: string }>({
    isOpen: false,
    topic: 'soporte',
  });

  // Scroll to top when changing screens
  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddXp = (amount: number, gems: number = 0) => {
    setUser((prev) => {
      const newXp = prev.xp + amount;
      const newGems = prev.starGems + gems;
      let newLevel = prev.level;
      let newNextLevelXp = prev.nextLevelXp;

      if (newXp >= prev.nextLevelXp) {
        newLevel += 1;
        newNextLevelXp += 350;
        sound.playLevelUp();
      }

      return {
        ...prev,
        xp: newXp,
        starGems: newGems,
        level: newLevel,
        nextLevelXp: newNextLevelXp,
      };
    });
  };

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  const handleAuthSuccess = (name: string) => {
    setUser((prev) => ({
      ...prev,
      name,
      xp: prev.xp + 50,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8FF] text-[#131B2E]">
      {/* Top Navigation */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        user={user}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full">
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={handleNavigate}
            user={user}
            onOpenAccount={() => setIsAccountOpen(true)}
            onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
          />
        )}

        {currentScreen === 'math' && (
          <MathScreen
            onNavigate={handleNavigate}
            user={user}
            onAddXp={handleAddXp}
          />
        )}

        {currentScreen === 'language' && (
          <LanguageScreen
            onNavigate={handleNavigate}
            user={user}
            onAddXp={handleAddXp}
          />
        )}

        {currentScreen === 'biology' && (
          <BiologyScreen
            onNavigate={handleNavigate}
            user={user}
            onAddXp={handleAddXp}
          />
        )}

        {currentScreen === 'english' && (
          <EnglishScreen
            onNavigate={handleNavigate}
            user={user}
            onAddXp={handleAddXp}
          />
        )}

        {currentScreen === 'videos' && (
          <VideosScreen
            onNavigate={handleNavigate}
            user={user}
            onAddXp={handleAddXp}
          />
        )}

        {currentScreen === 'challenges' && (
          <ChallengesScreen
            onNavigate={handleNavigate}
            user={user}
            onAddXp={handleAddXp}
          />
        )}

        {currentScreen === 'explore' && (
          <ExploreScreen
            onNavigate={handleNavigate}
            user={user}
          />
        )}
      </main>

      {/* Bottom Footer & Floating Account Button */}
      <Footer
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenSupport={(topic) => setSupportModal({ isOpen: true, topic })}
      />

      {/* Interactive Modals */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        user={user}
        onUpdateUser={handleUpdateUser}
      />

      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        initialMode={authModal.mode}
        onSuccess={handleAuthSuccess}
      />

      <ParentModal
        isOpen={supportModal.isOpen}
        onClose={() => setSupportModal({ ...supportModal, isOpen: false })}
        topic={supportModal.topic}
      />
    </div>
  );
}
