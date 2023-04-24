import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './entities/users.entity';
import { hash, compare } from '../utils/crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await hash(refreshToken);
    await this.usersRepository.update(userId, {
      currentHashedRefreshToken,
    });
  }

  async create(createUserDto: CreateUserDto) {
    // const { password, ...user } = createUserDto;
    // const hashedPassword = await hash(password);
    // console.log(hashedPassword, 'hashed password');
    // const userToStore = { ...user, password: hashedPassword };
    // console.log(userToStore, 'user to store');
    // await this.usersRepository.create(userToStore);
    // await this.usersRepository.save(userToStore);
    // return userToStore;
    const newUser = await this.usersRepository.create(createUserDto);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async getAll() {
    return this.usersRepository.find({});
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.getById(userId);

    const isRefreshTokenMatching = await compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    const updatedUser = await this.usersRepository.findOne({ where: { id } });
    if (updatedUser) {
      return updatedUser;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  // async updatePassword(id: number, updatePassword) {
  //   const updatableUser = await this.userRepository.findOne({
  //     where: { id },
  //     relations: ['password'],
  //   });
  //   const updatablePassword = await this.passwordRepository.update(
  //     updatableUser.password,
  //     updatePassword,
  //   );
  //   return updatablePassword;
  // }

  async delete(id: number) {
    const deleteResponse = await this.usersRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async removeRefreshToken(userId: number) {
    return this.usersRepository.update(userId, {
      currentHashedRefreshToken: null,
    });
  }

  async markEmailAsConfirmed(email: string) {
    return this.usersRepository.update(
      { email },
      {
        isEmailConfirmed: true,
      },
    );
  }
}
