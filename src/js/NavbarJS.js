window.addEventListener("scroll", function()
{
	if(document.body.offsetWidth >= 995)
	{
		var scrollTop = window.pageYOffset || document.body.scrollTop;
		var nav = document.querySelector('.navbar');

		if(scrollTop)
		{
            nav.style.backgroundColor = "rgba(255, 255, 255, .95)";
            nav.style.borderBottom = "3px solid var(--default-color)";
		}
		else
		{
            nav.style.backgroundColor = "rgba(0,0,0,0)";
            nav.style.borderBottom = "0";
		}
    }

}, false);