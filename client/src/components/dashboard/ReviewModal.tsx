import { useState } from "react";
import { Star, Loader2, MessageSquare } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitReview } from "@/hooks/useReview";
import { cn } from "@/lib/utils";

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    bookingId: number;
    sitterName: string;
}

export function ReviewModal({ isOpen, onClose, bookingId, sitterName }: ReviewModalProps) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const submitReview = useSubmitReview();

    const handleSubmit = async () => {
        if (rating === 0) return;
        
        await submitReview.mutateAsync({
            bookingId,
            rating,
            reviewText: comment,
        });
        onClose();
        setRating(0);
        setComment("");
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] p-6 gap-6 rounded-2xl border-none shadow-2xl animate-in zoom-in-95 duration-200">
                <DialogHeader className="space-y-3">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                        <MessageSquare className="w-6 h-6 text-primary" />
                    </div>
                    <DialogTitle className="text-2xl font-bold text-center tracking-tight">
                        Rate your stay with {sitterName}
                    </DialogTitle>
                    <DialogDescription className="text-center text-muted-foreground font-medium">
                        Your honest feedback helps the community find the best pet sitters.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center gap-6 py-4">
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className="group relative transition-transform hover:scale-110 active:scale-95 outline-none"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                            >
                                <Star
                                    className={cn(
                                        "w-10 h-10 transition-all duration-200",
                                        (hover || rating) >= star
                                            ? "fill-yellow-400 text-yellow-500 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]"
                                            : "text-muted hover:text-muted-foreground"
                                    )}
                                />
                            </button>
                        ))}
                    </div>

                    <div className="w-full space-y-2">
                        <label className="text-sm font-semibold px-1 text-foreground/80">
                            Share your experience (optional)
                        </label>
                        <Textarea
                            placeholder="Tell others how it went..."
                            className="min-h-[120px] resize-none border-border bg-secondary/20 focus:bg-background transition-colors rounded-xl p-4 text-sm font-medium"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <div className="flex w-full gap-3">
                        <Button
                            variant="outline"
                            className="flex-1 rounded-xl h-11 font-semibold border-border hover:bg-secondary/50 text-muted-foreground"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="flex-2 rounded-xl h-11 font-bold shadow-lg shadow-primary/20"
                            onClick={handleSubmit}
                            disabled={rating === 0 || submitReview.isPending}
                        >
                            {submitReview.isPending ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                "Submit Review"
                            )}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
