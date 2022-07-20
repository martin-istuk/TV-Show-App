import { IReview } from './review.interface';

export class Review {
	public id: number;
	public comment: string;
	public rating: number;

	constructor(show: IReview) {
		this.id = show.id;
		this.comment = show.comment;
		this.rating = show.rating;
	}
}