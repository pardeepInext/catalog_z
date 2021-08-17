import bgImg from '../../img/hero.jpg'
import React, { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
import axios from '../axios';
const Contact = () => {
  useEffect(() => document.title = "Contact");
  const [contactData, setcontactData] = useState({ name: "", email: "", message: "", subject: "" });
  const [subjects] = useState(['Sales', 'Creative', 'UI/Ux']);
  const [isSending, setisSending] = useState(false);
  const [error, seterror] = useState({});
  const Subject = () => subjects.map((subject, key) => (<option key={key} value={subject}>{subject}</option>))

  const sendMessage = async () => {
    setisSending(true);
    await axios.post(`contact`, contactData)
      .then(res => {
        setisSending(false);
        if (res.data.success) {
          Notify.success("message is sent");
          setcontactData({ ...contactData, name: "", email: "", message: "", subject: "" })
        } else {
          seterror(res.data.error);
        }
      })
      .catch(err => Notify.success(`Somthing went wrong. Please refresh page. error:${err.message}`));


  }

  return (
    <>
      <div className="tm-hero d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${bgImg})`, backgroundAttachment: 'fixed' }}></div>
      <div className="container-fluid tm-mt-60">
        <div className="row tm-mb-50">
          <div className="col-lg-4 col-12 mb-5">
            <h2 className="tm-text-primary mb-5">Contact Page</h2>
            <form id="contact-form" className="tm-contact-form mx-auto">
              <div className="form-group">
                <input type="text" name="name" className={`form-control rounded-0 ${error.name ? 'is-invalid' : ''}`} placeholder="Name" value={contactData.name}
                  onChange={(e) => setcontactData({ ...contactData, ['name']: e.target.value })}
                />
                {error.name ? (<span className="text-danger fw-bold">{error.name}</span>) : ""}
              </div>
              <div className="form-group">
                <input type="email" name="email" className={`form-control rounded-0 ${error.email ? 'is-invalid' : ''}`} placeholder="Email"
                  value={contactData.email}
                  onChange={(e) => setcontactData({ ...contactData, ['email']: e.target.value })}
                />
                {error.email ? (<span className="text-danger fw-bold">{error.email}</span>) : ""}
              </div>
              <div className="form-group">
                <select className={`form-control ${error.email ? 'is-invalid' : ''}`} id="contact-select" name="inquiry"
                  value={contactData.subject} onChange={(e) => setcontactData({ ...contactData, subject: e.target.value })}
                >
                  <option value="-">Subject</option>
                  <Subject />
                </select>
                {error.subject ? (<span className="text-danger fw-bold">{error.subject}</span>) : ""}
              </div>
              <div className="form-group">
                <textarea rows="8" name="message" className={`form-control rounded-0 ${error.message ? 'is-invalid' : ''}`} placeholder="Message"
                  value={contactData.message} onChange={(e) => setcontactData({ ...contactData, message: e.target.value })}
                ></textarea>
                {error.message ? (<span className="text-danger fw-bold">{error.message}</span>) : ""}
              </div>

              <div className="form-group tm-text-right">
                <button type="button" className="btn btn-primary" onClick={sendMessage}
                  disabled={isSending}
                >
                  {isSending ? <i className="fas fa-cog fa-spin"></i> : ""}
                  Send
                </button>
              </div>
            </form>
          </div>
          <div className="col-lg-4 col-12 mb-5">
            <div className="tm-address-col">
              <h2 className="tm-text-primary mb-5">Our Address</h2>
              <p className="tm-mb-50">Quisque eleifend mi et nisi eleifend pretium. Duis porttitor accumsan arcu id rhoncus. Praesent fermentum venenatis ipsum, eget vestibulum purus. </p>
              <p className="tm-mb-50">Nulla ut scelerisque elit, in fermentum ante. Aliquam congue mattis erat, eget iaculis enim posuere nec. Quisque risus turpis, tempus in iaculis.</p>
              <address className="tm-text-gray tm-mb-50">
                120-240 Fusce eleifend varius tempus<br></br>
                  Duis consectetur at ligula 10660
              </address>
              <ul className="tm-contacts">
                <li>
                  <a href="false" className="tm-text-gray">
                    <i className="fas fa-envelope"></i>
                                Email: info@company.com
                  </a>
                </li>
                <li>
                  <a href="false" className="tm-text-gray">
                    <i className="fas fa-phone"></i>
                                Tel: 010-020-0340
                            </a>
                </li>
                <li>
                  <a href="false" className="tm-text-gray">
                    <i className="fas fa-globe"></i>
                                URL: www.company.com
                            </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-12">
            <h2 className="tm-text-primary mb-5">Our Location</h2>
            <div className="mapouter mb-4">
              <div className="gmap-canvas">
                <iframe width="100%" height="520" id="gmap-canvas"
                  src="https://maps.google.com/maps?q=Av.+L%C3%BAcio+Costa,+Rio+de+Janeiro+-+RJ,+Brazil&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;