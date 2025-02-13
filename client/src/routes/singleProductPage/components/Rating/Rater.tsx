import Stars from "./Stars";

type RaterProps = {
  id: string;
  username: string;
  rating: number;
  comment: string | undefined;
  createdAt: Date;
};

const Rater = ({ username, rating, comment, createdAt }: RaterProps) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Stars averageRating={rating} className="w-4 aspect-square" />
        <strong className="capitalize font-medium">{username}</strong>
        <span className="font-medium">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>
      <p>{comment}</p>
    </div>
  );
};

export default Rater;
