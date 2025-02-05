"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs: { question: string; answer: string }[] = [
  {
    question: "What is Next.js?",
    answer: "Next.js is a React framework for production.",
  },
  {
    question: "Is Tailwind CSS good for styling?",
    answer: "Yes, Tailwind CSS makes styling efficient and scalable.",
  },
  {
    question: "How do I deploy a Next.js app?",
    answer: "You can deploy using Vercel, Netlify, or other cloud platforms.",
  },
];

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-md">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full sm:text-lg text-[16px] font-medium"
            >
              {faq.question}
              {openIndex === index ? (
                <Minus className="w-6 h-6" />
              ) : (
                <Plus className="w-6 h-6" />
              )}
            </button>

            {/* Open/Hide Animation without text animation */}
            <div
              className={`transition-[max-height] duration-300 overflow-hidden ${
                openIndex === index ? "max-h-40 mt-2" : "max-h-0"
              }`}
            >
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
