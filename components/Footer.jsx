"use client";

import { sendContactEmail } from "@/app/action";
import { toast } from "sonner";
import { useRef } from "react";

export default function Footer() {
  const formRef = useRef(null);

  const handleSendEmail = async (formData) => {
    const result = await sendContactEmail(formData);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(result.message || "Your message has been sent!");
      formRef.current?.reset();
    }
  };

  return (
    <footer className="bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
        <p className="text-lg text-gray-600 mb-8">
          Have questions or feedback? We&apos;d love to hear from you.
        </p>
        <form ref={formRef} action={handleSendEmail} className="max-w-lg mx-auto">
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </footer>
  );
}
