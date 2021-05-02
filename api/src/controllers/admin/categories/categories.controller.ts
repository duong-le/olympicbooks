import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Roles } from '../../../core/Decorators/roles.decorator';
import { Category } from '../../../entities/categories.entity';
import { CategoriesService } from '../../../services/categories.service';
import { UploadOptions } from '../../../services/cloud-storage.service';
import { Role } from '../../../shared/Enums/roles.enum';
import { File } from '../../../shared/Interfaces/file.interface';
import { CreateCategoryDto, UpdateCategoryDto } from '../../admin/categories/categories.dto';
import { CategoriesController } from '../../store/categories/categories.controller';

@ApiTags('Admin Categories')
@ApiBearerAuth()
@Controller('admin/categories')
@UseGuards(AuthGuard())
@Roles(Role.ADMIN)
export class AdminCategoriesController extends CategoriesController {
  constructor(public service: CategoriesService) {
    super(service);
  }
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create one Category' })
  @UseInterceptors(FileInterceptor('attachment', UploadOptions))
  async createOne(@Body() dto: CreateCategoryDto, @UploadedFile() uploadedFile: File): Promise<Category> {
    return this.service.createOne(dto, uploadedFile);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update one Category' })
  @UseInterceptors(FileInterceptor('attachment', UploadOptions))
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoryDto, @UploadedFile() uploadedFile: File): Promise<Category> {
    return this.service.updateOne(id, dto, uploadedFile);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one Category' })
  deleteOne(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.deleteOne(id);
  }
}
