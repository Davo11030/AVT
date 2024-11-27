import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabaseUrl = 'https://qdwxxmgubxanttuhzfdl.supabase.co'; // Asegúrate de incluir las comillas
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkd3h4bWd1YnhhbnR0dWh6ZmRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2OTExMjcsImV4cCI6MjA0ODI2NzEyN30.nDiIUFK5vEtYoM7jViVL_r1h2RGNKLdTz-fNvGpTMeg';

const supabase = createClient(supabaseUrl, supabaseKey);

// Ejemplo de función para obtener datos
async function fetchTodos() {
    const { data, error } = await supabase
        .from('todos') // Asegúrate de que 'todos' es el nombre de tu tabla
        .select();
    
    if (error) {
        console.error('Error al obtener los datos:', error.message);
        return null;
    }

    return data;
}

// Llama a la función (por ejemplo, dentro de un componente o al montar tu aplicación)
fetchTodos().then((todos) => console.log('Tareas:', todos));
