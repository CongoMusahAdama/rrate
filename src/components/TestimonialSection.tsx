
const TestimonialSection = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center mb-8">
              <span className="text-2xl font-bold">KD</span>
            </div>
            
            <h3 className="text-2xl font-bold mb-2">Kevin Durant</h3>
            <p className="text-gray-400 mb-6">Founder, La Maison</p>
            
            <div className="space-y-6">
              <div className="w-12 h-px bg-gradient-to-r from-blue-500 to-teal-400"></div>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our business is built off of close relationships and we are glad that we are able to share our positive real estate experiences with our clients.
              </p>
            </div>
          </div>

          {/* Right Content - Quote */}
          <div className="relative">
            <div className="text-8xl text-blue-500/20 font-serif absolute -top-8 -left-4">"</div>
            <blockquote className="text-2xl lg:text-3xl font-light text-white leading-relaxed pl-12">
              Our business is built off of close relationships and we are glad that we are able to share our positive real estate experiences with our clients.
            </blockquote>
          </div>
        </div>

        {/* Partner Logos */}
        <div className="mt-20 pt-12 border-t border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="text-center">
              <div className="text-sm font-semibold tracking-wider">EQUINIX</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold tracking-wider">DIGITAL REALTY</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold tracking-wider">EQUINIX</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold tracking-wider">DIGITAL REALTY</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
