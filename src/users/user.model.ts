import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export type AuthType = "NATIVE" | "KAKAO" | "GOOGLE";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({
        type: "char",
        length: 20
    })
    authType: AuthType;

    @Column({
        type: "char",
        length: 20
    })
    name: string;

    @Column({
        type: 'char',
        length: 254,
        unique: true
    })
    email: string;

    @Column({
        type: 'char',
        length: 64,
        nullable: true
    })
    password?: string;

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