"use client";

import { useState } from "react";
import { signOut } from "@/app/action";
import AuthModal from "./AuthModal";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";

export default function AuthButton({ user }) {
    const [showAuthModal, setShowAuthModal] = useState(false);

    if (user) {
        return (
            <form action={signOut}>
                <Button
                    variant="ghost"
                    size="sm"
                    type="submit"
                    className="gap-2 bg-white text-gray-900 hover:bg-gray-800 hover:text-white shadow-sm transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </Button>
            </form>
        );
    }

    return (
        <>
            <Button
                onClick={() => setShowAuthModal(true)}
                variant="default"
                size="sm"
                className="bg-violet-600 hover:bg-violet-700 gap-2"
            >
                <LogIn className="w-4 h-4" />
                Sign In
            </Button>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </>
    );
}