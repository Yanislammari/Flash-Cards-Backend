import UserValidation from "../../../domain/validations/user.validation";

describe('validate user',()=>{

    let newUser : any;

    beforeEach(() => {
        newUser = {
            "username":"moi",
            "email":"moi@moi.com",
            "password": "a@P1moim"
        }
    });

    it('should valid a user',()=>{
        const { error , value } = UserValidation.validate(newUser);
        expect(error).toBeUndefined();
        expect(value.username).toBe(newUser.username);
        expect(value.email).toBe(newUser.email);
        expect(value.password).toBe(newUser.password);
    });

    const testCases = [
        {category : 'username' , value : undefined , errorMessage : '"username" is required'},
        {category : 'username' , value : null , errorMessage : '"username" must be a string'},
        {category : 'username' , value : "" , errorMessage : '"username" is not allowed to be empty'},
        {category : 'username' , value : "a".repeat(26) , errorMessage : '"username" length must be less than or equal to 25 characters long'},

        {category : 'email' , value : undefined , errorMessage : '"email" is required'},
        {category : 'email' , value : null , errorMessage : '"email" must be a string'},
        {category : 'email' , value : "" , errorMessage : '"email" is not allowed to be empty'},
        
        {category : 'password' , value : undefined , errorMessage : '"password" is required'},
        {category : 'password' , value : null , errorMessage : '"password" must be a string'},
        {category : 'password' , value : "" , errorMessage : '"password" is not allowed to be empty'},
    ]


    test.each(testCases)(
        "should send an error when $category is $value",
        ({category, value, errorMessage}) => {
            (newUser as any)[category] = value;

            const { error } = UserValidation.validate(newUser);
            expect(error).toBeDefined();
            expect(error!.message).toBe(errorMessage);
        }
    );

    const testRegexPassword = [
        {value : "court"},
        {value : "nom@j1"},
        {value : "NOMIN@12"},
        {value : "noNumber@"},
        {value : "noSPecial12"},
    ]

    test.each(testRegexPassword)(
        "should send an error about Regex when password is $value",
        ({value}) => {
            (newUser as any)['password'] = value;

            const { error } = UserValidation.validate(newUser);
            expect(error).toBeDefined();
            expect(error!.message).toContain("fails to match the required pattern:");
        }
    )
})