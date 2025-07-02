'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggleButton from './theme/ThemeToggleButton';
import { Sparkles, Globe, Palette, Brain, ChevronRight } from 'lucide-react';

const languages = [
  { code: 'mn', name: 'Монгол', flag: '🇲🇳', active: false },
  { code: 'en', name: 'English', flag: '🇺🇸', active: true },
  { code: 'jp', name: '日本語', flag: '🇯🇵', active: false },
];

const RightSidebar = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <motion.aside 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="hidden xl:flex w-72 flex-col border-l border-border/50 bg-sidebar/50 backdrop-blur-xl relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center space-x-2 mb-6"
        >
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          <h3 className="text-lg font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Quick Tools
          </h3>
        </motion.div>

        <div className="space-y-4">
          {/* Language Switcher */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/20 transition-all duration-300 card-hover"
          >
            <button
              onClick={() => toggleSection('language')}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Language</p>
                  <p className="text-xs text-muted-foreground">Switch interface language</p>
                </div>
              </div>
              <ChevronRight 
                className={`w-4 h-4 transition-transform duration-200 ${
                  expandedSection === 'language' ? 'rotate-90' : ''
                }`} 
              />
            </button>
            
            <AnimatePresence>
              {expandedSection === 'language' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="mt-3 space-y-2 overflow-hidden"
                >
                  {languages.map((lang, index) => (
                    <motion.button
                      key={lang.code}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      onClick={() => setSelectedLanguage(lang.code)}
                      className={`
                        w-full flex items-center space-x-3 p-2 rounded-lg text-sm transition-all duration-200
                        ${selectedLanguage === lang.code 
                          ? 'bg-primary/10 text-primary border border-primary/20' 
                          : 'hover:bg-accent/50 text-foreground/80'
                        }
                      `}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                      {selectedLanguage === lang.code && (
                        <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Theme Toggle */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/20 transition-all duration-300 card-hover"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Palette className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Theme</p>
                  <p className="text-xs text-muted-foreground">Toggle dark/light mode</p>
                </div>
              </div>
              <ThemeToggleButton />
            </div>
          </motion.div>

          {/* Graph View */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/20 transition-all duration-300 card-hover group"
          >
            <div className="flex items-center space-x-3 mb-3">
              <Brain className="w-5 h-5 text-primary group-hover:animate-pulse" />
              <div>
                <p className="font-medium text-sm">Graph View</p>
                <p className="text-xs text-muted-foreground">Visual knowledge mapping</p>
              </div>
            </div>
            
            {/* Progress indicator */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Development Progress</span>
                <span className="text-primary font-medium">75%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                />
              </div>
              <p className="text-xs text-muted-foreground italic">
                Coming soon with AI-powered insights
              </p>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10"
          >
            <h4 className="font-medium text-sm mb-3 text-primary">Today's Activity</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Projects', value: '12', icon: '📊' },
                { label: 'Tasks', value: '24', icon: '✅' },
                { label: 'Ideas', value: '8', icon: '💡' },
                { label: 'Notes', value: '16', icon: '📝' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7 + (index * 0.1), duration: 0.3 }}
                  className="text-center p-2 rounded-lg bg-background/50 hover:bg-background/80 transition-all duration-200 cursor-pointer hover-lift"
                >
                  <div className="text-lg mb-1">{stat.icon}</div>
                  <div className="text-lg font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.aside>
  );
};

export default RightSidebar;