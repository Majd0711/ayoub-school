import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import 'boxicons/css/boxicons.min.css';
import './WhatsAppFloat.css';

// Define message options
const MESSAGES = [
  "Besoin d'aide ?",
  "Posez-nous vos questions !",
  "On vous répond rapidement",
  "Contactez-nous sur WhatsApp"
];

// Animation variants
const bubbleVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.8 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 300
    }
  },
  hover: {
    scale: 1.05,
    transition: { 
      type: 'spring',
      stiffness: 400,
      damping: 10
    }
  },
  tap: { 
    scale: 0.95 
  }
};

const messageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3
    }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: {
      duration: 0.2
    }
  }
};

// Define the component props interface
interface WhatsAppFloatProps {
  // You can add any props here if needed in the future
}

const WhatsAppFloat: React.FC<WhatsAppFloatProps> = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [currentMessage, setCurrentMessage] = useState<string>(MESSAGES[0]);
  const phoneNumber = '212604916565';
  const message = 'Bonjour, je souhaite plus d\'informations sur vos formations.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    // Show the button after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 300
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const iconVariants = {
    initial: {
      rotate: 0
    },
    animate: {
      rotate: [0, 10, -10, 10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 3
      }
    }
  };

  const pulseVariants = {
    initial: {
      scale: 1,
      opacity: 0.7,
    },
    animate: {
      scale: 1.5,
      opacity: 0,
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop' as const,
        ease: 'easeOut'
      }
    }
  };

  const tooltipVariants = {
    hidden: { 
      opacity: 0, 
      x: 20,
      transition: {
        duration: 0.2
      }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.3,
        ease: 'easeOut'
      } 
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="whatsapp-float-container">
          {/* Chat Bubble */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`bubble-${currentMessage}`}
              className="chat-bubble"
              variants={bubbleVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <motion.div 
                className="bubble-tail"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1,
                    transition: { delay: 0.2 }
                  }
                }}
              />
              <div className="bubble-content">
                <motion.div 
                  className="bubble-message"
                  variants={messageVariants}
                  key={currentMessage}
                >
                  {currentMessage}
                </motion.div>
                <div className="bubble-time">En ligne</div>
              </div>
              <motion.div 
                className="bubble-avatar"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  transition: { delay: 0.3 }
                }}
              >
                <div className="avatar-inner">
                  <i className="bx bxl-whatsapp"></i>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* WhatsApp Button */}
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-button"
            variants={bubbleVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label="Contactez-nous sur WhatsApp"
          >
            <motion.div 
              className="button-inner"
              animate={isHovered ? "hover" : "visible"}
            >
              <i className="bx bxl-whatsapp"></i>
              <motion.span 
                className="unread-badge"
                initial={{ scale: 0 }}
                animate={{ 
                  scale: 1,
                  transition: { 
                    type: 'spring',
                    stiffness: 500,
                    damping: 15,
                    delay: 0.5
                  } 
                }}
              >
                1
              </motion.span>
            </motion.div>
            <motion.div 
              className="button-pulse"
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{
                scale: 1.4,
                opacity: 0,
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeOut'
                }
              }}
            />
          </motion.a>
        </div>
      )}
    </AnimatePresence>
  );
};

// Default export for the component
export default WhatsAppFloat;
