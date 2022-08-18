import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { database } from "../config/mysql";

@Entity({ database })
export default class User {
	@PrimaryGeneratedColumn()
	key: number = 0;

	@Column()
	email: string = '';

	@Column()
	password: string = '';

	@Column()
	captcha: number = 0;

    @Column("bigint")
    runtime_captcha: number | undefined;

	@Column({ default: null })
	session: string = '';
}