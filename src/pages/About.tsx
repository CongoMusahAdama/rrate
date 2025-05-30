
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Shield, Zap, Users, Award, Target } from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    title: 'AI-Powered Analytics',
    description: 'Advanced machine learning algorithms analyze market trends and property data to provide accurate price predictions.'
  },
  {
    icon: Shield,
    title: 'Data Security',
    description: 'Your information is protected with bank-level security and encrypted data transmission.'
  },
  {
    icon: Zap,
    title: 'Real-Time Updates',
    description: 'Get instant property valuations with real-time market data integration.'
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Our team combines real estate expertise with cutting-edge technology.'
  }
];

const stats = [
  { number: '50K+', label: 'Properties Analyzed' },
  { number: '94.2%', label: 'Prediction Accuracy' },
  { number: '10K+', label: 'Happy Customers' },
  { number: '5+', label: 'Years Experience' }
];

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-20 pb-12">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-teal-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                About
                <span className="block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                  RealEstate AI
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We're revolutionizing real estate with artificial intelligence, providing accurate property valuations 
                and helping people make informed decisions about their most important investments.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full mb-6">
                  <Target className="w-4 h-4 mr-2" />
                  Our Mission
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Making Real Estate
                  <span className="text-blue-600"> Transparent & Accessible</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  We believe everyone deserves access to accurate, unbiased property information. 
                  Our AI-powered platform democratizes real estate insights, helping buyers, sellers, 
                  and investors make confident decisions.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  By combining cutting-edge machine learning with comprehensive market data, 
                  we're building the future of property valuation and real estate intelligence.
                </p>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Modern Architecture"
                    className="w-full h-96 object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl">
                  <div className="flex items-center">
                    <Award className="w-8 h-8 text-blue-600 mr-3" />
                    <div>
                      <div className="font-bold text-gray-900">Industry Leader</div>
                      <div className="text-sm text-gray-600">AI Real Estate Tech</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Why Choose RealEstate AI?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We combine advanced technology with real estate expertise to deliver unparalleled accuracy and insights.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg flex items-center justify-center mb-6">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experienced professionals combining real estate knowledge with cutting-edge AI technology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Sarah Chen',
                  role: 'CEO & Co-Founder',
                  bio: 'Former VP at Zillow with 15+ years in real estate technology.',
                  image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
                },
                {
                  name: 'Michael Rodriguez',
                  role: 'CTO & Co-Founder',
                  bio: 'AI research scientist with expertise in machine learning and data science.',
                  image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
                },
                {
                  name: 'Emily Johnson',
                  role: 'VP of Product',
                  bio: 'Product leader focused on creating intuitive experiences for real estate professionals.',
                  image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
                }
              ].map((member, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Experience the Future of Real Estate?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust our AI-powered platform for accurate property valuations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/predict"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Get Price Estimate
              </a>
              <a
                href="/properties"
                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Browse Properties
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
