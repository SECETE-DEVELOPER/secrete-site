'use client';

import { useState, useEffect } from 'react';
import { useMusic } from '../hooks/useMusic';
import LoginPage from '../components/LoginPage';
import ChatWindow from '../components/ChatWindow';
import RomanticLoader from '../components/RomanticLoader';
import MainEntrance from '../components/MainEntrance';
import EnterMyWorld from '../components/EnterMyWorld';
import LoveLetterPage from '../components/LoveLetterPage';
import WhyYouSpecial from '../components/WhyYouSpecial';
import DistanceLessLove from '../components/DistanceLessLove';
import FinalClosingPage from '../components/FinalClosingPage';
import Layout from '../components/Layout';

function PageContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showMainEntrance, setShowMainEntrance] = useState(false);
  const [stage, setStage] = useState('secret-intro');
  const [showLoveLetter, setShowLoveLetter] = useState(false);
  const [showWhySpecial, setShowWhySpecial] = useState(false);
  const [showDistanceLess, setShowDistanceLess] = useState(false);
  const [showFinalClosing, setShowFinalClosing] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const music = useMusic();

  // Autostart music when MainEntrance appears
  useEffect(() => {
    if (showMainEntrance && music?.isReady && !musicStarted) {
      console.log('🎵 Attempting to autostart music...', { showMainEntrance, isReady: music?.isReady, musicStarted });
      
      // Try to play immediately first
      if (music?.play) {
        music.play().catch((err) => {
          console.log('⚠️ Immediate autoplay blocked by browser:', err);
        });
      }
      
      // Also set flag
      setMusicStarted(true);
    }
  }, [showMainEntrance, music?.isReady, music, musicStarted]);

  const handleLoginSuccess = () => {
    console.log('✅ Authentication successful! Starting journey...');
    setIsAuthenticated(true);
    setShowLoader(true);
  };

  const handleSecretDevContinue = () => {
    console.log('🎯 EnterMyWorld completed - showing LoveLetter');
    setShowLoveLetter(true);
  };

  const handleLoveLetterClose = () => {
    console.log('💌 LoveLetter completed - showing WhySpecial');
    setShowLoveLetter(false);
    setShowWhySpecial(true);
  };

  const handleWhySpecialClose = () => {
    console.log('⭐ WhySpecial completed - showing DistanceLess');
    setShowWhySpecial(false);
    setShowDistanceLess(true);
  };

  const handleDistanceLessClose = () => {
    console.log('🌍 DistanceLess completed - showing FinalClosing');
    setShowDistanceLess(false);
    setStage('final-closing');
    setShowFinalClosing(true);
    if (music?.play) {
      music.play().catch(() => {});
    }
  };

  const handleFinalClosingClose = () => {
    console.log('🎉 Journey complete!');
    setShowFinalClosing(false);
    setStage('secret-intro');
  };

  const handleLoaderComplete = () => {
    setShowLoader(false);
    setShowMainEntrance(true);
  };

  const handleMainEntranceContinue = () => {
    setShowMainEntrance(false);
    setStage('secret-intro');
  };

  return (
    <>
      <Layout>
        {/* Login Page - First screen */}
        {!isAuthenticated && <LoginPage onSuccess={handleLoginSuccess} />}

        {/* Rest of the journey - only after authentication */}
        {isAuthenticated && (
          <>
            {/* Romantic Loader */}
            {showLoader && <RomanticLoader onComplete={handleLoaderComplete} />}

            {/* Main Entrance */}
            {showMainEntrance && <MainEntrance onContinue={handleMainEntranceContinue} />}

            {/* Secret Developer Intro with full romantic journey */}
            {stage === 'secret-intro' && !showFinalClosing && (
              <EnterMyWorld onContinue={handleSecretDevContinue} />
            )}

            {/* Love Letter Page */}
            {showLoveLetter && stage === 'secret-intro' && (
              <LoveLetterPage onClose={handleLoveLetterClose} />
            )}

            {/* Why You're Special Page */}
            {showWhySpecial && stage === 'secret-intro' && (
              <WhyYouSpecial onClose={handleWhySpecialClose} />
            )}

            {/* Distance Less Love Page */}
            {showDistanceLess && stage === 'secret-intro' && (
              <DistanceLessLove onClose={handleDistanceLessClose} />
            )}

            {/* Final Closing Message */}
            {showFinalClosing && (
              <FinalClosingPage onClose={handleFinalClosingClose} />
            )}
          </>
        )}
      </Layout>

      {/* Chat Window - Only after login (private) */}
      {isAuthenticated && (
        <ChatWindow senderName="SECRET_DEV" isAuthenticated={true} />
      )}
    </>
  );
}

export default function Page() {
  return <PageContent />;
}
