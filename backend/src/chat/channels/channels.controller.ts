import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { newChannelDto, updateChannelDto } from 'src/dto/channels.dto';
import { ChatGuard } from 'src/guards/chat.jwt.guard';

@UseGuards(ChatGuard)
@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Get('all')
  async getUserChannels(@Req() req) {
    const channels = await this.channelsService.getUserChannels(req.userID);
    return channels;
  }

  @Get(':id')
  async getChannelById(@Req() req, @Param('id') channelId: string) {
    const channel = await this.channelsService.getChannelById(
      channelId,
      req.userID,
    );
    return channel;
  }

  @Post('new')
  async createChannel(@Req() req, @Body() data: newChannelDto) {
    return this.channelsService.createChannel(data, req.userID);
  }

  @Patch(':id')
  async updateChannel(
    @Param('id') channelId: string,
    @Body() data: updateChannelDto,
    @Req() req,
  ) {
    return this.channelsService.updateChannel(req.userID, channelId, data);
  }

  @Delete(':id')
  async deleteChannel(@Param('id') channelId: string, @Req() req) {
    const result = this.channelsService.deleteChannel(channelId, req.userID);
    return result;
  }
}
