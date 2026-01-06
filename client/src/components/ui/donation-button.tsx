import { useState } from "react";
import { Heart } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DonationButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(true)}
                className="text-pink-500 hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-950/20 gap-1.5"
            >
                <Heart className="w-4 h-4 fill-current" />
                <span className="hidden sm:inline text-xs font-medium">Donate</span>
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="text-center">
                        <DialogTitle className="flex items-center justify-center gap-2 text-xl">
                            <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                            Support PawSit
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            Help us keep connecting pets with loving sitters!
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col items-center gap-4 py-4">
                        {/* Bkash QR Code */}
                        <div className="bg-white p-4 rounded-xl shadow-md border">
                            <img
                                src="/bkash_qr.png"
                                alt="Bkash QR Code for Donation"
                                className="w-48 h-48 object-contain"
                            />
                        </div>

                        {/* Bkash Number */}
                        <div className="text-center space-y-1">
                            <p className="text-sm text-muted-foreground">
                                Or send to Bkash number:
                            </p>
                            <p className="text-lg font-bold text-pink-600 tracking-wide">
                                +8801234567890
                            </p>
                        </div>

                        {/* Bkash Branding */}
                        <div className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-pink-500 to-pink-600 rounded-full">
                            <span className="text-white font-bold text-sm">bKash</span>
                        </div>

                        <p className="text-xs text-muted-foreground text-center max-w-xs">
                            Your donation helps us maintain the platform and support the pet sitting community. Thank you! 🐾
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
