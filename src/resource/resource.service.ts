import { Inject, Injectable } from '@nestjs/common';
import { TgUserService } from 'src/tg-user/tg-user.service';
import { Equal, Repository } from 'typeorm';
import { Resource } from './resource.entity';
import { RESOURCE_REPOSITORY } from './resource.providers';


@Injectable()
export class ResourceService {
  constructor(
    private readonly tgUserService: TgUserService,
    @Inject(RESOURCE_REPOSITORY)
    private readonly resourceRepository: Repository<Resource>
  ) {}

  async getFreeResourceList (tgUserId?: number) {
    try {
      const resources = await this.resourceRepository.find({
        where: { tgUser: { tgId: tgUserId }, isFree: true },
        relations: { tgUser: { role: true }, endMessage: true }
      })
      return resources
    } catch (e) {
      console.log('getFreeResourceList', e.message)
      return []
    }
  }

  async getUserTakenResourceList (tgUserId?: number) {
    try {
      const resources = await this.resourceRepository.find({
        where: { tgUser: { tgId: tgUserId }, isFree: false },
        relations: { tgUser: { role: true }, endMessage: true }
      })
      return resources
    } catch (e) {
      console.log('getUserTakenResourceList', e.message)
      return []
    }
  }

  async getResourceList (tgUserId?: number) {
    try {
      if (tgUserId) {
        const resources = await this.resourceRepository.find({
          where: { tgUser: { tgId: tgUserId } },
          relations: { tgUser: { role: true }, endMessage: true }
        })
        return resources
      }
      const resources = await this.resourceRepository.find({ relations: { tgUser: { role: true }, endMessage: true } })
  
      return resources
    } catch (e) {
      console.log('getResourceList', e.message)
      return []
    }
  }
  
  async getResource (id: number) {
    try {
      const resource = await this.resourceRepository.findOne({
        where: { id },
        relations: { tgUser: { role: true }, endMessage: true }
      })
  
      if (!resource) {
        throw new Error('Такого ресурса нету :( или @olegthegoodboy накосячил')
      }
  
      return resource
    } catch (e) {
      console.log('getResource', e.message)
      return null
    }
  }

  
  async takeResource (id: number, userId: number) {
    try {
      const user = await this.tgUserService.getTgUser(userId)
      const resource = await this.resourceRepository.update({ id }, { tgUser: user, isFree: false })
  
      return resource
    } catch (e) {
      console.log('takeResource', e.message)
      return null
    }
  }

  async freeResource (id: number, userTgId: number) {
    try {
      const resource = await this.resourceRepository.findOne({
        where: { id, tgUser: { tgId: userTgId } },
        relations: { tgUser: { role: true }, endMessage: true }
      })
    
      if (resource) {
        resource.isFree = true
        await this.resourceRepository.save(resource)
      }
  
      return resource
    } catch (e) {
      console.log('freeResource', e.message)

      return null
    }
  }
}
