import { Inject, Injectable } from '@nestjs/common';
import { TG_USER_REPOSITORY } from './tg-user.providers';
import { Repository } from 'typeorm';
import { TgUser } from './tg-user.entity';

@Injectable()
export class TgUserService {
  constructor(
    @Inject(TG_USER_REPOSITORY)
    private tgUserRepository: Repository<TgUser>
  ) {}

  async getTgUser (tgUserId?: number) {
    try {
      if (tgUserId) {
        const user = await this.tgUserRepository.findOne({ where: { tgId: tgUserId } })
        return user
      }
  
      return null
    } catch (e) {
      console.error('getTgUsers', e.message)
      return null
    }
  }

  async getTgUsers () {
    try {
      return await this.tgUserRepository.find()
    } catch (e) {
      console.error('getTgUsers', e.message)
      return []
    }
  }
}
