import UserSchema from "../schemas/user.schema";

class UserRepository {
  private static instance: UserRepository;

  private constructor() { }

  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }

  public async getAllUsers(): Promise<UserSchema[]> {
    try {
      return await UserSchema.findAll();
    } catch (err) {
      throw new Error("Error fetching users");
    }
  }

  public async getUserById(id: string): Promise<UserSchema | null> {
    try {
      return await UserSchema.findByPk(id);
    } catch (err) {
      throw new Error("Error fetching user by ID");
    }
  }

  public async getByEmail(email: string): Promise<UserSchema | null> {
    try {
      return await UserSchema.findOne({ where: { email } });
    } catch (err) {
      throw new Error("Error fetching user by email");
    }
  }

  public async addUser(userData: Partial<UserSchema>): Promise<UserSchema> {
    try {
      return await UserSchema.create(userData);
    } catch (err) {
      throw new Error("Error adding user");
    }
  }
}

export default UserRepository.getInstance();
