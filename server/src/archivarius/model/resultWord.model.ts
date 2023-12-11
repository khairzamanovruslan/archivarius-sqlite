import { Model, Table, Column, DataType } from "sequelize-typescript";

interface ResultWordAttrs {
    word: string;
    quantity: number;
}

@Table({tableName: 'result-word'})
export class ResultWord extends Model<ResultWord, ResultWordAttrs> { 

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.TEXT })
    word: string;
    @Column({type: DataType.INTEGER })
    quantity: number;
}