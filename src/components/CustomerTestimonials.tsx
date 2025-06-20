
const CustomerTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Mensah',
      role: 'Property Buyer',
      content: 'RealRate helped me find the perfect home in Accra. The AI price prediction was spot-on, and I saved thousands on my purchase!'
    },
    {
      id: 2,
      name: 'Kwame Asante',
      role: 'Real Estate Investor',
      content: 'As an investor, accurate property valuations are crucial. RealRate AI predictions have been incredibly reliable for my portfolio decisions.'
    },
    {
      id: 3,
      name: 'Akosua Osei',
      role: 'First-time Buyer',
      content: 'Being a first-time buyer was overwhelming, but RealRate made the process so much easier. I knew exactly what to expect price-wise!'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories from real people who found their dream homes with RealRate
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                {testimonial.content}
              </p>

              {/* Author - Without Image */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-brand-blue to-brand-blue-light flex items-center justify-center mr-4">
                  <span className="text-white font-semibold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-black">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
