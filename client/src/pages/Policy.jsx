import React from 'react'
import Layout from '../component/layout/layout'

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row policy-page">
        <div className="col-md-6">
          <img
            src="/images/privacy.webp"
            alt="Privacy Policy"
            style={{ width: "100%", marginBottom: "20px" }}
          />
           <img
            src="/images/privacy-policy-2.jpg"
            alt="Privacy Policy"
            style={{ width: "100%", marginBottom: "20px" }}
          />
        </div>
        <div className="col-md-6">
          <h2 className="mb-4">Privacy Policy</h2>
          <p>
            At T-Rendify, we value your privacy and are committed to protecting
            your personal information. This Privacy Policy explains how we
            collect, use, and safeguard your data when you visit our website or
            make a purchase.
          </p>
          <h4>1. Information We Collect</h4>
          <p>
            We collect personal information that you provide to us when you
            register on our site, place an order, subscribe to our newsletter,
            or interact with our customer service. This may include your name,
            email address, shipping address, payment details, and any other
            information you choose to provide.
          </p>
          <h4>2. How We Use Your Information</h4>
          <p>
            We use your personal information to process your orders, provide
            customer support, send promotional emails (if you have opted in),
            and improve your shopping experience. We may also use your
            information to comply with legal obligations or to protect our
            rights.
          </p>
          <h4>3. Data Protection</h4>
          <p>
            We implement a variety of security measures to maintain the safety
            of your personal information. Your data is stored on secure servers,
            and all transactions are processed through a gateway provider and
            are not stored or processed on our servers.
          </p>
          <h4>4. Third-Party Disclosure</h4>
          <p>
            We do not sell, trade, or otherwise transfer to outside parties your
            personal information unless we provide you with advance notice. This
            does not include website hosting partners and other parties who
            assist us in operating our website, conducting our business, or
            servicing you, so long as those parties agree to keep this
            information confidential.
          </p>
          <h4>5. Your Consent</h4>
          <p>
            By using our site, you consent to our Privacy Policy. If we decide
            to change our Privacy Policy, we will post those changes on this
            page.
          </p>
          <h4>6. Contact Us</h4>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at support@t-rendify.com.
          </p>
        </div>
      </div>
    </Layout>
  );
};


export default Policy