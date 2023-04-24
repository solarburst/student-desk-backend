import * as bcrypt from 'bcrypt';

export async function hash(userPassword): Promise<string> {
  const saltOrRounds = 10;
  const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);
  return hashedPassword;
}

export async function compare(text, hashedPassword): Promise<boolean> {
  const compareResult = await bcrypt.compare(text, hashedPassword);
  return compareResult;
}
