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
                href="https://wa.me/+212600000000"
                className="contact-card whatsapp"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >                {React.createElement(BsWhatsapp, { size: 24 })}
                <h4>WhatsApp</h4>
                <p>Cliquez pour chatter</p>
              </motion.a>
            </Col>

            <Col md={6} lg={3}>
              <motion.div
                className="contact-card phone"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                {React.createElement(BsPhone, { size: 24 })}
                <h4>Téléphone</h4>
                <p>+212 600-000000</p>
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
                <p>contact@horizons.ma</p>
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3398.9529410414386!2d-8.0297!3d31.6295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDM3JzQ2LjIiTiA4wrAwMSc0Ni45Ilc!5e0!3m2!1sen!2sma!4v1624932體9284!5m2!1sen!2sma"
                  width="100%"
                  height="400"
                  style={{ border: 0, borderRadius: '1rem' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
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
