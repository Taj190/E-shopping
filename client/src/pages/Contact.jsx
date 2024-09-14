import React from 'react'
import Layout from '../component/layout/layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact Us - Rendify"}
    description={"Have a question or need support? Contact Rendify's customer service team 24/7. We're here to help with any inquiries about our sustainable fashion products."}
    Keywords= {['contact Rendify', 'customer support', 'sustainable fashion inquiries', 'eco-friendly clothing support', 'Rendify help', 'contact details']}>
      <div className="row contactus policy-page">
        <div className="col-md-6">
          <img
            src="/images/contactus.jpeg"
            alt="Contact Us"
            style={{ width: "100%", marginBottom: "20px" }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="bg-dark p-3 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-4">
            If you have any queries or need more information about our products, feel free to contact us. Our support team is available 24/7 to assist you.
          </p>
          <h4 className="mt-4">Contact Information:</h4>
          <p className="mt-3">
            <BiMailSend /> Email: support@t-rendify.eu
          </p>
          <p className="mt-3">
            <BiPhoneCall /> Phone: +44 20 7946 0958 (UK)
          </p>
          <p className="mt-3">
            <BiSupport /> Toll-Free: 0800 123 4567 (Europe)
          </p>
          <h4 className="mt-4">Office Address:</h4>
          <p className="mt-3">
            T-Rendify Ltd.<br />
            123 Trend Avenue,<br />
            London, UK, SW1A 1AA
          </p>
        </div>
      </div>
    </Layout>
  );
};


export default Contact