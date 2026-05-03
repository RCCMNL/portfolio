import React from 'react';
import {
  Server, Globe, Database, Terminal, Code2, Layout, Cpu, Smartphone,
  Cloud, Shield, Zap, GitBranch, Palette, Box, Layers, Monitor,
  Wifi, Lock, Settings, BarChart3, Braces, FileCode, Rocket, Wrench
} from 'lucide-react';

/**
 * Mappa nomi stringa → componenti icona Lucide.
 * Usata per convertire i nomi salvati in Firestore in componenti React.
 */
const ICON_MAP = {
  Server, Globe, Database, Terminal, Code2, Layout, Cpu, Smartphone,
  Cloud, Shield, Zap, GitBranch, Palette, Box, Layers, Monitor,
  Wifi, Lock, Settings, BarChart3, Braces, FileCode, Rocket, Wrench
};

/** Lista dei nomi icona disponibili per il selettore nell'admin */
export const AVAILABLE_ICONS = Object.keys(ICON_MAP);

/**
 * Restituisce un componente icona React dato il nome stringa.
 * @param {string} name - Nome dell'icona (es. "Server")
 * @param {number} size - Dimensione dell'icona
 * @returns {JSX.Element}
 */
export const getIconComponent = (name, size = 24) => {
  const IconComponent = ICON_MAP[name];
  if (!IconComponent) return <Code2 size={size} />;
  return <IconComponent size={size} />;
};
