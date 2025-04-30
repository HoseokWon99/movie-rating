import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn, JoinColumn
} from "typeorm";
import { Profile } from "../profiles/profile.model";
import { Comment } from "../comments/comment.model";

@Entity("reviews")
export class Review {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: "user_id",
        type: "integer"
    })
    userId: number;

    @Column({
        name: "movie_id",
        type: "integer"
    })
    movieId: number;

    @Column({ type: "decimal" })
    rating: number;

    @Column({ type:"text" })
    content: string;

    @Column({type: "integer", default: 0})
    likes: number;

    @ManyToOne(
       () => Profile,
       { lazy: true }
    )
    @JoinColumn({ name: "user_id" })
    profile: Profile;

    @OneToMany(
        () => Comment,
        (comment) => comment.review,
        { lazy: true }
    )
    comments: Comment[];

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

