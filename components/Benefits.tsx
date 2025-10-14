export default function Benefits() {
  const benefits = [
    {
      icon: "🔗",
      title: "Streamlined Collaboration",
      description: "Connect effortlessly with real-time syncing and shared workspaces."
    },
    {
      icon: "🚀",
      title: "Enhanced Productivity", 
      description: "Eliminate repetitive tasks with smart automation solutions."
    },
    {
      icon: "📈",
      title: "Scalable Solutions",
      description: "Built to grow with your team, no matter your size or industry."
    },
    {
      icon: "🔒",
      title: "Secure and Reliable",
      description: "Enterprise-grade security ensures your data stays safe and accessible."
    },
    {
      icon: "⚙️",
      title: "Customizable Workflows",
      description: "Adapt Noto to fit your unique business processes effortlessly."
    },
    {
      icon: "🔄",
      title: "Seamless Integrations",
      description: "Works with your favorite tools for a cohesive workflow experience."
    }
  ];

  return (
    <section id="benefits" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Benefits
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-blue-500">Noto</span>?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to collaborate, create, and scale, all in one place.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">{benefit.icon}</span>
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}