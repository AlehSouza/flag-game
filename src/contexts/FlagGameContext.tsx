// FlagGameContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface GameConfig {
  difficulty: string;
  maxAttempts: number;
  lifes: number;
  timeLimit: number; // seconds
}

interface FlagGameContextType {
  gameConfig: GameConfig;
  setGameConfig: React.Dispatch<React.SetStateAction<GameConfig>>;
}

const FlagGameContext = createContext<FlagGameContextType | undefined>(undefined);

export function FlagGameProvider({ children }: { children: ReactNode }) {
  const [gameConfig, setGameConfig] = useState<GameConfig>({
    difficulty: '',
    maxAttempts: 3,
    lifes: 3,
    timeLimit: 60 // seconds
  });

  return (
    <FlagGameContext.Provider value={{ gameConfig, setGameConfig }}>
      {children}
    </FlagGameContext.Provider>
  );
}

export function useFlagGame() {
  const context = useContext(FlagGameContext);
  if (!context) {
    throw new Error('useFlagGame must be used within a FlagGameProvider');
  }
  return context;
}
