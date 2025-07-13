import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import navigation hook
import { LineChart, ShieldCheck, Zap, Users, Clock, Coins } from 'lucide-react';

const services = [
  {
    icon: <LineChart className="h-8 w-8" />,
    title: 'Market Analysis',
    description: 'Real-time market analysis with advanced technical indicators',
    price: '$10',
    features: [
      'Real-time market data',
      'Technical indicators',
      'Market sentiment analysis',
      'Basic predictions'
    ]
  },
  {
    icon: <ShieldCheck className="h-8 w-8" />,
    title: 'Premium Trading',
    description: 'Advanced trading features with AI-powered insights',
    price: '$25',
    features: [
      'All Basic features',
      'AI predictions',
      'Portfolio optimization',
      'Risk management tools',
      'Priority support'
    ]
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: 'Enterprise',
    description: 'Custom solutions for institutional investors',
    price: 'Custom',
    features: [
      'All Premium features',
      'Custom integrations',
      'Dedicated support',
      'API access',
      'Custom reporting'
    ]
  }
];

export default function Services() {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="container mx-auto px-4">
      {/* Pricing Section */}
      <section className="py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
            onClick={() => navigate('/dashboard')} // Redirects to dashboard
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-navy-900 rounded-xl p-8 border border-emerald-500/20 hover:border-emerald-500/40 transition-all"
            >
              <div className="text-emerald-500 mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-400 mb-4">{service.description}</p>
              <div className="text-3xl font-bold text-emerald-500 mb-6">
                {service.price}
                {service.price !== 'Custom' && <span className="text-lg text-gray-400">/mo</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <span className="mr-2 text-emerald-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              {/* Button to Route to Dashboard */}
              <button
                onClick={() => navigate('/dashboard')} // Redirects to dashboard
                className="w-full px-6 py-3 bg-emerald-500 text-navy-900 rounded-lg hover:bg-emerald-600 transition-colors font-semibold"
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
