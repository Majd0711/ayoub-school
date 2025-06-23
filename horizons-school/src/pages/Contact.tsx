import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import 'boxicons/css/boxicons.min.css';
import AOS from 'aos';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState<'success' | 'danger'>('success');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    AOS.refresh();
    // Initialize EmailJS with your public key
    emailjs.init("YOUR_PUBLIC_KEY"); // You'll need to replace this with your actual public key
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const templateParams = {
        from_name: formState.name,
        from_email: formState.email,
        from_phone: formState.phone,
        subject: formState.subject,
        message: formState.message,
        to_email: 'horizonsschool4@gmail.com'
      };

      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        templateParams
      );

      setAlertVariant('success');
      setAlertMessage('Votre message a été envoyé avec succès! Nous vous contacterons très bientôt.');
      setShowAlert(true);
      
      // Reset form
      setFormState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setAlertVariant('danger');
      setAlertMessage('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.');
      setShowAlert(true);
    }

    // Hide alert after 5 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  return (
    <>
      {/* Contact Hero */}
      <section className="bg-primary text-white py-5 mb-5">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center" data-aos="fade-up">
              <h1 className="display-5 fw-bold mb-4">Contactez-nous</h1>
              <p className="lead">
                Nous sommes à votre disposition pour répondre à toutes vos questions 
                concernant nos programmes et les admissions.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Information & Form */}
      <section className="py-5">
        <Container>
          <Row>
            <Col lg={5} className="mb-5 mb-lg-0" data-aos="fade-right">
              <h2 className="mb-4">Nos Coordonnées</h2>
              <Card className="border-0 shadow-sm mb-4">
                <Card.Body>
                  <h5 className="fw-bold">Informations de Contact</h5>
                  <hr />
                  <ul className="list-unstyled mb-0">
                    <li className="d-flex mb-3">
                      <i className='bx bx-map text-primary mt-1 me-3'></i>
                      <div>
                        <strong>Adresse</strong>
                        <p className="mb-0">Mhamid Maatalah, Marrakech, Maroc</p>
                      </div>
                    </li>
                    <li className="d-flex mb-3">
                      <i className='bx bx-phone text-primary mt-1 me-3'></i>
                      <div>
                        <strong>Téléphone</strong>
                        <p className="mb-0">+212 5 25 18 16 50</p>
                      </div>
                    </li>
                    <li className="d-flex mb-3">
                      <i className='bx bx-envelope text-primary mt-1 me-3'></i>
                      <div>
                        <strong>Email</strong>
                        <p className="mb-0">horizonsschool4@gmail.com</p>
                      </div>
                    </li>
                    <li className="d-flex">
                      <i className='bx bx-time text-primary mt-1 me-3'></i>
                      <div>
                        <strong>Horaires d'Ouverture</strong>
                        <p className="mb-0">Lundi - Samedi: 8h30 - 22h00</p>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>

              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <h5 className="fw-bold">Service des Admissions</h5>
                  <hr />
                  <p>
                    Pour toute information concernant les admissions, veuillez contacter notre 
                    service dédié par téléphone ou par email.
                  </p>
                  <p className="mb-0">
                    <strong>Email:</strong> horizonsschool4@gmail.com
                  </p>
                  <p className="mb-0">
                    <strong>Téléphone:</strong> +212 5 25 18 16 50
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={7} data-aos="fade-left">
              <h2 className="mb-4">Envoyez-nous un Message</h2>
              {showAlert && (
                <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                  {alertMessage}
                </Alert>
              )}
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group controlId="name">
                          <Form.Label>Nom Complet*</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="name" 
                            value={formState.name}
                            onChange={handleChange}
                            required 
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group controlId="email">
                          <Form.Label>Email*</Form.Label>
                          <Form.Control 
                            type="email" 
                            name="email" 
                            value={formState.email}
                            onChange={handleChange}
                            required 
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group controlId="phone">
                          <Form.Label>Téléphone</Form.Label>
                          <Form.Control 
                            type="tel" 
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group controlId="subject">
                          <Form.Label>Sujet*</Form.Label>
                          <Form.Select 
                            name="subject"
                            value={formState.subject}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Sélectionnez un sujet</option>
                            <option value="Information générale">Information générale</option>
                            <option value="Admission">Admission</option>
                            <option value="Programme d'études">Programme d'études</option>
                            <option value="Frais de scolarité">Frais de scolarité</option>
                            <option value="Autre">Autre</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-4" controlId="message">
                      <Form.Label>Message*</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={5} 
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required 
                      />
                    </Form.Group>
                    <Button type="submit" variant="primary" size="lg">
                      Envoyer le Message
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Map Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5" data-aos="fade-up">Notre Emplacement</h2>
          <div className="ratio ratio-21x9" data-aos="fade-up" style={{ maxHeight: '400px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3398.9529410414386!2d-8.052918!3d31.600363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafe996d6de9e5d%3A0x324a1711386422ff!2sHorizons%20school!5e0!3m2!1sen!2sma!4v16249329284!5m2!1sen!2sma"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '0.5rem' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Horizons School Location"
            />
          </div>
        </Container>
      </section>
    </>
  );
};

export default Contact; 