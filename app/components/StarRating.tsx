

type Props = {
    stars: number;
    reviews?: number;
}

export default function StarRating({stars, reviews}: Props) {
    
    return (
        <div className="start gap-2">
            {(stars <= 5) ? <div className="start gap-1">
                {[...Array(stars)].map((v, idx) => (
                    <img src="/images/star-rating-icon.svg" alt="star" key={idx} />
                ))}
                {[...Array(5 - stars)].map((v, idx) => (
                    <img src="/images/star-icon-gray.svg" alt="star" key={idx} />
                ))}
            </div>: <div className="text-opacity-50 line-through">Invalid rating</div>}
            {reviews && <span className="text-black text-opacity-50">({reviews})</span>}
        </div>
    )
}
