import {
  Column, Entity, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, JoinColumn, DeleteDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("todos")
export class TodoEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "boolean", default: false })
  status: boolean;

  @CreateDateColumn({ name: "due_date" })
  dueDate;

  @CreateDateColumn({ name: "created_at" })
  createdAt;
  @UpdateDateColumn({ name: "updated_at", nullable: true })
  updatedAt;
  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt;
  // Explicitly define the foreign key column for user_uuid
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "user_uuid" })  // This will use the user_uuid column for the foreign key
  user: UserEntity;
}

