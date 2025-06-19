import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { BsWhatsapp, BsPhone, BsEnvelope, BsGeoAlt } from 'react-icons/bs';

const ContactSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100 }
    }
  };

  return (
    <section className="contact-section py-5">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <Row className="justify-content-center mb-5">
            <Col md={8} className="text-center">
              <h2 className="display-5 mb-4">Contactez-nous</h2>
              <p className="lead text-muted">
                Nous sommes là pour répondre à toutes vos questions
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            <Col md={6} lg={3}>
              <motion.a
                href="https://wa.me/+212604916565"
                className="contact-card whatsapp"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {React.createElement(BsWhatsapp, { size: 24 })}
                <h4>WhatsApp</h4>
                <div className="d-flex flex-column">
                  <a href="https://wa.me/212604916565" className="text-decoration-none text-dark">+212 6 04 91 65 65</a>
                  <a href="https://wa.me/212601015534" className="text-decoration-none text-dark">+212 6 01 01 55 34</a>
                </div>
              </motion.a>
            </Col>

            <Col md={6} lg={3}>
              <motion.div
                className="contact-card phone"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                {React.createElement(BsPhone, { size: 24 })}
                <h4>Téléphone Fixe</h4>
                <a href="tel:+212525181650" className="text-decoration-none text-dark">+212 5 25 18 16 50</a>
              </motion.div>
            </Col>

            <Col md={6} lg={3}>
              <motion.div
                className="contact-card email"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                {React.createElement(BsEnvelope, { size: 24 })}
                <h4>Email</h4>
                <a href="mailto:horizonsschool4@gmail.com" className="text-decoration-none text-dark">horizonsschool4@gmail.com</a>
              </motion.div>
            </Col>

            <Col md={6} lg={3}>
              <motion.div
                className="contact-card location"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                {React.createElement(BsGeoAlt, { size: 24 })}
                <h4>Adresse</h4>
                <p>Marrakech Mhamid maatalah</p>
              </motion.div>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col>
              <motion.div
                className="map-container"
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3398.9529410414386!2d-8.052918!3d31.600363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafe996d6de9e5d%3A0x324a1711386422ff!2sHorizons%20school!5e0!3m2!1sen!2sma!4v16249329284!5m2!1sen!2sma"
                  width="100%"
                  height="400"
                  style={{ border: 0, borderRadius: '1rem' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Horizons School Location"
                ></iframe>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </section>
  );
};

export default ContactSection;
