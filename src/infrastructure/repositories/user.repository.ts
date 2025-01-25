import UserSchema from "../schemas/user.schema";

class UserRepository {
  public static async getAllUsers(): Promise<UserSchema[]> {
    try {
      const users: UserSchema[] = await UserSchema.findAll();
      return users;
    }
    catch(err) {
      throw new Error("Error fetching users");
    }
  }

  public static async getUserById(id: string): Promise<UserSchema | null> {
    try {
      const user: UserSchema | null = await UserSchema.findByPk(id);
      return user;
    }
    catch(err) {
      throw new Error("Error fetching user by ID");
    }
  }

  public static async getByEmail(email: string): Promise<UserSchema | null> {
    try {
      const user: UserSchema | null = await UserSchema.findOne({
        where: { email },
      });
      return user;
    }
    catch(err) {
      throw new Error("Error fetching user by email");
    }
  }

  public static async addUser(userData: Partial<UserSchema>): Promise<UserSchema> {
    try {
      const newUser: UserSchema = await UserSchema.create(userData);
      return newUser;
    }
    catch(err) {
      throw new Error("Error adding user");
    }
  }
}
