$(document).ready(function() {
	$('.deleteSubscriber').on('click' , deleteSub);
});

function deleteSub() {
	
	//event.preventDefult();

	var confirmation = confirm('Are you sure?');

	if(confirmation){
		$.ajax({
			type: 'DELETE',
			url : '/subscribers/'+ $('.deleteSubscriber').data('id')
		}).done(function(res){
			alert(res.status);
			window.location.replace('/');
		});
	} else{
		return false;
	}
};