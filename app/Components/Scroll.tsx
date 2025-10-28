"use client"

export default function MarqueeText() {
  const messages = [
    "🚀 Welcome to our website! lorem kjekke ekeke eke ekeke  Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, qui consequatur odio  Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, qui consequatur odio",
    "💥 Enjoy amazing discounts today!  Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, qui consequatur odio",
    "🎉 New arrivals now available!  Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, qui consequatur odio",
    "🛍️ Free shipping on all orders!"
  ];

  return (
    <div className="marquee">
      <div className="marquee-content">
        {messages.map((msg, i) => (
          <span key={i} className="mx-8 text-gray-300 text-sm">
            {msg}
           
          </span>
        ))}
      </div>

    </div>
  );
}
