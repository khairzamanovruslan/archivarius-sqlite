import { Model, Table, Column, DataType } from "sequelize-typescript";

interface ResultPathAttrs {
    fullPath: string;
    word: string;
}

@Table({tableName: 'result-path'})
export class ResultPath extends Model<ResultPath, ResultPathAttrs> { 

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.TEXT })
    fullPath: string;
    @Column({type: DataType.TEXT })
    word: string;
}