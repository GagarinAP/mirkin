$(function () {
	window.moduleApp = (function () {
		var sendStr = function () {
			var str = $('input[name="str"]').val();
			$.ajax(
				'/send', {
				method: 'POST',
				data: { str: str },
				success: function(data) {
					$('#res').html(data.res);
				}
			});
		};
		return{
			sendStr: sendStr
		}
	})();
});