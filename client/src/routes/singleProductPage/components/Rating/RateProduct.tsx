import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { AxiosError } from "axios";
import useAxiosPrivate from "@/hooks/auth/useAxiosPrivate";

interface RatingRequest {
  productId: string;
  rating: number;
  comment: string;
}

interface RatingResponse {
  userRating: {
    id: string;
    userId: string;
    productId: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
  };
  productRating: {
    id: string;
    productId: string;
    fiveStars: number;
    fourStars: number;
    threeStars: number;
    twoStars: number;
    oneStar: number;
    totalRatings: number;
    averageRating: number;
  };
}

interface ProductRatingProps {
  productId: string;
  onError?: (message: string) => void;
  onSuccess?: () => void;
}

const RateProduct: React.FC<ProductRatingProps> = ({ productId, onError }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const { mutate, isPending, error, isSuccess } = useMutation<
    RatingResponse,
    Error,
    RatingRequest
  >({
    mutationFn: async ({ rating, comment }) => {
      try {
        const { data } = await axiosPrivate.post(
          `/ratings/products/${productId}/rate`,
          {
            rating,
            comment,
          }
        );
        return data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(
            error.response?.data.message ||
              "Wystąpił błąd podczas oceniania produktu"
          );
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product", productId],
      });
      setComment("");
      setRating(0);
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!rating) {
      onError?.("Musisz wybrać ocenę");
      return;
    }
    mutate({ productId, rating, comment });
  };

  if (isSuccess) {
    return <p className="text-green-500">Dziękujemy za Twoją ocenę!</p>;
  }

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="mb-5 text-xl font-semibold text-gray-900">
        Oceń ten produkt
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Star Rating */}
        <div className="flex space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="focus:outline-none"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            >
              <Star
                className={`w-8 h-8 ${
                  star <= (hoverRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Comment Input */}
        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Komentarz (opcjonalnie)
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setComment(e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Napisz swoją opinię..."
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm">
            {error.message === "Forbidden"
              ? "Musisz być zalogowany, aby ocenić produkt."
              : error.message}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!rating || isPending}
          className={`w-full py-2 px-4 rounded-md text-white font-medium
            ${
              !rating || isPending
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-amber-600 hover:bg-amber-400"
            }`}
        >
          {isPending ? "Wysyłanie..." : "Wyślij ocenę"}
        </button>
      </form>
    </div>
  );
};

export default RateProduct;
