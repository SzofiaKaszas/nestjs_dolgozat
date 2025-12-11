import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { Anyag } from "generated/prisma/enums";

export class CreateToyDto {
  @IsString()
  @IsNotEmpty()
  name : string;
  @IsString()
  @IsNotEmpty()
  material: Anyag;
  @IsNumber()
  @IsNotEmpty()
  @Min(0.1)
  weight: number
}
