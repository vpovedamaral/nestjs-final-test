import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
    @ApiProperty({
        type: String,
    })
    readonly name: string;
    @ApiProperty({
        type: Number,
    })
    readonly userId: string;
    @ApiProperty({
        type: Number,
    })
    readonly priority: string;
}
