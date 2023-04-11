import { NextFunction, Request, Response, response } from "express"

export function validate(type:string, schema: any){
    const validation = (req:Request, res: Response, next: NextFunction) =>{
        try {
        const {body} = req;
        const errors: string[] = [];
        const { id } = req.params;

        if(type == "put" || type == "delete" || type == "password" || type == "publish"){
            try {
                const codigo = parseInt(id);
                if(Number.isNaN(codigo)){
                    errors.push("Código invalido!");
                }
            } catch (error) {
                errors.push("Código invalido!");
            }
        }

        if(type == "post" || type == "put"){
        Object.keys(schema).map(campos =>{
            const campoValidacao = schema[campos]  
                                        
            if(campoValidacao.required && !body[campos]){
                errors.push(`Campo ${campos} - ${campoValidacao.required}`)
            }

            if(campoValidacao.min && (body[campos].length < campoValidacao.min)){
                errors.push(`Campo ${campos} - O tamanho minimo é ${campoValidacao.min}`)
            }

            if(campoValidacao.max && (body[campos].length > campoValidacao.max)){
                errors.push(`Campo ${campos} - O tamanho maximo é ${campoValidacao.min}`)
            }

            if(campoValidacao.type == 'number'){
                const codigo = parseInt(body[campos]);
                if(Number.isNaN(codigo) || !codigo || codigo == null || codigo == undefined){
                    errors.push(`Campo ${campos} - somente numeros são permitidos!`);
                }
            }
        })}
        
        if(errors.length > 0)
            return res.status(400).json(errors);
        else
            return next()
        } catch (error) {
            return res.status(400).json("incorrect format sent!");
        }
    }
    
    return validation;
}