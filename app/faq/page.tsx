import { client, FAQS_QUERY } from "@/lib/sanity";
import { FAQClient } from "@/components/FAQClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about electric scooters, delivery, warranty and more.",
};

export const revalidate = 300;

const demoFaqs = [
  {
    _id: "faq-1",
    question: "Do you offer test rides?",
    answer: "Yes! Test rides are available at all our branches in Beirut. Just walk in during opening hours and our team will help you find the perfect scooter.",
  },
  {
    _id: "faq-2",
    question: "What warranty comes with each scooter?",
    answer: "All scooters come with the manufacturer's official warranty, typically 12 months on the frame and 6 months on the battery and electronics. We handle all warranty claims directly.",
  },
  {
    _id: "faq-3",
    question: "Do you deliver across Lebanon?",
    answer: "Yes, we deliver nationwide! Delivery within Beirut is free on orders over $500. For other areas, a delivery fee applies based on location. Estimated delivery time is 1-3 business days.",
  },
  {
    _id: "faq-4",
    question: "Can I pay in Lebanese pounds (LBP)?",
    answer: "Yes, we accept both USD and LBP at the current Sayrafa rate. Payment options include cash, Whish Money, and OMT transfer.",
  },
  {
    _id: "faq-5",
    question: "Do you offer installment plans?",
    answer: "Yes! We offer flexible installment plans starting at 3 months. Contact us on WhatsApp for more details and to check your eligibility.",
  },
  {
    _id: "faq-6",
    question: "Can electric scooters be used in Lebanese traffic?",
    answer: "Electric scooters are a great way to navigate Lebanese streets. We recommend models with higher ground clearance for rough roads. Always wear a helmet and follow traffic laws.",
  },
  {
    _id: "faq-7",
    question: "How long does it take to charge a scooter?",
    answer: "Charging time varies by model. Most city scooters take 4-8 hours for a full charge. Performance models with larger batteries may take 8-12 hours. We also sell fast chargers to reduce charge time.",
  },
  {
    _id: "faq-8",
    question: "Do you offer repairs and servicing?",
    answer: "Absolutely! Our certified technicians can handle everything from tire changes and brake adjustments to battery replacements and firmware updates. Book a service appointment via WhatsApp.",
  },
];

export default async function FAQPage() {
  let faqs = [];
  try {
    faqs = await client.fetch(FAQS_QUERY);
  } catch {
    // Sanity not configured
  }

  if (!faqs.length) faqs = demoFaqs;

  return <FAQClient faqs={faqs} />;
}
