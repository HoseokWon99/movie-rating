import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Review } from "../reviews/review.model";

@Entity("comments")
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: "user_id",
        type: "integer"
    })
    userId: number;

    @Column({
        name: "review_id",
        type: "integer"
    })
    reviewId: number;

    @Column({
        type: "varchar",
        length: 500
    })
    text: string;

    @ManyToOne(
        () => Review,
        review => review.comments,
        { lazy: true }
    )
    review: Review;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp'
    })
    updatedAt: Date;
}