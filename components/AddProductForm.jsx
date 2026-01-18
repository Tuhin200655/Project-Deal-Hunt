"use client";

import { useState } from "react";
import { addProduct, previewProduct } from "@/app/action";
import AuthModal from "./AuthModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search, Plus, X } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function AddProductForm({ user }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const handlePreview = async (e) => {
    e.preventDefault();

    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setLoading(true);
    setPreviewData(null);

    const result = await previewProduct(url);

    if (result.error) {
      toast.error(result.error);
    } else {
      setPreviewData(result.data);
    }

    setLoading(false);
  };

  const handleAddProduct = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("url", url);

    const result = await addProduct(formData);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.message || "Product tracked successfully!");
      setUrl("");
      setPreviewData(null);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <form onSubmit={handlePreview} className="w-full">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste product URL (Amazon, Walmart, etc.)"
              className="h-12 text-base"
              required
              disabled={loading}
            />

            <Button
              type="submit"
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 h-10 sm:h-12 px-8"
              size="lg"
            >
              {loading && !previewData ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Check Price
                </>
              )}
            </Button>
          </div>
        </form>

        {previewData && (
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs animate-in fade-in slide-in-from-top-4">
            <div className="flex items-start gap-4">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={previewData.image}
                  alt={previewData.name}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                  {previewData.name}
                </h3>
                <div className="text-2xl font-bold text-orange-600 mb-4">
                  {previewData.currency} {previewData.price}
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleAddProduct}
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Track this Product
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setPreviewData(null)}
                    disabled={loading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}