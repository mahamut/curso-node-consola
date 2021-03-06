const inquirer = require('inquirer');
require('colors');

const menuInicial = [{
    type: 'list',
    name: 'opcion',
    message: '¿Qué deseas hacer?',
    choices: [{
            value: 1,
            name: `${'1.'.green} Crear una tarea `
        },
        {
            value: 2,
            name: `${'2.'.green} Listar todas las tareas`
        },
        {
            value: 3,
            name: `${'3.'.green} Listar tareas pendientes`
        },
        {
            value: 4,
            name: `${'4.'.green} Listar tareas completadas`
        },
        {
            value: 5,
            name: `${'5.'.green} Marcar tarea como completada`
        },
        {
            value: 6,
            name: `${'6.'.green} Borrar tarea`
        },
        {
            value: 0,
            name: `${'0.'.green} Salir`
        }
    ]
}];

const inquirerMenu = async () => {

    console.log('====================='.green);
    console.log('  Elige una opción  '.white);
    console.log('====================='.green);

    const { opcion } = await inquirer.prompt(menuInicial);

    return opcion;
}

const inquirerPause = async () => {

    const pausa = [
        {
            type: 'input',
            name: 'pausa',
            message: `Presione ${ `ENTER `.green } para continuar: ` 
        }
    ]

    const { pause } = await inquirer.prompt(pausa);
    return pause;

}

const leerInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if( value.length === 0 ){
                    return 'Por favor ingrese un valor';
                }
                return true
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;

}

const seleccionarTarea = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
        }

    });

    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancelar'
    })

    const select = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione 1 tarea para borrar',
            choices: choices,
        }
    ]

    const { id } = await inquirer.prompt(select);
    return id;
}

const confirmar = async (message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
    }
    ]

    const { ok } = await inquirer.prompt(question);
    return ok;

}

const marcarTareaChecklist = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: ( tarea.completadoEn ) ? true : false
        }

    });

    const select = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione 1 tarea para marcar como completada',
            choices: choices,
        }
    ]

    const { ids } = await inquirer.prompt(select);
    return ids;
}

module.exports = {
    inquirerMenu,
    inquirerPause,
    leerInput,
    seleccionarTarea,
    confirmar,
    marcarTareaChecklist
}