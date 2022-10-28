import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty() name: string;
    @IsNotEmpty() description: string;
    created_date?: Date;
}
