
    export const schemaNews = {
        title: {
            required: 'Titulo é obrigatório!',
            min: 1,
            max: 50
        } ,
        subtitle: {
            required: 'Subtitulo é obrigatório!',
            min: 1,
            max: 100
        }, 
        content: {
            required: 'Conteudo é obrigatório!',
            min: 1,
            max: 1000
        },
        userId: {
            required: 'Autor é obrigatório!',
            type: 'number'
        }
    }

    export const schemaReactions = {
        reaction: {
            required: 'like/deslike é obrigatório!'
        } ,
        userId: {
            required: 'usuario é obrigatório!',
            type: 'number'
        } 
    }

    export const schemaComments= {
        comment : {
            required: 'comentario é obrigatório!',
            min: 1,
            max: 255
        },
        userId :{
            required: 'código do usuario é obrigatório!',
            type: 'number'
        },
        newId: {
            required: 'codigo da noticia é obrigatório!',
            type: 'number'
        }
    }

    export const  schemaUsers = {
        name: {
            required: 'nome é obrigatório!',
            min: 1,
            max: 100
        },
        email: {
            required: 'email é obrigatório!',
            min: 1,
            max: 100
        } ,
        nickname:{
            required: 'nickname é obrigatório!',
            min: 1,
            max: 100
        },
        birthday:{
            required: 'aniversario é obrigatório!',
        },
        password: {
            required: 'senha é obrigatório!',
            min: 1,
            max: 10
        }
    }

    export const schemaUsersUpdate = {
        name: {
            required: 'nome é obrigatório!',
            min: 1,
            max: 100
        },
        nickname:{
            required: 'nickname é obrigatório!',
            min: 1,
            max: 100
        },
        birthday:{
            required: 'aniversario é obrigatório!',
        }
    }