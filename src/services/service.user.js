import bcrypt from "bcrypt";
import repoUser from "../repositories/repository.user.js"

async function Inserir(name, email, password) {

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await repoUser.Inserir(name, email, hashPassword);

    return user;
}

// async function Login(email, password) {

//     const hashPassword = await bcrypt.hash(password, 10);

//     const user = await repoUser.Inserir(email, hashPassword);

//     return user;
// }

export default { Inserir }; 