import UserSchema from "../../infrastructure/schemas/user.schema";
import User from "../../domain/entities/user.entity";

const UserMapper = {
  toDomain(userSchema: UserSchema): User {
    return {
      id: userSchema.id,
      username: userSchema.username,
      email: userSchema.email,
      password: userSchema.password,
    };
  },

  toDomainList(userSchemas: UserSchema[]): User[] {
    return userSchemas.map(this.toDomain);
  },

  async toSchema(user: User): Promise<UserSchema> {
    return UserSchema.build({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
    });
  },

  async toSchemaList(users: User[]): Promise<UserSchema[]> {
    return Promise.all(users.map((user) => this.toSchema(user)));
  },
};

export default UserMapper;
