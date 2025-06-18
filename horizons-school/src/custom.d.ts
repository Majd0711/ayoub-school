// Component declarations
declare module './components/Header' {
  import React from 'react';
  const Header: React.FC;
  export default Header;
}

declare module './components/Footer' {
  import React from 'react';
  const Footer: React.FC;
  export default Footer;
}

// Page declarations
declare module './pages/Home' {
  import React from 'react';
  const Home: React.FC;
  export default Home;
}

declare module './pages/About' {
  import React from 'react';
  const About: React.FC;
  export default About;
}

declare module './pages/Programs' {
  import React from 'react';
  const Programs: React.FC;
  export default Programs;
}

declare module './pages/Contact' {
  import React from 'react';
  const Contact: React.FC;
  export default Contact;
}

// Image module declarations
declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}