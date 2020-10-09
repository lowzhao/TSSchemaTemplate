
import { compareSync as BcryptCompare, hashSync as BcryptHash } from "bcrypt";

export function hash(password: string)
{
	return BcryptHash(password, 10);
}

export function compareHash(password, userPassword)
{
	return BcryptCompare(password, userPassword);
}

// genSaltSync()