$( document ).ready( onReady );

function onReady(){
    getTasks();
    $( `#addTaskButton` ).on( 'click', addTask );
    $( `#viewTasks` ).on( 'click', `.deleteButton`, deleteTask );
    $( `#viewTasks` ).on( 'click', `.uncompleteButton`, completeTask);
};

function addTask(){
    console.log( 'in addTask' );
    //capture the user input 
    let objectToSend = {
        item: $( `#taskInput` ).val(),
        completed: false
    };
    console.log( 'objectToSend:', objectToSend);
    //sends an AJAX POST req to the server
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: objectToSend
    }).then( function (response){
        //get call
        getTasks();
        //empty out input
        $( `#taskInput` ).val('');
    }).catch( function( err ){
        console.log( 'Post method error!', err )
    });//end AJAX

}; //end addTask

function completeTask(){
    console.log( 'in complete task function' );
    $.ajax({
        method: 'PUT',
        url: '/tasks?id=' + $( this ).data( 'id' )
    }).then(function (response){
        getTasks();
    }).catch(function (err){
        console.log( 'Put method error!', err )
    })
}; //end completeTask

function deleteTask(){
    console.log( 'in deleteTask function', $( this ).data( 'id' ) );
//create a function that sends an AJAX DELETE 
    //req to the server in the client using $(this).data( 'id' )
    $.ajax({
        method: 'DELETE',
        url: '/tasks?id=' + $( this ).data( 'id' )
    }).then(function (response){
        getTasks();
    }).catch( function( err ){
        console.log( 'Delete method error!', err )
    })}; //end deleteTask

function getTasks(){
    $.ajax({
        method: 'GET',
        url: '/tasks',
    }).then( function (response){
        console.log( 'response:', response );
      //empty table
      let el = $( `#viewTasks` );
      el.empty();
      //loop through response
      //display in the table on the DOM
      for( let i=0; i<response.length; i++){
          if( response[i].completed === false ){
          el.append( `<tr>
                        <td>${response[i].id}</td>
                        <td><button data-id='${response[i].id}' class="uncompleteButton"><img class="imageface" src="./images/meh.png"/></button></td>
                        <td class="taskToComplete">${response[i].item}</td>
                        <td><button data-id='${response[i].id}' class="deleteButton">Delete</button></td>
                    </tr>`)}
        else{
            el.append( `<tr>
                        <td>${response[i].id}</td>
                        <td><button data-id='${response[i].id}' class="completeButton"><img class="imageface" src="./images/ohyea.png"/></button></td>
                        <td class="taskCompleted">${response[i].item}</td>
                        <td><button data-id='${response[i].id}' class="deleteButton">Delete</button></td>
                    </tr>`)
        }
    }}).catch( function( err ){
        console.log( 'Get method error!', err )
    })}; //end getTasks