import React from 'react';
import Layout from '../component/layout/layout';
import { FaRegBuilding, FaChalkboardTeacher, FaMoneyBillWave, FaHandsHelping, FaFileContract, FaNetworkWired, FaRegLightbulb, FaUsers } from 'react-icons/fa';

function About() {
  return (
    <Layout
      title="About Rendify - Your Sustainable Fashion Brand"
      description="Learn more about Rendify, our mission to make sustainable fashion accessible to everyone. Discover our journey towards zero emissions by 2030."
      keywords={['about Rendify', 'sustainable fashion', 'zero emissions', 'eco-friendly clothing', 'ethical fashion']}
    >
      <div className="container">
        <h1 className="text-center mt-4 mb-4 raleway-example ">About T-Rendify</h1>
        <h4 className="text-justify mb-4 open-sans">
          T-Rendify is dedicated to making eco-friendly fashion accessible to everyone. Our mission is to partner with innovative brands to provide high-quality, environmentally responsible products. By 2030, we are committed to achieving zero emissions and leading the fashion industry towards a sustainable future.
        </h4>
        <div className="row text-center">
          <div className="col-md-3 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <FaRegBuilding size={40} className="mb-3 text-primary" />
                <h5 className="card-title">Supporting Innovation</h5>
                <p className="card-text">
                  Collaborating with brands that advance the adoption of sustainable practices and eco-friendly technologies.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <FaChalkboardTeacher size={40} className="mb-3 text-primary" />
                <h5 className="card-title">Educating and Promoting Awareness</h5>
                <p className="card-text">
                  Raising awareness about the benefits of sustainable fashion and educating consumers on making eco-friendly choices.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <FaMoneyBillWave size={40} className="mb-3 text-primary" />
                <h5 className="card-title">Sustainable Practices</h5>
                <p className="card-text">
                  Implementing and supporting practices that reduce environmental impact and promote sustainability in the fashion industry.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <FaFileContract size={40} className="mb-3 text-primary" />
                <h5 className="card-title">Commitment to Zero Emissions</h5>
                <p className="card-text">
                  Working towards our goal of achieving zero emissions by 2030 through strategic initiatives and partnerships.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <FaNetworkWired size={40} className="mb-3 text-primary" />
                <h5 className="card-title">Strategic Partnerships</h5>
                <p className="card-text">
                  Partnering with businesses and organizations that share our vision for a sustainable future.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <FaHandsHelping size={40} className="mb-3 text-primary" />
                <h5 className="card-title">Community Engagement</h5>
                <p className="card-text">
                  Engaging with communities to foster a collective effort towards sustainable living and environmental stewardship.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <FaRegLightbulb size={40} className="mb-3 text-primary" />
                <h5 className="card-title">Innovation in Sustainability</h5>
                <p className="card-text">
                  Continuously exploring and implementing innovative solutions to enhance our environmental performance.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <FaUsers size={40} className="mb-3 text-primary" />
                <h5 className="card-title">Events and Outreach</h5>
                <p className="card-text">
                  Organizing events and outreach programs to connect with consumers and promote our sustainability goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default About;
