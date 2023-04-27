import crypto from "crypto";
const iv = Buffer.from(crypto.randomBytes(16));
let ivstring = iv.toString('hex').slice(0, 16);

export async function criptografar(senha: string): Promise<string>
{
 
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from('qrqccER0WhIQDXkpswH53LlDFC3jT3Rw'), iv);
    let encrypted =  cipher.update(senha);
    encrypted = Buffer.concat([encrypted, cipher.final()]); 
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

export async function decrypt(text: string): Promise<string> {
    
    const [iv, encrypted] = text.split(':')
    const ivBuffer = Buffer.from(iv, 'hex')
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from('qrqccER0WhIQDXkpswH53LlDFC3jT3Rw'), ivBuffer)
    let content = decipher.update(Buffer.from(encrypted, 'hex'))
    content = Buffer.concat([ content, decipher.final()])
    return content.toString();
    
}
