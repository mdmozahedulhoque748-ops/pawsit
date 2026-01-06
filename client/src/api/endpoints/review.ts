import { apiClient } from "@/api/client";

export interface SubmitReviewPayload {
    bookingId: number;
    rating: number;
    reviewText?: string;
}

export interface SubmitReplyPayload {
    reviewId: number;
    response: string;
}

export interface Review {
    id: number;
    rating: number;
    reviewText: string | null;
    sitterResponse: string | null;
    repliedAt: string | null;
    createdAt: string;
    ownerName: string;
    ownerImage: string;
}

export const reviewApi = {
    // Owner: Submit review
    submitReview: async (payload: SubmitReviewPayload) => {
        const { data } = await apiClient.post('/reviews', payload);
        return data.review;
    },

    // Sitter: Get reviews
    getSitterReviews: async () => {
        const { data } = await apiClient.get('/reviews/sitter');
        return data.reviews as Review[];
    },

    // Sitter: Submit reply
    submitReply: async ({ reviewId, response }: SubmitReplyPayload) => {
        const { data } = await apiClient.patch(`/reviews/${reviewId}/reply`, { response });
        return data.review;
    },
};
