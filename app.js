require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        inquirerPause, 
        leerInput,
        seleccionarTarea,
        confirmar,
        marcarTareaChecklist
} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

console.clear();

const main = async() => {
    //console.log('Hola Mundo');

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if ( tareasDB ) {
        //Establecer listado de tareas
        tareas.cargarTareasArray( tareasDB );
    }

    //await inquirerPause();

    do{
        opt = await inquirerMenu();
        //console.log({ opt });
        //console.log(opt);
        
        switch (opt) {
            case 1://Crear tarea
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea( desc );
                //console.log(desc);
            break;
            case 2://Listar tareas
                tareas.listadoCompleto();  
            break;
            case 3://Listar pendientes
                tareas.listarCompletadasPendientes(false);
            break;
            case 4://Listar completadas
                tareas.listarCompletadasPendientes(true);
            break;
            case 5://Marcar 1 tarea como completada
                let ids = await marcarTareaChecklist( tareas.listadoArray );
                console.log(ids);
                tareas.marcarCompletada(ids);
            break;
            case 6://Borrar 1 tarea
                let id = await seleccionarTarea( tareas.listadoArray );
                if ( id !== '0') {
                    const confirm = await confirmar('¿Estas seguro que deseas borrar la tarea?');
                    if ( confirm ){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada con éxito'); 
                    }
                }
            break;
    
        }

        guardarDB( tareas.listadoArray );


        //if (opt !== '0') 
        await inquirerPause();

    //pausa();
    } while ( opt !== 0 );

}

main();