// This function has been created to load the data when Load Button is clicked.

	$(document).ready(function(){
	  $("#loadData").click(function(){
	  $("#displayData").empty();
		$.getJSON("/users", function(result){
		  $.each(result, function(i, field){
			 // Added a variable to identify the current time stamp when the record is added.
			 var tStamp = new Date($.now());
			//FOR loop to load the record with a delete button beside each added record. This delete button is based on the field ID.
		   for(var k=0;k<field.length;k++){
				$("#displayData").append(tStamp.getHours()+ ":" + tStamp.getMinutes()+ " - " + field[k].fullName + " , " + field[k].major + " ,  " + field[k].startYear + "<button value='" +field[k].id+ "' id ='deleteData'>Delete</button>" +"<br>" );
				console.log(field[k].id);
				
			   }
		  
		  });
		});
	  });
	});
	
		// Function to add the new record.
		$(document).ready(function(){
		  $("#addRec").click(function(){
			const startYear= document.getElementById('startYear').value;
			if (startYear <= 2000) {
		  window.alert('Incorrect year: ' + startYear)
		  return}
		  $.ajax({
			  //Ajax POST request to publish the data.
					method: 'POST',
					url: '/users/',
					type: 'POST',
					cache: false,
					data: {
						fullName:$('#fullName').val(),
						major:$('#major').val(),
						startYear: $('#startYear').val(),
						
					}
					
					
				})
				//console.log("it worked");
				});
				});
			
			
			
			// This function is to delete the data when delete button is clicked.		  
			$(document).on("click","#deleteData",function(){
			const id= $(this).val();	
			console.log(id);
			// Ajax delete request.
			$.ajax({
					method: 'DELETE',
					url: '/user/'+id,
					type: '',
					cache: false,
				}
			)
				reLoad();
			});
			
			
		  
		 
		
		//Function created to reload the data.	
		function reLoad()
					{
					document.getElementById("displayData").innerHTML=" ";
					$.getJSON("/users", function(result){
				  $.each(result, function(i, field){
					var tStamp = new Date($.now());  
				   for(var k=0;k<field.length;k++){
						$("#displayData").append(tStamp.getHours()+ ":" + tStamp.getMinutes()+ " - " + field[k].fullName + " , " + field[k].major + " ,  " + field[k].startYear + "<button value='" +field[k].id+ "' id ='deleteData'>Delete</button>" +"<br>" );
						console.log(field[k].id);
					   }
				  
				  });
				});
				}
					   
			
		/*function sendData() {
			$.ajax({
				method: 'POST',
				url: '/user/',
				type: 'POST',
				contentType: 'application/json',
				cache: false,
				data: {
					fullName:"Bob",
					id: "252",
					major:"Information Systems",
					startYear: "2019"
					
				}
				console.log("it worked");
				
			});
		}*/
		
			
	