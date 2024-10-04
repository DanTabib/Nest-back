import { Post, Body, Controller } from '@nestjs/common';
import { UserService } from './user.service';
// import { NewUser } from '@/graphql/users/user.schema';
import { _res } from '@/utils/res.utils';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { IBaseUser, IWorkerProfile } from '@/xmodels';
import { ProfileService } from './profile.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async createUser(@Body('user') newUserData: IBaseUser) {
    try {
      const isExist = await this.userService.find({
        email: newUserData.email,
      });
      if (isExist) {
        return _res(null, 'Email address already exists.', 500);
      }
      const user = await this.userService.create(newUserData);
      return _res(user, null, 200);
    } catch (e) {
      console.log(e);
      return _res(null, 'Unknown error.', 500);
    }
  }

  @Post('login')
  async login(@Body('user') userData: Prisma.UserWhereUniqueInput) {
    try {
      const user = await this.userService.find({
        email: userData.email,
        password: userData.password,
      });
      if (user) {
        const payload = { username: user.name };
        const access_token = await this.jwtService.signAsync(payload);

        return _res(
          {
            token: access_token,
            user: user,
          },
          null,
          200,
        );
      } else {
        return _res(null, 'Incorrect email or password', 500);
      }
    } catch {
      return _res(null, 'Unknown error.', 500);
    }
  }

  @Post('profile')
  async profile(
    @Body('profile') profileData: { userId: string; profile: IWorkerProfile },
  ) {
    const userId = profileData.userId;
    const profile = profileData.profile;
    try {
      const user = await this.userService.find({
        id: userId,
      });
      if (user) {
        const _profile = await this.profileService.upsert(profile);
        return _res(
          {
            profile: _profile,
          },
          null,
          200,
        );
      } else {
        return _res(null, 'Invalid user', 500);
      }
    } catch {
      return _res(null, 'Unknown error.', 500);
    }
  }
}
