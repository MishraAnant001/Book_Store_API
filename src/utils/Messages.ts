export const UserSuccess:any={
    singleFetch:"user fetched successfully",
    multipleFetch:"users fetched successfully",
    register:"User Registered Successfully",
    update:"user updated successfully",
    delete:"user deleted successfully"
}

export const UserError:any={
    notFound : "No user found",
    idNotValid: "Please provide valid user id!",
    multipleFetch:"Error while getting all users",
    singleFetch:"Error while getting the user",
    alreadyExists:"User already exists!",
    register:"Error while registering the user",
    update:"Error while updating the user",
    delete:"Error while deleting the user"
}

export const  LoginSuccess:any={
    message:"Login successfull!"
}

export const LoginError:any={
    invalidPassword:"Invalid password!",
    message:"Error while logging in..."
}

export const CategorySuccess:any={
    message:"Categories fetched successfully!"
}

export const CategoryError:any={
    notFound:"No Category found",
    fetch:"Error while getting all categories"
}

export const BookSuccess:any={
    singleFetch:"book fetched successfully",
    multipleFetch:"books fetched successfully",
    create:"Book added successfully",
    update:"book updated successfully",
    delete:"book deleted successfully"
}

export const BookError:any={
    notFound:"No Book found",
    idNotValid: "Please provide valid book id!",
    singleFetch:"Error while getting the book",
    multipleFetch:"Error while getting all books",
    isbnExists:"ISBN already exists or title with author already exists!",
    create:"Error while adding the book",
    update:"Error while updating the book",
    delete:"Error while deleting the book"
}

export const AuthorSuccess:any={
    singleFetch:"author fetched successfully",
    multipleFetch:"authors fetched successfully",
    create:"Author added successfully",
    update:"Author updated successfully",
    delete:"Author deleted successfully"
}

export const AuthorError:any={
    notFound:"No Author found",
    idNotValid: "Please provide valid author id!",
    singleFetch:"Error while getting the Author",
    multipleFetch:"Error while getting all Authors",
    create:"Error while adding the Author",
    update:"Error while updating the Author",
    delete:"Error while deleting the Author",
    alreadyExists:"Author already exists!",
}

export const EnvError:any={
    secretkey:"secret key is missing in .env file!",
    mongourl:"Please provide mongo url in .env file"

}

export const AuthenticationError:any={
    user:"Unauthorized access",
    process:"Error while authentication"

}

export const DatabaseError:any={
    connection:"URL incorrect or Mongo DB error! Please check URL and try again",
    process:"Error connecting to Database :"
}

export const DatabaseSuccess:any={
    message:"Database connected!"
}

export const ServerSuccess:any={
    message:"Server is listening on port :"
}

export const ServerError:any={
    message:"Error starting server :"
}