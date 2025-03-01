import bcrypt from "bcrypt";
import repoUser from "../repositories/repository.user.js"
import jwt from "../token.js";

async function Inserir(name, email, password) {

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await repoUser.Inserir(name, email, hashPassword);

    user.token = jwt.CreateToken(user.id_user);

    return user;
}

async function Login(email, password) {

    const user = await repoUser.ListarByEmail(email);   //verifico se existe user com esse email

    if (user.length == 0)
        return [];
    else {
        if (await bcrypt.compare(password, user.password)) {
            delete user.password;//removo a senha para não mostrar json

            user.token = jwt.CreateToken(user.id_user);;

            return user;
        } else
            return [];
    }
    return user;

}

export default { Inserir, Login }; 