import UserRepository from "../../infrastructure/repositories/user.repository";
import UserSchema from "../../infrastructure/schemas/user.schema";

describe('user repo test', () => {
  
  let newUser : Partial<UserSchema>;

  beforeEach(() => {
    newUser = new UserSchema;
    newUser.username = "Alexis";
    newUser.email = "moi@moi.com";
    newUser.password = "password";
  });


  const testValues = [ // All cases where add should fail
    { field: "username", value: ""},
    { field: "username", value: undefined},
    { field: "username", value: null},
    { field: "username", value: "a".repeat(256)},
    { field : "username", value: "a"},

    { field: "email", value: ""},
    { field: "email", value: undefined},
    { field: "email", value: null},
    { field: "email", value: "a".repeat(256)},
    { field: "email", value: "moi.com"}, // not a valid email

    { field: "password", value: ""},
    { field: "password", value: undefined},
    { field: "password", value: null},
    { field: "password", value: "a".repeat(7)},
  ];

  test.each(testValues)(
    "should send an error when trying to add a user when $field has $value",
    async ({ field, value }) => {

      (newUser as any)[field] = value;

      try {
        await UserRepository.addUser(newUser);
      } catch (err: any) {
        expect(err).toEqual(new Error("Error adding user"));
        return;
      }

      expect(true).toBe(false);
    }
  );

});