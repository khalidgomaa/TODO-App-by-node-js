import express from "express"
import controlSign from "./user.conroller.js"
import validation from "../../middleWare/validation.js";

import validSchema  from "../../db/model/valideRegester.joi.js"

const userRouter = new express.Router()

userRouter.post("/signUp",validation(validSchema.validSchemaSignup),controlSign.signUp)
userRouter.post("/signIn",validation(validSchema.validSchemaSignIn),controlSign.signIn)
userRouter.delete("/users/:userName",controlSign.deleteUser)
userRouter.patch("/users/:userName",controlSign.updateUser)
// userRouter.patch("/signIn/:id",validation(validSchema.validSchemaSignIn),controlSign.signIn)

export default userRouter   