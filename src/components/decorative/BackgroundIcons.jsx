import React from 'react';
import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BuildIcon from '@mui/icons-material/Build';
import SchoolIcon from '@mui/icons-material/School';
import SpeedIcon from '@mui/icons-material/Speed';

/**
 * Decoratieve achtergrond iconen die subtiel over de pagina zweven
 * @param {Object} props - Component props
 * @param {string} props.position - CSS position waarde (default: 'absolute')
 * @param {number} props.opacity - Opacity van de iconen (default: 0.15)
 * @param {number} props.count - Aantal iconen om te tonen (default: 4)
 * @param {string} props.zIndex - CSS z-index waarde (default: 0)
 */
const BackgroundIcons = ({ 
  position = 'absolute', 
  opacity = 0.15, 
  count = 4,
  zIndex = 0
}) => {
  const theme = useTheme();
  
  // Iconen en hun kleuren
  const icons = [
    { 
      Icon: DirectionsCarIcon, 
      color: theme.palette.primary.main,
      size: { xs: 60, md: 100 },
      initialPosition: { x: -100, y: 0 },
      animatePosition: { x: 0, y: 0 },
      delay: 0.5
    },
    { 
      Icon: BuildIcon, 
      color: theme.palette.secondary.main,
      size: { xs: 50, md: 80 },
      initialPosition: { x: 0, y: 100 },
      animatePosition: { x: 0, y: 0 },
      delay: 0.8
    },
    { 
      Icon: SchoolIcon, 
      color: theme.palette.tertiary.main,
      size: { xs: 40, md: 70 },
      initialPosition: { x: 0, y: 0, rotate: -45 },
      animatePosition: { x: 0, y: 0, rotate: 0 },
      delay: 1.2
    },
    { 
      Icon: SpeedIcon, 
      color: theme.palette.primary.dark,
      size: { xs: 45, md: 75 },
      initialPosition: { x: 0, y: 0, scale: 0 },
      animatePosition: { x: 0, y: 0, scale: 1 },
      delay: 1
    }
  ];
  
  // Posities voor de iconen (kan worden uitgebreid voor meer variatie)
  const positions = [
    { bottom: '15%', left: '5%' },
    { bottom: '25%', right: '15%' },
    { top: '20%', right: '10%' },
    { top: '30%', left: '15%' },
    { bottom: '40%', left: '30%' },
    { top: '40%', right: '30%' },
    { top: '10%', left: '40%' },
    { bottom: '10%', right: '40%' }
  ];
  
  // Selecteer het aantal iconen dat we willen tonen
  const selectedIcons = icons.slice(0, Math.min(count, icons.length));
  
  return (
    <Box sx={{ 
      position: position,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      zIndex: zIndex,
      top: 0,
      left: 0,
      pointerEvents: 'none' // Zorgt dat de iconen niet klikbaar zijn
    }}>
      {selectedIcons.map((icon, index) => {
        // Kies een positie uit de array, of gebruik een fallback als er niet genoeg posities zijn
        const positionStyle = positions[index % positions.length];
        
        return (
          <motion.div
            key={index}
            initial={icon.initialPosition}
            animate={icon.animatePosition}
            transition={{ 
              duration: 1.5, 
              delay: icon.delay,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: Math.random() * 5 + 5, // Random delay tussen 5-10 seconden voor subtiele beweging
            }}
            style={{
              position: 'absolute',
              ...positionStyle,
            }}
          >
            <icon.Icon sx={{ 
              fontSize: icon.size, 
              color: icon.color,
              opacity: opacity
            }} />
          </motion.div>
        );
      })}
    </Box>
  );
};

export default BackgroundIcons;
