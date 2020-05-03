//Se creo la rama develop


// Constructor para seguro, recolecta la info
function Seguro(marca, anio, tipo){
     this.marca = marca;
     this.anio = anio;
     this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function(){
    /*

          1 = Americano 1.15
          2 = Asiatico 1.05
          3 = Europeo 1.35

    */
   let cantidad;
   const base = 2000;

   switch(this.marca){
        case '1': cantidad = base * 1.15;
        break;
        case '2': cantidad = base * 1.05;
        break;
        case '3': cantidad = base * 1.35;
        break;
   }
   const diferencia = new Date().getFullYear() - this.anio;
   // Cada a;o de diferencia hay que reducir 3% el valor del seguro
    cantidad -= ((diferencia*3)) * cantidad / 100;

    /*
     Si el seguro es basico se multiplica por 38% mas
     Si el seguro es completo 56% mas.
    */

     if(this.tipo === 'basico'){
          cantidad *= 1.30;
     }else{
          cantidad *= 1.50; 
     }
   return cantidad;
}


//Todo lo que se muestra



function Interfaz(){}

     //Mensaje que se imprime en el HTML
     Interfaz.prototype.mostrarError = function(mensaje, tipo){
         const div = document.createElement('div');
         
         if(tipo === 'error'){
              
               div.classList.add('mensaje','error');
          
         }else{
               div.classList.add('mensaje','correcto');
               
         }
         div.innerHTML = `${mensaje}`;
         formulario.insertBefore(div, document.querySelector('.form-group'));
         setTimeout(function(){
               document.querySelector('.mensaje').remove();
         },3000);
        
     }

     //Imprime el resultado de la cotizacion
     Interfaz.prototype.mostrarInfo = function(seguro, total){
          const resultado = document.getElementById('resultado');

          let marca;
          switch(seguro.marca){
                    case '1': marca = 'Americano';
                    break;
                    case '2': marca = 'Asiatico';
                    break;
                    case '3':  marcar ='Europeo';
                    break;
          }
          const div = document.createElement('div');

          div.innerHTML = `
               <p>Tu resumen:</p>

               <p>Marca: ${marca}</p>

               <p>Año: ${seguro.anio}</p>

               <p>Tipo: ${seguro.tipo}</p>

               <p>Total: ${total}</p>

          `;
          resultado.appendChild(div);
          console.log(marca)
    }

    



//EventListener

const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function(e){
     e.preventDefault();
     //Leer marca (Spinner)
     const marca = document.getElementById('marca');
     const marcaSeleccionada = marca.options[marca.selectedIndex].value;
     
     
     //Leer anio (Spinner)
     const anio = document.getElementById('anio');
     const anioSeleccionado = anio.options[anio.selectedIndex].value;

     //Lee el valor del RadioButton

     const tipo = document.querySelector('input[name="tipo"]:checked').value;

     //Crear instancia de Interfaz
     const interfaz = new Interfaz();
     
     //Revisar que los campos no esten vacios
     if(marcaSeleccionada === '' || anioSeleccionado === '' || tipo === ''){
          //Interfaz imprimiendo un error
          interfaz.mostrarError('Falta datos, revisa el formulario y prueba de nuevo', 'error');
          
     }else{
          interfaz.mostrarError('Todo correcto', 'correcto');
          //Instanciar seguro
               const seguro = new Seguro(marcaSeleccionada,anioSeleccionado,tipo)
          //Cotizar seguro
          const cantidad = seguro.cotizarSeguro(seguro);     
          
          //mostrar resultado

          interfaz.mostrarInfo(seguro, cantidad);
          
     }
     
     
});



//Años
const max = new Date().getFullYear(),
     min = max - 20;

const selecAnio = document.getElementById('anio');

for(let i = max; i > min; i--){
     let option = document.createElement('option');
     option.value = i;
     option.innerHTML = i;
     selecAnio.appendChild(option);
}