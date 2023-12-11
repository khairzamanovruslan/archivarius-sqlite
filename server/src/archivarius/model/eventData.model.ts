import { Model, Table, Column, DataType } from "sequelize-typescript";

interface EventDataAttrs {
    readonly optionId: string;
    readonly optionTitle: string;
    readonly wordCount: number;
}

@Table({tableName: 'event-data'})
export class EventData extends Model<EventData, EventDataAttrs> { 

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.TEXT })
    optionId: string;
    @Column({type: DataType.TEXT })
    optionTitle: string;
    @Column({type: DataType.INTEGER })
    wordCount: number;
}