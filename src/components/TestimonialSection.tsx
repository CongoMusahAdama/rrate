
const TestimonialSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-8">
              <span className="text-2xl font-bold text-white">CMA</span>
            </div>
            
            <h3 className="text-2xl font-bold mb-2 text-black">Congo Musah Adama</h3>
            <p className="text-gray-600 mb-6">Founder, RealRate</p>
            
            <div className="space-y-6">
              <div className="w-12 h-px bg-gradient-to-r from-orange-500 to-orange-600"></div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our mission is to democratize real estate information in Ghana and help every Ghanaian make informed property decisions with the power of AI.
              </p>
            </div>
          </div>

          {/* Right Content - Quote */}
          <div className="relative">
            <div className="text-8xl text-orange-500/20 font-serif absolute -top-8 -left-4">"</div>
            <blockquote className="text-2xl lg:text-3xl font-light text-black leading-relaxed pl-12">
              Technology should serve everyone. That's why we built RealRate - to give every Ghanaian access to accurate property valuations.
            </blockquote>
          </div>
        </div>

        {/* Partner Logos */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="text-center">
              <div className="text-sm font-semibold tracking-wider text-gray-600">GHANA REAL ESTATE</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold tracking-wider text-gray-600">ACCRA PROPERTIES</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold tracking-wider text-gray-600">TEMA ESTATES</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold tracking-wider text-gray-600">KUMASI HOMES</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
