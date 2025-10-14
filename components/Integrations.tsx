export default function Integrations() {
  const integrations = [
    {
      name: "Figma",
      icon: "🎨",
      color: "bg-purple-100 text-purple-600",
      position: "top-1/4 left-1/2 transform -translate-x-1/2"
    },
    {
      name: "Notion",
      icon: "📝",
      color: "bg-gray-100 text-gray-600",
      position: "top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2"
    },
    {
      name: "Spark",
      icon: "✨",
      color: "bg-yellow-100 text-yellow-600",
      position: "top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2"
    },
    {
      name: "Slack",
      icon: "💬",
      color: "bg-green-100 text-green-600",
      position: "bottom-1/4 left-1/3 transform -translate-x-1/2"
    },
    {
      name: "Dropbox",
      icon: "📦",
      color: "bg-blue-100 text-blue-600",
      position: "bottom-1/4 left-1/2 transform -translate-x-1/2"
    },
    {
      name: "Telegram",
      icon: "📱",
      color: "bg-blue-100 text-blue-600",
      position: "bottom-1/4 right-1/3 transform translate-x-1/2"
    }
  ];

  return (
    <section id="integrations" className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Integrations
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-blue-500">Everything you need</span>, Talking Together
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your apps, your workflows, perfectly in sync. Just the way it should be.
          </p>
        </div>

        {/* Integrations Visual */}
        <div className="relative h-96 max-w-4xl mx-auto">
          {/* Central Hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">N</span>
            </div>
          </div>

          {/* Integration Icons */}
          {integrations.map((integration, index) => (
            <div
              key={index}
              className={`absolute ${integration.position} animate-pulse`}
              style={{
                animationDelay: `${index * 0.2}s`,
                animationDuration: '2s'
              }}
            >
              <div className={`w-16 h-16 ${integration.color} rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200 cursor-pointer`}>
                <span className="text-2xl">{integration.icon}</span>
              </div>
              <div className="text-center mt-2">
                <span className="text-sm font-medium text-gray-700">
                  {integration.name}
                </span>
              </div>
            </div>
          ))}

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {integrations.map((_, index) => {
              const angles = [0, 60, 120, 180, 240, 300];
              const angle = angles[index] * (Math.PI / 180);
              const radius = 120;
              const x1 = 50; // Center percentage
              const y1 = 50; // Center percentage
              const x2 = 50 + (radius / 4) * Math.cos(angle);
              const y2 = 50 + (radius / 4) * Math.sin(angle);
              
              return (
                <line
                  key={index}
                  x1={`${x1}%`}
                  y1={`${y1}%`}
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke="#e5e7eb"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />
              );
            })}
          </svg>
        </div>

        {/* Integration Grid for Mobile */}
        <div className="md:hidden mt-12 grid grid-cols-3 gap-6">
          {integrations.map((integration, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 ${integration.color} rounded-full flex items-center justify-center shadow-md mx-auto mb-2`}>
                <span className="text-2xl">{integration.icon}</span>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {integration.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}