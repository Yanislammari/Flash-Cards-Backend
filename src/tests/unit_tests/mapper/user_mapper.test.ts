import User from "../../../domain/entities/user.entity";
import UserSchema from "../../../infrastructure/schemas/user.schema";
import UserMapper from "../../../shared/mappers/user.mapper";

describe('user mapper',()=>{

  it('should map user schema to user domain',()=>{

    let userSchema : UserSchema = new UserSchema;
    userSchema.id = 'randomID';
    userSchema.username = 'randomUsername';
    userSchema.email = 'random@email.com';
    userSchema.password = 'r@1d0mp@$$w0rd';

    let user = UserMapper.toDomain(userSchema);

    expect(user.id).toBe(userSchema.id);
    expect(user.username).toBe(userSchema.username);
    expect(user.email).toBe(userSchema.email);
    expect(user.password).toBe(userSchema.password);
    
  });

  it('toDomainList mapper',()=>{
    let usersSchema : UserSchema[] = [];
    let userSchema : UserSchema = new UserSchema;
    userSchema.id = 'randomID';
    userSchema.username = 'randomUsername';
    userSchema.email = 'random@email.com';
    userSchema.password = 'r@1d0mp@$$w0rd';

    usersSchema.push(userSchema);
    userSchema.id = 'randomID2';
    usersSchema.push(userSchema);
    userSchema.id = 'randomID3';
    usersSchema.push(userSchema);

    let users = UserMapper.toDomainList(usersSchema);

    expect(users.length).toBe(usersSchema.length);
    expect(users[0].id).toBe(usersSchema[0].id);
    expect(users[1].id).toBe(usersSchema[1].id);
    expect(users[2].id).toBe(usersSchema[2].id);

  });

  it('toSchema mapper',async ()=>{

    let user : User = {
      id : 'randomID',
      username : 'randomUsername',
      email : 'random@email.com',
      password : 'r@1d0mp@$$w0rd',
    }

    let userSchema = await UserMapper.toSchema(user);

    expect(userSchema.id).toBe(user.id);
    expect(userSchema.username).toBe(user.username);
    expect(userSchema.email).toBe(user.email);
    expect(userSchema.password).toBe(user.password);

  })

  it('toSchemaList mapper',async ()=>{
    let users : User[] = [];
    let user : User = {
      id : 'randomID',
      username : 'randomUsername',
      email : 'random@email.com',
      password : 'r@1d0mp@$$w0rd',
    };

    users.push(user);
    user.id = 'randomID2';
    users.push(user);
    user.id = 'randomID3';
    users.push(user);

    let usersSchema = await UserMapper.toSchemaList(users);

    expect(usersSchema.length).toBe(users.length);
    expect(usersSchema[0].id).toBe(users[0].id);
    expect(usersSchema[1].id).toBe(users[1].id);
    expect(usersSchema[2].id).toBe(users[2].id);
    
  });


});