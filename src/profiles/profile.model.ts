import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity("profiles")
export class Profile {

    @PrimaryColumn({
        name: 'user_id',
        type: 'integer',
    })
    userId: number;

    @Column({
        type: "varchar",
        length: 50,
        nullable: false,
        unique: true
    })
    nickname: string;

    @Column({
        name: "image_url",
        type: "varchar",
        length: 2083,
        default: "/img/default_profile_image.png"
    })
    imageURL: string;

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