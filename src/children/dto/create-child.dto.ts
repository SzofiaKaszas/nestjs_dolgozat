import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateChildDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  lakcim: string;
  @IsBoolean()
  @IsNotEmpty()
  wasGood: boolean
}
