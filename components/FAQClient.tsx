"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

export function FAQClient({ faqs }: { faqs: FAQ[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?._id || null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-900 text-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-500 font-bold text-sm uppercase tracking-widest mb-2">
            Got Questions?
          </p>
          <h1 className="font-display font-bold text-5xl uppercase">FAQ</h1>
          <p className="text-gray-400 mt-3">
            Everything you need to know about electric scooters and our services.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq._id}
              className="border border-gray-100 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenId(openId === faq._id ? null : faq._id)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-red-600 flex-shrink-0 transition-transform duration-200 ${
                    openId === faq._id ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openId === faq._id && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed text-sm border-t border-gray-100 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 bg-gray-900 rounded-2xl p-8 text-center text-white">
          <h3 className="font-display font-bold text-2xl uppercase mb-2">
            Still Have Questions?
          </h3>
          <p className="text-gray-400 mb-6 text-sm">
            Our team is available 7 days a week via WhatsApp.
          </p>
          <a
            href="https://wa.me/96171234567?text=Hi! I have a question about..."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
