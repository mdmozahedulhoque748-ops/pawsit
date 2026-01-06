import { Star, MessageCircle, Send, Loader2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useSitterReviews, useSubmitReply } from "@/hooks/useReview";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function SitterReviews() {
    const { data: reviews, isLoading } = useSitterReviews();
    const submitReply = useSubmitReply();
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyText, setReplyText] = useState("");

    const handleReply = async (reviewId: number) => {
        if (!replyText.trim()) return;
        await submitReply.mutateAsync({
            reviewId,
            response: replyText,
        });
        setReplyingTo(null);
        setReplyText("");
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="p-8 lg:p-12 max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-baseline mb-8 px-4 gap-4">
                <h2 className="text-3xl font-bold text-foreground tracking-tight">Host Legacy</h2>
                <span className="text-muted-foreground font-semibold text-xs uppercase tracking-wider px-3 py-1 bg-secondary rounded-full border border-border">
                    {reviews?.length || 0} Reviews
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {!reviews || reviews.length === 0 ? (
                    <div className="col-span-full text-center py-20 border border-dashed rounded-2xl bg-secondary/5">
                        <p className="text-muted-foreground font-medium">No reviews yet. Complete stays to build your legacy!</p>
                    </div>
                ) : reviews.map((review) => (
                    <Card key={review.id} className="p-6 rounded-2xl border-border shadow-sm flex flex-col bg-background hover:shadow-md transition-all duration-300">
                        <div className="flex gap-4 mb-4">
                            <Avatar className="w-12 h-12 rounded-xl border shadow-sm shrink-0">
                                <AvatarImage src={review.ownerImage} />
                                <AvatarFallback>{review.ownerName[0]}</AvatarFallback>
                            </Avatar>
                            <div className="overflow-hidden">
                                <p className="font-bold text-base text-foreground truncate">{review.ownerName}</p>
                                <div className="flex text-yellow-500 gap-0.5 mt-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={cn("w-3.5 h-3.5 fill-current", i < review.rating ? "text-yellow-400" : "text-muted")} />
                                    ))}
                                </div>
                            </div>
                            <span className="ml-auto text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter">
                                {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        <p className="text-sm text-foreground/80 leading-relaxed font-medium mb-6 italic">
                            "{review.reviewText}"
                        </p>

                        {review.sitterResponse ? (
                            <div className="mt-auto p-4 rounded-xl bg-primary/5 border border-primary/10 relative">
                                <div className="absolute -top-3 left-4 px-2 bg-background text-[10px] font-bold text-primary uppercase tracking-widest border border-primary/10 rounded-full">
                                    Your Reply
                                </div>
                                <p className="text-xs text-primary/80 font-medium leading-relaxed">
                                    {review.sitterResponse}
                                </p>
                            </div>
                        ) : (
                            <div className="mt-auto">
                                {replyingTo === review.id ? (
                                    <div className="flex gap-2 animate-in slide-in-from-top-2 duration-200">
                                        <Input
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            placeholder="Write a small reply..."
                                            className="h-9 text-xs rounded-lg border-primary/20 focus-visible:ring-primary/20"
                                            autoFocus
                                        />
                                        <Button 
                                            size="sm" 
                                            className="h-9 px-3 rounded-lg"
                                            onClick={() => handleReply(review.id)}
                                            disabled={submitReply.isPending || !replyText.trim()}
                                        >
                                            {submitReply.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                                        </Button>
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="h-9 px-3 rounded-lg text-muted-foreground"
                                            onClick={() => {
                                                setReplyingTo(null);
                                                setReplyText("");
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setReplyingTo(review.id)}
                                        className="h-8 text-[11px] font-bold uppercase tracking-wider rounded-lg border-primary/20 text-primary hover:bg-primary/5 group"
                                    >
                                        <MessageCircle className="w-3.5 h-3.5 mr-2 transition-transform group-hover:scale-110" />
                                        Reply to Review
                                    </Button>
                                )}
                            </div>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
}

